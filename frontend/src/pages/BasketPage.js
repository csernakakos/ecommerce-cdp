import { useNavigate } from "react-router-dom";
import { TbSum } from "react-icons/tb";
import BasketItem from "../components/BasketItem";
import useCartContext from "../hooks/use-cart-context";
import "../styles/Container.css";

export default function BasketPage() {
    const navigate = useNavigate();
    const {basket, emptyBasket} = useCartContext();

    const handleProceedToCheckout = (e) => {
        e.preventDefault();
        navigate({pathname: "/checkout"});
    }

    const prices = basket.map((el) => el.total);
    const sum = prices.reduce((partialSum, a) => partialSum + a, 0);

    const handleEmptyBasket = (e) => {
        e.preventDefault();
        emptyBasket();
    }

    return (
        <div className="page">
            {basket.length === 0 && (
                <div>Nothing here yet.</div>
            )}

            {basket.length > 0 && (
            <div className="basket-list container">
                <div className="main section">
                    <h2>Your basket</h2>
                    {basket.map((el) => {
                        console.log(el.product.brand);
                        return (
                            <div key={el.product._id} style={{marginBottom: "1.2rem"}}>
                                <BasketItem el={el}  />
                            </div>
                        )
                    })}

                </div>
                <div className="summary section">
                    <h2>Amount to pay</h2>
                        <div>
                            <p className="total">
                                <TbSum className="icon" />
                                <span className="price">{sum} DKK</span>
                            </p>

                            <div>
                            <form onSubmit={handleProceedToCheckout}>
                                <button className="button primary">Proceed to checkout</button>
                            </form>
                            <form onSubmit={handleEmptyBasket}>
                                <button className="button secondary">Empty basket</button>
                            </form>
                            </div>
                        </div>
                </div>
            
            </div>)}
        </div>
        
    )
}