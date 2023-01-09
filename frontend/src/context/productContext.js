import { useState, useCallback, createContext } from "react";
import axios from "axios";
import useCartContext from "../hooks/use-cart-context";
const ProductContext = createContext();
const baseURL = "http://localhost:5000/api/v1";

export function ProductProvider({ children }) {
    const {cartID, setBasket, setBasketCounter} = useCartContext();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchedProducts, setSearchedProducts] = useState(products);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(`${baseURL}/products`);
            const { products } = response.data.data;
            setProducts(() => products);
            setSearchedProducts(products);
        } catch (error) {
            return null;
        }
    }, []);

    const addProductToBasket = async (newItem) => {
        console.log("addPrd..")
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

    const contextValues = {
        fetchProducts,
        products,
        setProducts,
        filteredProducts,
        setFilteredProducts,
        searchedProducts,
        setSearchedProducts,
        addProductToBasket,
    }


    return (
        <ProductContext.Provider value={contextValues}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContext;