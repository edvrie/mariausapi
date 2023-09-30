import { NextFunction, Request, Response, Errback } from "express";
import errorMessages from "./errorMessages";

//---------------
// Helper class to define error codes
//---------------

class RequestError {
  code: number;
  message: String;
  constructor(code: number, message: String) {
    this.code = code;
    this.message = message;
  }

  static BadRequest(msg: String) {
    return new RequestError(400, msg);
  }

  static InternalError(msg: String) {
    return new RequestError(500, msg);
  }

  static NotFound(msg: String) {
    return new RequestError(404, msg);
  }

  static Timeout(msg: String) {
    return new RequestError(408, msg);
  }
}

//---------------
// Handle invalid request bodies
// Just checks if the attached JSON payload has any syntax errors
//---------------

const invalidPayloadHandler = (
  err: Errback,
  req: never,
  res: never,
  next: NextFunction
) => {
  if (err instanceof SyntaxError) {
    next(RequestError.BadRequest(errorMessages.invalidPayload));
    return;
  }

  next();
};

const errorHandler = (
  err: Errback,
  req: never,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestError) {
    res.status(err.code).json(err);
    return;
  }

  res.status(500).json({ code: 500, message: errorMessages.internal });
};

export { RequestError, invalidPayloadHandler, errorHandler };
