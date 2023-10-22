import "./SearchBar.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup, FormControl, Button } from "react-bootstrap";

function SearchBar({ onSearchResults, allGraduates }) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery === "") {
      onSearchResults(allGraduates);
    }
  }, [searchQuery, onSearchResults, allGraduates]);

  const handleSearch = async (query) => {
    try {
      const cleanedQuery = query.toUpperCase();
      const response = await fetch(
        `https://readme-hireme.onrender.com/api/search?query=${cleanedQuery}`
      );
      const responseData = await response.json();
      const filteredData = responseData.graduates;
      console.log("test-1", filteredData);

      if (response.ok) {
        onSearchResults(filteredData);
      } else {
        console.error("Failed to fetch filteredData:", filteredData);
      }
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
  };

  return (
    <div className="container mt-4">
      <h1>Search a graduate</h1>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by name or skill..."
          aria-label="Search"
          aria-describedby="basic-addon2"
          onChange={handleInputChange}
          value={searchQuery}
        />
        <Button variant="danger" onClick={() => handleSearch(searchQuery)}>
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </div>
  );
}

export default SearchBar;
