import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Cursor: any;
  Datetime: string;
  UUID: any;
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  eq?: InputMaybe<Scalars['Boolean']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Boolean']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Boolean']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Boolean']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Boolean']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Boolean']>;
  /** Not equal to the specified value. */
  ne?: InputMaybe<Scalars['Boolean']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Boolean']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** All input for the create `Task` mutation. */
export type CreateTaskInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Task` to be created by this mutation. */
  task: TaskInput;
};

/** The output of our create `Task` mutation. */
export type CreateTaskPayload = {
  __typename?: 'CreateTaskPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query: Maybe<Query>;
  /** The `Task` that was created by this mutation. */
  task: Maybe<Task>;
  /** An edge for our `Task`. May be used by Relay 1. */
  taskEdge: Maybe<TasksEdge>;
  /** Reads a single `User` that is related to this `Task`. */
  user: Maybe<User>;
};


/** The output of our create `Task` mutation. */
export type CreateTaskPayloadTaskEdgeArgs = {
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};

/** All input for the create `UserEmail` mutation. */
export type CreateUserEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `UserEmail` to be created by this mutation. */
  userEmail: UserEmailInput;
};

/** The output of our create `UserEmail` mutation. */
export type CreateUserEmailPayload = {
  __typename?: 'CreateUserEmailPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserEmail`. */
  user: Maybe<User>;
  /** The `UserEmail` that was created by this mutation. */
  userEmail: Maybe<UserEmail>;
  /** An edge for our `UserEmail`. May be used by Relay 1. */
  userEmailEdge: Maybe<UserEmailsEdge>;
};


/** The output of our create `UserEmail` mutation. */
export type CreateUserEmailPayloadUserEmailEdgeArgs = {
  orderBy?: InputMaybe<Array<UserEmailsOrderBy>>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']>;
  /** Equal to the specified value. */
  eq?: InputMaybe<Scalars['Datetime']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Not equal to the specified value. */
  ne?: InputMaybe<Scalars['Datetime']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']>>;
};

/** All input for the `deleteTask` mutation. */
export type DeleteTaskInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** Unique identifier for the task. */
  id: Scalars['UUID'];
};

/** The output of our delete `Task` mutation. */
export type DeleteTaskPayload = {
  __typename?: 'DeleteTaskPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId: Maybe<Scalars['String']>;
  deletedTaskNodeId: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query: Maybe<Query>;
  /** The `Task` that was deleted by this mutation. */
  task: Maybe<Task>;
  /** An edge for our `Task`. May be used by Relay 1. */
  taskEdge: Maybe<TasksEdge>;
  /** Reads a single `User` that is related to this `Task`. */
  user: Maybe<User>;
};


/** The output of our delete `Task` mutation. */
export type DeleteTaskPayloadTaskEdgeArgs = {
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};

