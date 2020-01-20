import { ErrorRequestHandler } from "express";
import ClientError from "../utils/ClientError";

const errorMiddleware: ErrorRequestHandler = function(
  { name, message, httpCode, messageId }: ClientError,
  _,
  res,
  __
): void {
  res.status(httpCode).send({ error: { name, messageId, message, httpCode } });
};

export default errorMiddleware;
