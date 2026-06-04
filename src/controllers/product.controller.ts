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

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      message: "Success get product",
      data: product,
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
    const { name, price, stock, category } = req.body;

    if (!name || price === undefined || stock === undefined) {
      res.status(400).json({
        message: "Name, price, and stock are required",
      });
      return;
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        stock: Number(stock),
        category: category || null,
      },
    });

    res.status(201).json({
      message: "Success create product",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;

    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) }
    });

    if (!existingProduct) {
      res.status(404).json({
        message: "Product not found",
      });
      return;
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name !== undefined ? name : existingProduct.name,
        price: price !== undefined ? Number(price) : existingProduct.price,
        stock: stock !== undefined ? Number(stock) : existingProduct.stock,
        category: category !== undefined ? category : existingProduct.category,
      },
    });

    res.status(200).json({
      message: "Success update product",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) }
    });

    if (!existingProduct) {
      res.status(404).json({
        message: "Product not found",
      });
      return;
    }

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Success delete product",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};