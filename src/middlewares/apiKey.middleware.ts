import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";

type ApiKeyHeader = "x-api-key" | "x-api_key" | "apikey" | "api-key";

function getApiKey(req: Request): string | undefined {
  const headers = req.headers;
  const possibleHeaders: ApiKeyHeader[] = ["x-api-key", "x-api_key", "apikey", "api-key"];
  for (const key of possibleHeaders) {
    const value = headers[key];
    if (typeof value === "string" && value.trim() !== "") return value;
  }
  return undefined;
}

export function apiKeyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const apiKey = getApiKey(req);
  const expected = process.env.API_KEY;

  // If API_KEY env not set, do not block (dev convenience)
  if (!expected) {
    next();
    return;
  }


  if (!apiKey || apiKey !== expected) {
    next(new AppError(401, "Invalid API key"));
    return;
  }

  next();
}

