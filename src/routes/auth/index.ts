import express, { RequestHandler } from "express";
import encryption from "../../services/encryption";
import authMiddleware from "../../middlewares/auth";
import ClientError from "../../utils/ClientError";
import User from "../../application/models/User";
import userLogin from "../../application/use-cases/userLogin";

export default createRoute();

function createRoute(): express.Router {
  const authRoute = express.Router();

  authRoute.get("/", [authMiddleware], function(req, res, next) {
    res.send(res.locals.user);
  } as RequestHandler);

  authRoute.post("/", async function(req, res, next) {
    const { username, password } = req.body;

    if (
      !typeof username ||
      username === "" ||
      !typeof password ||
      password === ""
    ) {
      return next(new ClientError({ httpCode: 400 }));
    }

    const loginResult = await userLogin(username, password, {
      expiresIn: 1000 * 60 * 60 * 24 * 5 // 5 days
    });
    if (loginResult.error) return next(loginResult.error);

    res.send({ token: loginResult.data });
  } as RequestHandler);

  authRoute.post("/app", async function(req, res, next) {
    const { username, password } = req.body;

    if (
      !typeof username ||
      username === "" ||
      !typeof password ||
      password === ""
    ) {
      return next(new ClientError({ httpCode: 400 }));
    }

    const expiresIn = 1000 * 60 * 60 * 5; // 5 days
    const loginResult = await userLogin(username, password, { expiresIn });

    if (loginResult.error) return next(loginResult.error);
    const token = loginResult.data;
    const halfTokenLength = Math.floor(token.length / 2);
    const tokenFragments = [
      token.slice(0, halfTokenLength),
      token.slice(halfTokenLength)
    ];

    res
      .cookie("token", tokenFragments[1], {
        maxAge: expiresIn,
        httpOnly: true,
        secure: true
      })
      .send({ token: tokenFragments[0] });
  } as RequestHandler);

  return authRoute;
}
