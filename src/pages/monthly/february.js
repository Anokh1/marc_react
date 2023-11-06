import { useState } from "react";
import DashboardNavbar from "../../components/dashboard_navbar";
import { MDBBtn, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, } from "mdb-react-ui-kit";
import DoughnutChart from "../../components/reports/doughnut";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const February = () => {

    const februaryReport = [
        {
            title: "Motorcycle entered",
            info: sessionStorage.getItem("februaryEntered")
        },
        {
            title: "Motorcycle rejected",
            info: sessionStorage.getItem("februaryIncoming")
        }
    ]

    const [februaryData, setFebruaryData] = useState({
        labels: februaryReport.map((data) => data.title),
        datasets: [{
            data: februaryReport.map((data) => data.info),
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
                pdf.save("february2023.pdf");
            })
    }

    if (sessionStorage.getItem("february") != 0) {
        return (
            <>
                <DashboardNavbar />
                <div id="report">
                    <div className="container" style={{ height: "11vh" }}></div>
                    <div className="container" style={{ width: "60vh" }}>
                        <div>
                            <h1>F E B R U A R Y</h1>
                        </div>
                        <MDBRow class="justify-content-center">
                            <DoughnutChart chartData={februaryData}></DoughnutChart>
                            <div className="container" style={{ height: "2vh" }}></div>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle>
                                        Monthly Report February 2023
                                    </MDBCardTitle>
                                    <MDBCardText>
                                        Total number of payment: {sessionStorage.getItem("february")}
                                    </MDBCardText>
                                    <MDBCardText>
                                        Total sales: RM {sessionStorage.getItem("february") * 1}.00
                                    </MDBCardText>
                                    <MDBCardText>
                                        Motorcycle(s) entered: {sessionStorage.getItem("februaryEntered")}
                                    </MDBCardText>
                                    <MDBCardText>
                                        Motorcycle(s) rejected: {sessionStorage.getItem("februaryIncoming")}
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
                        <h1>F E B R U A R Y</h1>
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