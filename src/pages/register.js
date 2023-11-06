import { useState } from "react";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, setDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";

// this work but the old method does not work
// maybe i missed out some stuffs
// don't remember much
// Firestore let's go
// create a document in Users collection next!

export const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userCollectionRef = collection(db, "Users");

    const navigate = useNavigate();

    const registerUser = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            await setDoc((doc(userCollectionRef, email)), {
                numberPlate: "",
                username: "",
                pin: "",
                credit: "0.00",
                gurneyParagon: false,
                gurneyPlaza: false,
                pranginMall: false,
                queensbayMall: false
            });

            console.log(email + " registered");
            navigate("/");

            Swal.fire({
                width: 300,
                text: 'Welcome to M A R C !',
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false,
            })
        } catch (err) {
            console.error(err);
            Swal.fire({
                width: 300,
                text: 'Invalid information provided!',
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false,
            })
        }
    };

    // things that you can see
    return (
        <div className="container" style={{ height: "80vh" }}>
            <div className="container" style={{ height: "20vh" }}></div>
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
                                {email.length === 0 ? "P A S S W O R D" : ""}
                            </label>
                        </div>

                        {/* Submit button */}
                        <button type="button" class="btn btn-primary btn-block mb-4" onClick={registerUser}>R E G I S T E R</button>

                        {/* Register button */}
                        <div class="text-center">
                            {/* <p>Already have an account? <a href="/login">Login here</a></p> */}
                            <p>Already have an account? <a href="/">Login here</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

