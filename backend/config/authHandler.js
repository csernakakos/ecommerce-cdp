import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";


const protectWithToken = asyncHandler(async(req, res, next) => {
    console.log("protectWithToken()")
    // Initialize token
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.payload).select("-password");


            const currentUser = req.user._id.toString();
            const requestedUser = req.params.ID;
            console.log(currentUser, requestedUser);
            if (currentUser === requestedUser) {
                console.log("User is requesting their own user profile.")
                next();
            } else {
                throw new Error("You're not authorized to access this information.");
            }
        }
        catch (error) {
            throw new Error("You're not authorized to access this information.");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("No token.");
    }
});

export default protectWithToken;