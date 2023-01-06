import useProductContext from "../hooks/use-product-context";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
    const {filteredProducts} = useProductContext();

    return (<>
        <div className="product-list list">
            {filteredProducts.map((product) => {
                return (
                    <ProductCard key={product._id} product={product} />
                )
            })}
        </div>
    </>)
}