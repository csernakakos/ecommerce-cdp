import { useContext } from "react";
import CartContext from "../context/cartContext";

export default function useCartContext() {
    return useContext(CartContext);
};