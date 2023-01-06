import express from "express";
import { getProducts, createProduct, deleteProducts, getProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
const router = express.Router();

router
    .route("/")
    .get(getProducts)
    .post(createProduct)
    .delete(deleteProducts)

router
    .route("/:ID")
    .get(getProduct)
    .patch(updateProduct)
    .delete(deleteProduct)


export default router;