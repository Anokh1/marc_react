import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, collection, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import DashboardNavbar from "../components/dashboard_navbar";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
} from 'mdb-react-ui-kit';
import Swal from "sweetalert2";


export const Edit = () => {
    const [motorcycleList, setMotorcycle] = useState([]);

    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const parkingIdDate = "_" + currentDate.getDate() + "_" + (currentDate.getMonth() + 1) + "_" + currentDate.getFullYear();

    var currentParking = sessionStorage.getItem("parkingName");

    // const motorcycleCollectionRef = collection(db, "Motorcycle");
    const motorcycleCollectionRef = collection(db, currentParking);

    // update information state
    const [updatedNumberPlate, setUpdatedNumberPlate] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    // data1 is the ID for the document in Firebase obtained from the dashboard.js 
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
        // deleting by using the data obtained from dashboard.js
        // const motorcycleDoc = doc(motorcycleCollectionRef, data1);
        // deleting by using the data from motorcycleList 
        var deletingNumberPlate = motorcycleList[1];
        var numberPlateId = motorcycleList[1] + parkingIdDate;
        const motorcycleDoc = doc(motorcycleCollectionRef, numberPlateId);
        await deleteDoc(motorcycleDoc);
        navigate("/dashboard");
        Swal.fire({
            width: 300,
            text: deletingNumberPlate + ' have been deleted!',
            position: 'top-end',
            timer: 3000,
            showConfirmButton: false,
        })
    }

    // Custom objects because there is a problem in fetching data directly using getDoc method
    // https://firebase.google.com/docs/firestore/query-data/get-data
    class Motorcycle {
        constructor(entered, numberPlate, username) {
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
        <>
            <DashboardNavbar />
            <div className="container" style={{ height: "11vh" }}></div>
            <MDBRow class="d-flex justify-content-center">
                <MDBCol sm='8'>
                    <MDBCard shadow='0' border='primary' background='white' className="mb-3">
                        <MDBCardBody>
                            <MDBCardTitle>{motorcycleList[1]}</MDBCardTitle>
                            <MDBCardText>
                                {motorcycleList[2]}
                            </MDBCardText>
                            <div>
                                <button type="button" style={{ width: "33vh" }} class="btn btn-danger" onClick={deleteMotorcycle}>D E L E T E</button>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </>
    )
};

