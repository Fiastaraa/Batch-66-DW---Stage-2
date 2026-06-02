import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email } = req.body as { name: string; email: string };

    if (!name || !email) {
      res.status(400).json({
        message: "name and email are required",
      });
      return;
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.status(201).json({
      message: "Success create user",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      include: {
        products: true,
      },
    });

    res.status(200).json({
      message: "Success get users",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

