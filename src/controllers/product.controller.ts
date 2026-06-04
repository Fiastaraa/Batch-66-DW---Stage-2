import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { minPrice, category, userId, sortBy, order, take, skip } = req.query;

    const where: any = {};

    if (minPrice) {
      where.price = {
        gte: Number(minPrice),
      };
    }

    if (category) {
      where.category = String(category);
    }

    if (userId) {
      where.userId = Number(userId);
    }

    // Sorting
    const orderBy: any = {};
    if (sortBy) {
      const allowedFields = ["price", "name", "stock", "createdAt"];
      if (allowedFields.includes(String(sortBy))) {
        orderBy[String(sortBy)] = order === "asc" ? "asc" : "desc";
      }
    } else {
      orderBy.createdAt = "desc";
    }

    // Query configuration
    const prismaQuery: any = {
      where,
      orderBy,
      include: {
        user: true, // Menampilkan data user terkait
      },
    };

    // Pagination
    if (take) {
      prismaQuery.take = Number(take);
    }
    if (skip) {
      prismaQuery.skip = Number(skip);
    }

    const products = await prisma.product.findMany(prismaQuery);

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

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, price, stock, category, userId } = req.body;

    if (!name || price === undefined || stock === undefined || !userId) {
      res.status(400).json({
        message: "Name, price, stock, and userId are required",
      });
      return;
    }

    // Periksa apakah user dengan userId tersebut ada
    const userExists = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!userExists) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        stock: Number(stock),
        category: category || null,
        userId: Number(userId),
      },
    });

    res.status(201).json({
      message: "Success create product",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};