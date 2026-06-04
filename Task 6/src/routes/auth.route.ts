import { Router } from "express";
import { register, login, getProfile } from "../controllers/auth.controller";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

// Register with profile picture upload
router.post("/register", upload.single("profilePicture"), register);

// Login
router.post("/login", login);

// Get Profile (requires authentication)
router.get("/profile", authenticationMiddleware, getProfile);

export default router;
