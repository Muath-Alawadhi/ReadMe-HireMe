import "./SearchBar.css";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl , Button  } from 'react-bootstrap';


function SearchBar() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
     console.log(`Searching for: ${searchText}`);
  };
  return (
    <div className="container mt-4">
      <h1>Search a graduate</h1>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by name or skill..."
          aria-label="Search"
          aria-describedby="basic-addon2"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
          <Button variant="danger" onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </Button>
      </InputGroup>
    </div>
  );
}

export default SearchBar;