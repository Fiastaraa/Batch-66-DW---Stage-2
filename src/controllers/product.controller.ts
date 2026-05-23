import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await prisma.product.findMany();

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