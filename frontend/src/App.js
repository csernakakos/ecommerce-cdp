import { useEffect } from "react";
import useCartContext from "./hooks/use-cart-context";
import useProductContext from "./hooks/use-product-context";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import BasketPage from "./pages/BasketPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
    const { cartID, fetchCartID, checkIfCartIDExistsInDatabase } = useCartContext();
    const { fetchProducts, products } = useProductContext();

    // On first render, fetch cartID:
    useEffect(() => {
        if (!cartID) fetchCartID();
        if (cartID)  checkIfCartIDExistsInDatabase();
    }, [fetchCartID, checkIfCartIDExistsInDatabase]);

    // On first render, fetch products:   
    useEffect(() => { fetchProducts() }, [fetchProducts]);

    return (<div className="app">
        <h1>Sneakers.com</h1>

        <main>       
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/basket" element={<BasketPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="*" element={<Navigate to="/" replace />}/>
                </Routes>
            </main>
    </div>)
}