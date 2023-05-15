# eCommerce CDP app backend

To run the backend only: cd ./backend/ `npm start`

The backend provides API calls to the following resources:

- users
- carts
- products

All API calls are available to test in the `requests` folder.

## Users

Most operations on this resource require authentication.
Without authentication, you can register, log in, and log out.
With the `masterKey`, you can fetch all users.
With the bearer token, you can:

- Fetch, update, and delete a user.
- Fetch all the carts that belong to the user.

## Carts

This resource does not require authentication.
Without authentication, you can:

- Fetch all carts.
- Create, fetch, update, and delete a cart.
- Delete stale carts. Stale carts are unused carts. A cart is stale if all of the following apply:
  - More than 10 minutes passed since the cart was created.
  - The cart status is `pending`.
  - All cart arrays are empty.
- Create a cart item, update the quantity of it, and remove it.
- Empty the `removedCartItems` array of a cart.

## Products

This resource does not require authentication.
Without authentication, you can:

- Fetch and delete all products.
- Create, fetch, update, and delete a product.

## Query MongoDB

To make a MongoDB query:

```bash
mongosh "mongodb+srv://cluster.<clusterID>.mongodb.net/ecommerce-cdp" --apiVersion 1 --username <userName>
show dbs
use test
db.users.find()
db.users.find({id: ObjectId("____")})
```
