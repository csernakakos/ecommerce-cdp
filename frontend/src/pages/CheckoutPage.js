import { useState } from "react";
import useCartContext from "../hooks/use-cart-context";
import useUserContext from "../hooks/use-user-context";

export default function CheckoutPage() {
    const { deleteCartID } = useCartContext();
    const { isLoggedIn } = useUserContext();
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");

    const amountToPay = "TOTAL";

    const handlePay = (e) => {
        e.preventDefault();
        console.log("del")
        deleteCartID();
    };

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>

            <p>Pay</p>
            {isLoggedIn && (
                <form onSubmit={handlePay}>
                    <button>Pay {amountToPay} DKK</button>
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
                        <button>Pay {amountToPay} DKK</button>
                    </form>
                </div>
            )}
        </div>
    )
}