import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function MotorcycleCard(numberPlate, username) {
  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>{numberPlate}</MDBCardTitle>
        <MDBCardText>
            {username}
        </MDBCardText>
        <MDBBtn>E D I T</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}