import { useState } from "react";
import useCartContext from "../hooks/use-cart-context";
import useUserContext from "../hooks/use-user-context";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const { basket, deleteCartID } = useCartContext();
    const { isLoggedIn } = useUserContext();
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");

    const prices = basket.map((el) => el.total);
    const sum = prices.reduce((partialSum, a) => partialSum + a, 0);

    const handlePay = (e) => {
        e.preventDefault();
        console.log("del")
        deleteCartID();
        navigate("/");
    };

    return (
        <div className="page">
            <h1>Checkout</h1>

            <div className="checkout container">

            <p>Pay</p>
            {isLoggedIn && (
                <form onSubmit={handlePay}>
                    <button className="primary">Pay {sum} DKK</button>
                </form>
            )}

            {!isLoggedIn && (
                <div>
                    <p>Log in or provide delivery details for this purchase.</p>
                    <form onSubmit={handlePay}>
                        <label>
                        <span>Email:</span>
                            <input required type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                        </label>

                        <label>
                            <span>Phone number:</span>
                            <input required type="tel" id="phone-number" onChange={(e) => setPhoneNumber(e.target.value)} />
                        </label>

                        <label>
                            <span>Delivery address:</span>
                            <input required type="text" id="delivery-address" onChange={(e) => setDeliveryAddress(e.target.value)} />
                        </label>
                        <button>Pay {sum} DKK</button>
                    </form>
                </div>
            )}
            </div>
        </div>
    )
}