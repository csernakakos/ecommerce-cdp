import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    brand: {
        type: String,
        required: [true, "Enter a brand name."],
    },
    model: {
        type: String,
        required: [true, "Enter a model name."],
    },
    category: {
        type: String,
        enum: ["sneakers", "lightweight shoes", "trail runners", "stability shoes", "cushioned shoes"],
        default: "sneakers"
    },
    priceNormal: {
        type: Number,
        required: [true, "Enter a price."],
    },
    priceCurrent: {
        type: Number,
        required: false,
    },
    onDiscount: {
        type: Boolean,
        required: false,
    },
    sizes: {
        type: Array,
        default: [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]
    },
    gender: {
        type: String,
        enum: ["men", "women", "children"],
        default: "men",
    }
});

const Product = mongoose.model("Product", productSchema);

export default Product;