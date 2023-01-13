import useUserContext from "../hooks/use-user-context";
import useCartContext from "../hooks/use-cart-context";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineFastForward } from "react-icons/ai";
import { BiCartAlt, BiHeart } from "react-icons/bi";
import "../styles/NavBar.css";

export default function NavBar() {
    const {deleteUserID, isLoggedIn} = useUserContext();
    const { basket } = useCartContext();

    const quantity = basket.map((el) => el.quantity);
    const sum = quantity.reduce((partialSum, a) => partialSum + a, 0);
   
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
                        <BiCartAlt />
                    </NavLink>
                    {sum > 0 && <span className="badge">{sum}</span>}
                    {sum > 9 && <span className="badge">9+</span>}
                </li>

                { isLoggedIn && <>
                    <li><NavLink to="/wishlist"><BiHeart /></NavLink></li>
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