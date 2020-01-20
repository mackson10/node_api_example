import { RequestHandler, Router } from "express";
import authMiddleware from "./auth";
import ClientError from "../utils/ClientError";
import User from "../application/models/User";

const verifyAdmin: RequestHandler = function(req, res, next) {
  const user: User = res.locals.user;

  if (user.isAdmin) {
    return next();
  }
  next(
    new ClientError({
      httpCode: 403,
      message: "You must be an admin to access this resource"
    })
  );
};

const adminMiddleware = Router().use([authMiddleware], verifyAdmin);

export default adminMiddleware;
