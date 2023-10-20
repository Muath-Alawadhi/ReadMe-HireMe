import "./SearchBar.css";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl , Button  } from 'react-bootstrap';


function SearchBar({ onSearchResults}) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      console.log("Search Query:", searchQuery);
     const response = await fetch(`http://localhost:8000/api/search?name=${searchQuery}`);
      const responseData = await response.json();
      const filteredData = responseData.graduates;

      if (response.ok) {
        onSearchResults(filteredData);  
      } else {
        console.error("Failed to fetch filteredData:", filteredData);
      }
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };
  
  return (
    <div className="container mt-4">
      <h1>Search a graduate</h1>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by name or skill..."
          aria-label="Search"
          aria-describedby="basic-addon2"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
          <Button variant="danger" onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </Button>
      </InputGroup>
    </div>
  );
}

export default SearchBar;