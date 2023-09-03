import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Route, BrowserRouter, Routes } from "react-router-dom";
import App from "../App";

import { Edit } from "../pages/edit";
import { Add } from "../pages/add";
import { Register } from "../pages/register";
import { Dashboard } from "../pages/dashboard";
import { Parking } from "../pages/parking";
import { Home } from "../pages/home";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    var currentUser = "";

    const navigate = useNavigate();

    // console.log(auth?.currentUser?.email); 
    //console.log(auth?.currentUser?.photoURL); // to get the photo url of the Google account signed in 

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login Successful")
            console.log(auth?.currentUser?.email);
            currentUser = auth?.currentUser?.email.toString();
            console.log(currentUser);
            console.log(typeof currentUser);
            // navigate("/home"); 
            if (currentUser == "gurneyplaza@marc.com") {
                navigate("/dashboard");
            } else {
                navigate("/home");
            }
        } catch (err) {
            console.error(err)
        }
    };

    // const signInWithGoogle = async () => {
    //     try {
    //         await signInWithPopup(auth, googleProvider);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const logout = async () => {
        try {
            await signOut(auth);
            console.log("Logout Successful")
            console.log(auth?.currentUser?.email);
        } catch (err) {
            console.error(err);
        }
    };

    // if (currentUser == "gurneyplaza@marc.com") {
    //     BrowserRouter = <Routes>
    //     <Route exact path="/" element={<Auth />} />
    //     <Route exact path="/register" element={<Register />} />
    //     <Route exact path="/add" element={<Add />} />
    //     <Route exact path="/edit" element={<Edit />} />
    //     <Route exact path="/parking" element={<Parking />} />
    //     <Route exact path="/dashboard" element={<Dashboard />} />
    //   </Routes>;
    // } else {
    //     BrowserRouter = <Routes>
    //     <Route exact path="/" element={<Auth />} />
    //     <Route exact path="/register" element={<Register />} />
    //     <Route exact path="/home" element={<Home />} />
    //   </Routes>;
    // }

    return (
        <div>
            <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signIn}> Register </button>
            <button onClick={login}> Login </button>
            {/* <button onClick={signInWithGoogle}> Sign In With Google </button> */}
            <button onClick={logout}> Logout </button>
        </div>

    );
};
