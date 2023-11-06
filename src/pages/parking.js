import { db, storage } from "../config/firebase";
import { getDoc, collection, doc } from "firebase/firestore"
import { useState, useEffect } from "react";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import DashboardNavbar from "../components/dashboard_navbar";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBInput,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
} from 'mdb-react-ui-kit';
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";


export const Parking = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    var currentUser = "";

    const navigate = useNavigate();

    const verify = async () => {
        if (email === parkingName + "@marc.com") {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                currentUser = auth?.currentUser?.email.toString();
                console.log(currentUser);

                if (currentUser == "gurneyplaza@marc.com") {
                    sessionStorage.setItem("parkingName", "gurneyPlazaMotorcycle");
                    navigate("/status");
                } else if (currentUser == "queensbaymall@marc.com") {
                    sessionStorage.setItem("parkingName", "queensbayMallMotorcycle");
                    navigate("/status");
                } else if (currentUser == "pranginmall@marc.com") {
                    sessionStorage.setItem("parkingName", "pranginMallMotorcycle");
                    navigate("/status");
                } else if (currentUser == "gurneyparagon@marc.com") {
                    sessionStorage.setItem("parkingName", "gurneyParagonMotorcycle");
                    navigate("/status");
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
        } else {
            Swal.fire({
                width: 300,
                text: 'Invalid email!',
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false,
            })
        }
    };


    const [currentParking, setCurrentParking] = useState([]);

    // File Upload State
    const [fileUpload, setFileUpload] = useState(null);

    // display image state
    const [imageList, setImageList] = useState([]);

    const parkingCollectionRef = collection(db, "Parking");

    var currentParkingIdentifier = sessionStorage.getItem("parkingName");

    if (currentParkingIdentifier == "gurneyPlazaMotorcycle") {
        var parkingName = "gurneyPlaza";
        var parkingImageRef = "gurneyPlaza/";
    } else if (currentParkingIdentifier == "pranginMallMotorcycle") {
        var parkingName = "pranginMall";
        var parkingImageRef = "pranginMall/";
    } else if (currentParkingIdentifier == "queensbayMallMotorcycle") {
        var parkingName = "queensbayMall";
        var parkingImageRef = "queensbayMall/";
    } else if (currentParkingIdentifier == "gurneyParagonMotorcycle") {
        var parkingName = "gurneyParagon";
        var parkingImageRef = "gurneyParagon/";
    }

    // var parkingName = "gurneyPlaza";
    // var parkingImageRef = "gurneyPlaza/"; 

    // to access the gurneyPlaza folder to display the images 
    // const imageListRef = ref(storage, "gurneyPlaza/")
    const imageListRef = ref(storage, parkingImageRef);

    class ParkingInformation {
        constructor(name, price, status) {
            this.name = name;
            this.price = price;
            this.status = status;
        }
        toString() {
            return this.name + ',' + this.price + ',' + this.status;
        }
    }

    // Firestore data converter
    const parkingInformationConverter = {
        toFireStore: (parking1) => {
            return {
                name: parking1.name,
                price: parking1.price,
                status: parking1.status
            };
        }, fromFirestore: (snapshot, options) => {
            const data1 = snapshot.data(options);
            return new ParkingInformation(data1.name, data1.price, data1.status);
        }
    }

    const getCurrentParking = async () => {
        const docRef = doc(parkingCollectionRef, parkingName).withConverter(parkingInformationConverter);
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const parkingData = docSnap.data();
            const cleanData = parkingData.toString();
            const cleanDataArray = cleanData.split(',');
            setCurrentParking(cleanDataArray);
        } else {
            console.log("No such document!");
        }
    };

    useEffect(() => {
        getCurrentParking();

        listAll(imageListRef).then((response) => {
            // console.log(response); 
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                })
            })
        })
    }, []);

    // upload image of the parking 
    const uploadFile = async () => {
        // if (!fileUpload) return;
        if (fileUpload === null) {
            Swal.fire({
                width: 300,
                text: 'No image selected!',
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false,
            })
        } else {


            // upload to Firebase Storage folder 
            const filesFolderRef = ref(storage, `${parkingName}/${fileUpload.name}`);
            try {
                await uploadBytes(filesFolderRef, fileUpload).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        setImageList((prev) => [...prev, url])
                    });
                    Swal.fire({
                        width: 300,
                        text: 'Image uploaded!',
                        position: 'top-end',
                        timer: 3000,
                        showConfirmButton: false,
                    })
                });
            } catch (err) {
                console.error(err);
                Swal.fire({
                    width: 300,
                    text: 'Image not uploaded!',
                    position: 'top-end',
                    timer: 3000,
                    showConfirmButton: false,
                })
            }
        }
    };

    return (
        <>
            <DashboardNavbar />
            <div className="container" style={{ height: "11vh" }}></div>

            <MDBRow class="d-flex justify-content-center">
                <MDBCol sm='8'>
                    <h1>Parking Information</h1>
                    <MDBCard shadow='0' border='primary' background='white' className="mb-3">
                        <MDBCardBody>
                            <MDBCardTitle>{currentParking[0]}</MDBCardTitle>
                            <MDBCardText>
                                RM {currentParking[1]}
                            </MDBCardText>
                            <MDBInput type="file" onChange={(e) => setFileUpload(e.target.files[0])}></MDBInput>
                            <div className="container" style={{ height: "2vh" }}></div>
                            <MDBBtn onClick={uploadFile} >
                                Upload Image
                            </MDBBtn>
                            <div className="container" style={{ height: "2vh" }}></div>
                            <MDBCardText>
                                Parking Status: {currentParking[2]}
                            </MDBCardText>
                            <MDBDropdown>
                                <MDBDropdownToggle>Update Status</MDBDropdownToggle>
                                <MDBDropdownMenu style={{ width: '320px' }}>
                                    <form className='px-4 py-3'>
                                        <MDBInput label='Email' type='email' className='mb-4' onChange={(e) => setEmail(e.target.value)} />
                                        <MDBInput label='Password' type='password' className='mb-4' onChange={(e) => setPassword(e.target.value)} />
                                        <button type="button" class="btn btn-primary btn-block mb-4" onClick={verify}>V E R I F Y</button>
                                    </form>
                                    <div className='dropdown-divider'></div>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                            <div className="container" style={{ height: "2vh" }}></div>
                            {imageList.map((url) => {
                                return <MDBRow class="d-flex justify-content-center">
                                    <MDBCol lg='4' md='12' className='mb-4'>
                                        <img src={url} className='img-fluid rounded' alt='' />
                                    </MDBCol>
                                </MDBRow>
                            })}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </>
    )
};