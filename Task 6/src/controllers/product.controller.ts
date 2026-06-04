import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/appError";

const prisma = new PrismaClient();

const parseNumber = (value: unknown): number | undefined => {
  if (value === undefined || value === null) return undefined;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
};

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { minPrice, sortBy, order, take, skip } = req.query;

    const where: Record<string, any> = {};

    const minPriceNum = parseNumber(minPrice);
    if (minPriceNum !== undefined) {
      where.price = { gte: minPriceNum };
    }

    const takeNum = parseNumber(take);
    const skipNum = parseNumber(skip);

    const allowedSortFields: Record<string, true> = {
      price: true,
      stock: true,
      createdAt: true,
      id: true,
      name: true,
    };

    const sortField = typeof sortBy === "string" ? sortBy : undefined;
    const isAllowedSortField = sortField && allowedSortFields[sortField];

    const orderValue =
      typeof order === "string" && order.toLowerCase() === "desc"
        ? "desc"
        : "asc";

    const products = await prisma.product.findMany({
      where,
      take: takeNum,
      skip: skipNum,
      orderBy: isAllowedSortField ? { [sortField as string]: orderValue } : undefined,
    });

    res.status(200).json({
      message: "Success get products",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      next(new AppError(400, "Invalid product id"));
      return;
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      next(new AppError(404, "Product not found"));
      return;
    }

    await prisma.product.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Success delete product",
    });
  } catch (error) {
    next(error);
  }
};


