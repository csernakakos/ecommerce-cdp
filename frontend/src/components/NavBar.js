import useUserContext from "../hooks/use-user-context";
import useCartContext from "../hooks/use-cart-context";
import { NavLink } from "react-router-dom";
import { AiOutlineFastForward } from "react-icons/ai";
import { BiCartAlt, BiHeart } from "react-icons/bi";
import "../styles/NavBar.css";

export default function NavBar() {
    const {deleteUserID, isLoggedIn} = useUserContext();
    const { basketCounter } = useCartContext();
   
    return (
        <nav>
            <NavLink to="/" className="logo"><AiOutlineFastForward />
                <p>
                    <span className="brand-name">Sneakers</span>
                    <span className="domain-name">.com</span>
                </p>
            </NavLink>
            
            <ul className="menu">
                <li> 
                    <NavLink to="/basket">
                        <BiCartAlt />
                    </NavLink>
                    {basketCounter > 0 && <span className="badge">{basketCounter}</span>}
                    {basketCounter > 9 && <span className="badge">9+</span>}
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
    )
}