import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import asyncHandler from "express-async-handler";
import logToConsole from "../config/logToConsole.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Start JWT
function signToken(payload) {
    return jwt.sign(
        {payload},
        process.env.JWT_SECRET,
        {expiresIn: "1d"},
    )
}
// End JWT


// @desc    Sign up
// @route   POST /api/v1/users/signup
// @access  Public
// @status  DONE
export const postSignUp = asyncHandler(async(req, res) => {
    logToConsole("postSignUp()");

    // Throw error if required information is missing
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400);
        throw {
            errorCode: "SIGNUP-400-01",
            message: "Enter a username, an email address, and a password.",
        };
    }

    // Get data from body
    const { username, email, password, deliveryAddress, phoneNumber, purchaseHistory } = req.body;

    // Throw error if email already exists
    let existingUser = await User.findOne({email});
    if (existingUser) {
        res.status(400);
        throw {
            errorCode: "SIGNUP-400-02",
            message: "This email address is already in use.",
        };
    };

    // Generate salt and hashedPassword    
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user and save it to database
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        deliveryAddress,
        phoneNumber,
        purchaseHistory,
    });

    // Create cookie
    req.session.userID = user._id;

    res.status(201).json({
        status: "success",
        signedUp: true,
        data: {
            user,
            token: signToken(user._id),
        }
    });
});


// @desc    Authenticate and log in user
// @route   POST /api/v1/users/login
// @access  Public
// @status  DONE
export const postLogIn = asyncHandler(async(req, res) => {
    logToConsole("postLogIn()");
    // Throw error if required information is missing
    if (!req.body.email || !req.body.password) {
        res.status(400);
        throw {
            errorCode: "LOGIN-400-01",
            message: "Enter your email address and password.",
        };
    }

    // Get data from body
    const { email, password } = req.body;

    // Find user in database
    const existingUser = await User.findOne({email}).select("+password");

    // If passwords match, then log user in
    if (existingUser && await bcrypt.compare(password, existingUser.password)) {

        req.session.userID = existingUser._id;

        
        res.status(200).json({
            status: "success",
            loggedIn: true,
            data: {
                user: existingUser,
                token: signToken(existingUser._id),
            }
        })
    } else {
        res.status(404);
        throw {
            errorCode: "LOGIN-404-01",
            message: "User doesn't exist or wrong credentials.",
        };
    }
});

// @desc    Log user out of app
// @route   POST /api/v1/users/logout
// @access  Public
// @status  DONE
export const postLogOut = asyncHandler(async(req, res) => {
    // Empty req.session, including req.session.userID
    req.session = null;

    res.status(200).json({
        status: "success",
        cookiesDeleted: !req.session,
        message: "User successfully logged out.",
    })
});

// @desc    Get all user profiles
// @route   GET /api/v1/users
// @access  Private
// @status  DONE
export const getUsers = asyncHandler(async(req, res) => {
    logToConsole("getUsers()");

    if (!req.body.masterKey || req.body.masterKey !== process.env.MASTER_KEY) {
        res.status(404);
        throw new Error("You need the master key to access this information.");
    } else {
        const users = await User.find();
    
        res.status(200).json({
            status: "success",
            count: users.length,
            data: {
                users
            }
        })
    }
});

// @desc    Get user profile
// @route   GET /api/v1/users/:ID
// @access  Private
// @status  DONE
export const getUser = asyncHandler(async(req, res) => {
    const { ID } = req.params;

    // Find user in database
    const existingUser = await User.findById(ID);

    if (!existingUser) {
        res.status(404);
        throw new Error("No such user.");
    } else {
        res.status(200).json({
            status: "success",
            data: {
                user: existingUser
            }
        })
    }
});

// @desc    Update user
// @route   PATCH /api/v1/users/:ID
// @access  Private
// @status  DONE
export const patchUser = asyncHandler(async(req, res) => {
    const { ID } = req.params;
    logToConsole("patchUser()");

    const user = await User.findByIdAndUpdate(ID, req.body, {
        new: true,
        runValidators: true,
    });

    if (!Object.keys(req.body).length) {
        return res.status(200).json({
            status: "success",
            message: "User was not updated because the request was empty."
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            user
        }
    })
});

// @desc    Delete user
// @route   DELETE /api/v1/users/:ID
// @access  Private
// @status  DONE
export const deleteUser = asyncHandler(async(req, res) => {
    const { ID } = req.params;

    const user = await User.findById(ID);

    if (!user) {
        return res.status(404).json({
            status: "Not found."
        })
    }

    await User.findByIdAndDelete(ID);
    req.session.userID = null;
    logToConsole("Deleted user.");
    return res.status(200).json({
        status: "success"
    });
});

// Users and carts

// @desc    Get user's carts
// @route   GET /api/v1/users/:ID/carts
// @access  Private
// @status  DONE
export const getUserCarts = asyncHandler(async(req, res) => {
    const { ID } = req.params;

    // Find user in database
    const existingUser = await User.findById(ID).select("-username -email -deliveryAddress -phoneNumber -createdAt -updatedAt -__v");

    if (!existingUser) {
        res.status(404);
        throw new Error("No such user.");
    };

    // Find all carts associated with this user
    const carts = await Cart.find({ relatedUserID: ID }).select("-relatedUserID -createdAt -updatedAt");

    res.status(200).json({
            status: "success",
            data: {
                user: existingUser,
                carts
            }
    })
});