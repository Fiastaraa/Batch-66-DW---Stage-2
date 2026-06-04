import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/appError";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      next(new AppError(400, "name, email, and password are required"));
      return;
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      next(new AppError(400, "Email already exists"));
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Profile picture path
    let profilePicture: string | undefined = undefined;
    if (req.file) {
      // Store relative path from public folder
      profilePicture = `/uploads/${req.file.filename}`;
    }

    // Save to database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "USER",
        profilePicture,
      },
    });

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      message: "Register success",
      data: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      next(new AppError(400, "email and password are required"));
      return;
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      next(new AppError(401, "Invalid email or password"));
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      next(new AppError(401, "Invalid email or password"));
      return;
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login success",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      next(new AppError(401, "Unauthorized"));
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        products: true,
      },
    });

    if (!user) {
      next(new AppError(404, "User not found"));
      return;
    }

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: "Get profile success",
      data: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};
