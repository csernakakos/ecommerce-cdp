import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import useProductContext from "../hooks/use-product-context";
import "../styles/SearchBar.css";

export default function SearchBar() {
    const {products, setSearchedProducts} = useProductContext();
    const [searchString, setSearchString] = useState("");

    const handleSearch = (searchString) => {
        let filtered = [...products];
        filtered = products.filter((product) => {
            return product.model.toLowerCase().includes(searchString) || product.brand.toLowerCase().includes(searchString);
        });
        
        setSearchedProducts(filtered);
        console.log(filtered);
    };

    const handleChange = (e) => {
        setSearchString(e.target.value.toLowerCase());
    }

    return (
        <form className="search" onSubmit={(e) => {e.preventDefault(); handleSearch(searchString)}}>
            <input className="search-bar" value={searchString} onChange={handleChange} placeholder="Search" />
            <button className="search-button primary"><BsSearch /></button>
        </form>
    )
}