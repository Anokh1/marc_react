import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../config/firebase";

const PrivateRoutes = () => {
    var currentUser = auth?.currentUser?.email.toString();

    if (currentUser == "gurneyplaza@marc.com") {
        return (
            <Outlet />
        )
    } else {
        return (
            <Navigate to="/" />
        )
    }

    // let x = {'token': false}
    // return (
    //     x.token ? <Outlet/> : <Navigate to="/"/>
    // )

}

export default PrivateRoutes