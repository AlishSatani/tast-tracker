--! Previous: -
--! Hash: sha1:b4d9effd5e78b4c98adde5d519585313dde7fe89

--! split: 1-clean-up.sql
/*
 * Graphile Migrate will run our `current/...` migrations in one batch. Since
 * this is our first migration it's defining the entire database, so we first
 * drop anything that may have previously been created
 * (app_public/app_hidden/app_private) so that we can start from scratch.
 */

drop schema if exists app_public cascade;
drop schema if exists app_hidden cascade;
drop schema if exists app_private cascade;

/*
 * The `public` *schema* contains things like PostgreSQL extensions. We
 * deliberately do not install application logic into the public schema
 * (instead storing it to app_public/app_hidden/app_private as appropriate),
 * but none the less we don't want untrusted roles to be able to install or
 * modify things into the public schema.
 *
 * The `public` *role* is automatically inherited by all other roles; we only
 * want specific roles to be able to access our database so we must revoke
 * access to the `public` role.
 */

revoke all on schema public from public;

alter default privileges revoke all on sequences from public;
alter default privileges revoke all on functions from public;

-- Of course we want our database owner to be able to do anything inside the
-- database, so we grant access to the `public` schema:
grant all on schema public to :DATABASE_OWNER;

--! split: 2-create-schemas.sql
/*
 * Read about our app_public/app_hidden/app_private schemas here:
 * https://www.graphile.org/postgraphile/namespaces/#advice
 *
 * Note this pattern is not required to use PostGraphile, it's merely the
 * preference of the author of this package.
 */

create schema app_public;
create schema app_hidden;
create schema app_private;

-- The 'visitor' role (used by PostGraphile to represent an end user) may
-- access the public, app_public and app_hidden schemas (but _NOT_ the
-- app_private schema).
grant usage on schema public, app_public, app_hidden to :DATABASE_VISITOR;

-- We want the `visitor` role to be able to insert rows (`serial` data type
-- creates sequences, so we need to grant access to that).
alter default privileges in schema public, app_public, app_hidden
  grant usage, select on sequences to :DATABASE_VISITOR;

-- And the `visitor` role should be able to call functions too.
alter default privileges in schema public, app_public, app_hidden
  grant execute on functions to :DATABASE_VISITOR;

BEGIN;
GRANT CONNECT ON DATABASE :DATABASE_NAME TO :DATABASE_OWNER;
GRANT CONNECT ON DATABASE :DATABASE_NAME TO :DATABASE_AUTHENTICATOR;
GRANT ALL ON DATABASE :DATABASE_NAME TO :DATABASE_OWNER;
ALTER SCHEMA public OWNER TO :DATABASE_OWNER;

-- Some extensions require superuser privileges, so we create them before migration time.
CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMIT;

--! split: 3-common-triggers.sql
/*
 * These triggers are commonly used across many tables.
 */

/*
 * This trigger is used on tables with created_at and updated_at to ensure that
 * these timestamps are kept valid (namely: `created_at` cannot be changed, and
 * `updated_at` must be monotonically increasing).
 */

create function app_private.tg__timestamps() returns trigger as $$
begin
  NEW.created_at = (case when TG_OP = 'INSERT' then NOW() else OLD.created_at end);
  NEW.updated_at = (case when TG_OP = 'UPDATE' and OLD.updated_at >= NOW() then OLD.updated_at + interval '1 millisecond' else NOW() end);
  return NEW;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;

comment on function app_private.tg__timestamps() is
  E'This trigger should be called on all tables with created_at, updated_at - it ensures that they cannot be manipulated and that updated_at will always be larger than the previous updated_at.';

--! split: 4-pg-session.sql
-- /*
--  * This table is used (only) by `connect-pg-simple`
--  * to track cookie session information at the webserver (`express`) level if
--  * you don't have a redis server. If you're using redis everywhere (including
--  * development) then you don't need this table.
--  *
--  * Do not confuse this with the `app_private.sessions` table.
--  */

create table app_private.connect_pg_simple_sessions (
  sid varchar not null,
	sess json not null,
	expire timestamp not null
);

alter table app_private.connect_pg_simple_sessions
  enable row level security;

alter table app_private.connect_pg_simple_sessions
  add constraint session_pkey primary key (sid) not deferrable initially immediate;

