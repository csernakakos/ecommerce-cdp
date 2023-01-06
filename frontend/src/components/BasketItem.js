import { useState } from "react";
import useCartContext from "../hooks/use-cart-context";
import {MdEdit, MdRemoveCircle } from "react-icons/md";

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
        <div className="basket-item">
            <p>
                <span className="name">{el.product.brand}</span> <span className="separator">|</span> <span className="price">{el.product.priceCurrent} DKK</span>
            </p>

            {!editMode && (<>
                <span className="update remove" onClick={() => {handleRemoveItem(el)}}><MdRemoveCircle /></span>
                <div>
                    <p className="quantity">Quantity: {el.quantity}</p>
                    <span className="update edit" onClick={() => {setEditMode(true)}}><MdEdit /></span>
                </div>
            </>
            )}

            {editMode && (
                <div>
                    <p className="quantity">Quantity:</p>
                    
                    <form onSubmit={() => {handleSave(el.product._id, value)}}>
                    <input type="number" value={value} min={1} max={10} onChange={handleInputChange} />
                        <button className="button primary" >Save</button>
                        <button className="button secondary" onClick={() => {setEditMode(false)}}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    )
}