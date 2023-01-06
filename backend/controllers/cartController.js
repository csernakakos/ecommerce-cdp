import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import logToConsole from "../config/logToConsole.js";

// @desc    Create cart
// @route   POST /api/v1/carts
// @access  Public
// @status  DONE
export const postCart = asyncHandler(async(req, res) => {
    logToConsole("postCart()");   

    let relatedUser;
    try {
        relatedUser = await User.findById(req.session.userID);
    } catch (error) {
        console.log("no relatedUser found.");
    }

    // Assign null to its relatedUserID if a non-registered "visitor" created the cart instead of a registered "user".
    const cart = await Cart.create({
        status: req.body.status,
        relatedUserID: relatedUser ? relatedUser._id : null,
    });

    req.session.cartID = cart._id;

    res.status(201).json({
        status: "success",
        cartCreated: true,
        data: {
            cart
        }
    });
});

// @desc    Get all carts
// @route   GET /api/v1/carts
// @access  Public
// @status  DONE
export const getCarts = asyncHandler(async(req, res) => {
    const carts = await Cart.find();

    res.status(200).json({
        status: "success",
        cartCount: carts.length,
        data: {
            carts
        }
    })
});

// @desc    Get a cart
// @route   GET /api/v1/carts/:ID
// @access  Public
// @status  DONE
export const getCart = asyncHandler(async(req, res) => {
    const { ID } = req.params;
    const cart = await Cart.findById(ID);

    if (!cart) {
        res.status(404);
        throw new Error("No such cart.");
    }

    res.status(200).json({
        status: "success",
        data: {
            cart
        }
    });
});


// @desc    Update cart
// @route   PATCH /api/v1/carts/:ID
// @access  Public
// @status  DONE
export const patchCart = asyncHandler(async(req, res) => {
    const { ID } = req.params;
    const cart = await Cart.findByIdAndUpdate(ID, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: "success",
        data: {
            cart
        }
    });
});

// @desc    Delete a cart
// @route   DELETE /api/v1/carts/:ID
// @access  Public
// @status  DONE
export const deleteCart = asyncHandler(async(req, res) => {
    const { ID } = req.params;
    const cart = await Cart.findById(ID);

    if (!cart) {
        return res.status(404).json({
            status: "Not found."
        })
    }

    await Cart.findByIdAndDelete(ID);
    req.session.cartID = null;
    return res.status(200).json({
        status: "success"
    });
});



// @desc    Delete stale carts
// @route   DELETE /api/v1/carts
// @access  Public
// @status  DONE
export const deleteStaleCarts = asyncHandler(async(req, res) => {
    logToConsole(`deleteStaleCarts()`);
    const carts = await Cart.find();

    const filteredCarts = carts.filter((cart) => {
        const createdAtTime = new Date(cart.createdAt).getTime();
        const currentTime = new Date().getTime();

        if (currentTime - createdAtTime > 600000  // If more than 10 minutes passed since the cart was created,
                && cart.status === "pending" // And if status is "pending" and if all cart arrays are empty,
                && cart.activeCartItems.length === 0
                && cart.removedCartItems.length === 0
                && cart.abandonedCartItems.length === 0
                && cart.convertedCartItems.length === 0
            ) {
                return true;
            } else {
                // Then the cart is stale or empty. Do not return it into the filteredCarts array
                return false;
            }
    });

    const deleteCount = filteredCarts.length;

    filteredCarts.forEach(async (item) => {
        const id = item._id;
        await Cart.findByIdAndDelete(id);
    });

    res.status(200).json({
        status: "success",
        deleteCount,
    });
});


// @desc    From frontend to backend, make cartItem changes when pressing `Add to cart`
// @desc    `createCartItem` adds a new item to `activeCartItems`.
// @desc    `updateCartItemQuantity` updates the `quantity` field of a cartItem that already exists in `activeCartItems`.
// @desc    `removeCartItem` removes the cartItem from `activeCartItems` to `removedCartItems`.

