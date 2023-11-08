import React, { useEffect, useState } from "react";
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
import CommitGraph from "./d3.jsx";

function GraduatesProfile({ grad, onGoBack }) {
  const [commitData, setCommitData] = useState(null);

  useEffect(() => {
    fetch("https://readme-hireme.onrender.com/api/fetchGradData")
      .then((res) => res.json())
      .then((data) => {
        const specificGrad = data.graduates.find(
          (g) => g.github_username === grad.github_username
        );

        // logging to to see  what specificGrad contains
        console.log("Specific Grad:", specificGrad);
        // logging to see what type of data it is
        console.log(typeof specificGrad);

        if (specificGrad && specificGrad.commitsByMonth) {
          // make commitData from object to array
          const arrayData = Object.entries(specificGrad.commitsByMonth).map(
            ([month, commits]) => ({ month, commits })
          );
          setCommitData(arrayData);
          arrayData.forEach((item) => {
            console.log(`Date: ${item.month}, Commits: ${item.commits}`);
          });
        } else {
          // logging a message if commitsByMonth does not exist
          console.log("commitsByMonth does not exist on specificGrad");
        }
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, [grad.github_username]);

  return (
    <div>
      <section className="graduatesProfileBlock">
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
                      className="ms-1 custom-button"
                      onClick={() =>
                        window.open(
                          grad.readme?.linkedin + "/overlay/contact-info/" ||
                            grad.linkedin + "/overlay/contact-info/",
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
                        {grad.readme?.cv_link === "CV link not found" ? (
                          <MDBCardText className="text-muted">
                            CV's so elusive, it hides even from the graduate!
                          </MDBCardText>
                        ) : (
                          <MDBCardText className="text-muted">
                            <a
                              href={grad.readme?.cv_link || grad.cv_link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View My CV
                            </a>
                          </MDBCardText>
                        )}
                      </MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        fab
                        icon="fa-brands fa-linkedin fa-lg"
                        style={{ color: "#333333" }}
                      />

                      <MDBCardText>
                        {grad.readme?.linkedin === "LinkedIn link not found" ? (
                          <MDBCardText className="text-muted">
                            link's on holiday, even from its account holder!
                          </MDBCardText>
                        ) : (
                          <MDBCardText className="text-muted">
                            <a
                              href={grad.readme?.linkedin || grad.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View My LinkdIn
                            </a>
                          </MDBCardText>
                        )}
                      </MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        fab
                        icon="github fa-lg"
                        style={{ color: "#333333" }}
                      />
                      <MDBCardText>
                        <a
                          href={grad.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View My Github
                        </a>
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
                        {grad?.skills
                          ? grad.skills.join(", ")
                          : grad?.languages
                          ? grad.languages.join(", ")
                          : ""}
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
                        ReadMe :{" "}
                        {grad.readme?.readme_content || grad.readme_content}
                      </MDBCardText>
                    </MDBListGroupItem>
                    {commitData && <CommitGraph commitData={commitData} />}
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
