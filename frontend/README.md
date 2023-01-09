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



Next steps:
1. Document React app so far (especially page filters!);
2. Create wish list functionality.
3. Basket, Checkout, Payment pages!
4. Signup for newsletter CSS.
5. isLoading.
6. Dropdown for shoe sizes.
7. Footer.
