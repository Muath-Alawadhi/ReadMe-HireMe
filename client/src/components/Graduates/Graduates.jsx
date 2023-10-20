// For installing the last version of react-router-dom
// npm install react-router-dom@latest
import React, { useState , useEffect } from 'react';
import "./Graduates.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import GraduatesProfile from '../GraduatesProfile/GraduatesProfile';



function GradCard({ grad, onViewMore }) {
  return (
    <div>
       <div>
       <Card style={{ width: '17rem' }} key={grad.id}>
             <Card.Img variant="top" src={grad.profile_pic_link} alt={grad.name} className="cards-img" />
             <Card.Body>
              <Card.Title>{grad.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Username: {grad.github_username}</ListGroup.Item>
              <ListGroup.Item>Repo: {grad.repos_number}</ListGroup.Item>
              <ListGroup.Item>Skills: {grad?.skills || grad.languages} </ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Link onClick={() => onViewMore(grad)}>View More</Link>
            </Card.Body>
          </Card>
    </div>
    </div>
  );
}


function Graduates() {

    const [graduates, setGraduates] = useState([]);
    const [filteredGraduates, setFilteredGraduates] = useState(null);

  const [selectedGrad, setSelectedGrad] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  const handleSearchResults = (filteredData) => {
    setFilteredGraduates(filteredData);
  };




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/fetchGradData` );
         const responseData = await response.json();
        const data = responseData.graduates; // Access the 'graduates' key as the response from api is--> res.json({ graduates: grads });
        console.log("Data from API:", data);
        setGraduates(data);
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  },[]);

useEffect(() => {
  console.log(graduates);
}, [graduates]);


  const handleViewMore = (grad) => {
    setSelectedGrad(grad);
  };

  const handleGoBack = () => {
    setSelectedGrad(null);
  };

  return (
    <div>
      {selectedGrad ? (
        <GraduatesProfile grad={selectedGrad} onGoBack={handleGoBack} />
      ) : (
        <div className="grad-cards">
           <SearchBar onSearchResults={handleSearchResults}  />
           <div className="CardsContainerBlock">
            {isLoading ? ( 
              <p>Loading data...</p>
            ) : (
              (filteredGraduates || graduates).map((grad) => (
                <GradCard key={grad.id} grad={grad} onViewMore={handleViewMore} />
              ))
            )}
          </div>

        </div>
      )}
    </div>
  );
}

export default Graduates;

