import useUserContext from "../hooks/use-user-context";
import useCartContext from "../hooks/use-cart-context";
import { NavLink } from "react-router-dom";
import { AiOutlineFastForward, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import "../styles/NavBar.css";

export default function NavBar() {
    const {deleteUserID, isLoggedIn} = useUserContext();
    const { basket, wishList } = useCartContext();

    const quantity = basket.map((el) => el.quantity);
    const sum = quantity.reduce((partialSum, a) => partialSum + a, 0);

    console.log(wishList.length);
   
    return (<>
        <nav>
            <NavLink to="/" className="logo">
                <p>
                    <span className="brand-name">Sneakers<span>4</span>U</span>
                </p>
                <AiOutlineFastForward />
            </NavLink>
            
            <ul className="menu">
                <li> 
                    <NavLink to="/basket">
                        <AiOutlineShoppingCart />
                    </NavLink>
                    {sum > 0 && <span className="badge">{sum}</span>}
                    {sum > 9 && <span className="badge">9+</span>}
                </li>

                { isLoggedIn && <>
                    <li>
                        <NavLink to="/wishlist"><AiOutlineHeart /></NavLink>
                        {wishList.length > 0 && <span className="badge">{wishList.length}</span>}
                    </li>
                    <li><NavLink to="/" onClick={deleteUserID}>Log out</NavLink></li>
                </>}

                { !isLoggedIn && <>
                    <li><NavLink to="/login">Log in</NavLink></li>
                </>}
              
            </ul>
        
        </nav>
            <ul className="categories">
                <li><NavLink to="/products">All</NavLink></li>
                <li><NavLink to="/products?category=men">Men</NavLink></li>
                <li><NavLink to="/products?category=women">Women</NavLink></li>
                <li><NavLink to="/products?category=discount">On discount</NavLink></li>
            </ul>
    </>
    )
}