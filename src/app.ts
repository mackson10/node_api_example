import express, { NextFunction } from "express";
import errorMiddleware from "./middlewares/errorMiddleware";
import HttpError from "./utils/HttpError";
export default createApp();

function createApp(): express.Application {
  const app = express();

  app.use(express.json());
  app.use(express.text());

  const rootRouter = express.Router();

  app.use("/", rootRouter);

  rootRouter.all("/", function(req, res) {
    res.send("Welcome!");
  });

  rootRouter.use("*", function(_, __, next: NextFunction) {
    next(new HttpError(404));
  });

  rootRouter.use(errorMiddleware);

  return app;
}
