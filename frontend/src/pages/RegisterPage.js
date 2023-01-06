import { useState } from "react";
import { NavLink } from "react-router-dom";
import useUserContext from "../hooks/use-user-context";

export default function RegisterPage() {
    const {registerUser} = useUserContext();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegistration = async (e) => {
        e.preventDefault();
        await registerUser(username, email, password);
        this.props.history.push("/");
    };

    return (<>
        <h1>Register</h1>

        <form className="authentication-form" onSubmit={handleRegistration}>
            <label>
                <span>User name:</span>
                <input required type="text" id="username" onChange={(e) => setUsername(e.target.value)} />
            </label>

            <label>
                <span>Email:</span>
                <input required type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label>
                <span>Password:</span>
                <input required type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
            </label>

            <button className="primary">Register</button>

            <p>Already registered? <NavLink to="/login">Log in now</NavLink>.</p>
        </form>
    </>)
}