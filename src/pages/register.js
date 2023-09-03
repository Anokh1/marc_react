import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./css/register.css";

// this work but the old method does not work
// maybe i missed out some stuffs
// don't remember much
// Firestore let's go
// create a document in Users collection next!

export const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate(); 

    const registerUser = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log(email + " registered");
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    // things that you can see
    return (
        <div class="registerContainer">
            <div class="registerForm">
                <h1>Create Account</h1>
                <br />
                <input class="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <br />
                <input class="input" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button class="submitButton" onClick={registerUser}> Register </button>
            </div>
        </div>
    )
}

