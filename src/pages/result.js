import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, collection, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
// import DashboardNavbar from "../components/dashboard_navbar";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
    MDBBtn,
} from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import SearchNavbar from "../components/search_navbar";

export const Result = () => {
    const [motorcycleList, setMotorcycle] = useState([]);

    var currentParking = sessionStorage.getItem("parkingName");

    // const motorcycleCollectionRef = collection(db, "Motorcycle");
    const motorcycleCollectionRef = collection(db, currentParking);

    const location = useLocation();
    const navigate = useNavigate();

    // data1 is the ID for the document in Firebase obtained from the dashboard.js 
    const data1 = location.state?.data;

    // Custom objects because there is a problem in fetching data directly using getDoc method
    // https://firebase.google.com/docs/firestore/query-data/get-data
    class Motorcycle {
        constructor(entered, numberPlate, username, date) {
            this.entered = entered;
            this.numberPlate = numberPlate;
            this.username = username;
            this.date = date;
        }
        toString() {
            return this.entered + ',' + this.numberPlate + ',' + this.username + ',' + this.date;
        }
    }

    // Firestore data converter
    const motorcycleConverter = {
        toFirestore: (motorcycle1) => {
            return {
                entered: motorcycle1.entered,
                numberPlate: motorcycle1.numberPlate,
                username: motorcycle1.username,
                date: motorcycle1.date
            };
        }, fromFirestore: (snapshot, options) => {
            const data2 = snapshot.data(options);
            return new Motorcycle(data2.entered, data2.numberPlate, data2.username, data2.date,);
        }
    };

    const getMotorcycle = async () => {

        if (data1 != "") {
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
        }
    };

    useEffect(() => {
        getMotorcycle();
    }, []);

    if (motorcycleList.length == 0) {
        return (
            <>
                <SearchNavbar />
                <div className="container" style={{ height: "11vh" }}></div>
                <div>
                    <MDBRow class="d-flex justify-content-center">
                        {/* <MDBCol lg='6'>
                            <h1>Number plate does not exists</h1>
                        </MDBCol> */}
                        <h1>Number plate does not exists</h1>

                    </MDBRow>
                </div>
            </>
        )
    } else {
        return (
            <>
                <SearchNavbar />
                <div className="container" style={{ height: "11vh" }}></div>
                <div>
                    <MDBRow class="d-flex justify-content-center">
                        <MDBCol sm='8'>
                            <MDBCard shadow='0' border='primary' background='white' className="mb-3">
                                <MDBCardBody>
                                    <MDBCardTitle>{motorcycleList[1]}</MDBCardTitle>
                                    <MDBCardText>
                                        {motorcycleList[2]}
                                    </MDBCardText>
                                    <MDBCardText>
                                        {motorcycleList[3]}
                                    </MDBCardText>
                                    {/* <MDBBtn color="success" style={{ backgroundColor: '#D9D5D5' }}>
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/edit" state={{ data: motorcycleList[1] }}>
                                            E D I T
                                        </Link>
                                    </MDBBtn> */}
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </div>
            </>
        )
    }


}