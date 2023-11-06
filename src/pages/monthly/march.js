import { useState } from "react";
import DashboardNavbar from "../../components/dashboard_navbar";
import { MDBBtn, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, } from "mdb-react-ui-kit";
import DoughnutChart from "../../components/reports/doughnut";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const March = () => {

    const marchReport = [
        {
            title: "Motorcycle entered",
            info: sessionStorage.getItem("marchEntered")
        },
        {
            title: "Motorcycle rejected",
            info: sessionStorage.getItem("marchIncoming")
        }
    ]

    const [marchData, setMarchData] = useState({
        labels: marchReport.map((data) => data.title),
        datasets: [{
            data: marchReport.map((data) => data.info),
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
                pdf.save("march2023.pdf");
            })
    }

    if (sessionStorage.getItem("march") != 0) {
        return (
            <>
                <DashboardNavbar />
                <div id="report">
                    <div className="container" style={{ height: "11vh" }}></div>
                    <div className="container" style={{ width: "60vh" }}>
                        <div>
                            <h1>M A R C H</h1>
                        </div>
                        <MDBRow class="justify-content-center">
                            <DoughnutChart chartData={marchData}></DoughnutChart>
                            <div className="container" style={{ height: "2vh" }}></div>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle>
                                        Monthly Report March 2023
                                    </MDBCardTitle>
                                    <MDBCardText>
                                        Total number of payment: {sessionStorage.getItem("march")}
                                    </MDBCardText>
                                    <MDBCardText>
                                        Total sales: RM {sessionStorage.getItem("march") * 1}.00
                                    </MDBCardText>
                                    <MDBCardText>
                                        Motorcycle(s) entered: {sessionStorage.getItem("marchEntered")}
                                    </MDBCardText>
                                    <MDBCardText>
                                        Motorcycle(s) rejected: {sessionStorage.getItem("marchIncoming")}
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
                        <h1>M A R C H</h1>
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