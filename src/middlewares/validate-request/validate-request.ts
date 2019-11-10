import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, getStatusText } from "http-status-codes";

export const validateRequestMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    next();
  } catch (error) {
    res.status(BAD_REQUEST).json({
      status: getStatusText(BAD_REQUEST),
      error: error.details.map(validationError => validationError.message)
    });
  }
};
