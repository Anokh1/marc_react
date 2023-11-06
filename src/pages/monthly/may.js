import { useState } from "react";
import DashboardNavbar from "../../components/dashboard_navbar";
import { MDBBtn, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, } from "mdb-react-ui-kit";
import DoughnutChart from "../../components/reports/doughnut";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const May = () => {

    const mayReport = [
        {
            title: "Motorcycle entered",
            info: sessionStorage.getItem("mayEntered")
        },
        {
            title: "Motorcycle rejected",
            info: sessionStorage.getItem("mayIncoming")
        }
    ]

    const [mayData, setMayData] = useState({
        labels: mayReport.map((data) => data.title),
        datasets: [{
            data: mayReport.map((data) => data.info),
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
                pdf.save("may2023.pdf");
            })
    }

    if (sessionStorage.getItem("may") != 0) {
        return (
            <>
                <DashboardNavbar />
                <div id="report">
                    <div className="container" style={{ height: "11vh" }}></div>
                    <div className="container" style={{ width: "60vh" }}>
                        <div>
                            <h1>M A Y</h1>
                        </div>
                        <MDBRow class="justify-content-center">
                            <DoughnutChart chartData={mayData}></DoughnutChart>
                            <div className="container" style={{ height: "2vh" }}></div>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle>
                                        Monthly Report May 2023
                                    </MDBCardTitle>
                                    <MDBCardText>
                                        Total number of payment: {sessionStorage.getItem("may")}
                                    </MDBCardText>
                                    <MDBCardText>
                                        Total sales: RM {sessionStorage.getItem("may") * 1}.00
                                    </MDBCardText>
                                    <MDBCardText>
                                        Motorcycle(s) entered: {sessionStorage.getItem("mayEntered")}
                                    </MDBCardText>
                                    <MDBCardText>
                                        Motorcycle(s) rejected: {sessionStorage.getItem("mayIncoming")}
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
                        <h1>M A Y</h1>
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