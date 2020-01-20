import ClientError from "./ClientError";

export type Result<T> = XOR<
  {
    data: T;
  },
  { error: ClientError }
>;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;
