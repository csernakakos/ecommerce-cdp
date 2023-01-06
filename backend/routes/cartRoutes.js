import express from "express";
import { postCart, getCart, getCarts, patchCart, deleteCart, deleteStaleCarts, deleteRemovedCartItemsArray, createCartItem, updateCartItemQuantity, removeCartItem } from "../controllers/cartController.js";
const router = express.Router();

router
    .route("/")
    .get(getCarts)
    .post(postCart)
    .delete(deleteStaleCarts)

router
    .route("/:ID")
    .get(getCart)
    .patch(patchCart)
    .delete(deleteCart)
    .put(deleteRemovedCartItemsArray)

router.post("/:ID/cartItems", decideNextMiddleware);

// For every POST request from frontend to backend, decide which backend middleware to run:
function decideNextMiddleware(req, res, next) {
    if (req.body.request === "create") return createCartItem(req,res,next);
    if (req.body.request === "updateQuantity") return updateCartItemQuantity(req, res, next);
    if (req.body.request === "remove") return removeCartItem(req, res, next);
}

export default router;