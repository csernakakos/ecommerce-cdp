import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import useProductContext from "../hooks/use-product-context";

export default function HomePage(){
    const {searchedProducts} = useProductContext();

    return (<div className="page">
        <section className="hero">
            {/* <img className="hero" src={require(`../images/index.jpg`)} /> */}
            <h1>Shoes for athletes</h1>
            <SearchBar/>
        </section>

            <div className="product-list list">
            {searchedProducts.map((product) => {
                return (
                    <ProductCard key={product._id} product={product} />
                )
            })}
        </div>
    </div>)
}