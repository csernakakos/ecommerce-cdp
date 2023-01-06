import { useContext } from "react";
import ProductContext from "../context/productContext";

export default function useProductContext() {
    return useContext(ProductContext);
};