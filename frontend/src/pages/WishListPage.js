import useCartContext from "../hooks/use-cart-context";
import WishListItem from "../components/WishListItem";
import "../styles/Container.css";


export default function WishListPage() {
    const {wishList} = useCartContext();

    console.log(wishList);

    return (<div className="page">
            {wishList.length === 0 && (
                <div>Nothing here yet.</div>
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