import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";

function GitHubCallback() {
  const [message, setMessage] = useState("Processing Your Data...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");

    if (code) {
      // Send the code to the backend to exchange it for an access token
      fetch("http://localhost:8000/access-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Access Token:", data.access_token);
          setMessage(
            "Your profile has been added successfully! Go to graduates to see your profile."
          );
          setSuccess(true);
        })
        .catch((error) => {
          console.error("Error exchanging code for access token:", error);
          setMessage("Error occurred while processing your request.");
        });
    }
  }, []);

  const alertStyle = {
    fontSize: "30px",

  };
  const prograssStyle = {
    fontSize: "30px",
    height:"35px",

  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh" }}
    >
      <div className="text-center">
        {success ? (
          <Alert
            icon={<i className="fa fa-check" style={{ fontSize: "35px" }} />}
            severity="success"
            style={alertStyle}
          >
            {message}
          </Alert>
        ) : (
          <div className="progress" style={prograssStyle}>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: "100%" }}
            >
              <i className="fa fa-spinner" style={{ fontSize: "1px" }}></i>{" "}
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GitHubCallback;
