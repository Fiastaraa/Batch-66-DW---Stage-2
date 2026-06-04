import { z } from "zod";

export const transferSchema = z.object({
  senderId: z
    .number({ required_error: "senderId is required" })
    .int("senderId must be an integer"),
  receiverId: z
    .number({ required_error: "receiverId is required" })
    .int("receiverId must be an integer"),
  amount: z
    .number({ required_error: "amount is required" })
    .positive("amount must be greater than 0"),
});

export type TransferBody = z.infer<typeof transferSchema>;

