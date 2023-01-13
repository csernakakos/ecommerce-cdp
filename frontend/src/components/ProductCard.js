import { useState } from "react";
import { AiOutlineShoppingCart, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useCartContext from "../hooks/use-cart-context";
import useProductContext from "../hooks/use-product-context";
import useUserContext from "../hooks/use-user-context";
import { useNavigate } from "react-router-dom";
import Accordion from "./Accordion";
import "../styles/ProductCard.css";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    const {wishList} = useCartContext();
    const {addProductToBasket, addRemoveProductToWishList} = useProductContext();
    const {isLoggedIn} = useUserContext();
    const [selectedItem, setSelectedItem] = useState({});
    const sizes = product.sizes;

    const sendItemToBasket = (selectedItem) => {
        setSelectedItem(selectedItem);
    };

    const handleAddToWishList = (e) => {
        e.preventDefault();
        if (!isLoggedIn) navigate("/login");
        if (isLoggedIn) {
            const item = {
                product,
            };
            addRemoveProductToWishList(item);
        };
    }

    const wishListedItems = wishList.map((el) => el.product._id);
    const wishListed = (wishListedItems.find((el) => el === product._id));

    const handleAddToBasket = (e) => {
        e.preventDefault();

        // If user has not yet selected a size, do not allow using the basket:
        if (!selectedItem.size) return;

        if (selectedItem.size) {
            const item = { 
                product,
                size: selectedItem.size,
                quantity: 1,
                total: product.priceCurrent
            };
            addProductToBasket(item);
        }
    };

    return (
        <div className="product-card">
            <img src={require(`../images/${product.image}`) || require(`../images/default-shoe.jpg`)} />
            <div className="product-details">
                <p className="brand">{product.brand}</p>
                <p className="model">{product.model}</p>
                <p className="price">{product.priceCurrent} {product.currency}</p>
                
                <Accordion items={sizes} sendItemToBasket={sendItemToBasket} />
                <form onSubmit={handleAddToBasket}>
                    <div className="buttons">
                        <button id={product._id}  className={`primary add-to-basket ${selectedItem.size ? "enabled" : "disabled"}`}><AiOutlineShoppingCart /></button>
                        {!selectedItem.size && <Tooltip anchorId={product._id}  content="First, select a size." place="right" />}
                    </div>
                </form>
                <form onSubmit={handleAddToWishList}>
                    <div className="buttons">
                            <button className="secondary wish-list">
                                {!isLoggedIn && (
                                <>
                                    <AiOutlineHeart id={`${product._id}-wishList`} />
                                    <Tooltip anchorId={`${product._id}-wishList`}  content="Log in to use the wish list" place="right" />
                                </>
                                )}
                                {!wishListed && isLoggedIn && (
                                <>
                                    <AiOutlineHeart id={`${product._id}-wishList`} />
                                    <Tooltip anchorId={`${product._id}-wishList`}  content="Add to wish list" place="right" />
                                </>
                                )}
                                {wishListed && isLoggedIn && (
                                <>
                                    <AiFillHeart id={`${product._id}-wishList`} />
                                    <Tooltip anchorId={`${product._id}-wishList`}  content="Remove from wish list" place="right" />
                                </>
                                )}
                            </button>
                    </div>
                </form>
            </div>
        </div>
    )
}