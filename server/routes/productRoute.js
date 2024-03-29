import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct
} from "../controllers/productControllers.js";

const router = express.Router();
router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
