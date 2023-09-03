import { Auth } from "../components/auth";
import { Navbar } from "../components/navbar/navbar";
import { db } from "../config/firebase";
import { getDocs, collection, addDoc, setDoc, deleteDoc, updateDoc, doc, getFirestore } from "firebase/firestore"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Add = () => {
    const [motorcycleList, setMotorcycleList] = useState([]);

    const motorcycleCollectionRef = collection(db, "Motorcycle");

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
        try {
            await setDoc((doc(motorcycleCollectionRef, newNumberPlate)), {
                // ID will be auto generated when you add a document 
                // I want a custom ID to the document
                numberPlate: newNumberPlate,
                username: newUsername,
                entered: newEntered,
            });
            getMotorcycleList();
        navigate("/dashboard"); 
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
        <Navbar />
        <div>
            <input placeholder='Number Plate' onChange={(e) => setNewNumberPlate(e.target.value)}></input>
            <input placeholder='Username' onChange={(e) => setNewUsername(e.target.value)}></input>
            <input type='checkbox' checked={newEntered} onChange={(e) => setNewEntered(e.target.checked)}></input>
            <label>Entered</label>

            <button onClick={onSubmitNumberPlate}> Submit </button>

        </div>
        </>
    )

}