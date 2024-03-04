--! Previous: sha1:b4d9effd5e78b4c98adde5d519585313dde7fe89
--! Hash: sha1:f4aa049c434685d25739f364fb52e3acae2f816d

--! split: 1-configure-filters.sql
-- Enter migration here
create index on app_public.users("name");

create index on app_public.tasks("created_at");
