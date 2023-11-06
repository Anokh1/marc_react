import { db } from "../config/firebase";
import { collection, doc, updateDoc, } from "firebase/firestore"
import DashboardNavbar from "../components/dashboard_navbar";
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import StaTus from '../images/status.png';

export const Status = () => {

    const parkingCollectionRef = collection(db, "Parking");

    const navigate = useNavigate();

    var currentParkingIdentifier = sessionStorage.getItem("parkingName");

    if (currentParkingIdentifier == "gurneyPlazaMotorcycle") {
        var parkingName = "gurneyPlaza";
    } else if (currentParkingIdentifier == "pranginMallMotorcycle") {
        var parkingName = "pranginMall";
    } else if (currentParkingIdentifier == "queensbayMallMotorcycle") {
        var parkingName = "queensbayMall";
    } else if (currentParkingIdentifier == "gurneyParagonMotorcycle") {
        var parkingName = "gurneyParagon";
    }

    const updateParkingStatus = async (id, newStatus) => {
        const parkingDoc = doc(parkingCollectionRef, id);
        try {
            await updateDoc(parkingDoc, { status: newStatus });
            navigate("/dashboard");
            Swal.fire({
                width: 300,
                text: 'Parking status updated!',
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false,
            })
        } catch (err) {
            Swal.fire({
                width: 300,
                text: 'Parking status update failed!',
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
            <div className="container" style={{ width: "100vh" }}>
                <div className="col-md-12 mx-auto d-flex flex-column align-items-center">
                    <h1>Update parking status</h1>
                    <div className="container" style={{ height: "2vh" }}></div>
                    <div className="row-md-12">
                        <MDBBtn className='me-1' color='success' onClick={() => updateParkingStatus(parkingName, "Available")}>
                            Available
                        </MDBBtn>
                        <MDBBtn className='me-1' color='warning' onClick={() => updateParkingStatus(parkingName, "Maintenance")}>
                            Maintenance
                        </MDBBtn>
                        <MDBBtn className='me-1' color='danger' onClick={() => updateParkingStatus(parkingName, "Full")}>
                            Full
                        </MDBBtn>
                    </div>
                </div>
            </div>
            <div className="col-md-12 mx-auto d-flex flex-column align-items-center">
                <img src={StaTus} className='img-fluid shadow-4' alt='...' />
            </div>
        </>
    )
};
