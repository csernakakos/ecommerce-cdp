import { useState, useEffect } from "react";
import useProductContext from "../hooks/use-product-context";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function ProductsPage() {
    const {products, filteredProducts, setFilteredProducts, updateProductsArray} = useProductContext();
    const [searchParams, setSearchParams] = useSearchParams();

    let searchParam = searchParams.get("category");

    useEffect(() => {
        if (!searchParam) {
            setFilteredProducts(() => products);
        } else if (searchParam === "men") {
            const filtered = products.filter((product) => product.gender === "men" || product.gender === "unisex");
            console.log(filtered);
            setFilteredProducts(() => filtered);
        } else if (searchParam === "women") {
            const filtered = products.filter((product) => product.gender === "women" || product.gender === "unisex");
            setFilteredProducts(() => filtered);
        } else if (searchParam === "discount") {
            const filtered = products.filter((product) => product.onDiscount);
            setFilteredProducts(() => filtered);
        }
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