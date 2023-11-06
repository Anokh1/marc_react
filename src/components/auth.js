import { useState } from "react";
import { realtimeDb, auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ref, update } from 'firebase/database'


export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    var currentUser = "";

    const navigate = useNavigate();

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // console.log("Login Successful")
            // console.log(auth?.currentUser?.email);
            currentUser = auth?.currentUser?.email.toString();
            // console.log(currentUser);
            // console.log(typeof currentUser);
            if (currentUser == "gurneyplaza@marc.com") {
                sessionStorage.setItem("parkingName", "gurneyPlazaMotorcycle");
                navigate("/dashboard");
            } else if (currentUser == "queensbaymall@marc.com") {
                sessionStorage.setItem("parkingName", "queensbayMallMotorcycle");
                navigate("/dashboard");
            } else if (currentUser == "pranginmall@marc.com") {
                sessionStorage.setItem("parkingName", "pranginMallMotorcycle");
                navigate("/dashboard");
            } else if (currentUser == "gurneyparagon@marc.com") {
                sessionStorage.setItem("parkingName", "gurneyParagonMotorcycle");
                navigate("/dashboard");

                // update(ref(realtimeDb, 'cameraStatus'), {
                update(ref(realtimeDb, 'gurneyParagonCamera'), {
                    // id: 'cameraStatus',
                    // status: true, 
                    using: true
                })
            } else {
                navigate("/home");
            }
        } catch (err) {
            console.error(err)
            Swal.fire({
                width: 300,
                text: 'Invalid email or password!',
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false,
            })
        }
    };

    return (
        <div className="container" style={{ height: "80vh" }}>
            <div className="container" style={{ height: "20vh" }}>
            </div>
            <div className="row h-100">
                <div className="col-md-5 mx-auto d-flex flex-column align-items-center">
                    <form>
                        {/* Email input */}
                        <div class="form-outline mb-4">
                            <input type="email" id="form2Example1" class="form-control" onChange={(e) => setEmail(e.target.value)} />
                            <label class="form-label" for="form2Example1">
                                {email.length === 0 ? "E M A I L" : ""}
                            </label>
                        </div>

                        {/* Password input */}
                        <div class="form-outline mb-4">
                            <input type="password" id="form2Example2" class="form-control" onChange={(e) => setPassword(e.target.value)} />
                            <label class="form-label" for="form2Example2">
                                {password.length === 0 ? "P A S S W O R D" : ""}
                            </label>
                        </div>

                        {/* Submit button */}
                        <button type="button" class="btn btn-primary btn-block mb-4" onClick={login}>L O G I N</button>

                        {/* Register button */}
                        {/* <div class="text-center">
                            <p> Don't have an account?  <a href="/register">Register here</a></p>
                        </div> */}
                        <div class="text-center">
                            <p>Motorcycle Autonomous Riding Card </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
