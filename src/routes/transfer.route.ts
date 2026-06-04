import { Router } from "express";
import { transferPoints } from "../controllers/transfer.controller";

const router = Router();

router.post("/transfer", transferPoints);

export default router;

