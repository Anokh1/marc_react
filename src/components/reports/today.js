import { MDBRow } from "mdb-react-ui-kit";
import DoughnutChart from "./doughnut";
import { useState, useEffect } from "react";

export const TodayReport = () => {

    const todayReport = [
        {
            title: "Motorcycle entered",
            info: sessionStorage.getItem("entered")
        },
        {
            title: "Motorcycle incoming",
            info: sessionStorage.getItem("incoming")
        }
    ]

    const [todayData, setTodayData] = useState({
        labels: todayReport.map((data) => data.title),
        datasets: [{
            // label: "Number of motorcycle in August",
            data: todayReport.map((data) => data.info),
            backgroundColor: ["#47A992", "#DB005B", "#79E0EE"],
        }]
    })

    return (
        <>
            <div className="container" style={{ height: "28vh" }}></div>
            <div className="container" style={{ width: "60vh" }}>
                {/* <MDBRow class="d-flex justify-content-center"> */}
                <MDBRow class="d-flex justify-content-center">
                    <DoughnutChart chartData={todayData}></DoughnutChart>
                </MDBRow>
            </div>
            <div className="container" style={{ height: "9vh" }}></div>
        </>
    )

}