// @route   POST /api/v1/carts/:ID/cartItems
// @access  Public
// @status  DONE
export const createCartItem = asyncHandler(async(req, res, next) => {

    const cartItem = {
        productID: req.body.productID,
        quantity: req.body.quantity,
    };

    const cart = await Cart.findById(req.params.ID);    
    const old_activeCartItems = cart.activeCartItems;
    // Check if cartItem already exists in `activeCartItems`:
    const isExistingCartItem = old_activeCartItems.some((item) => item.productID === cartItem.productID);

    if (isExistingCartItem) {
        return res.status(400).json({
            status: "error",
            cartItemCreated: false,
            error: "This cartItem already exists in activeCartItems."
        });
    }

    const new_activeCartItems = [...old_activeCartItems, cartItem];
    const modifiedCart = await Cart.findByIdAndUpdate(
        req.params.ID,
        {
            activeCartItems: new_activeCartItems
        },
        {
            new: true
        }       
    );

    res.status(201).json({
        status: "success",
        cartItemCreated: true,
        data: {
            modifiedCart
        }
    });
});


// @route   POST /api/v1/carts/:ID/cartItems
// @access  Public
// @status  DONE
export const updateCartItemQuantity = asyncHandler(async(req, res, next) => {
    const cartItem = {
        productID: req.body.productID,
        quantity: req.body.quantity,
    };

    const cart = await Cart.findById(req.params.ID);
    const old_activeCartItems = cart.activeCartItems;
    const new_activeCartItems = old_activeCartItems.filter((item) => item.productID !== cartItem.productID);

    const activeCartItems = [...new_activeCartItems, cartItem];

    const modifiedCart = await Cart.findByIdAndUpdate(
        req.params.ID,
        {
            activeCartItems
        },
        {
            new: true
        }       
    );

    res.status(201).json({
        status: "success",
        cartItemQuantityUpdated: true,
        data: {
            modifiedCart
        }
    });
});

// @route   POST /api/v1/carts/:ID/cartItems
// @access  Public
// @status  DONE
export const removeCartItem = asyncHandler(async(req, res, next) => {
    const cartItem = {
        productID: req.body.productID,
    };
    let modifiedCart;

    const cart = await Cart.findById(req.params.ID);

    // Handle activeCartItems
    const old_activeCartItems = cart.activeCartItems;
    const activeCartItems = old_activeCartItems.filter((item) => item.productID !== cartItem.productID);

    // Handle removedCartItems
    // If productID already exists in removedCartItems, return early.
    const old_removedCartItems = cart.removedCartItems;
    const isExistingCartItem = old_removedCartItems.some((item) => item.productID === cartItem.productID);
    if (isExistingCartItem) {

        modifiedCart = await Cart.findByIdAndUpdate(
            req.params.ID,
            {
                activeCartItems,
                removedCartItems: old_removedCartItems,
            },
            {
                new: true
            }
        );

        console.log("No changes made to removedCartItems because it already contained the current productID.");
        
        return res.status(200).json({
            status: "success",
            cartItemRemoved: true,
            data: {
                modifiedCart
            }
        })
    };

    const removedCartItems = [...old_removedCartItems, cartItem];

    modifiedCart = await Cart.findByIdAndUpdate(
        req.params.ID,
        {
            activeCartItems,
            removedCartItems,
        },
        {
            new: true
        }       
    );

    res.status(201).json({
        status: "success",
        cartItemRemoved: true,
        data: {
            modifiedCart
        }
    });
});

// @desc    Empty the `removedCartItems` array of a cart
// @route   PUT /api/v1/carts/:ID
// @access  Public
// @status  DONE
export const deleteRemovedCartItemsArray = asyncHandler(async(req, res, next) => {
    const modifiedCart = await Cart.findByIdAndUpdate(
        req.params.ID,
        {
            removedCartItems: []
        },
        {
            new: true
        }       
    );

    res.status(200).json({
        status: "success",
        removedCartItemsArrayDeleted: true,
        data: {
            modifiedCart
        }
    });
    
})