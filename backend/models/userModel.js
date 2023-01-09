import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Enter a user name."],
        minLength: [4, "Your user name must be at least 4 characters long."],
    },
    email: {
        type: String,
        required: [true, "Enter your email address."],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Enter a valid email address."],
    },
    password: {
        type: String,
        required: [true, "Enter a password."],
        minLength: 4,
        select: false,
    },
    deliveryAddress: {
        type: String,
        default: "unknown",
    },
    phoneNumber: {
        type: String,
        default: "unknown",
    },
    purchaseHistory: {
        type: Array,
        default: [],
    },
    newslettersEnabled: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;