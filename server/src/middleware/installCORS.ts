import type { Express } from "express";
import cors from "cors";

const installCORS = (app: Express) => {
  app.use(
    cors({
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: true,
      optionsSuccessStatus: 200,
    })
  );
};

export default installCORS;
