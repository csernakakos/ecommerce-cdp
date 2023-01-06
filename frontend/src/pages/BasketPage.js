import { useNavigate } from "react-router-dom";
import { TbSum } from "react-icons/tb";
import BasketItem from "../components/BasketItem";
import useCartContext from "../hooks/use-cart-context";

export default function BasketPage() {
    const navigate = useNavigate();
    const {basket, basketCounter, emptyBasket} = useCartContext();

    const handleProceedToCheckout = (e) => {
        e.preventDefault();
        navigate({pathname: "/checkout"});
    }

    const handleEmptyBasket = (e) => {
        e.preventDefault();
        emptyBasket();
    }

    return (
        <div className="basket-page">
            {basket.length === 0 && <h1>Your basket is empty</h1> }
            {basket.length === 1 && <h1>You've got 1 item in your basket</h1> }
            {basket.length > 1 && <h1>You've got {basket.length} items in your basket</h1> }

            <div className="basket-list list">
                {basket.map((el) => {
                    return (
                        <div key={el.product._id}>
                            <BasketItem el={el}  />
                        </div>
                    )
                })}

                {basket.length > 0 && (
                    <div className="container">
                        <p className="total"><TbSum className="icon" /> <span className="price">{parseFloat(basketCounter.toFixed(2))} DKK</span></p>

                        <div>
                        <form onSubmit={handleProceedToCheckout}>
                            <button className="button primary">Proceed to checkout</button>
                        </form>
                        <form onSubmit={handleEmptyBasket}>
                            <button className="button secondary">Empty basket</button>
                        </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}