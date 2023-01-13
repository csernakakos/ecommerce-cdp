import useProductContext from "../hooks/use-product-context";
import { AiFillHeart } from "react-icons/ai";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function BasketItem({el}) {
    const {addRemoveProductToWishList} = useProductContext();

    const handleRemoveItem = (item) => {
        addRemoveProductToWishList(item);
    };

    console.log(el);

    return (
        <div className="item product-details">
            <div className="image-container">
                <img src={require(`../images/${el.product.image}`) || require(`../images/default-shoe.jpg`)} />
            </div>
            <div>
           
            <p><span className="brand">{el.product.brand}</span> <span className="model">{el.product.model}</span></p>

             
                    <span id={el.product._id} className="update remove" onClick={() => {handleRemoveItem(el)}}><AiFillHeart />
                    <Tooltip anchorId={el.product._id}  content="Remove from wish list" place="top" />
                    </span>
                <p className="price">{el.product.priceCurrent} {el.product.currency}</p>    
            </div>
        </div>
    )
}