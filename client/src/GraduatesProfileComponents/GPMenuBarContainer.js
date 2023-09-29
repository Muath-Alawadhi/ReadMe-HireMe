import "./GPMenuBarContainer.css";
import React, { useState } from 'react';

function GPMenuBarContainer() {
  const [searchByName, setSearchByName] = useState('');
  const [searchBySkills, setSearchBySkills] = useState('');

  const handleSearchByName = () => {
    console.log(`Searching for Input 1: ${searchByName}`);
  };

  const handleSearchBySkills = () => {
    console.log(`Searching for Input 2: ${searchBySkills}`);
  };

  return (
    <div className="GPMenuBarContainerBlock">
      <div></div>
      <div>
        <p className="pBlock">Search a graduate</p>
        <div className="searchBlock">
        <div>
        <input
          type="text"
          placeholder="SearchByName..."
          value={searchByName}
          onChange={(e) => setSearchByName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearchByName();
            }
          }}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="SearchBySkills..."
          value={searchBySkills}
          onChange={(e) => setSearchBySkills(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearchBySkills();
            }
          }}
        />
      </div>
      </div>
      </div>
      <div></div>
    </div>
  );
}

export default GPMenuBarContainer;