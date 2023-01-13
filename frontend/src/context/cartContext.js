import { useState, useCallback, createContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const CartContext = createContext();
const baseURL = process.env.REACT_APP_server_baseURL;

export function CartProvider({ children }) {
    const [cartID, setCartID] = useState(Cookies.get("cartID") || null);
    const [basket, setBasket] = useState([]);
    const [basketCounter, setBasketCounter] = useState(0);
    const [wishList, setWishList] = useState([]);
    const [wishListCounter, setWishListCounter] = useState(0);

    const fetchCartID = useCallback(async () => {
        try {
            const response = await axios.post(`${baseURL}/carts`);
            const {_id: cartID} = response.data.data.cart;
            const { activeCartItems, wishListedCartItems } = response.data.data.cart;

            setCartID(cartID);
            Cookies.set("cartID", cartID, { sameSite: "strict"});
            setBasket([...activeCartItems]);
            setBasketCounter(activeCartItems.length);
            setWishList([...wishListedCartItems]);
            setWishListCounter(wishListedCartItems.length);
        } catch (error) {
            return null;
        }
    }, []);

    const checkIfCartIDExistsInDatabase = useCallback(async () => {
        try {
            // Delete stale carts from the database:
            await axios.delete(`${baseURL}/carts`);
            
            // Get cart from the database:
            const cart = await axios.get(`${baseURL}/carts/${cartID}`);
            
            if (cart.data.message === "No such cart") {
                deleteCartID();
            } else {
                // cartID exists in the database. Next:
                // Add active cart items to the basket:
                const { activeCartItems, wishListedCartItems } = cart.data.data.cart;
    
                setBasket([...activeCartItems]);
                setBasketCounter(activeCartItems.length);
                setBasketCounter(activeCartItems.length);
                setWishList([...wishListedCartItems]);
                setWishListCounter(wishListedCartItems.length);
            }
        } catch (error) {
                console.log(error);
        }
    }, []);

    const deleteCartID = () => {
        setCartID(null);
        Cookies.remove("cartID");
        window.location.reload(false);
    };

    const emptyBasket = async () => {
        const {data} = await axios.get(`${baseURL}/carts/${cartID}`);
        const activeCartItems = data.data.cart.activeCartItems;

        const updatedActiveCartItems = [];

        const response = await axios.patch(`${baseURL}/carts/${cartID}`, {
            cartID,
            activeCartItems: updatedActiveCartItems
        });

        const updatedBasket = response.data.data.cart.activeCartItems;
        setBasket(updatedBasket);
        setBasketCounter(updatedBasket.length);   
    };

    const editQuantity = async (productID, newQuantity) => {
        const {data} = await axios.get(`${baseURL}/carts/${cartID}`);
        const activeCartItems = data.data.cart.activeCartItems;
        let updatedActiveCartItems;

        const item = activeCartItems.find((existingItem) => {
            return existingItem.product._id === productID;
         });

        const updatedItem = {
            ...item,
            quantity: Number(newQuantity),
            total: item.product.priceCurrent * Number(newQuantity),
        };

        updatedActiveCartItems = activeCartItems.filter((item) => {
            return item.product._id !== productID;
        });

        updatedActiveCartItems = [ ...updatedActiveCartItems, updatedItem ];
        const response = await axios.patch(`${baseURL}/carts/${cartID}`, {
            cartID,
            activeCartItems: updatedActiveCartItems
        });

        const updatedBasket = response.data.data.cart.activeCartItems;
        setBasket(updatedBasket);
        setBasketCounter(updatedBasket.length);
    };

    const removeProductFromBasket = async (item) => {
        const {data} = await axios.get(`${baseURL}/carts/${cartID}`);
        const activeCartItems = data.data.cart.activeCartItems;

        const updatedActiveCartItems = activeCartItems.filter((el) => {
            return item.product._id !== el.product._id;
        });

        const response = await axios.patch(`${baseURL}/carts/${cartID}`, {
            cartID,
            activeCartItems: updatedActiveCartItems
        });

        const updatedBasket = response.data.data.cart.activeCartItems;
        setBasket(updatedBasket);
        setBasketCounter(updatedBasket.length);
    }

    const contextValues = {
        fetchCartID,
        checkIfCartIDExistsInDatabase,
        cartID,
        setCartID,
        deleteCartID,

        basket,
        setBasket,
        basketCounter,
        setBasketCounter,
        emptyBasket,
        editQuantity,
        removeProductFromBasket,

        wishList,
        setWishList,
        wishListCounter,
        setWishListCounter,
    }

    return (
        <CartContext.Provider value={contextValues}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;