--! split: 5-sessions.sql
/*
 * The sessions table is used to track who is logged in, if there are any
 * restrictions on that session, when it was last active (so we know if it's
 * still valid), etc.
 *
 * In Starter we only have an extremely limited implementation of this, but you
 * could add things like "last_auth_at" to it so that you could track when they
 * last officially authenticated; that way if you have particularly dangerous
 * actions you could require them to log back in to allow them to perform those
 * actions. (GitHub does this when you attempt to change the settings on a
 * repository, for example.)
 *
 * The primary key is a cryptographically secure random uuid; the value of this
 * primary key should be secret, and only shared with the user themself. We
 * currently wrap this session in a webserver-level session (either using
 * redis, or using `connect-pg-simple` which uses the
 * `connect_pg_simple_sessions` table which we defined previously) so that we
 * don't even send the raw session id to the end user, but you might want to
 * consider exposing it for things such as mobile apps or command line
 * utilities that may not want to implement cookies to maintain a cookie
 * session.
 */

create table app_private.sessions (
  uuid uuid not null default gen_random_uuid() primary key,
  user_id uuid not null,
  -- You could add access restriction columns here if you want, e.g. for OAuth scopes.
  created_at timestamptz not null default now(),
  last_active timestamptz not null default now()
);

alter table app_private.sessions enable row level security;

-- To allow us to efficiently see what sessions are open for a particular user.
create index on app_private.sessions (user_id);

/*
 * This function is responsible for reading the `jwt.claims.session_id`
 * transaction setting (set from the `pgSettings` function within
 * `installPostGraphile.ts`). Defining this inside a function means we can
 * modify it in future to allow additional ways of defining the session.
 */

-- Note we have this in `app_public` but it doesn't show up in the GraphQL
-- schema because we've used `postgraphile.tags.jsonc` to omit it. We could
-- have put it in app_hidden to get the same effect more easily, but it's often
-- useful to un-omit it to ease debugging auth issues.
create function app_public.current_session_id() returns uuid as $$
  select nullif(pg_catalog.current_setting('jwt.claims.session_id', true), '')::uuid;
$$ language sql stable;
comment on function app_public.current_session_id() is
  E'Handy method to get the current session ID.';


/*
 * We can figure out who the current user is by looking up their session in the
 * sessions table using the `current_session_id()` function.
 *
 * A less secure but more performant version of this function might contain only:
 *
 *   select nullif(pg_catalog.current_setting('jwt.claims.user_id', true), '')::uuid;
 *
 * The increased security of this implementation is because even if someone gets
 * the ability to run SQL within this transaction they cannot impersonate
 * another user without knowing their session_id (which should be closely
 * guarded).
 *
 * The below implementation is more secure than simply indicating the user_id
 * directly: even if an SQL injection vulnerability were to allow a user to set
 * their `jwt.claims.session_id` to another value, it would take them many
 * millenia to be able to correctly guess someone else's session id (since it's
 * a cryptographically secure random value that is kept secret). This makes
 * impersonating another user virtually impossible.
 */

create function app_public.current_user_id() returns uuid as $$
  select user_id from app_private.sessions where uuid = app_public.current_session_id();
$$ language sql stable security definer set search_path to pg_catalog, public, pg_temp;
comment on function app_public.current_user_id() is
  E'Handy method to get the current user ID for use in RLS policies, etc; in GraphQL, use `currentUser{id}` instead.';

--! split: 6-users.sql
/*
 * The users table stores (unsurprisingly) the users of our application. You'll
 * notice that it does NOT contain private information such as the user's
 * password or their email address; that's because the users table is seen as
 * public - anyone who can "see" the user can see this information.
 *
 * The author sees `is_admin` as public information; if you
 * disagree then you should relocate these attributes to another table, such as
 * `user_secrets`.
 */

create table app_public.users (
  id uuid primary key default gen_random_uuid(),
  name citext check(
    length(name) >= 2
    and length(name) <= 24
    and name ~ '^[a-zA-Z]([_]?[a-zA-Z0-9])+$'
  ),
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table
  app_public.users enable row level security;

-- We couldn't implement this relationship on the sessions table until the users table existed!
alter table
  app_private.sessions
add
  constraint sessions_user_id_fkey foreign key ("user_id") references app_public.users on
delete
  cascade;

-- Users are publicly visible, like on GitHub, Twitter, Facebook, Trello, etc.
create policy select_all on app_public.users for
select
  using (true);

-- You can only update yourself.
create policy update_self on app_public.users for
update
  using (id = app_public.current_user_id());

grant
select
  on app_public.users to :DATABASE_VISITOR;

-- NOTE: `insert` is not granted, because we'll handle that separately
grant
update
  (name) on app_public.users to :DATABASE_VISITOR;

-- NOTE: `delete` is not granted, because we require confirmation via either mail or other methods
comment on table app_public.users is E'A user who can log in to the application.';

comment on column app_public.users.id is E'Unique identifier for the user.';

comment on column app_public.users.name is E'Public-facing name (or pseudonym) of the user.';

comment on column app_public.users.is_admin is E'If true, the user has elevated privileges.';

create trigger _100_timestamps before
insert
  or
update
  on app_public.users for each row execute procedure app_private.tg__timestamps();

--! split: 7-current-user.sql
/**********/
-- Returns the current user; this is a "custom query" function; see:
-- https://www.graphile.org/postgraphile/custom-queries/
-- So this will be queryable via GraphQL as `{ currentUser { ... } }`

create function app_public.current_user() returns app_public.users as $$
select
  users. *
from
  app_public.users
where
  id = app_public.current_user_id();

$$ language sql stable;

comment on function app_public.current_user() is E'The currently logged in user (or null if not logged in).';

/**********/
-- The users table contains all the public information, but we need somewhere
-- to store private information. In fact, this data is so private that we don't
-- want the user themselves to be able to see it - things like the bcrypted
-- password hash, timestamps of recent login attempts (to allow us to
-- auto-protect user accounts that are under attack), etc.
create table app_private.user_secrets (
  user_id uuid not null primary key references app_public.users on
  delete
    cascade,
    password_hash text,
    last_login_at timestamptz not null default now(),
    failed_password_attempts int not null default 0,
    first_failed_password_attempt timestamptz,
    reset_password_token text,
    reset_password_token_generated timestamptz,
    failed_reset_password_attempts int not null default 0,
    first_failed_reset_password_attempt timestamptz,
    delete_account_token text,
    delete_account_token_generated timestamptz
);

alter table
  app_private.user_secrets enable row level security;

comment on table app_private.user_secrets is E'The contents of this table should never be visible to the user. Contains data mostly related to authentication.';

/*
 * When we insert into `users` we _always_ want there to be a matching
 * `user_secrets` entry, so we have a trigger to enforce this:
 */
create function app_private.tg_user_secrets__insert_with_user() returns trigger as $$ begin
  insert into
    app_private.user_secrets(user_id)
  values
    (NEW .id);

  return NEW;
end;
$$ language plpgsql volatile
set
  search_path to pg_catalog,
  public,
  pg_temp;

create trigger _500_insert_secrets after
insert
  on app_public.users for each row execute procedure app_private.tg_user_secrets__insert_with_user();

comment on function app_private.tg_user_secrets__insert_with_user() is E'Ensures that every user record has an associated user_secret record.';

/*
 * Because you can register with email/password or using OAuth (social
 * login), we need a way to tell the user whether or not they have a
 * password. This is to help the UI display the right interface: change
 * password or set password.
 */
create function app_public.users_has_password(u app_public.users) returns boolean as $$
select
  (password_hash is not null)
from
  app_private.user_secrets
where
  user_secrets.user_id = u.id
  and u.id = app_public.current_user_id();

$$ language sql stable security definer
set
  search_path to pg_catalog,
  public,
  pg_temp;

--! split: 8-user-emails.sql
--! split: 010-user_emails.sql
/*
 * A user may have more than one email address; this is useful when letting the
 * user change their email so that they can verify the new one before deleting
 * the old one, but is also generally useful as they might want to use
 * different emails to log in versus where to send notifications. Therefore we
 * track user emails in a separate table.
 */
create table app_public.user_emails (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default app_public.current_user_id() references app_public.users on delete cascade,
  email citext not null check (email ~ '[^@]+@[^@]+\.[^@]+'),
  is_verified boolean not null default false,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Each user can only have an email once.
  constraint user_emails_user_id_email_key unique(user_id, email),
  -- An unverified email cannot be set as the primary email.
  constraint user_emails_must_be_verified_to_be_primary check(is_primary is false or is_verified is true)
);

alter table app_public.user_emails enable row level security;

-- Once an email is verified, it may only be used by one user. (We can't
-- enforce this before an email is verified otherwise it could be used to
-- prevent a legitimate user from signing up.)
create unique index uniq_user_emails_verified_email on app_public.user_emails(email) where (is_verified is true);
-- Only one primary email per user.
create unique index uniq_user_emails_primary_email on app_public.user_emails (user_id) where (is_primary is true);
-- Allow efficient retrieval of all the emails owned by a particular user.
create index idx_user_emails_user on app_public.user_emails (user_id);
-- For the user settings page sorting
create index idx_user_emails_primary on app_public.user_emails (is_primary, user_id);

-- Keep created_at and updated_at up to date.
create trigger _100_timestamps
  before insert or update on app_public.user_emails
  for each row
  execute procedure app_private.tg__timestamps();

-- You can't verify an email address that someone else has already verified. (Email is taken.)
create function app_public.tg_user_emails__forbid_if_verified() returns trigger as $$
begin
  if exists(select 1 from app_public.user_emails where email = NEW.email and is_verified is true) then
    raise exception 'An account using that email address has already been created.' using errcode='EMTKN';
  end if;
  return NEW;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

create trigger _200_forbid_existing_email before insert on app_public.user_emails for each row execute procedure app_public.tg_user_emails__forbid_if_verified();

comment on table app_public.user_emails is
  E'Information about a user''s email address.';
comment on column app_public.user_emails.email is
  E'The users email address, in `a@b.c` format.';
comment on column app_public.user_emails.is_verified is
  E'True if the user has is_verified their email address (by clicking the link in the email we sent them, or logging in with a social login provider), false otherwise.';

-- Users may only manage their own emails.
create policy select_own on app_public.user_emails for select using (user_id = app_public.current_user_id());
create policy insert_own on app_public.user_emails for insert with check (user_id = app_public.current_user_id());
-- NOTE: we don't allow emails to be updated, instead add a new email and delete the old one.
create policy delete_own on app_public.user_emails for delete using (user_id = app_public.current_user_id());

grant select on app_public.user_emails to :DATABASE_VISITOR;
grant insert (email) on app_public.user_emails to :DATABASE_VISITOR;
-- No update
grant delete on app_public.user_emails to :DATABASE_VISITOR;

-- Prevent deleting the user's last email, otherwise they can't access password reset/etc.
create function app_public.tg_user_emails__prevent_delete_last_email() returns trigger as $$
begin
  if exists (
    with remaining as (
      select user_emails.user_id
      from app_public.user_emails
      inner join deleted
      on user_emails.user_id = deleted.user_id
      -- Don't delete last verified email
      where (user_emails.is_verified is true or not exists (
        select 1
        from deleted d2
        where d2.user_id = user_emails.user_id
        and d2.is_verified is true
      ))
      order by user_emails.id asc

      /*
       * Lock this table to prevent race conditions; see:
       * https://www.cybertec-postgresql.com/en/triggers-to-enforce-constraints/
       */
      for update of user_emails
    )
    select 1
    from app_public.users
    where id in (
      select user_id from deleted
      except
      select user_id from remaining
    )
  )
  then
    raise exception 'You must have at least one (verified) email address' using errcode = 'CDLEA';
  end if;

  return null;
end;
$$
language plpgsql
-- Security definer is required for 'FOR UPDATE OF' since we don't grant UPDATE privileges.
security definer
set search_path = pg_catalog, public, pg_temp;

-- Note this check runs AFTER the email was deleted. If the user was deleted
-- then their emails will also be deleted (thanks to the foreign key on delete
-- cascade) and this is desirable; we only want to prevent the deletion if
-- the user still exists so we check after the statement completes.
create trigger _500_prevent_delete_last
  after delete on app_public.user_emails
  referencing old table as deleted
  for each statement
  execute procedure app_public.tg_user_emails__prevent_delete_last_email();

/**********/

/*
 * Just like with users and user_secrets, there are secrets for emails that we
 * don't want the user to be able to see - for example the verification token.
 * Like with user_secrets we automatically create a record in this table
 * whenever a record is added to user_emails.
 */
create table app_private.user_email_secrets (
  user_email_id uuid primary key references app_public.user_emails on delete cascade,
  verification_token text,
  verification_email_sent_at timestamptz,
  password_reset_email_sent_at timestamptz
);
alter table app_private.user_email_secrets enable row level security;

comment on table app_private.user_email_secrets is
  E'The contents of this table should never be visible to the user. Contains data mostly related to email verification and avoiding spamming users.';
comment on column app_private.user_email_secrets.password_reset_email_sent_at is
  E'We store the time the last password reset was sent to this email to prevent the email getting flooded.';

create function app_private.tg_user_email_secrets__insert_with_user_email() returns trigger as $$
declare
  v_verification_token text;
begin
  if NEW.is_verified is false then
    v_verification_token = encode(gen_random_bytes(7), 'hex');
  end if;
  insert into app_private.user_email_secrets(user_email_id, verification_token) values(NEW.id, v_verification_token);
  return NEW;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;
create trigger _500_insert_secrets
  after insert on app_public.user_emails
  for each row
  execute procedure app_private.tg_user_email_secrets__insert_with_user_email();
comment on function app_private.tg_user_email_secrets__insert_with_user_email() is
  E'Ensures that every user_email record has an associated user_email_secret record.';

--! split: 9-register-user.sql
create function app_private.assert_valid_password(new_password text) returns void as $$
begin
  -- TODO: add better assertions!
  if length(new_password) < 8 then
    raise exception 'Password is too weak' using errcode = 'WEAKP';
  end if;
end;
$$ language plpgsql volatile;

/*
 * A user account may be created explicitly via the GraphQL `register` mutation
 * (which calls `really_create_user` below), or via OAuth (which, via
 * `installPassportStrategy.ts`, calls link_or_register_user below, which may
 * then call really_create_user). Ultimately `really_create_user` is called in
 * all cases to create a user account within our system, so it must do
 * everything we'd expect in this case including validating email/password,
 * setting the password (if any), storing the email address, etc.
 */

create function app_private.really_create_user(
  email text,
  email_is_verified bool,
  name citext,
  password text default null
) returns app_public.users as $$
declare
  v_user app_public.users;
  v_count integer;
begin
  if password is not null then
    perform app_private.assert_valid_password(password);
  end if;
  if email is null then
    raise exception 'Email is required' using errcode = 'MODAT';
  end if;

  if exists(select 1 from app_public.user_emails where user_emails.email = really_create_user.email) then
    raise exception 'Account with this email is already exists' using errcode = 'MODAT';
  end if;

  -- Insert the new user
  insert into app_public.users(name) values(name)
    returning * into v_user;

	-- Add the user's email
  insert into app_public.user_emails (user_id, email, is_verified, is_primary)
  values (v_user.id, email, email_is_verified, email_is_verified);

  -- Store the password
  if password is not null then
    update app_private.user_secrets
    set password_hash = crypt(password, gen_salt('bf'))
    where user_id = v_user.id;
  end if;

  -- Refresh the user
  select * into v_user from app_public.users where id = v_user.id;

  return v_user;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;

comment on function app_private.really_create_user(email text, email_is_verified bool, name citext, password text) is
  E'Creates a user account. All arguments are optional, it trusts the calling method to perform sanitisation.';

--! split: 10-login-user.sql
/*
 * This function handles logging in a user with their email
 * address and password.
 *
 * Note that it is not in app_public; this function is intended to be called
 * with elevated privileges (namely from `PassportLoginPlugin.ts`). The reason
 * for this is because we want to be able to track failed login attempts (to
 * help protect user accounts). If this were callable by a user, they could
 * roll back the transaction when a login fails and no failed attempts would be
 * logged, effectively giving them infinite retries. We want to disallow this,
 * so we only let code call into `login` that we trust to not roll back the
 * transaction afterwards.
 */
create function app_private.login(email citext, password text) returns app_private.sessions as $$
declare
  v_user app_public.users;
  v_user_secret app_private.user_secrets;
  v_login_attempt_window_duration interval = interval '5 minutes';
  v_session app_private.sessions;
begin

  select users.* into v_user
  from app_public.users
  inner join app_public.user_emails
  on (user_emails.user_id = users.id)
  where user_emails.email = login.email
  order by
    user_emails.is_verified desc, -- Prefer verified email
    user_emails.created_at asc -- Failing that, prefer the first registered (unverified users _should_ verify before logging in)
  limit 1;


  if not (v_user is null) then
    -- Load their secrets
    select * into v_user_secret from app_private.user_secrets
    where user_secrets.user_id = v_user.id;

    -- Have there been too many login attempts?
    if (
      v_user_secret.first_failed_password_attempt is not null
    and
      v_user_secret.first_failed_password_attempt > NOW() - v_login_attempt_window_duration
    and
      v_user_secret.failed_password_attempts >= 3
    ) then
      raise exception 'User account locked - too many login attempts. Try again after 5 minutes.' using errcode = 'LOCKD';
    end if;

    -- Not too many login attempts, let's check the password.
    -- NOTE: `password_hash` could be null, this is fine since `NULL = NULL` is null, and null is falsy.
    if v_user_secret.password_hash = crypt(password, v_user_secret.password_hash) then
      -- Excellent - they're logged in! Let's reset the attempt tracking
      update app_private.user_secrets
      set failed_password_attempts = 0, first_failed_password_attempt = null, last_login_at = now()
      where user_id = v_user.id;
      -- Create a session for the user
      insert into app_private.sessions (user_id) values (v_user.id) returning * into v_session;
      -- And finally return the session
      return v_session;
    else
      -- Wrong password, bump all the attempt tracking figures
      update app_private.user_secrets
      set
        failed_password_attempts = (case when first_failed_password_attempt is null or first_failed_password_attempt < now() - v_login_attempt_window_duration then 1 else failed_password_attempts + 1 end),
        first_failed_password_attempt = (case when first_failed_password_attempt is null or first_failed_password_attempt < now() - v_login_attempt_window_duration then now() else first_failed_password_attempt end)
      where user_id = v_user.id;
      return null; -- Must not throw otherwise transaction will be aborted and attempts won't be recorded
    end if;
  else
    -- No user with that email was found
    return null;
  end if;
end;
$$ language plpgsql strict volatile;

comment on function app_private.login(email citext, password text) is
  E'Returns a user that matches the email/password combo, or null on failure.';

--! split: 11-logout-user.sql
/*
 * Logging out deletes the session, and clears the session_id in the
 * transaction. This is a `SECURITY DEFINER` function, so we check that the
 * user is allowed to do it by matching the current_session_id().
 */
create function app_public.logout() returns void as $$
begin
  -- Delete the session
  delete from app_private.sessions where uuid = app_public.current_session_id();
  -- Clear the identifier from the transaction
  perform set_config('jwt.claims.session_id', '', true);
end;
$$ language plpgsql security definer volatile set search_path to pg_catalog, public, pg_temp;

--! split: 12-current-user.sql
--! split: 022-is-current-user-admin.sql
CREATE FUNCTION app_hidden.is_current_user_admin() RETURNS boolean AS
$$
    begin return exists(
        select
            1
        from
            app_public.users
        where
            id = app_public.current_user_id()
            and is_admin = true
    );
    end;
$$ LANGUAGE plpgsql IMMUTABLE STRICT;


GRANT EXECUTE ON FUNCTION app_hidden.is_current_user_admin() TO :DATABASE_VISITOR;

create policy modify_admin on app_public.users using ((app_hidden.is_current_user_admin())) with check (app_hidden.is_current_user_admin());

--! split: 13-tasks.sql
drop type if exists app_public.task_status;

create type app_public.task_status as enum ('todo', 'in_progress', 'completed');

drop table if exists app_public.tasks;

create table app_public.tasks (
  id uuid primary key default gen_random_uuid(),
  name citext check(
    length(name) >= 2
    and length(name) <= 24
  ) not null,
  description citext,
  status app_public.task_status not null default 'todo'::app_public.task_status,
  user_id uuid not null default app_public.current_user_id(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table
  app_public.tasks
add
  constraint tasks_user_id_fkey foreign key ("user_id") references app_public.users on
delete
  cascade;

alter table
  app_public.tasks enable row level security;

create index on app_public.tasks("status");

create index on app_public.tasks("name");

create index on app_public.tasks("user_id");

create policy select_all on app_public.tasks for
select
  using (user_id = app_public.current_user_id());

create policy modify_admin on app_public.tasks using (app_hidden.is_current_user_admin());

grant select, insert, update, delete on app_public.tasks to :DATABASE_VISITOR;

comment on table app_public.tasks is E'A tasks created by admin and assigned to users.';

comment on column app_public.tasks.id is E'Unique identifier for the task.';

comment on column app_public.tasks.name is E'Public-facing name of the task.';

comment on column app_public.tasks.status is E'Status of the task.';

comment on column app_public.tasks.user_id is E'User having this task assigned.';

create trigger _100_timestamps before
insert
  or
update
  on app_public.tasks for each row execute procedure app_private.tg__timestamps();
