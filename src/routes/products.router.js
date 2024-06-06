import { Router } from "express";
import productsController from "../controller/products.controller.js";

const router = Router();

router.get("/", productsController.searchProducts);
router.get("/:pid", productsController.searchProduct);
router.post("/", productsController.createProduct);
router.put("/:pid", productsController.modifyProduct);
router.delete("/:pid", productsController.deleteProduct);
router.use("*", (req, res) =>
	res.status(404).json({ error: "Ruta no encontrada" })
);

export default router;
