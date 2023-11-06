import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function WebFooter() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with the founder, developer, and intern:</span>
        </div>

        <div>
          <a href='https://www.instagram.com/icebear393/' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='https://www.linkedin.com/in/kean-hong-ooi-k/' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='https://github.com/Anokh1' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                SOMETIME
              </h6>
              <p>
                M A R C is a subsidiary of Sometime which aims to provide solutions relating to the parking industry.
                Sometime specialises in the investment of creative and weird solutions. Established since 2021, Sometime
                have been the major stakeholder of several products that is about to be released soon. "Sometime, it works . . ."
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  SoundTime
                </a>
              </p>
              <p>
                <a href='https://github.com/Anokh1/304CEM-Web-Api-Development/tree/main' className='text-reset'>
                  Pogimon
                </a>
              </p>
              <p>
                <a href='https://github.com/Anokh1/KeepHere' className='text-reset'>
                  KeepHere
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  M A R C
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                marc@sometime.com
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Sometime
      </div>
    </MDBFooter>
  );
}