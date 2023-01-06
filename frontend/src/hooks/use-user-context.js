import { useContext } from "react";
import UserContext from "../context/userContext";

export default function useUserContext() {
    return useContext(UserContext);
};