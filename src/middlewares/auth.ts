import { RequestHandler } from "express";
import crypto from "../services/encryption";
import ClientError from "../utils/ClientError";
import User from "../application/models/User";

const authMiddleware: RequestHandler = async function(req, res, next) {
  const { headers, cookies } = req;

  const tokenFrags = [headers["x-auth-token"], cookies ? cookies["token"] : ""];
  if (!tokenFrags[0] && !tokenFrags[1])
    return next(new ClientError({ httpCode: 401 }));

  const token = tokenFrags.join("");
  const tokenPayload = crypto.decodeObj(token) as {
    auth: {
      userId: number;
      createdAt: number;
      expiresIn: number;
    };
  } | null;

  if (!tokenPayload || !tokenPayload.auth) {
    return next(new ClientError({ httpCode: 401, message: "Invalid Token" }));
  }

  const { userId, createdAt, expiresIn } = tokenPayload.auth;

  if (createdAt + expiresIn < Date.now()) {
    return next(new ClientError({ httpCode: 401, message: "Expired Token" }));
  }

  const findResult = await User.findById(userId);
  if (findResult.error) return next(findResult.error);

  const user = findResult.data;
  if (!user)
    return next(new ClientError({ httpCode: 401, message: "User deleted" }));

  res.locals.user = user;

  return next();
};

export default authMiddleware;
