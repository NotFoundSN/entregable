import { Router } from "express";
import productRouter from "./products.router.js";
import cartRouter from "./carts.router.js";

const router = Router();

router.use("/api/products", productRouter);
router.use("/api/carts", cartRouter);

export default router;