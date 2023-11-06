import React from 'react';
import { auth } from '../config/firebase';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function LandingNavbar() {

  const navigate = useNavigate();

  const logout = async () => {
    try {
        await signOut(auth);
        console.log("Logout Successful")
        console.log(auth?.currentUser?.email);
        navigate("/");
    } catch (err) {
        console.error(err);
    }

};

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>M A R C</MDBNavbarBrand>
        <MDBBtn href='/login'>L O G I N</MDBBtn>
      </MDBContainer>
    </MDBNavbar>
  );
}