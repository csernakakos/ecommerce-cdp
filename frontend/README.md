# eCommerce CDP app frontend

To run the frontend only: cd ./frontend/ `npm start`

## On first render
When the app starts up, on first render, the app:

1. Fetches `cartID` from the server.
   1. If `cartID` cookie doesn't exist in the browser, the app asks the server for a new cart. The app receives the cart's ID and sets the `cartID` cookie to that value.
   2. If `cartID` cookie exists in the browser, the app asks the server to check if the cart exists in the database. If it doesn't, the app deletes the `cartID` cookie, which reloads the page.
2. Sets `basket` to the `activeCartItems` array of the cart.
3. Sets `basketCounter` to the length of the `activeCartItems` array.
4. Fetches `products` from the server. 
   1. Sets `searchedProducts` to `products` and displays it on the home page. When the user searches, `searchedProducts` is filtered.
   2. Sets `filteredProducts` to `products`. When the user visits the products page with one of the available query string parameters, `filteredProducts` is filtered.



Next steps:
1. Create wish list functionality.
2. Basket, Checkout, Payment pages!
3. Signup for newsletter CSS.
4. isLoading.
5. Dropdown for shoe sizes.
6. Footer.
