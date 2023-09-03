import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, collection, getDoc, deleteDoc, updateDoc } from "firebase/firestore";

export const Edit = () => {
    const [motorcycleList, setMotorcycle] = useState([]);

    const motorcycleCollectionRef = collection(db, "Motorcycle");

    // update information state
    const [updatedNumberPlate, setUpdatedNumberPlate] = useState(""); 

    const location = useLocation();
    const navigate = useNavigate(); 

    // data1 is the ID for the document in Firebase obtained from the home.js 
    const data1 = location.state?.data;

    // there is no need to update the information here
    // this is for String datatype
    // that can be use for the parking page
    // there is another file for int datatype
    const updateNumberPlate = async (id) => {
        // just for testing 
        // console.log(data1);
        const motorcycleDoc = doc(motorcycleCollectionRef, id);
        await updateDoc(motorcycleDoc, { numberPlate: updatedNumberPlate }); 
        getMotorcycle();  
    }

    const deleteMotorcycle = async () => {
        // deleting by using the data obtained from home.js
        // const motorcycleDoc = doc(motorcycleCollectionRef, data1);
        // deleting by using the data from motorcycleList 
        const motorcycleDoc = doc(motorcycleCollectionRef, motorcycleList[1]);
        await deleteDoc(motorcycleDoc);
        navigate("/dashboard"); 
    }

    // Custom objects because there is a problem in fetching data directly using getDoc method
    // https://firebase.google.com/docs/firestore/query-data/get-data
    class Motorcycle {
        constructor (entered, numberPlate, username) {
            this.entered = entered;
            this.numberPlate = numberPlate;
            this.username = username;
        }
        toString() {
            return this.entered + ',' + this.numberPlate + ',' + this.username;
        }
    }

    // Firestore data converter
    const motorcycleConverter = {
        toFirestore: (motorcycle1) => {
            return {
                entered: motorcycle1.entered,
                numberPlate: motorcycle1.numberPlate,
                username: motorcycle1.username
            };
        }, fromFirestore: (snapshot, options) => {
            const data2 = snapshot.data(options);
            return new Motorcycle(data2.entered, data2.numberPlate, data2.username); 
        }
    };


    const getMotorcycle = async () => {

        const docRef = doc(motorcycleCollectionRef, data1).withConverter(motorcycleConverter);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data("username"));
            const motorcycle1 = docSnap.data(); 
            // console.log(motorcycle1.toString()); 
            const cleanData = motorcycle1.toString(); 
            // console.log(cleanData); 
            const cleanDataArray = cleanData.split(','); 
            // console.log(cleanDataArray[1]); 
            setMotorcycle(cleanDataArray); 
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    };

    useEffect(() => {
        getMotorcycle();
    }, []); 
    // removing the empty array 
    // will cause the getMotorcycle() to be called repeatedly
    // there will be output in the console
    // hence, after data is updated, getMotorcycle() need to be called again
    // to display the latest information
    
    return (
        <div>
            <h1>Edit Motorcycle Information</h1>
            <button onClick={deleteMotorcycle}>D E L E T E</button>
            <h2 style={{ color: motorcycleList[0] == "true" ? "green" : "red" }}>
                {motorcycleList[0]}
            </h2>
            <p>{motorcycleList[2]}</p>
            <div>
            <input placeholder='Edit Number Plate' onChange={(e) => setUpdatedNumberPlate(e.target.value)} ></input>
            </div>
            <div>
            <button onClick={() => updateNumberPlate(motorcycleList[1])}>
                Update
              </button> 
            </div>
        </div>
    )
};

