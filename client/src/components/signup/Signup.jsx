import { Link } from "react-router-dom";
import "./Signup.css";
import { useEffect } from "react";

function Signup() {
  //signup authentication
  const handleLoginClick = () => {
    const clientId = "4b7ee8342a11859ac626";
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");
    console.log(code);

    if (code) {
      // Send the code to backend to exchange it for an access token
      fetch("http://localhost:8000/access-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Access Token:", data.access_token); // testing the Access result
        })
        .catch((error) => {
          console.error("Error exchanging code for access token:", error);
        });
    }
  }, []);

  return (
    <div className="SignupBlock">
      <div className="Hire-me">
        <span className="HireColor">Hire </span>
        <span className="MeColor">Me</span>
      </div>
      <p className="click-button-text">Click The Button To Sign Up:</p>
      <div>
        <button className="button" onClick={handleLoginClick}>
          <i className="fa-brands fa-github"></i> Sign Up With GitHub
        </button>
      </div>
      <p className="Already-Signed-Up">
        Already Signed Up? <Link to="/graduates">Go To Graduates</Link>
      </p>
    </div>
  );
}

export default Signup;
