import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useCartContext from "../hooks/use-cart-context";
import useUserContext from "../hooks/use-user-context";
import WishListItem from "../components/WishListItem";
import "../styles/Container.css";


export default function WishListPage() {
    const navigate = useNavigate();
    const { isLoggedIn } = useUserContext();
    const {wishList} = useCartContext();

    useEffect(() => {
      if (!isLoggedIn) navigate("/login");
  }, []);

    return (<div className="page">
            {wishList.length === 0 && (
                <div className="wish-list container">
                  <div>
                    <h2>Nothing here yet.</h2>
                    <p>Browse our <NavLink to="/products">collections</NavLink>.</p>
                  </div>
                </div>
            )}

          {wishList.length > 0 && (
          <div className="wish-list container">
            <div className="main section">
                    <h2>Your wish list</h2>
                    {wishList.map((el) => {
                        console.log(el.product.brand);
                        return (
                            <div key={el.product._id} style={{marginBottom: "1.2rem"}}>
                                <WishListItem el={el}  />
                            </div>
                        )
                    })}
            </div>

          </div>)}
    </div>)
}