import { db, storage } from "../config/firebase";
import { getDoc, collection, doc, updateDoc, } from "firebase/firestore"
import { useState, useEffect } from "react";
import { Navbar } from "../components/navbar/navbar";
import { ref, uploadBytes } from "firebase/storage";

export const Parking = () => {
    const [currentParking, setCurrentParking] = useState([]);

    // File Upload State
    const [fileUpload, setFileUpload] = useState(null);

    const parkingCollectionRef = collection(db, "Parking");

    const [updatedParkingStatus, setUpdatedParkingStatus] = useState("");

    const parkingName = "gurneyPlaza";

    const updateParkingStatus = async (id) => {
        const parkingDoc = doc(parkingCollectionRef, id);
        await updateDoc(parkingDoc, { status: updatedParkingStatus });
        getCurrentParking();
    }

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
    }, []);

    // upload image of the parking 
    const uploadFile = async () => {
        if (!fileUpload) return;

        const filesFolderRef = ref(storage, `gurneyPlaza/${fileUpload.name}`);
        try {
            await uploadBytes(filesFolderRef, fileUpload);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Navbar />
            <div>
                <h1>Parking Information</h1>
                <h2>{currentParking[0]}</h2>
                {/* <button onClick={deleteMotorcycle}>D E L E T E</button> */}
                <h2 style={{ color: currentParking[0] == "true" ? "green" : "red" }}>
                    {currentParking[1]}
                </h2>
                <p>{currentParking[2]}</p>
                <div>
                    <input placeholder='Edit Parking Status' onChange={(e) => setUpdatedParkingStatus(e.target.value)} ></input>
                </div>
                <div>
                    <button onClick={() => updateParkingStatus(parkingName)}>
                        Update
                    </button>
                </div>

                <div>
                    <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}></input>
                    <button onClick={uploadFile}> Upload File </button>
                </div>
            </div>
        </>
    )
};