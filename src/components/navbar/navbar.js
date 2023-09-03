import { Link, NavLink, resolvePath, useMatch, useResolvedPath } from "react-router-dom";
import './navbar.css';
import React, { useState } from "react";


// Link method to redirect to different page
// function CustomLink({ to, children, ...props }) {
//     const useResolvedPath = useResolvedPath(to); 
//     const isActive = useMatch({ path: resolvePath.pathname, end: true });
//     return (
//         <li className={isActive ? "active" : ""}>
//             <Link to={to} {...props}>
//                 {children}
//             </Link>
//         </li>
//     )
// }

// export default function Navbar() {
//     const path = window.location.pathname;
//     return <nav className="nav">
//         <Link to="/dashboard" className="site-title">MARC</Link>
//         <ul>
//             <CustomLink to="/add">Add</CustomLink>
//             <CustomLink t0="/parking">Parking</CustomLink>
//         </ul>
//     </nav>
// }

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav>
            <Link to="/dashboard" className="title">
                MARC
            </Link>
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <NavLink to="/add">Add</NavLink>
                </li>
                <li>
                    <NavLink to="/parking">Parking</NavLink>
                </li>
            </ul>
        </nav>
    );
};


