import { Request, Response, NextFunction } from "express";
import HttpError from "../utils/HttpError";

export default errorMiddleware;

function errorMiddleware(
  { name, message, code }: HttpError,
  _: Request,
  res: Response,
  __: NextFunction
): void {
  res.status(code).send({ error: { name, message, code } });
}
