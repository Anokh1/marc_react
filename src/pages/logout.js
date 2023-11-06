import DashboardNavbar from "../components/dashboard_navbar";
import { MDBBtn } from 'mdb-react-ui-kit';
import { signOut } from "firebase/auth";
import { realtimeDb, auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { ref, update } from 'firebase/database'
import LogOut from '../images/logout.png';
import Swal from "sweetalert2";

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


export const Logout = () => {

    const navigate = useNavigate();

    const logout = async () => {
        try {
            await signOut(auth);
            sessionStorage.setItem("parkingName", "");
            // console.log("Logout Successful")
            // console.log(auth?.currentUser?.email);
            navigate("/");

            // if (parkingName == "gurneyParagon") {
            //     update(ref(realtimeDb, 'gurneyParagonCamera'), {
            //         usingGurneyParagon : false
            //     })
            // } else if (parkingName == "gurneyPlaza") {
            //     update(ref(realtimeDb, 'gurneyPlazaCamera'), {
            //         usingGurneyPlaza : false
            //     })
            // } else if (parkingName == "pranginMall") {
            //     update(ref(realtimeDb, 'pranginMallCamera'), {
            //         usingPranginMall : false
            //     })
            // } else if (parkingName == "queensbayMall") {
            //     update(ref(realtimeDb, 'queensbayMallCamera'), {
            //         usingQueensbayMall : false
            //     })
            // }

            // update(ref(realtimeDb, 'cameraStatus'), {
            update(ref(realtimeDb, 'gurneyParagonCamera'), {
                // id: 'cameraStatus',
                // status: true, 
                using : false,
                // usingGurneyParagon : false
            })

            Swal.fire({
                width: 300,
                text: 'Logout successful!',
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false,
            })
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <DashboardNavbar />
            <div className="container" style={{ height: "11vh" }}></div>
            <div className="container" style={{ width: "30vh" }}>
                <div className="row h-100">
                    <div className="col-md-12 mx-auto d-flex flex-column align-items-center">
                        <MDBBtn className='me-1' color='danger' onClick={logout}>
                            L O G O U T
                        </MDBBtn>
                    </div>
                </div>
            </div>
            <div className="col-md-12 mx-auto d-flex flex-column align-items-center">
                <img src={LogOut} className='img-fluid shadow-4' alt='...' />
            </div>
        </>
    )
};
