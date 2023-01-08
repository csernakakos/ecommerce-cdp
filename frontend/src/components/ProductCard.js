import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import useProductContext from "../hooks/use-product-context";
import "../styles/ProductCard.css";

export default function ProductCard({ product }) {
    const {addProductToBasket} = useProductContext();
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        // setQuantity(Number(e.target.value));
    };

    const handleInputChange = (e) => {
        console.log(e.target.value);
        setQuantity(e.target.value);
    }

    const handleAddToBasket = (e) => {
        e.preventDefault();
        const item = { product, quantity, total: product.priceCurrent * quantity};
        addProductToBasket(item);
    };

    return (
        <div className="product-card">
            <img src={require(`../images/${product.image}`) || require(`../images/default-shoe.jpg`)} />
            <div className="details">
                <p className="brand">{product.brand}</p>
                <p className="model">{product.model}</p>
                <p className="price">{product.priceCurrent} {product.currency}</p>
                <form onSubmit={handleAddToBasket}>
                    <p className="quantity">Size:</p>
                    <input type="number" min={1} max={10} onChange={handleInputChange} value={quantity} />
                    <button className="button add-to-basket"><FaCartPlus /></button>
                </form>
            </div>
        </div>
    )
}