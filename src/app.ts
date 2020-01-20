import express, { RequestHandler } from "express";
import errorMiddleware from "./middlewares/error";
import authMiddleware from "./middlewares/auth";
import adminMiddleware from "./middlewares/admin";
import authRoute from "./routes/auth";
import cors from "cors";
import ClientError from "./utils/ClientError";

export default createApp();

function createApp(): express.Application {
  const app = express();

  app.use(express.json());
  app.use(express.text());
  app.use(cors());

  const rootRouter = express.Router();

  app.use("/", rootRouter);

  rootRouter.use("/auth", authRoute);

  rootRouter.all("/", function(req, res) {
    res.send("Welcome!");
  });

  rootRouter.get("/secure", [authMiddleware], function(req, res, next) {
    res.send({ message: "Secure Route" });
  } as RequestHandler);

  rootRouter.get("/admin", [adminMiddleware], function(req, res, next) {
    res.send({ message: "Admin Route" });
  } as RequestHandler);

  rootRouter.use("*", function(_, __, next) {
    next(new ClientError({ httpCode: 404 }));
  });

  rootRouter.use(errorMiddleware);

  return app;
}
