import React, { useState, } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBBtn,
  MDBCollapse,
  MDBNavbarBrand,
} from 'mdb-react-ui-kit';
import { Link, NavLink } from 'react-router-dom';


export default function DashboardNavbar() {

  const [showBasic, setShowBasic] = useState(false);
  const [searchFor, setSearchFor] = useState("");

  return (
    <MDBNavbar expand='lg' fixed='top' light style={{ backgroundColor: '#D9D5D5' }}>
      <MDBContainer fluid>
        <MDBNavbarBrand>M A R C</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem className='px-2'>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='px-2'>
              <NavLink to="/add">Add</NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='px-2'>
              <NavLink to="/parking">Parking</NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='px-2'>
              <NavLink to="/report">Report</NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='px-2'>
              <NavLink to="/information">Information</NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='px-2'>
              <NavLink to="/logout">Logout</NavLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <form className='d-flex input-group w-100'>
            <input type='search' className='form-control' placeholder='Search Motorcycle Number Plate' aria-label='Search' onChange={(e) => setSearchFor(e.target.value)} />
            <MDBBtn color='none' style={{ backgroundColor: '#D9D5D5' }}>
              <Link style={{ textDecoration: 'none', color: 'black' }} to="/result" state={{ data: searchFor }}>
                SEARCH
              </Link>
            </MDBBtn>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}