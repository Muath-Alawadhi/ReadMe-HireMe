import "./SUStyle.css";
import React, { useState } from "react";

function SUGitHubContainer() {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClick = () => {
    setButtonClicked(true);
  };
  return (
    <div className="SUGitHubBlock">
      {/* <button className="MyButton" onClick={handleClick}>Sign Up With GitHub</button>
      {buttonClicked && console.log("GitHubSignUp")}
      <div> */}
      <button className="MyButton" onClick={handleClick}>
        {/* FontAwesome icon code inside the button */}
        <i className="fa-brands fa-github"></i> Sign Up With GitHub
      </button>

      {/* FontAwesome CDN link */}
      <link
        rel="stylesheet"
        href="https://fontawesome.com/icons/github?f=brands&s=solid"
        integrity="sha384-oBqDVmMzT8r8aFNj3ePMiM5l7zrKwR3i0LY0XJiDpjjD5z5qn5BUNB6e8JPW+qIr"
        crossOrigin="anonymous"
      />

      {/* You can add other content here */}
    </div>

    // </div>
  );
}

export default SUGitHubContainer;
