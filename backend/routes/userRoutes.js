import express from "express";
import protectWithToken from "../config/authHandler.js";
import { getUsers, postSignUp, postLogIn, postLogOut, getUser, patchUser, deleteUser, getUserCarts } from "../controllers/userController.js";
const router = express.Router();

router
    .route("/signup")
    .post(postSignUp)

router
    .route("/login")
    .post(postLogIn)

router
    .route("/logout")
    .post(postLogOut)

router
    .route("/")
    .get(getUsers)

router
    .route("/:ID")
    .get(protectWithToken, getUser)
    .patch(protectWithToken, patchUser)
    .delete(protectWithToken, deleteUser)

router
    .route("/:ID/carts")
    .get(protectWithToken, getUserCarts)

export default router;