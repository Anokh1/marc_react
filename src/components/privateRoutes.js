import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../config/firebase";

const PrivateRoutes = () => {
    var currentUser = auth?.currentUser?.email.toString();

    if (currentUser == "gurneyplaza@marc.com") {
        return (
            <Outlet />
        )
    } else if (currentUser == "pranginmall@marc.com") {
        return (
            <Outlet />
        )
    } else if (currentUser == "queensbaymall@marc.com") {
        return (
            <Outlet />
        )
    } else if (currentUser == "gurneyparagon@marc.com") {
        return (
            <Outlet />
        )
    } else {
        return (
            <Navigate to="/" />
        )
    }
}

export default PrivateRoutes