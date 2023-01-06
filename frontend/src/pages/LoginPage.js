import { useState } from "react";
import { NavLink } from "react-router-dom";
import useUserContext from "../hooks/use-user-context";

export default function LoginPage() {
    const {fetchUserID} = useUserContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        await fetchUserID(email, password);
    };


    return (<>
        <h1>Login</h1>

        <form className="authentication-form" onSubmit={handleLogin}>
            <label>
                <span>Email:</span>
                <input required type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label>
                <span>Password:</span>
                <input required type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
            </label>

            <button className="primary">Log in</button>

            <p>Need a new account? <NavLink to="/register">Register now</NavLink>.</p>
        </form>
    </>)
}