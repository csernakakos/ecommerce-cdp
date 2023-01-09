import { useEffect } from "react";
import useProductContext from "../hooks/use-product-context";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function ProductsPage() {
    const {products, filteredProducts, setFilteredProducts} = useProductContext();
    const [searchParams] = useSearchParams();
    
    let searchParam = searchParams.get("category");
    
    useEffect(() => {
        let filtered = [...products];

        if (!searchParam) {
        } else if (searchParam === "men" || searchParam === "women") {
            filtered = products.filter((product) => product.gender === searchParam || product.gender === "unisex");
        } else if (searchParam === "discount") {
            filtered = products.filter((product) => product.onDiscount);
        }

        setFilteredProducts(() => filtered);

    }, [searchParam])

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