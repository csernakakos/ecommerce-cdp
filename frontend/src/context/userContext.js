import { useState, useCallback, createContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useCartContext from "../hooks/use-cart-context";
import { useNavigate } from "react-router-dom";
const UserContext = createContext();
const baseURL = "http://localhost:5000/api/v1";

export function UserProvider({ children }) {
    const navigate = useNavigate();
    const {cartID} = useCartContext();
    const [username, setUsername] = useState(Cookies.get("username") || null);
    const [userID, setUserID] = useState(Cookies.get("userID") || null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!userID);

    const registerUser = async (username, email, password) => {
        try {
            const response = await axios.post(`${baseURL}/users/signup`, {
                username,
                email,
                password,
            });
            const userID = response.data.data.user._id;

            setUserID(userID);
            setIsLoggedIn(!!userID);
            setUsername(username);
            connectCartToUser(cartID, userID);
            Cookies.set("userID", userID, { sameSite: "strict" });
            Cookies.set("username", username, { sameSite: "strict" });
            navigate("/");
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const fetchUserID = async (email, password) => {
        try {
            const response = await axios.post(`${baseURL}/users/login`, {
                email,
                password,
            });
            const userID = response.data.data.user._id;
            const username = response.data.data.user.username;

            setUserID(userID);
            setIsLoggedIn(!!userID);
            setUsername(username);
            connectCartToUser(cartID, userID);
            Cookies.set("userID", userID, { sameSite: "strict" });
            Cookies.set("username", username, { sameSite: "strict" });
            navigate("/");
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const deleteUserID = () => {
        setUserID(null);
        setIsLoggedIn(!!userID);
        Cookies.remove("userID");
        window.location.reload(false);
    };

    const connectCartToUser = async (cartID, userID) => {
        const response = await axios.patch(`${baseURL}/carts/${cartID}`, {
            cartID,
            relatedUserID: userID
        });
    };

    const contextValues = {
        userID,
        username,
        fetchUserID,
        registerUser,
        deleteUserID,
        isLoggedIn,
        setIsLoggedIn,
    };


    return (
        <UserContext.Provider value={contextValues}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;