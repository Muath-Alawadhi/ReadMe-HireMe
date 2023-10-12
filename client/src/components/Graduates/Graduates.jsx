// For installing the last version of react-router-dom
// npm install react-router-dom@latest
import React, { useState , useEffect } from 'react';
import graduates from '../data';
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
             <Card.Img variant="top" src={grad.image} alt={grad.name} className="cards-img" />
             <Card.Body>
              <Card.Title>{grad.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Username: {grad.username}</ListGroup.Item>
              <ListGroup.Item>Repo: {grad.repo}</ListGroup.Item>
              <ListGroup.Item>Languages: {grad.language} </ListGroup.Item>
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
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:6000/api/fetchgraddata`);
        //need to handle error here....
        const data = await response.json();
        // const jsonData = await response.json();
        setUserData(data);
        console.log(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  const [selectedGrad, setSelectedGrad] = useState(null);

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
           <SearchBar />
           <div  className="CardsContainerBlock">
          {graduates.map((grad) => (
            <GradCard key={grad.id} grad={grad} onViewMore={handleViewMore} />
          ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Graduates;

