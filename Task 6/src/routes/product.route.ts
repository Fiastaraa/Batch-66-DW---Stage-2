import { Router } from "express";
import { getProducts, deleteProduct } from "../controllers/product.controller";
import { authenticationMiddleware, authorizationMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/products", getProducts);
router.delete("/products/:id", authenticationMiddleware, authorizationMiddleware(["ADMIN"]), deleteProduct);

export default router;
