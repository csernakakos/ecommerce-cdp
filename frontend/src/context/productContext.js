import { useState, useCallback, createContext } from "react";
import axios from "axios";
import useCartContext from "../hooks/use-cart-context";
const ProductContext = createContext();
const baseURL = process.env.REACT_APP_server_baseURL;

export function ProductProvider({ children }) {
    const {cartID, setBasket, setWishList, setWishListCounter, setBasketCounter} = useCartContext();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchedProducts, setSearchedProducts] = useState(products);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(`${baseURL}/products`);
            const { products } = response.data.data;
            setProducts(() => products);
            setSearchedProducts(products);
            setFilteredProducts(products);
        } catch (error) {
            return null;
        }
    }, []);

    const addProductToBasket = async (newItem) => {
        // Get all items that are currently in the cart:
        const {data} = await axios.get(`${baseURL}/carts/${cartID}`);
        const activeCartItems = data.data.cart.activeCartItems;

        let updatedActiveCartItems;
        let existingItem;

        existingItem = activeCartItems.find((existingItem) => {
                return existingItem.product._id === newItem.product._id;
        });

        // If item already exists in the cart, update the item's quantity and total attributes:
        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + newItem.quantity,
                total: existingItem.total + newItem.total,
            };

            updatedActiveCartItems = activeCartItems.filter((item) => {
                return item.product._id !== existingItem.product._id;
            });

            updatedActiveCartItems = [...updatedActiveCartItems, updatedItem];
        }

        // If item doesn't yet exist in the cart, add the item to the cart:
        else {
            updatedActiveCartItems = [...activeCartItems, newItem];
        }
        const response = await axios.patch(`${baseURL}/carts/${cartID}`, {
            cartID,
            activeCartItems: updatedActiveCartItems
        });

        const updatedBasket = response.data.data.cart.activeCartItems;
        setBasket(updatedBasket);
        setBasketCounter(updatedBasket.length);
    };

    const addRemoveProductToWishList = async (item) => {
        console.log("wishListed", item);

        // Get all items that are currently wishListed in the cart:
        const {data} = await axios.get(`${baseURL}/carts/${cartID}`);
        const wishListedCartItems = data.data.cart.wishListedCartItems;

        let updatedWishListedCartItems;
        let existingItem;

        existingItem = wishListedCartItems.find((existingItem) => {
                return existingItem.product._id === item.product._id;
        });

        // If item is already wishListed in the cart, remove it from the wishlist:
        if (existingItem) {
            console.log("REMOVING from wishlist!!!!")
            updatedWishListedCartItems = wishListedCartItems.filter((item) => {
                return item.product._id !== existingItem.product._id;
            });
        }
        
        // If item is not yet wishListed in the cart, add the item to the wishList:
        else {
            updatedWishListedCartItems = [...wishListedCartItems, item];
        }

        const response = await axios.patch(`${baseURL}/carts/${cartID}`, {
            cartID,
            wishListedCartItems: updatedWishListedCartItems
        });

        const updatedWishList = response.data.data.cart.wishListedCartItems;
        setWishList(updatedWishList);
        setWishListCounter(updatedWishList.length);
    }

    const contextValues = {
        fetchProducts,
        products,
        setProducts,
        filteredProducts,
        setFilteredProducts,
        searchedProducts,
        setSearchedProducts,
        addProductToBasket,
        addRemoveProductToWishList,
    }


    return (
        <ProductContext.Provider value={contextValues}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContext;