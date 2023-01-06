import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/cartContext";
import { ProductProvider } from "./context/productContext";
import { UserProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <CartProvider>
            <UserProvider>
                <ProductProvider>
                    <App />
                </ProductProvider>
            </UserProvider>
        </CartProvider>
    </BrowserRouter>
)