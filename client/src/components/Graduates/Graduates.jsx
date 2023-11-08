import React, { useState, useEffect } from "react";
import "./Graduates.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import SearchBar from "./SearchBar";
import GraduatesProfile from "../GraduatesProfile/GraduatesProfile";
import { MDBBtn } from "mdb-react-ui-kit";

function GradCard({ grad, onViewMore }) {
  return (
    <Card style={{ width: "17rem" }} key={grad.id}>
      <Card.Img
        variant="top"
        src={grad.profile_pic_link}
        alt={grad.name}
        className="cards-img"
      />
      <Card.Body>
        <Card.Title>{grad.name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Username: {grad.github_username}</ListGroup.Item>
        <ListGroup.Item>Repo: {grad.repos_number}</ListGroup.Item>
        <ListGroup.Item>
          Skills: {grad?.skills?.join(" ,") || grad?.languages?.join(" ,")}
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <MDBBtn onClick={() => onViewMore(grad)} outline className="View-More">
          View More
        </MDBBtn>
      </Card.Body>
    </Card>
  );
}

function Graduates() {
  const [graduates, setGraduates] = useState([]);
  const [filteredGraduates, setFilteredGraduates] = useState(null);
  const [selectedGrad, setSelectedGrad] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSearchResults = (filteredData) => {
    setFilteredGraduates(filteredData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://readme-hireme.onrender.com/api/fetchGradData`
        );
        const responseData = await response.json();
        const data = responseData.graduates;
        setGraduates(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const handleViewMore = (grad) => {
    setSelectedGrad(grad);
  };

  const handleGoBack = () => {
    setSelectedGrad(null);
  };

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg fixed-top ${
          isScrolled ? "customNavbarStyle" : ""
        }`}
      >
        <div className="container">{/* Your navigation bar content */}</div>
      </nav>

      {selectedGrad ? (
        <GraduatesProfile grad={selectedGrad} onGoBack={handleGoBack} />
      ) : (
        <div className="grad-cards">
          <SearchBar onSearchResults={handleSearchResults} />
          <div className="CardsContainerBlock">
            {isLoading ? (
              <p>Loading data...</p>
            ) : (
              (filteredGraduates || graduates).map((grad) => (
                <GradCard
                  key={grad.id}
                  grad={grad}
                  onViewMore={handleViewMore}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Graduates;
