import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import useProductContext from "../hooks/use-product-context";

export default function ProductCard({ product }) {
    console.log(">>>>>")
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
            {/* <img src={product.product.image} /> */}
            <p className="name">{product.brand}</p>
            <p className="price">{product.priceCurrent} kr.</p>
            <img  />
            <form onSubmit={handleAddToBasket}>
                <p className="quantity">Quantity:</p>
                <input type="number" min={1} max={10} onChange={handleInputChange} value={quantity} />
                <button className="button add-to-basket"><FaCartPlus /></button>
            </form>
        </div>
    )
}