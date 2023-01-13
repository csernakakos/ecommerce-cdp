import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    status: {
        type: String,
        enum: [ "pending", "abandoned", "converted", "mixed" ],
        default: "pending",
    },
    activeCartItems: {
        type: Array,
        default: [],
    },
    removedCartItems: {
        type: Array,
        default: [],
    },
    abandonedCartItems: {
        type: Array,
        default: [],
    },
    convertedCartItems: {
        type: Array,
        default: [],
    },
    wishListedCartItems: {
        type: Array,
        default: [],
    },
    relatedUserID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, {timestamps: true});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;