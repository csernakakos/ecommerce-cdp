import SearchBar from "../components/SearchBar";
import { ProductsPage } from "../pages/,pages";

export default function HomePage(){
    return (<div className="page">
        <div className="hero">
            <img className="hero" src={require(`../images/index.jpg`)} />
            <h1>Shoes for athletes</h1>
            <SearchBar/>
        </div>

        <ProductsPage />
    </div>)
}