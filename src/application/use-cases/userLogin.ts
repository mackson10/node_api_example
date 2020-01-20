import { Result } from "../../utils/types";
import User from "../models/User";
import ClientError from "../../utils/ClientError";
import encryption from "../../services/encryption";

export default async function userLogin(
  username: string,
  password: string,
  { expiresIn }: LoginOptions = {}
): Promise<Result<string>> {
  const findResult = await User.findByUsername(username);
  if (findResult.error) return findResult;

  const user = findResult.data;
  if (!user || !user.authenticate(password))
    return { error: new ClientError({ message: "Invalid Credentials" }) };

  const token = encryption.encodeObj({
    auth: { userId: user.id, createdAt: Date.now(), expiresIn }
  })!;

  return { data: token };
}

interface LoginOptions {
  expiresIn?: number;
}