/** All input for the `deleteUserEmail` mutation. */
export type DeleteUserEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `UserEmail` mutation. */
export type DeleteUserEmailPayload = {
  __typename?: 'DeleteUserEmailPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId: Maybe<Scalars['String']>;
  deletedUserEmailNodeId: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserEmail`. */
  user: Maybe<User>;
  /** The `UserEmail` that was deleted by this mutation. */
  userEmail: Maybe<UserEmail>;
  /** An edge for our `UserEmail`. May be used by Relay 1. */
  userEmailEdge: Maybe<UserEmailsEdge>;
};


/** The output of our delete `UserEmail` mutation. */
export type DeleteUserEmailPayloadUserEmailEdgeArgs = {
  orderBy?: InputMaybe<Array<UserEmailsOrderBy>>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  accessToken: Maybe<Scalars['String']>;
  refreshToken: Maybe<Scalars['String']>;
  user: User;
};

export type LogoutPayload = {
  __typename?: 'LogoutPayload';
  success: Maybe<Scalars['Boolean']>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Task`. */
  createTask: Maybe<CreateTaskPayload>;
  /** Creates a single `UserEmail`. */
  createUserEmail: Maybe<CreateUserEmailPayload>;
  /** Deletes a single `Task` using a unique key. */
  deleteTask: Maybe<DeleteTaskPayload>;
  /** Deletes a single `UserEmail` using a unique key. */
  deleteUserEmail: Maybe<DeleteUserEmailPayload>;
  /** Use this mutation to log in to your account; this login uses sessions so you do not need to take further action. */
  login: Maybe<LoginPayload>;
  /** Use this mutation to logout from your account. Don't forget to clear the client state! */
  logout: Maybe<LogoutPayload>;
  /** Use this mutation to refresh access token. */
  refreshToken: Maybe<RefreshTokenPayload>;
  /** Use this mutation to create an account on our system. This may only be used if you are logged out. */
  register: Maybe<RegisterPayload>;
  /** Updates a single `Task` using a unique key and a patch. */
  updateTask: Maybe<UpdateTaskPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser: Maybe<UpdateUserPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserEmailArgs = {
  input: CreateUserEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserEmailArgs = {
  input: DeleteUserEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationLoginArgs = {
  input: LoginInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterArgs = {
  input: RegisterInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor: Maybe<Scalars['Cursor']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = {
  __typename?: 'Query';
  /** The currently logged in user (or null if not logged in). */
  currentUser: Maybe<User>;
  task: Maybe<Task>;
  /** Reads and enables pagination through a set of `Task`. */
  tasks: Maybe<TasksConnection>;
  user: Maybe<User>;
  userEmail: Maybe<UserEmail>;
  /** Reads and enables pagination through a set of `User`. */
  users: Maybe<UsersConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTaskArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTasksArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<TaskCondition>;
  filter?: InputMaybe<TaskFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserEmailArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<UserCondition>;
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

export type RefreshTokenPayload = {
  __typename?: 'RefreshTokenPayload';
  accessToken: Maybe<Scalars['String']>;
  refreshToken: Maybe<Scalars['String']>;
};

export type RegisterInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterPayload = {
  __typename?: 'RegisterPayload';
  accessToken: Maybe<Scalars['String']>;
  refreshToken: Maybe<Scalars['String']>;
  user: User;
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value. */
  eq?: InputMaybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']>>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value. */
  ne?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

/** A tasks created by admin and assigned to users. */
export type Task = {
  __typename?: 'Task';
  createdAt: Scalars['Datetime'];
  description: Maybe<Scalars['String']>;
  /** Unique identifier for the task. */
  id: Scalars['UUID'];
  /** Public-facing name of the task. */
  name: Scalars['String'];
  /** Status of the task. */
  status: TaskStatus;
  updatedAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `Task`. */
  user: Maybe<User>;
  /** User having this task assigned. */
  userId: Scalars['UUID'];
};

/** A condition to be used against `Task` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TaskCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<TaskStatus>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']>;
};

/** A filter to be used against `Task` object types. All fields are combined with a logical ‘and.’ */
export type TaskFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TaskFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<TaskFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TaskFilter>>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<TaskStatusFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
};

/** An input for mutations affecting `Task` */
export type TaskInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  /** Unique identifier for the task. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Public-facing name of the task. */
  name: Scalars['String'];
  /** Status of the task. */
  status?: InputMaybe<TaskStatus>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  user?: InputMaybe<TasksUserIdFkeyInput>;
  /** User having this task assigned. */
  userId?: InputMaybe<Scalars['UUID']>;
};

/** The fields on `task` to look up the row to update. */
export type TaskOnTaskForTasksUserIdFkeyUsingTasksPkeyUpdate = {
  /** Unique identifier for the task. */
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `task` being updated. */
  patch: UpdateTaskOnTaskForTasksUserIdFkeyPatch;
};

/** Represents an update to a `Task`. Fields that are set will be updated. */
export type TaskPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  /** Unique identifier for the task. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Public-facing name of the task. */
  name?: InputMaybe<Scalars['String']>;
  /** Status of the task. */
  status?: InputMaybe<TaskStatus>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  user?: InputMaybe<TasksUserIdFkeyInput>;
  /** User having this task assigned. */
  userId?: InputMaybe<Scalars['UUID']>;
};

export enum TaskStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

/** A filter to be used against TaskStatus fields. All fields are combined with a logical ‘and.’ */
export type TaskStatusFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<TaskStatus>;
  /** Equal to the specified value. */
  eq?: InputMaybe<TaskStatus>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<TaskStatus>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<TaskStatus>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<TaskStatus>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<TaskStatus>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<TaskStatus>;
  /** Not equal to the specified value. */
  ne?: InputMaybe<TaskStatus>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<TaskStatus>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<TaskStatus>>;
};

/** The fields on `task` to look up the row to connect. */
export type TaskTasksPkeyConnect = {
  /** Unique identifier for the task. */
  id: Scalars['UUID'];
};

/** The fields on `task` to look up the row to delete. */
export type TaskTasksPkeyDelete = {
  /** Unique identifier for the task. */
  id: Scalars['UUID'];
};

/** A connection to a list of `Task` values. */
export type TasksConnection = {
  __typename?: 'TasksConnection';
  /** A list of edges which contains the `Task` and cursor to aid in pagination. */
  edges: Array<TasksEdge>;
  /** A list of `Task` objects. */
  nodes: Array<Task>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Task` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Task` edge in the connection. */
export type TasksEdge = {
  __typename?: 'TasksEdge';
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']>;
  /** The `Task` at the end of the edge. */
  node: Task;
};

/** Methods to use when ordering `Task`. */
export enum TasksOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Input for the nested mutation of `user` in the `TaskInput` mutation. */
export type TasksUserIdFkeyInput = {
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectById?: InputMaybe<UserUsersPkeyConnect>;
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateById?: InputMaybe<UserOnTaskForTasksUserIdFkeyUsingUsersPkeyUpdate>;
};

/** Input for the nested mutation of `task` in the `UserInput` mutation. */
export type TasksUserIdFkeyInverseInput = {
  /** The primary key(s) for `task` for the far side of the relationship. */
  connectById?: InputMaybe<Array<TaskTasksPkeyConnect>>;
  /** A `TaskInput` object that will be created and connected to this object. */
  create?: InputMaybe<Array<TasksUserIdFkeyTasksCreateInput>>;
  /** The primary key(s) for `task` for the far side of the relationship. */
  deleteById?: InputMaybe<Array<TaskTasksPkeyDelete>>;
  /** Flag indicating whether all other `task` records that match this relationship should be removed. */
  deleteOthers?: InputMaybe<Scalars['Boolean']>;
  /** The primary key(s) and patch data for `task` for the far side of the relationship. */
  updateById?: InputMaybe<Array<TaskOnTaskForTasksUserIdFkeyUsingTasksPkeyUpdate>>;
};

/** The `task` to be created by this mutation. */
export type TasksUserIdFkeyTasksCreateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  /** Unique identifier for the task. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Public-facing name of the task. */
  name: Scalars['String'];
  /** Status of the task. */
  status?: InputMaybe<TaskStatus>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  user?: InputMaybe<TasksUserIdFkeyInput>;
};

/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['UUID']>;
  /** Equal to the specified value. */
  eq?: InputMaybe<Scalars['UUID']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['UUID']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['UUID']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['UUID']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['UUID']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['UUID']>;
  /** Not equal to the specified value. */
  ne?: InputMaybe<Scalars['UUID']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['UUID']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['UUID']>>;
};

/** All input for the `updateTask` mutation. */
export type UpdateTaskInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** Unique identifier for the task. */
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Task` being updated. */
  patch: TaskPatch;
};

/** The output of our update `Task` mutation. */
export type UpdateTaskPayload = {
  __typename?: 'UpdateTaskPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query: Maybe<Query>;
  /** The `Task` that was updated by this mutation. */
  task: Maybe<Task>;
  /** An edge for our `Task`. May be used by Relay 1. */
  taskEdge: Maybe<TasksEdge>;
  /** Reads a single `User` that is related to this `Task`. */
  user: Maybe<User>;
};


/** The output of our update `Task` mutation. */
export type UpdateTaskPayloadTaskEdgeArgs = {
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** Unique identifier for the user. */
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query: Maybe<Query>;
  /** The `User` that was updated by this mutation. */
  user: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge: Maybe<UsersEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** A user who can log in to the application. */
export type User = {
  __typename?: 'User';
  createdAt: Scalars['Datetime'];
  hasPassword: Maybe<Scalars['Boolean']>;
  /** Unique identifier for the user. */
  id: Scalars['UUID'];
  /** If true, the user has elevated privileges. */
  isAdmin: Scalars['Boolean'];
  /** Public-facing name (or pseudonym) of the user. */
  name: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `Task`. */
  tasks: TasksConnection;
  updatedAt: Scalars['Datetime'];
  /** Reads and enables pagination through a set of `UserEmail`. */
  userEmails: UserEmailsConnection;
};


/** A user who can log in to the application. */
export type UserTasksArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<TaskCondition>;
  filter?: InputMaybe<TaskFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};


/** A user who can log in to the application. */
export type UserUserEmailsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<UserEmailCondition>;
  filter?: InputMaybe<UserEmailFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserEmailsOrderBy>>;
};

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
};

/** Information about a user's email address. */
export type UserEmail = {
  __typename?: 'UserEmail';
  createdAt: Scalars['Datetime'];
  /** The users email address, in `a@b.c` format. */
  email: Scalars['String'];
  id: Scalars['UUID'];
  isPrimary: Scalars['Boolean'];
  /** True if the user has is_verified their email address (by clicking the link in the email we sent them, or logging in with a social login provider), false otherwise. */
  isVerified: Scalars['Boolean'];
  updatedAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `UserEmail`. */
  user: Maybe<User>;
  userId: Scalars['UUID'];
};

/**
 * A condition to be used against `UserEmail` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type UserEmailCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `isPrimary` field. */
  isPrimary?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']>;
};

/** A filter to be used against `UserEmail` object types. All fields are combined with a logical ‘and.’ */
export type UserEmailFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UserEmailFilter>>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `isPrimary` field. */
  isPrimary?: InputMaybe<BooleanFilter>;
  /** Negates the expression. */
  not?: InputMaybe<UserEmailFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserEmailFilter>>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
};

/** An input for mutations affecting `UserEmail` */
export type UserEmailInput = {
  /** The users email address, in `a@b.c` format. */
  email: Scalars['String'];
  user?: InputMaybe<UserEmailsUserIdFkeyInput>;
  userId?: InputMaybe<Scalars['UUID']>;
};

/** The fields on `userEmail` to look up the row to update. */
export type UserEmailOnUserEmailForUserEmailsUserIdFkeyUsingUserEmailsPkeyUpdate = {
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `userEmail` being updated. */
  patch: UpdateUserEmailOnUserEmailForUserEmailsUserIdFkeyPatch;
};

/** The fields on `userEmail` to look up the row to connect. */
export type UserEmailUserEmailsPkeyConnect = {
  id: Scalars['UUID'];
};

/** The fields on `userEmail` to look up the row to delete. */
export type UserEmailUserEmailsPkeyDelete = {
  id: Scalars['UUID'];
};

/** A connection to a list of `UserEmail` values. */
export type UserEmailsConnection = {
  __typename?: 'UserEmailsConnection';
  /** A list of edges which contains the `UserEmail` and cursor to aid in pagination. */
  edges: Array<UserEmailsEdge>;
  /** A list of `UserEmail` objects. */
  nodes: Array<UserEmail>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserEmail` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserEmail` edge in the connection. */
export type UserEmailsEdge = {
  __typename?: 'UserEmailsEdge';
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']>;
  /** The `UserEmail` at the end of the edge. */
  node: UserEmail;
};

/** Methods to use when ordering `UserEmail`. */
export enum UserEmailsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsPrimaryAsc = 'IS_PRIMARY_ASC',
  IsPrimaryDesc = 'IS_PRIMARY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Input for the nested mutation of `user` in the `UserEmailInput` mutation. */
export type UserEmailsUserIdFkeyInput = {
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectById?: InputMaybe<UserUsersPkeyConnect>;
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateById?: InputMaybe<UserOnUserEmailForUserEmailsUserIdFkeyUsingUsersPkeyUpdate>;
};

/** Input for the nested mutation of `userEmail` in the `UserInput` mutation. */
export type UserEmailsUserIdFkeyInverseInput = {
  /** The primary key(s) for `userEmail` for the far side of the relationship. */
  connectById?: InputMaybe<Array<UserEmailUserEmailsPkeyConnect>>;
  /** The primary key(s) for `userEmail` for the far side of the relationship. */
  deleteById?: InputMaybe<Array<UserEmailUserEmailsPkeyDelete>>;
  /** Flag indicating whether all other `userEmail` records that match this relationship should be removed. */
  deleteOthers?: InputMaybe<Scalars['Boolean']>;
  /** The primary key(s) and patch data for `userEmail` for the far side of the relationship. */
  updateById?: InputMaybe<Array<UserEmailOnUserEmailForUserEmailsUserIdFkeyUsingUserEmailsPkeyUpdate>>;
};

/** A filter to be used against `User` object types. All fields are combined with a logical ‘and.’ */
export type UserFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UserFilter>>;
  /** Filter by the object’s `hasPassword` field. */
  hasPassword?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<UserFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserFilter>>;
  /** Filter by the object’s `tasks` relation. */
  tasks?: InputMaybe<UserToManyTaskFilter>;
  /** Some related `tasks` exist. */
  tasksExist?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `userEmails` relation. */
  userEmails?: InputMaybe<UserToManyUserEmailFilter>;
  /** Some related `userEmails` exist. */
  userEmailsExist?: InputMaybe<Scalars['Boolean']>;
};

/** The fields on `user` to look up the row to update. */
export type UserOnTaskForTasksUserIdFkeyUsingUsersPkeyUpdate = {
  /** Unique identifier for the user. */
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UpdateUserOnTaskForTasksUserIdFkeyPatch;
};

/** The fields on `user` to look up the row to update. */
export type UserOnUserEmailForUserEmailsUserIdFkeyUsingUsersPkeyUpdate = {
  /** Unique identifier for the user. */
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UpdateUserOnUserEmailForUserEmailsUserIdFkeyPatch;
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  /** Public-facing name (or pseudonym) of the user. */
  name?: InputMaybe<Scalars['String']>;
  tasks?: InputMaybe<TasksUserIdFkeyInverseInput>;
  userEmails?: InputMaybe<UserEmailsUserIdFkeyInverseInput>;
};

/** A filter to be used against many `Task` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyTaskFilter = {
  /** Every related `Task` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TaskFilter>;
  /** No related `Task` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TaskFilter>;
  /** Some related `Task` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TaskFilter>;
};

/** A filter to be used against many `UserEmail` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyUserEmailFilter = {
  /** Every related `UserEmail` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<UserEmailFilter>;
  /** No related `UserEmail` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<UserEmailFilter>;
  /** Some related `UserEmail` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<UserEmailFilter>;
};

/** The fields on `user` to look up the row to connect. */
export type UserUsersPkeyConnect = {
  /** Unique identifier for the user. */
  id: Scalars['UUID'];
};

/** A connection to a list of `User` values. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UsersEdge>;
  /** A list of `User` objects. */
  nodes: Array<User>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node: User;
};

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** An object where the defined keys will be set on the `task` being updated. */
export type UpdateTaskOnTaskForTasksUserIdFkeyPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  /** Unique identifier for the task. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Public-facing name of the task. */
  name?: InputMaybe<Scalars['String']>;
  /** Status of the task. */
  status?: InputMaybe<TaskStatus>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  user?: InputMaybe<TasksUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `userEmail` being updated. */
export type UpdateUserEmailOnUserEmailForUserEmailsUserIdFkeyPatch = {
  user?: InputMaybe<UserEmailsUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `user` being updated. */
export type UpdateUserOnTaskForTasksUserIdFkeyPatch = {
  /** Public-facing name (or pseudonym) of the user. */
  name?: InputMaybe<Scalars['String']>;
  tasks?: InputMaybe<TasksUserIdFkeyInverseInput>;
  userEmails?: InputMaybe<UserEmailsUserIdFkeyInverseInput>;
};

/** An object where the defined keys will be set on the `user` being updated. */
export type UpdateUserOnUserEmailForUserEmailsUserIdFkeyPatch = {
  /** Public-facing name (or pseudonym) of the user. */
  name?: InputMaybe<Scalars['String']>;
  tasks?: InputMaybe<TasksUserIdFkeyInverseInput>;
  userEmails?: InputMaybe<UserEmailsUserIdFkeyInverseInput>;
};

export type LayoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LayoutQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: any, name: string | null, isAdmin: boolean, userEmails: { __typename?: 'UserEmailsConnection', nodes: Array<{ __typename?: 'UserEmail', id: any, email: string }> } } | null };

export type Layout_QueryFragment = { __typename?: 'Query', currentUser: { __typename?: 'User', id: any, name: string | null, isAdmin: boolean, userEmails: { __typename?: 'UserEmailsConnection', nodes: Array<{ __typename?: 'UserEmail', id: any, email: string }> } } | null };

export type Layout_UserFragment = { __typename?: 'User', id: any, name: string | null, isAdmin: boolean, userEmails: { __typename?: 'UserEmailsConnection', nodes: Array<{ __typename?: 'UserEmail', id: any, email: string }> } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginPayload', accessToken: string | null, refreshToken: string | null, user: { __typename?: 'User', id: any, name: string | null, isAdmin: boolean, userEmails: { __typename?: 'UserEmailsConnection', nodes: Array<{ __typename?: 'UserEmail', id: any, email: string }> } } } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutPayload', success: boolean | null } | null };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'RefreshTokenPayload', accessToken: string | null, refreshToken: string | null } | null };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterPayload', accessToken: string | null, refreshToken: string | null } | null };

export type TaskQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type TaskQuery = { __typename?: 'Query', task: { __typename?: 'Task', id: any, name: string, description: string | null, status: TaskStatus, userId: any, user: { __typename?: 'User', id: any, name: string | null } | null } | null };

export type CreateTaskMutationVariables = Exact<{
  task: TaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'CreateTaskPayload', task: { __typename?: 'Task', id: any, name: string, description: string | null, status: TaskStatus, userId: any, user: { __typename?: 'User', id: any, name: string | null } | null } | null } | null };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: { __typename?: 'DeleteTaskPayload', deletedTaskNodeId: string | null } | null };

export type Detail_TaskFragment = { __typename?: 'Task', id: any, name: string, description: string | null, status: TaskStatus, userId: any, user: { __typename?: 'User', id: any, name: string | null } | null };

export type Lite_UserFragment = { __typename?: 'User', id: any, name: string | null };

export type TasksQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  keyword?: InputMaybe<Scalars['String']>;
}>;


export type TasksQuery = { __typename?: 'Query', tasks: { __typename?: 'TasksConnection', nodes: Array<{ __typename?: 'Task', id: any, name: string, description: string | null, status: TaskStatus, userId: any, user: { __typename?: 'User', id: any, name: string | null } | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } | null };

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['UUID'];
  task: TaskPatch;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'UpdateTaskPayload', task: { __typename?: 'Task', id: any, name: string, description: string | null, status: TaskStatus, userId: any, user: { __typename?: 'User', id: any, name: string | null } | null } | null } | null };

export type UserOptionsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['UUID']>;
  term?: InputMaybe<Scalars['String']>;
}>;


export type UserOptionsQuery = { __typename?: 'Query', users: { __typename?: 'UsersConnection', nodes: Array<{ __typename?: 'User', id: any, name: string | null }>, pageInfo: { __typename?: 'PageInfo', endCursor: any | null, startCursor: any | null, hasNextPage: boolean, hasPreviousPage: boolean } } | null };

export const Layout_UserFragmentDoc = gql`
    fragment Layout_User on User {
  id
  name
  isAdmin
  userEmails {
    nodes {
      id
      email
    }
  }
}
    `;
export const Layout_QueryFragmentDoc = gql`
    fragment Layout_Query on Query {
  currentUser {
    id
    ...Layout_User
  }
}
    ${Layout_UserFragmentDoc}`;
export const Detail_TaskFragmentDoc = gql`
    fragment Detail_Task on Task {
  id
  name
  description
  status
  userId
  user {
    id
    name
  }
}
    `;
export const Lite_UserFragmentDoc = gql`
    fragment Lite_User on User {
  id
  name
}
    `;
export const LayoutDocument = gql`
    query Layout {
  ...Layout_Query
}
    ${Layout_QueryFragmentDoc}`;

/**
 * __useLayoutQuery__
 *
 * To run a query within a React component, call `useLayoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLayoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLayoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLayoutQuery(baseOptions?: Apollo.QueryHookOptions<LayoutQuery, LayoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LayoutQuery, LayoutQueryVariables>(LayoutDocument, options);
      }
export function useLayoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LayoutQuery, LayoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LayoutQuery, LayoutQueryVariables>(LayoutDocument, options);
        }
export type LayoutQueryHookResult = ReturnType<typeof useLayoutQuery>;
export type LayoutLazyQueryHookResult = ReturnType<typeof useLayoutLazyQuery>;
export type LayoutQueryResult = Apollo.QueryResult<LayoutQuery, LayoutQueryVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    user {
      id
      ...Layout_User
    }
    accessToken
    refreshToken
  }
}
    ${Layout_UserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken {
  refreshToken {
    accessToken
    refreshToken
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    accessToken
    refreshToken
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const TaskDocument = gql`
    query Task($id: UUID!) {
  task(id: $id) {
    id
    ...Detail_Task
  }
}
    ${Detail_TaskFragmentDoc}`;

/**
 * __useTaskQuery__
 *
 * To run a query within a React component, call `useTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTaskQuery(baseOptions: Apollo.QueryHookOptions<TaskQuery, TaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TaskQuery, TaskQueryVariables>(TaskDocument, options);
      }
export function useTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TaskQuery, TaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TaskQuery, TaskQueryVariables>(TaskDocument, options);
        }
export type TaskQueryHookResult = ReturnType<typeof useTaskQuery>;
export type TaskLazyQueryHookResult = ReturnType<typeof useTaskLazyQuery>;
export type TaskQueryResult = Apollo.QueryResult<TaskQuery, TaskQueryVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($task: TaskInput!) {
  createTask(input: {task: $task}) {
    task {
      ...Detail_Task
    }
  }
}
    ${Detail_TaskFragmentDoc}`;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      task: // value for 'task'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: UUID!) {
  deleteTask(input: {id: $id}) {
    deletedTaskNodeId
  }
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const TasksDocument = gql`
    query Tasks($offset: Int, $first: Int, $keyword: String) {
  tasks(
    offset: $offset
    first: $first
    filter: {name: {includesInsensitive: $keyword}}
    orderBy: NAME_ASC
  ) {
    nodes {
      ...Detail_Task
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
    ${Detail_TaskFragmentDoc}`;

/**
 * __useTasksQuery__
 *
 * To run a query within a React component, call `useTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      first: // value for 'first'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useTasksQuery(baseOptions?: Apollo.QueryHookOptions<TasksQuery, TasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TasksQuery, TasksQueryVariables>(TasksDocument, options);
      }
export function useTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TasksQuery, TasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TasksQuery, TasksQueryVariables>(TasksDocument, options);
        }
export type TasksQueryHookResult = ReturnType<typeof useTasksQuery>;
export type TasksLazyQueryHookResult = ReturnType<typeof useTasksLazyQuery>;
export type TasksQueryResult = Apollo.QueryResult<TasksQuery, TasksQueryVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($id: UUID!, $task: TaskPatch!) {
  updateTask(input: {id: $id, patch: $task}) {
    task {
      ...Detail_Task
    }
  }
}
    ${Detail_TaskFragmentDoc}`;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      task: // value for 'task'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const UserOptionsDocument = gql`
    query UserOptions($first: Int, $userId: UUID, $term: String) {
  users(
    first: $first
    filter: {id: {ne: $userId}, name: {includesInsensitive: $term}}
  ) {
    nodes {
      id
      ...Lite_User
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
    ${Lite_UserFragmentDoc}`;

/**
 * __useUserOptionsQuery__
 *
 * To run a query within a React component, call `useUserOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserOptionsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      userId: // value for 'userId'
 *      term: // value for 'term'
 *   },
 * });
 */
export function useUserOptionsQuery(baseOptions?: Apollo.QueryHookOptions<UserOptionsQuery, UserOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserOptionsQuery, UserOptionsQueryVariables>(UserOptionsDocument, options);
      }
export function useUserOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserOptionsQuery, UserOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserOptionsQuery, UserOptionsQueryVariables>(UserOptionsDocument, options);
        }
export type UserOptionsQueryHookResult = ReturnType<typeof useUserOptionsQuery>;
export type UserOptionsLazyQueryHookResult = ReturnType<typeof useUserOptionsLazyQuery>;
export type UserOptionsQueryResult = Apollo.QueryResult<UserOptionsQuery, UserOptionsQueryVariables>;