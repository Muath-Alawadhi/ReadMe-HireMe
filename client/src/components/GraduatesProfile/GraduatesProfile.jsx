import React, { useEffect,useState  } from 'react';
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
  // MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import CommitGraph from "./d3.jsx";


function GraduatesProfile({ grad, onGoBack }) {
  const [commitData, setCommitData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/fetchGradData')
      .then((res) => res.json())
      .then((data) => {
        const specificGrad = data.graduates.find(g => g.github_username === grad.github_username);
  
        // logging to to see  what specificGrad contains
        console.log('Specific Grad:', specificGrad);
        // logging to see what type of data it is 
        console.log( typeof specificGrad); 
  
        if (specificGrad && specificGrad.commitsByMonth) {
          // make commitData from object to array
          const arrayData = Object.entries(specificGrad.commitsByMonth).map(([month, commits]) => ({ month, commits }));
          setCommitData(arrayData);
          arrayData.forEach(item => {
            console.log(`Date: ${item.month}, Commits: ${item.commits}`);
          });
        } else {
          // logging a message if commitsByMonth does not exist
          console.log('commitsByMonth does not exist on specificGrad');
        }
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  }, [grad.github_username]);
  
  
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
                    style={{ width: '150px' }}
                    fluid />
                  <p className="text-muted mb-1">Full Stack Developer</p>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn>Follow</MDBBtn>
                    <MDBBtn outline className="ms-1">Message</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
  <MDBBtn onClick={onGoBack} outline className="ms-1 backButton">Go Back</MDBBtn>
            </MDBCol>
  
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{grad.name}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>User Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{grad.github_username}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>CV</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{grad.readme.cv_link}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>LinkdIn</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{grad.readme.linkedin}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Reposotry Number</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{grad.repos_number}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Skills</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{grad.skills}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
  
              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                  <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBCardText>ReadMe : {grad.readme.readme_content}</MDBCardText>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
              {commitData && <CommitGraph commitData={commitData} />}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}

export default GraduatesProfile;

