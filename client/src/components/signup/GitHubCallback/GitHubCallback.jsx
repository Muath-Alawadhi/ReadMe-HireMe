import { useEffect } from "react";

function GitHubCallback() {
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
        })
        .catch((error) => {
          console.error("Error exchanging code for access token:", error);
        });
    }
  }, []);


  return <div>Processing GitHub callback...</div>;
}

export default GitHubCallback;
