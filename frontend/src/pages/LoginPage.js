import { useState } from "react";
import { NavLink } from "react-router-dom";
import useUserContext from "../hooks/use-user-context";
import { VscMail } from "react-icons/vsc";
import { RiLockPasswordLine } from "react-icons/ri";

export default function LoginPage() {
    const {fetchUserID} = useUserContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        await fetchUserID(email, password);
    };


    return (<div className="page">
        <h1>Log in</h1>

        <form className="authentication-form" onSubmit={handleLogin}>
            <label>
                <span><VscMail /><span>Email</span></span>
                <input required type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label>
                <span><RiLockPasswordLine /><span>Password</span></span>
                <input required type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
            </label>

            <button className="primary">Log in</button>

            <p>Need a new account? <NavLink className="form-link" to="/register">Register now</NavLink>.</p>
        </form>
    </div>)
}