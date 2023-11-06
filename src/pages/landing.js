import WebFooter from "../components/footer";
import MainPromo from '../images/mainPromo.png';
import AndroidPromo from '../images/androidPromo.png';
import iOSPromo from '../images/iOSPromo.png';
import LandingNavbar from "../components/landing_navbar";


export const Landing = () => {
    return (
        <>
            <LandingNavbar />
            <div className="container" style={{ height: "11vh" }}></div>
            <div className="container" style={{ width: "100%" }}>
                <div className="col-md-12 mx-auto d-flex flex-column align-items-center">
                    <img src={MainPromo} className='img-fluid shadow-4' alt='...' />
                    <img src={AndroidPromo} className='img-fluid shadow-4' alt='...' />
                    <img src={iOSPromo} className='img-fluid shadow-4' alt='...' />
                </div>
            </div>
            <div className="container" style={{ height: "11vh" }}></div>
            <WebFooter />
        </>
    )
};