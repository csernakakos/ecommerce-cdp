import { useState } from "react";
import useCartContext from "../hooks/use-cart-context";
import { MdCheckCircle } from "react-icons/md";
import { AiOutlineDelete, AiTwotoneEdit } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function BasketItem({el}) {
    const {removeProductFromBasket, editQuantity} = useCartContext();
    const [ editMode, setEditMode ] = useState(false);
    const [ value, setValue ] = useState(el.quantity);

    const handleRemoveItem = (item) => {
        removeProductFromBasket(item);
    };

    const handleInputChange = (e) => {
        console.log(typeof e.target.value)
        setValue(e.target.value);
    }

    const handleSave = (productID, value) => {
        editQuantity(productID, value);
        setEditMode(false);
    }

    return (
        <div className="item product-details">
            <div className="image-container">
                <img src={require(`../images/${el.product.image}`) || require(`../images/default-shoe.jpg`)} />
            </div>
            <div>
           
     <p><span className="brand">{el.product.brand}</span> <span className="model">{el.product.model}</span></p>

                {!editMode && (<>
                    <span id={el.product._id} className="update remove" onClick={() => {handleRemoveItem(el)}}><AiOutlineDelete />
                    <Tooltip anchorId={el.product._id}  content="Remove from basket" place="top" />
                    </span>
                    
                    <div className="quantity-container">
                        <p className="quantity">Quantity: <span>{el.quantity}</span></p>
                        <span className="update edit" id={`${el.product._id}-edit`} onClick={() => {setEditMode(true)}}><AiTwotoneEdit />
                        <Tooltip anchorId={`${el.product._id}-edit`}  content="Change quantity" place="right" />
                        </span>
                    </div>
                </>

                )}

                {editMode && (
                    <div className="quantity-container">
                        
                        <form onSubmit={() => {handleSave(el.product._id, value)}}>
                        <label className="quantity">Quantity:
                        <input type="number" value={value} min={1} max={4} onChange={handleInputChange} />
                        </label>
                            <button id={`${el.product._id}-save`}>
                                <MdCheckCircle />
                                <Tooltip anchorId={`${el.product._id}-save`}  content="Save" place="bottom" />
                            </button>
                            <button id={`${el.product._id}-cancel`} onClick={() => {setEditMode(false)}}>
                                <ImCancelCircle />
                                <Tooltip anchorId={`${el.product._id}-cancel`}  content="Cancel" place="bottom" />
                            </button>
                        </form>
                    </div>
                )}

                <p className="price">{el.total} {el.product.currency}</p>    
            </div>
        </div>
    )
}