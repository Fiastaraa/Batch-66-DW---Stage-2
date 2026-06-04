import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/appError";

export function errorHandlerMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (res.headersSent) {
    next(err);
    return;
  }

  // AppError (custom)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
    return;
  }

  // Prisma known errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(400).json({
      message: "Database error",
      details: {
        code: err.code,
        message: err.message,
      },
    });
    return;
  }

  // Generic / unknown errors
  res.status(500).json({
    message: "Internal server error",
  });
}

