import ClientError from "./ClientError";

export default class AppError extends ClientError {
  public logMessage: string;

  constructor({
    logMessage,
    message,
    httpCode = 500,
    messageId,
    name
  }: {
    logMessage: string;
    message?: string;
    httpCode?: number;
    messageId?: number;
    name?: string;
  }) {
    super({ message, httpCode, messageId, name });

    this.logMessage = logMessage;

    console.error(logMessage);
  }
}
