import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const handleLoginClick = () => {
    const ClientID = "4b7ee8342a11859ac626";
    const redirectUri = "http://localhost:3000/github/callback";
    const oauthURL =
      `https://github.com/login/oauth/authorize` +
      `?client_id=${ClientID}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.assign(oauthURL);
  };

  return (
    <div className="SignupBlock">
       <div className="Hire-me">
        <span className="HireColor">Hire  </span>
        <span className="MeColor">Me</span>
      </div>
      <p className="click-button-text">Click The Button To Sign Up:</p>
      <div><button className="button" onClick={handleLoginClick}> <i className="fa-brands fa-github"></i> Sign Up With GitHub</button>
      <link
        rel="stylesheet"
        href="https://fontawesome.com/icons/github?f=brands&s=solid"
        integrity="sha384-oBqDVmMzT8r8aFNj3ePMiM5l7zrKwR3i0LY0XJiDpjjD5z5qn5BUNB6e8JPW+qIr"
        crossOrigin="anonymous"
      />
      </div>
      <p className="Already-Signed-Up">
        Already Signed Up? <Link to="/graduates">Go To Graduates</Link>
      </p>
    </div>
  );
}

export default Signup;
