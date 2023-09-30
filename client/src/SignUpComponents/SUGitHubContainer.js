import "./SUStyle.css";
import React, { useState } from 'react';

function SUGitHubContainer() {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClick = () => {
    setButtonClicked(true);
  };
    return (
      <div className="SUGitHubBlock">
        <button className="MyButton" onClick={handleClick}>Sign Up With GitHub</button>
      {buttonClicked && console.log("GitHubSignUp")}
      </div>
    );
  }
  
  export default SUGitHubContainer;