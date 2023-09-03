import { Auth } from "../components/auth";
import { db } from "../config/firebase";
import { getDocs, collection, doc, } from "firebase/firestore"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
    const [motorcycleList, setMotorcycleList] = useState([]);

    const motorcycleCollectionRef = collection(db, "Motorcycle");

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

    // const editMotorcycle = async (id) => {
    //     //const motorcycleDoc = doc(motorcycleCollectionRef, id);

    //     console.log(id);
    //     <Link
    //         to={{
    //             pathname: "/edit",
    //             state: id
    //         }}
    //     >Here</Link>
    // }

    return (
        <div>
            <h1>Home</h1>
            <h2>this is the homepage and normal users can only see this</h2>
            {/* {motorcycleList.map((motorcycle) => (
                <div>
                    <h1 style={{ color: motorcycle.entered ? "green" : "red" }}>
                        {motorcycle.numberPlate}
                    </h1>
                    <p> {motorcycle.username} </p>
                    <form> */}
                        {/* Link tag to pass information to another page */}
                        {/* https://medium.com/frontendweb/how-to-pass-state-or-data-in-react-router-v6-c366db9ee2f4 */}
                        {/* <Link to="/edit" state={{ data: motorcycle.id }}>
                            E D I T */}
                        {/* </Link>
                    </form>
                </div>
            ))} */}
        </div>
    )
};