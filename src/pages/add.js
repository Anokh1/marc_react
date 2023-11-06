import { db } from "../config/firebase";
import { getDocs, collection, setDoc, doc, } from "firebase/firestore"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/dashboard_navbar";
import { MDBCheckbox } from "mdb-react-ui-kit";
import Swal from "sweetalert2";

export const Add = () => {
    const [motorcycleList, setMotorcycleList] = useState([]);

    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const parkingIdDate = "_" + currentDate.getDate() + "_" + (currentDate.getMonth() + 1) + "_" + currentDate.getFullYear();

    var currentParking = sessionStorage.getItem("parkingName");

    const motorcycleCollectionRef = collection(db, currentParking);

    const navigate = useNavigate();

    // New Motorcycle States
    const [newNumberPlate, setNewNumberPlate] = useState([]);
    const [newUsername, setNewUsername] = useState([]);
    const [newEntered, setNewEntered] = useState(false);

    const getMotorcycleList = async () => {
        // READ THE DATA
        // SET THE MOTORCYCLE LIST
        try {
            const data = await getDocs(motorcycleCollectionRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log({ filteredData });
            setMotorcycleList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getMotorcycleList();
    }, []);

    // To use a custom ID you need to use
    // .set instead of .add
    const onSubmitNumberPlate = async () => {
        if (newNumberPlate != "" && newUsername != "") {
            try {
                await setDoc((doc(motorcycleCollectionRef, newNumberPlate + parkingIdDate)), {
                    // ID will be auto generated when you add a document 
                    // I want a custom ID to the document
                    numberPlate: newNumberPlate,
                    username: newUsername,
                    entered: newEntered,
                    date: date,
                });
                getMotorcycleList();
                navigate("/dashboard");
                Swal.fire({
                    width: 300,
                    text: newNumberPlate + ' have been added!',
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
        } else {
            Swal.fire({
                width: 300,
                text: 'Invalid information provided!',
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false,
            }) 
        }
    };

    return (
        <>
            <DashboardNavbar />
            <div className="container" style={{ height: "11vh" }}></div>
            <div className="container" style={{ width: "60vh" }}>
                <div className="row h-100">
                    <div className="col-md-12 mx-auto d-flex flex-column align-items-center">

                        <h1>Add motorcycle</h1>
                        <div className="container" style={{ height: "2vh" }}></div>
                        <form>

                            {/* Username input */}
                            <div class="form-outline mb-4">
                                <input id="form2Example1" class="form-control" onChange={(e) => setNewUsername(e.target.value)} />
                                <label class="form-label" for="form2Example1">
                                    {newUsername.length === 0 ? "U S E R N A M E" : ""}
                                </label>
                            </div>

                            {/* Number plate input */}
                            <div class="form-outline mb-4">
                                <input id="form2Example1" class="form-control" onChange={(e) => setNewNumberPlate(e.target.value)} />
                                <label class="form-label" for="form2Example1">
                                    {newNumberPlate.length === 0 ? "N U M B E R   P L A T E" : ""}
                                </label>
                            </div>

                            <MDBCheckbox
                                wrapperClass='d-flex justify-content-center mb-4'
                                id='form5Example3'
                                label='The motorcycle have entered the parking lot.'
                                // defaultChecked
                                checked={newEntered} onChange={(e) => setNewEntered(e.target.checked)}
                            />

                            {/* Submit button */}
                            <button type="button" class="btn btn-primary btn-block mb-4" onClick={onSubmitNumberPlate}>S U B M I T</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};