import { useEffect } from "react";
import useCartContext from "./hooks/use-cart-context";
import useProductContext from "./hooks/use-product-context";
import { Routes, Route, Navigate } from "react-router-dom";
import { BasketPage, CheckoutPage, HomePage, LoginPage, ProductsPage, RegisterPage, WishListPage } from "./pages/,pages";
import NavBar from "./components/NavBar";
import "./styles/App.css";

export default function App() {

    console.log(REACT_APP_akos)
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
        <NavBar />

        <main>       
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/basket" element={<BasketPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/wishlist" element={<WishListPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="*" element={<Navigate to="/" replace />}/>
                </Routes>
            </main>
    </div>)
}