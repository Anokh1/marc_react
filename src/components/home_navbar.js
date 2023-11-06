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
import Swal from "sweetalert2";

export default function HomeNavbar() {

  const navigate = useNavigate();

  const logout = async () => {
    try {
        await signOut(auth);
        console.log("Logout Successful")
        console.log(auth?.currentUser?.email);
        navigate("/");

        Swal.fire({
          width: 300,
          text: 'Logout successful!',
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
      })
    } catch (err) {
        console.error(err);
    }

};

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/home'>M A R C</MDBNavbarBrand>
        <MDBBtn onClick={logout}>L O G O U T</MDBBtn>
      </MDBContainer>
    </MDBNavbar>
  );
}