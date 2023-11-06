
import WebFooter from "../components/footer";
import HomeNavbar from "../components/home_navbar";
import AppPromo from '../images/appPromo.png';


export const Home = () => {
    return (
        <>
            <HomeNavbar />
            <div className="container" style={{ width: "100%" }}>
                <div className="col-md-12 mx-auto d-flex flex-column align-items-center">
                    <img src={AppPromo} className='img-fluid shadow-4' alt='...' />
                </div>
            </div>
            <div className="container" style={{ height: "11vh" }}></div>
            <WebFooter />
        </>
    )
};