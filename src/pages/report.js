import { db } from "../config/firebase";
import { getDocs, collection, } from "firebase/firestore"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/dashboard_navbar";
import { MDBBtn, MDBRow, } from "mdb-react-ui-kit";
import { TodayReport } from "../components/reports/today";

export const Report = () => {
    const [motorcycleList, setMotorcycleList] = useState([]);

    const navigate = useNavigate();

    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    var currentParking = sessionStorage.getItem("parkingName");

    var motorcycleToday = 0;
    var motorcycleEnteredToday = 0;
    var motorcycleEntered = 0;
    var motorcycleIncoming = 0;

    // motorcycle monthly counter
    var motorcycleJanuary = 0;
    var motorcycleFebruary = 0;
    var motorcycleMarch = 0;
    var motorcycleApril = 0;
    var motorcycleMay = 0;
    var motorcycleJune = 0;
    var motorcycleJuly = 0;
    var motorcycleAugust = 0;
    var motorcycleSeptember = 0;
    var motorcycleOctober = 0;
    var motorcycleNovember = 0;
    var motorcycleDecember = 0;

    // motorcycle entered counter
    var motorcycleEnteredJanuary = 0;
    var motorcycleEnteredFebruary = 0;
    var motorcycleEnteredMarch = 0;
    var motorcycleEnteredApril = 0;
    var motorcycleEnteredMay = 0;
    var motorcycleEnteredJune = 0;
    var motorcycleEnteredJuly = 0;
    var motorcycleEnteredAugust = 0;
    var motorcycleEnteredSeptember = 0;
    var motorcycleEnteredOctober = 0;
    var motorcycleEnteredNovember = 0;
    var motorcycleEnteredDecember = 0;

    // motorcycle incoming counter
    var motorcycleIncomingJanuary = 0;
    var motorcycleIncomingFebruary = 0;
    var motorcycleIncomingMarch = 0;
    var motorcycleIncomingApril = 0;
    var motorcycleIncomingMay = 0;
    var motorcycleIncomingJune = 0;
    var motorcycleIncomingJuly = 0;
    var motorcycleIncomingAugust = 0;
    var motorcycleIncomingSeptember = 0;
    var motorcycleIncomingOctober = 0;
    var motorcycleIncomingNovember = 0;
    var motorcycleIncomingDecember = 0;

    const motorcycleCollectionRef = collection(db, currentParking);

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

    // total number of motorcycle today
    motorcycleList.forEach((element, index, array) => {
        if (element.date == date) {
            motorcycleToday += 1;
            sessionStorage.setItem("today", motorcycleToday);
        }
    });

    // total number of motorcycle entered today
    motorcycleList.forEach((element, index, array) => {
        if (element.date == date && element.entered == true) {
            motorcycleEnteredToday += 1;
            sessionStorage.setItem("entered", motorcycleEnteredToday);
        } else if (element.date == date && element.entered == false) {
            motorcycleIncoming += 1;
            sessionStorage.setItem("incoming", motorcycleIncoming);
        }
    });

    // total number of motorcycle entered 
    motorcycleList.forEach((element, index, array) => {
        if (element.entered == true) {
            motorcycleEntered += 1;
        }
    });

    motorcycleList.forEach((element, index, array) => {
        console.log(element.id);
        var reportID = String(element.id);
        const reportIdArray = reportID.split("_");
        // console.log(reportIdArray);
        var reportDate = String(element.date);
        const reportDateArray = reportDate.split("/");
        if (reportDateArray[1] == "1") {
            motorcycleJanuary += 1;
            if (element.entered == true) {
                motorcycleEnteredJanuary += 1;
            } else {
                motorcycleIncomingJanuary += 1;
            }
        }
        else if (reportDateArray[1] == "2") {
            motorcycleFebruary += 1;
            if (element.entered == true) {
                motorcycleEnteredFebruary += 1;
            } else {
                motorcycleIncomingFebruary += 1;
            }
        }
        else if (reportDateArray[1] == "3") {
            motorcycleMarch += 1;
            if (element.entered == true) {
                motorcycleEnteredMarch += 1;
            } else {
                motorcycleIncomingMarch += 1;
            }
        }
        else if (reportDateArray[1] == "4") {
            motorcycleApril += 1;
            if (element.entered == true) {
                motorcycleEnteredApril += 1;
            } else {
                motorcycleIncomingApril += 1;
            }
        }
        else if (reportDateArray[1] == "5") {
            motorcycleMay += 1;
            if (element.entered == true) {
                motorcycleEnteredMay += 1;
            } else {
                motorcycleIncomingMay += 1;
            }
        }
        else if (reportDateArray[1] == "6") {
            motorcycleJune += 1;
            if (element.entered == true) {
                motorcycleEnteredJune += 1;
            } else {
                motorcycleIncomingJune += 1;
            }
        }
        else if (reportDateArray[1] == "7") {
            motorcycleJuly += 1;
            if (element.entered == true) {
                motorcycleEnteredJuly += 1;
            } else {
                motorcycleIncomingJuly += 1;
            }
        }
        else if (reportDateArray[1] == "8") {
            motorcycleAugust += 1;
            if (element.entered == true) {
                motorcycleEnteredAugust += 1;
            } else {
                motorcycleIncomingAugust += 1;
            }
        }
        else if (reportDateArray[1] == "9") {
            motorcycleSeptember += 1;
            if (element.entered == true) {
                motorcycleEnteredSeptember += 1;
            } else {
                motorcycleIncomingSeptember += 1;
            }
        }
        else if (reportIdArray[2] == "10" && reportIdArray[3] == "2023") {
            motorcycleOctober += 1;
            if (element.entered == true) {
                motorcycleEnteredOctober += 1;
            } else {
                motorcycleIncomingOctober += 1;
            }
        }
        else if (reportDateArray[1] == "11") {
            motorcycleNovember += 1;
            if (element.entered == true) {
                motorcycleEnteredNovember += 1;
            } else {
                motorcycleIncomingNovember += 1;
            }
        }
        else if (reportDateArray[1] == "12") {
            motorcycleDecember += 1;
            if (element.entered == true) {
                motorcycleEnteredDecember += 1;
            } else {
                motorcycleIncomingDecember += 1;
            }
        }
    });

    console.log("Motorcycle Today: " + motorcycleToday);
    console.log("Motorcycle Entered Today: " + motorcycleEnteredToday);
    console.log("Motorcycle Incoming: " + motorcycleIncoming);
    console.log("Motorcycle Entered: " + motorcycleEntered);

    console.log("Motorcycle September: " + motorcycleSeptember);
    console.log("Motorcycle August: " + motorcycleAugust);
    console.log("Motorcycle December: " + motorcycleDecember);

    useEffect(() => {
        getMotorcycleList();
    }, []);

    function janReport() {
        sessionStorage.setItem("january", motorcycleJanuary)
        sessionStorage.setItem("januaryEntered", motorcycleEnteredJanuary)
        sessionStorage.setItem("januaryIncoming", motorcycleIncomingJanuary)
        navigate("/januaryReport");
    }

    function febReport() {
        sessionStorage.setItem("february", motorcycleFebruary)
        sessionStorage.setItem("februaryEntered", motorcycleEnteredFebruary)
        sessionStorage.setItem("februaryIncoming", motorcycleIncomingFebruary)
        navigate("/februaryReport");
    }

    function marReport() {
        sessionStorage.setItem("march", motorcycleMarch)
        sessionStorage.setItem("marchEntered", motorcycleEnteredMarch)
        sessionStorage.setItem("marchIncoming", motorcycleIncomingMarch)
        navigate("/marchReport");
    }

    function aprReport() {
        sessionStorage.setItem("april", motorcycleApril)
        sessionStorage.setItem("aprilEntered", motorcycleEnteredApril)
        sessionStorage.setItem("aprilIncoming", motorcycleIncomingApril)
        navigate("/aprilReport");
    }

    function mayReport() {
        sessionStorage.setItem("may", motorcycleMay)
        sessionStorage.setItem("mayEntered", motorcycleEnteredMay)
        sessionStorage.setItem("mayyIncoming", motorcycleIncomingMay)
        navigate("/mayReport");
    }

    function junReport() {
        sessionStorage.setItem("june", motorcycleJune)
        sessionStorage.setItem("juneEntered", motorcycleEnteredJune)
        sessionStorage.setItem("juneIncoming", motorcycleIncomingJune)
        navigate("/juneReport");
    }

    function julReport() {
        sessionStorage.setItem("july", motorcycleJuly)
        sessionStorage.setItem("julyEntered", motorcycleEnteredJuly)
        sessionStorage.setItem("julyIncoming", motorcycleIncomingJuly)
        navigate("/julyReport");
    }

    function augReport() {
        sessionStorage.setItem("august", motorcycleAugust)
        sessionStorage.setItem("augustEntered", motorcycleEnteredAugust)
        sessionStorage.setItem("augustIncoming", motorcycleIncomingAugust)
        navigate("/augustReport");
    }

    function sepReport() {
        sessionStorage.setItem("september", motorcycleSeptember)
        sessionStorage.setItem("septemberEntered", motorcycleEnteredSeptember)
        sessionStorage.setItem("septemberIncoming", motorcycleIncomingSeptember)
        navigate("/septemberReport");
    }

    function octReport() {
        sessionStorage.setItem("october", motorcycleOctober)
        sessionStorage.setItem("octoberEntered", motorcycleEnteredOctober)
        sessionStorage.setItem("octoberIncoming", motorcycleIncomingOctober)
        navigate("/octoberReport");
    }

    function novReport() {
        sessionStorage.setItem("november", motorcycleNovember)
        sessionStorage.setItem("novemberEntered", motorcycleEnteredNovember)
        sessionStorage.setItem("novemberIncoming", motorcycleIncomingNovember)
        navigate("/novemberReport");
    }

    function decReport() {
        sessionStorage.setItem("december", motorcycleDecember)
        sessionStorage.setItem("decemberEntered", motorcycleEnteredDecember)
        sessionStorage.setItem("decemberIncoming", motorcycleIncomingDecember)
        navigate("/decemberReport");
    }

    return (
        <>
            <DashboardNavbar />
            <div className="container" style={{ height: "15vh" }}></div>
            <div className="container" style={{ width: "60vh" }}>
                <div className="row h-100">
                    <div className="col-md-5 mx-auto d-flex flex-column align-items-center">
                        <h1 style={{ fontSize: "260px" }}>{motorcycleToday}</h1>
                    </div>
                </div>
            </div>
            <div>
                <MDBRow class="d-flex justify-content-center">
                    <MDBBtn color='info' onClick={janReport}>
                        J A N
                    </MDBBtn>
                    <MDBBtn color='danger' style={{ backgroundColor: '#6C9BCF' }} onClick={febReport}>
                        F E B
                    </MDBBtn>
                    <MDBBtn color='info' onClick={marReport}>
                        M A R
                    </MDBBtn>
                    <MDBBtn color='danger' style={{ backgroundColor: '#6C9BCF' }} onClick={aprReport}>
                        A P R
                    </MDBBtn>
                </MDBRow>
                <div className="container" style={{ height: "1vh" }}></div>
                <MDBRow class="d-flex justify-content-center">
                    <MDBBtn color='danger' style={{ backgroundColor: '#19A7CE' }} onClick={mayReport}>
                        M A Y
                    </MDBBtn>
                    <MDBBtn color='info' onClick={junReport}>
                        J U N
                    </MDBBtn>
                    <MDBBtn color='danger' style={{ backgroundColor: '#19A7CE' }} onClick={julReport}>
                        J U L
                    </MDBBtn>
                    <MDBBtn color='info' onClick={augReport}>
                        A U G
                    </MDBBtn>
                </MDBRow>
                <div className="container" style={{ height: "1vh" }}></div>
                <MDBRow class="d-flex justify-content-center">
                    <MDBBtn color='info' onClick={sepReport}>
                        S E P
                    </MDBBtn>
                    <MDBBtn color='danger' style={{ backgroundColor: '#6C9BCF' }} onClick={octReport}>
                        O C T
                    </MDBBtn>
                    <MDBBtn color='info' onClick={novReport}>
                        N O V
                    </MDBBtn>
                    <MDBBtn color='danger' style={{ backgroundColor: '#6C9BCF' }} onClick={decReport}>
                        D E C
                    </MDBBtn>
                </MDBRow>
            </div>
            <div className="col-md-5 mx-auto d-flex flex-column align-items-center">
                <TodayReport />
            </div>


        </>
    )
};
