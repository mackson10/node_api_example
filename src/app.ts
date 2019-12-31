import express, { Request, Response } from "express";

export default createApp();

function createApp(): express.Application {
  const app = express();
  const rootRouter = express.Router();

  rootRouter.use("/", function(_, res) {
    res.send("Welcome!");
  });

  rootRouter.use(function(_, __, next) {
    next(new Error("Not Found"));
  });

  rootRouter.use(function(error: Error, _: Request, res: Response): void {
    res.send({ message: error.message });
  });

  app.use("/", rootRouter);

  return app;
}
