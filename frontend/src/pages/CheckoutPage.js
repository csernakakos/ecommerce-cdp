import { useEffect, useState } from "react";
import useCartContext from "../hooks/use-cart-context";
import useUserContext from "../hooks/use-user-context";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const { basket, deleteCartID } = useCartContext();
    const { isLoggedIn } = useUserContext();

    useEffect(() => {
        if (!isLoggedIn) navigate("/login");
    }, []);

    const prices = basket.map((el) => el.total);
    const sum = prices.reduce((partialSum, a) => partialSum + a, 0);

    const handlePay = (e) => {
        e.preventDefault();
        console.log("del")
        deleteCartID();
        navigate("/payment");
    };

    return (<>
        <div className="page">
            <div className="checkout container">
            <h2>Checkout</h2>
                <form onSubmit={handlePay}>
                    <button className="primary">Pay {sum} DKK</button>
                </form>
            </div>
        </div>
    </>)
}