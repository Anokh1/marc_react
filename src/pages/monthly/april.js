import { useState } from "react";
import DashboardNavbar from "../../components/dashboard_navbar";
import { MDBBtn, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, } from "mdb-react-ui-kit";
import DoughnutChart from "../../components/reports/doughnut";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const April = () => {

    const aprilReport = [
        {
            title: "Motorcycle entered",
            info: sessionStorage.getItem("aprilEntered")
        },
        {
            title: "Motorcycle rejected",
            info: sessionStorage.getItem("aprilIncoming")
        }
    ]

    const [aprilData, setAprilData] = useState({
        labels: aprilReport.map((data) => data.title),
        datasets: [{
            data: aprilReport.map((data) => data.info),
            backgroundColor: ["#47A992", "#DB005B"],
        }]
    })

    function PDFreport() {
        const input = document.getElementById('report');
        html2canvas(input, { logging: true, letterRendering: 1, useCORS: true })
            .then((canvas) => {
                const imgWidth = 208;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save("april2023.pdf");
            })
    }

    if (sessionStorage.getItem("april") != 0) {
        return (
            <>
                <DashboardNavbar />
                <div id="report">
                    <div className="container" style={{ height: "11vh" }}></div>
                    <div className="container" style={{ width: "60vh" }}>
                        <div>
                            <h1>A P R I L</h1>
                        </div>
                        <MDBRow class="justify-content-center">
                            <DoughnutChart chartData={aprilData}></DoughnutChart>
                            <div className="container" style={{ height: "2vh" }}></div>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle>
                                        Monthly Report April 2023
                                    </MDBCardTitle>
                                    <MDBCardText>
                                        Total number of payment: {sessionStorage.getItem("april")}
                                    </MDBCardText>
                                    <MDBCardText>
                                        Total sales: RM {sessionStorage.getItem("april") * 1}.00
                                    </MDBCardText>
                                    <MDBCardText>
                                        Motorcycle(s) entered: {sessionStorage.getItem("aprilEntered")}
                                    </MDBCardText>
                                    <MDBCardText>
                                        Motorcycle(s) rejected: {sessionStorage.getItem("aprilIncoming")}
                                    </MDBCardText>
                                    <MDBBtn onClick={PDFreport}>
                                        PDF
                                    </MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBRow>
                    </div>
                    <div className="container" style={{ height: "11vh" }}></div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <DashboardNavbar />
                <div className="container" style={{ height: "11vh" }}></div>
                <div className="container" style={{ width: "60vh" }}>
                    <div>
                        <h1>A P R I L</h1>
                    </div>
                    <div className="container" style={{ height: "11vh" }}></div>
                    <MDBRow class="d-flex justify-content-center">
                        {/* <DoughnutChart chartData={augustData}></DoughnutChart> */}
                        <h2> No data available </h2>
                    </MDBRow>
                </div>
            </>
        )
    }
}