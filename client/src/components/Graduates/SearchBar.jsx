import "./SearchBar.css";
import React, { useState ,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl , Button  } from 'react-bootstrap';


function SearchBar({ onSearchResults}) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
     const response = await fetch(`http://localhost:8000/api/search?name=${searchQuery}&skills=${searchQuery}`);
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


  useEffect(() => {
    // Add an event listener to detect the 'keydown' event on the search input
    const handleKeyDown = (event) => {
      if (event.key === 'Backspace') {
        // Check if the search input is empty
        if (searchQuery === '') {
          // Trigger the search function to update with an empty query
          handleSearch();
        }
      }
    };

    // Attach the event listener
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchQuery]);



  
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
        />
          <Button variant="danger" onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </Button>
      </InputGroup>
    </div>
  );
}

export default SearchBar;