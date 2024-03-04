import type { Express } from "express";
import { Pool } from "pg";

import { getShutdownActions } from "../app";

function swallowPoolError(_error: Error) {
  /* noop */
}

export function getRootPgPool(app: Express): Pool {
  return app.get("rootPgPool");
}
export function getAuthPgPool(app: Express): Pool {
  return app.get("authPgPool");
}

const installDatabase = (app: Express) => {
  // This pool runs as the database owner, so it can do anything.

  const rootPgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  rootPgPool.on("error", swallowPoolError);
  app.set("rootPgPool", rootPgPool);

  // This pool runs as the unprivileged user, it's what PostGraphile uses.
  const authPgPool = new Pool({
    connectionString: process.env.AUTH_DATABASE_URL,
  });

  authPgPool.on("error", swallowPoolError);
  app.set("authPgPool", authPgPool);

  const shutdownActions = getShutdownActions(app);
  shutdownActions.push(() => {
    rootPgPool.end();
  });

  shutdownActions.push(() => {
    authPgPool.end();
  });
};
export default installDatabase;
