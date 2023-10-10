import { Link } from "react-router-dom";
import "./Signup.css";
// import { useEffect } from "react";

function Signup() {
  //signup authentication
  const handleLoginClick = () => {
    const clientId = "4b7ee8342a11859ac626";
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
  };

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
