import asyncHandler from "express-async-handler";
import logToConsole from "../config/logToConsole.js";
import Product from "../models/productModel.js";

// @desc    Create product
// @route   POST /api/v1/products
// @access  Public
// @status  DONE
export const createProduct = asyncHandler(async(req, res) => {
    logToConsole("createProduct()");

    // Throw error if required information is missing
    if (!req.body.brand || !req.body.model || !req.body.priceNormal) {
        res.status(400);
        throw {
            errorCode: "MISSING-INFO-400-01",
            message: "Enter a brand, a model, and a normal price.",
        };
    };

    // Get data from body
    const { brand, model, category, priceNormal, priceCurrent, sizes, gender, image } = req.body;

    // Throw error if model already exists
    let existingModel = await Product.findOne({model});
    if (existingModel) {
        res.status(400);
        throw {
            errorCode: "DUPLICATE-ENTRY-400-02",
            message: "This model already exists.",
        };
    };

    // If there's a discount, set onDiscount to true:
    let onDiscount = false;
    if (priceCurrent && priceCurrent < priceNormal) {
        onDiscount = true;
    };

    const product = await Product.create({
        brand,
        model,
        category,
        priceNormal,
        priceCurrent,
        onDiscount,
        sizes,
        gender,
        image,
    });

    res.status(201).json({
        status: "success",
        created: true,
        data: {
            product,
        }
    });
});

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
// @status  DONE
export const getProducts = asyncHandler(async(req, res) => {
    logToConsole("getProducts()");
    const products = await Product.find();

    res.status(200).json({
        status: "success",
        count: products.length,
        data: {
            products
        }
    })
});

// @desc    Delete all products
// @route   Delete /api/v1/products
// @access  Public
// @status  DONE
export const deleteProducts = asyncHandler(async(req, res) => {
    logToConsole("deleteProducts()");
    const products = await Product.find();
    const deleteCount = products.length;

    products.forEach(async (item) => {
        const id = item._id;
        await Product.findByIdAndDelete(id);
    });

    res.status(200).json({
        status: "success",
        deleteCount,
    });
});

// @desc    Get product
// @route   GET /api/v1/products/:ID
// @access  Public
// @status  DONE
export const getProduct = asyncHandler(async(req, res) => {
    logToConsole("getProduct()");
    const { ID } = req.params;
    
    // Find product in database
    const existingProduct = await Product.findById(ID);

    if (!existingProduct) {
        res.status(404);
        throw new Error("No such product.");
    } else {
        res.status(200).json({
            status: "success",
            data: {
                product: existingProduct
            }
        })
    }
});

// @desc    Update product
// @route   PATCH /api/v1/products/:ID
// @access  Public
// @status  DONE
export const updateProduct = asyncHandler(async(req, res) => {
    logToConsole("updateProduct()");
    const { ID } = req.params;

    const product = await Product.findByIdAndUpdate(ID, req.body, {
        new: true,
        runValidators: true,
    });

    if (!Object.keys(req.body).length) {
        return res.status(200).json({
            status: "success",
            message: "Product was not updated because the request was empty."
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            product
        }
    })
});

// @desc    Delete product
// @route   Delete /api/v1/products/:ID
// @access  Public
// @status  DONE
export const deleteProduct = asyncHandler(async(req, res) => {
    logToConsole("deleteProduct()");
    const { ID } = req.params;

    const product = await Product.findById(ID);

    if (!product) {
        return res.status(404).json({
            status: "Not found."
        })
    }

    await Product.findByIdAndDelete(ID);
    logToConsole("Deleted product.");
    return res.status(200).json({
        status: "success"
    });
});