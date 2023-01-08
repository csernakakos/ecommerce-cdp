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
        enum: ["sneakers", "running shoes", "trail runners", "crossfit trainers", "weightlifting shoes"],
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
    currency: {
        type: String,
        enum: ["DKK", "EUR", "USD"],
        default: "DKK"
    },
    onDiscount: {
        type: Boolean,
        required: false,
    },
    sizes: {
        type: Array,
        default: [
            { size: 39, available: true, },
            { size: 40, available: true, availableInDays: 0 },
            { size: 41, available: true, availableInDays: 0 },
            { size: 42, available: true, availableInDays: 0 },
            { size: 43, available: true, availableInDays: 0 },
            { size: 44, available: true, availableInDays: 0 },
            { size: 45, available: true, availableInDays: 0 },
        ]
    },
    image: {
        type: String
    },
    gender: {
        type: String,
        enum: ["unisex", "men", "women" ],
        default: "unisex",
    }
});

const Product = mongoose.model("Product", productSchema);

export default Product;