import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { transferSchema } from "../validations/transfer.schema";
import { AppError } from "../utils/appError";

const prisma = new PrismaClient();

export async function transferPoints(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const parsed = transferSchema.safeParse(req.body);
    if (!parsed.success) {
      next(new AppError(400, "Validation error", parsed.error.flatten()));
      return;
    }

    const { senderId, receiverId, amount } = parsed.data;

    if (senderId === receiverId) {
      next(new AppError(400, "Sender cannot transfer to himself"));
      return;
    }

    await prisma.$transaction(async (tx) => {
      const [sender, receiver] = await Promise.all([
        tx.user.findUnique({
          where: { id: senderId },
          select: { id: true, points: true },
        }),
        tx.user.findUnique({
          where: { id: receiverId },
          select: { id: true },
        }),
      ]);

      if (!sender) {
        throw new AppError(400, "Sender not found");
      }
      if (!receiver) {
        throw new AppError(400, "Receiver not found");
      }

      if (sender.points < amount) {
        throw new AppError(400, "Sender has insufficient points");
      }

      await tx.user.update({
        where: { id: senderId },
        data: { points: { decrement: amount } },
      });

      await tx.user.update({
        where: { id: receiverId },
        data: { points: { increment: amount } },
      });
    });

    res.status(200).json({
      message: "Transfer success",
    });
  } catch (err) {
    next(err);
  }
}

