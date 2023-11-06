import { db } from "../config/firebase";
import { getDocs, collection, } from "firebase/firestore"
import { useState, useEffect, } from "react";
import { Link } from "react-router-dom";
import DashboardNavbar from "../components/dashboard_navbar";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
    MDBBtn,
} from 'mdb-react-ui-kit';
import { realtimeDb } from "../config/firebase";
import { set, ref, onValue, update } from "firebase/database";
import Awaiting from '../images/awaiting.png';


export const Dashboard = () => {

    // realtiime db testing code
    const [cameraStatus, setCameraStatus] = useState("");
    const [ocrStatus, setOcrStatus] = useState([]);

    const handleCameraStatusChange = (e) => {
        setCameraStatus(e.target.value);
    };

    // write
    const writeToDatabase = () => {
        const uuid = "cameraStatus1";
        set(ref(realtimeDb, `/${uuid}`), {
            cameraStatus,
            uuid,
        });

        console.log(cameraStatus);

        setCameraStatus("");
    }


    // read
    useEffect(() => {
        onValue(ref(realtimeDb), snapshot => {
            setOcrStatus([]);
            const data = snapshot.val;
            if (data !== null) {
                Object.values(data).map((cameraStatus) => {
                    setOcrStatus((oldArray) => [...oldArray, cameraStatus]);
                    ocrStatus.map((cameraStatus));
                    console.log(ocrStatus); // to display the data in Firebase Realtime Database 
                })
            } else {
                console.log("error");
            }
        })
    }, []);

    // realtime db testing code 

    const [motorcycleList, setMotorcycleList] = useState([]);

    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    var currentParking = sessionStorage.getItem("parkingName");

    // const motorcycleCollectionRef = collection(db, "Motorcycle");
    const motorcycleCollectionRef = collection(db, currentParking);

    // const [data, setData] = useState({ id: "" })

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

    return (
        <>
            <DashboardNavbar />
            <div className="container" style={{ height: "11vh" }}></div>
            <div className="col-md-12 mx-auto d-flex flex-column align-items-center">
                <img src={Awaiting} className='img-fluid shadow-4' alt='...' />
            </div>
            <div className="container" style={{ height: "1vh" }}></div>
            <div>
                {motorcycleList.map((motorcycle) => (
                    motorcycle.date == date ?
                        <div>
                            <MDBRow class="d-flex justify-content-center">
                                <MDBCol sm='8'>
                                    <MDBCard shadow='0' border='primary' background='white' className="mb-3">
                                        <MDBCardBody>
                                            <MDBCardTitle style={{ color: motorcycle.entered ? "green" : "red" }}>{motorcycle.numberPlate}</MDBCardTitle>
                                            <MDBCardText>
                                                {motorcycle.username}
                                            </MDBCardText>
                                            <MDBCardText>
                                                {motorcycle.date}
                                            </MDBCardText>
                                            <MDBBtn color="success" style={{ backgroundColor: '#D9D5D5' }}>
                                                <Link style={{ textDecoration: 'none', color: 'black' }} to="/edit" state={{ data: motorcycle.id }}>
                                                    E D I T
                                                </Link>
                                            </MDBBtn>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </div>
                        :
                        <h1></h1>
                ))}
            </div >
        </>
    )
};