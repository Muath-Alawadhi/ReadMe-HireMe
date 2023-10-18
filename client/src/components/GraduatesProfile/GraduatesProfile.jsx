import React from "react";
import "./GraduatesProfile.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

function GraduatesProfile({ grad, onGoBack }) {
  return (
    <div>
      <section>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={grad.profile_pic_link}
                    alt={grad.name}
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid
                  />
                  {/* <p className="text-muted mb-1">Full Stack Developer</p> */}
                  {/* <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} /> */}
                  {/* <p className="text-muted mb-4">Bay Area, San Francisco, CA</p> */}
                  <div>
                    <MDBRow className="d-flex justify-content-center mb-2">
                      <MDBCol sm="3">
                        <MDBCardText className="mb-1 h5">
                          {grad.followers}
                        </MDBCardText>
                        <MDBCardText className="small text-muted mb-0">
                          Followers
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol sm="3">
                        <MDBCardText className="mb-1 h5">
                          {grad.following}
                        </MDBCardText>
                        <MDBCardText className="small text-muted mb-0">
                          Following
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn
                      onClick={() => window.open(grad.github_url, "_blank")}
                      className="ms-1 custom-button"
                    >
                      Follow
                    </MDBBtn>
                    <MDBBtn
                      outline
                      className="ms-1"
                      onClick={() =>
                        window.open(
                          grad.readme.linkedin + "overlay/contact-info/",
                          "_blank"
                        )
                      }
                    >
                      Contact Me
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                  <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        far
                        icon="file-alt fa-lg"
                        style={{ color: "#333333" }}
                      />
                      <MDBCardText>
                        <a href={grad.readme.cv_link}>View My CV</a>
                      </MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        fab
                        icon="fa-brands fa-linkedin fa-lg"
                        style={{ color: "#333333" }}
                      />
                      <MDBCardText>
                        <a href={grad.readme.linkedin}>View My LinkdIn</a>
                      </MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        fab
                        icon="github fa-lg"
                        style={{ color: "#333333" }}
                      />
                      <MDBCardText>
                        <a href={grad.github_url}>View My Github</a>
                      </MDBCardText>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
              <MDBBtn onClick={onGoBack} outline className="ms-1  backButton">
                Go Back
              </MDBBtn>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {grad.name}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>User Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {grad.github_username}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Reposotry Number</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {grad.repos_number}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Skills</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {grad.skills}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                  <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBCardText>
                        ReadMe : {grad.readme.readme_content}
                      </MDBCardText>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}

export default GraduatesProfile;
