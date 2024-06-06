import { Router } from "express";

const router = Router();

router.post("/");
router.get("/:cid");
router.delete("/:cid/product/:pid");

export default router;