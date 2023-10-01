import React, { useEffect, useState } from "react";

function GitHubUserInfo() {
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  ///////
  useEffect(() => {
    const queryString = window.location.search;
    const urlParameters = new URLSearchParams(queryString);
    const tokenCode = urlParameters.get("code");
    console.log("test- code", tokenCode);

    if (tokenCode && !accessToken) {
      async function getAccessToken() {
        try {
          const response = await fetch(
            `http://localhost:3002/getAccessToken?code=${tokenCode}`
          );
          const data = await response.json();
          if (data.access_token) {
            setAccessToken(data.access_token);
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("Error getting access token:", error);
        }
      }

      getAccessToken();
    }
  }, [accessToken]);

  async function getUserData() {
    try {
      const response = await fetch("http://localhost:3002/getUserData", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const data = await response.json();
      setUserData(data);

      const reposResponse = await fetch(data.repos_url);
      const reposData = await reposResponse.json();

      const repoLanguages = await Promise.all(
        reposData.map(async (repo) => {
          const languagesResponse = await fetch(repo.languages_url);
          const languagesData = await languagesResponse.json();
          return {
            repoName: repo.name,
            languages: Object.keys(languagesData),
          };
        })
      );

      // Set the list of languages in state
      setLanguages(repoLanguages);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  function handleLogout() {
    setAccessToken(""); // Clear the access token from state
    setIsLoggedIn(false);
  }

  function LogIn() {
    const ClientID = "4b7ee8342a11859ac626";
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + ClientID
    );
  }

  return (
    <>
      <header>
        {isLoggedIn ? (
          <>
            <h1>We have the access token</h1>
            <button onClick={handleLogout}>Log out</button>
            <h3>Get user data from GitHub API</h3>
            <button onClick={getUserData}>Get Data</button>
            {Object.keys(userData).length !== 0 ? (
              <>
                <h4>Hey there {userData.name}</h4>
                <img
                  width="100px"
                  height="100px"
                  src={userData.avatar_url}
                  alt=""
                />{" "}
                <br />
                <a href={userData.html_url}>Link</a>
                <h4>Username: {userData.login}</h4>
                <h4>Public repos number: {userData.public_repos}</h4>
                <h4>Private repos number: {userData.owned_private_repos}</h4>
                <h4>Created at: {userData.created_at}</h4>
                <h4>Emaill: {userData.email}</h4>
                <h4>Skills:</h4>
                <h4>{console.log(userData)}</h4>
                <h4>{console.log(userData.repos_url)}</h4>
                <ul>
                  {languages.map((repo) => (
                    <li key={repo.repoName}>{repo.languages.join(", ")}</li>
                  ))}
                </ul>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <h3>User is not logged in</h3>
            <button onClick={LogIn}>Log in with GitHub</button>
          </>
        )}
      </header>
    </>
  );
}

export default GitHubUserInfo;
// //=====================================================
