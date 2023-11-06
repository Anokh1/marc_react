import DashboardNavbar from "../components/dashboard_navbar";
import { MDBAccordion, MDBAccordionItem, MDBIcon } from "mdb-react-ui-kit";

export const Information = () => {

    return (
        <>
            <DashboardNavbar />
            <div className="container" style={{ height: "11vh" }}></div>
            <div className="container" style={{ width: "50vh" }}>
                <div className="col-md-12 mx-auto d-flex flex-column align-items-center">
                    <h1>Frequently Asked Questions</h1>
                    <div className="container" style={{ height: "2vh" }}></div>
                    <MDBAccordion initialActive={1}>
                        <MDBAccordionItem collapseId={1} headerTitle={<><MDBIcon fas icon="question-circle" /> &nbsp; Information Page</>}>
                            When you are confused and curious about the M A R C web application, come to this page to check out some
                            Frequently Asked Questions.
                            <br></br>
                            <br></br>
                            There should be sufficient information in this page. However, if you could not find your answers or solutions here.
                            You can always reach out to us through the email below.
                            <br></br>
                            <br></br>
                            <span>marc@sometime.com</span>

                        </MDBAccordionItem>
                        <MDBAccordionItem collapseId={2} headerTitle={<><MDBIcon fas icon="search" /> &nbsp; Search Motorcycle</>}>
                            The search function is only available in the dashboard page.
                            <br></br>
                            <br></br>
                            Please use this format when searching for motorcycle in the shopping mall motorcycle parking lot.
                            <br></br>
                            <br></br>
                            FORMAT: number plate + _ + date separated with "_"
                            <br></br>
                            <br></br>
                            EXAMPLE: PKA0303_20_10_2023
                        </MDBAccordionItem>
                        <MDBAccordionItem collapseId={3} headerTitle={<><MDBIcon fas icon="plus-circle" /> &nbsp; Add Motorcycle</>}>
                            Before using the adding motorcycle to the shopping mall motorcycle parking lot feature, please stop and think before proceeding.
                            <br></br>
                            <br></br>
                            This process is not to be done on a daily basis as it could create an unethical working environment.
                            <br></br>
                            <br></br>
                            Please follow this procedure when adding a motorcycle into the shopping mall motorcycle parking lot.
                            <br></br>
                            <br></br>
                            1. Input the username by referring to the username available in the Profile Screen of the M A R C mobile application. 
                            <br></br>
                            <br></br>
                            2. Input the number plate by referring to the number plate available in the Profile Screen of the M A R C mobile application. 
                            <br></br>
                            <br></br>
                            3. If the motorcycle has entered the parking lot, check the check box.
                            <br></br>
                            <br></br>
                            4. Click on the Submit button to complete this process.
                        </MDBAccordionItem>
                        <MDBAccordionItem collapseId={4} headerTitle={<><MDBIcon fas icon="image" /> &nbsp; Parking Image</>}>
                            To update the images to be displayed on the M A R C mobile application please upload the desired images using the upload image function in the Parking screen by following these steps:
                            <br></br>
                            <br></br>
                            1. Click on the Choose file button. 
                            <br></br>
                            <br></br>
                            2. Select 1 image to be uploaded.
                            <br></br>
                            <br></br>
                            3. Click on the Upload Image button to complete the process.
                            <br></br>
                            <br></br>
                            NOTE: 
                            <br></br>
                            Images uploaded needs be verified and approved to ensure that the image is appropriate to be displayed on M A R C mobile application. 
                            <br></br>
                            <br></br>
                            Images will be verified and approved within 3 working days.
                        </MDBAccordionItem>
                        <MDBAccordionItem collapseId={5} headerTitle={<><MDBIcon fas icon="parking" /> &nbsp; Parking Status</>}>
                            Parking status should be updated when necessary. 
                            <br></br>
                            <br></br>
                            Follow the steps below to update the parking status. 
                            <br></br>
                            <br></br>
                            1. Click on the Update Status button.
                            <br></br>
                            <br></br>
                            2. Input the correct user credentials and password.
                            <br></br>
                            <br></br>
                            3. Select either "Available", "Maintenance", or "Full" which best describes the current status of the motorcycle parking lot. 
                            <br></br>
                            <br></br>
                            Updating the correct status is a responsibility towards our customers!
                        </MDBAccordionItem>
                        <MDBAccordionItem collapseId={6} headerTitle={<><MDBIcon fas icon="copy" /> &nbsp; Report</>}>
                            Currently, there is only monthly reports generated for the year 2023.
                            <br></br>
                            <br></br>
                            NOTE:
                            <br></br>
                            Clicking on the PDF button will generate a PDF format of the current report. 
                            <br></br>
                            <br></br>
                            More report features is coming soon. 
                        </MDBAccordionItem>
                    </MDBAccordion>
                </div>
            </div>
            <div className="container" style={{ height: "11vh" }}></div>
        </>
    )
};