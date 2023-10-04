import { Link } from "react-router-dom";

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
    <div>
      <h2>Login Page</h2>
      <p>Click the button below to log in:</p>
      <button onClick={handleLoginClick}>Log in with GitHub</button>
      <p>
        Already signed up? <Link to="/graduates">Go to Graduates</Link>
      </p>
    </div>
  );
}

export default Signup;
