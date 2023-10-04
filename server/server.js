//install octokit
//add env for port and auth

const { Octokit } = require("@octokit/core"); //library to fetch from Github api
const express = require("express");
const app = express();
const port = 6000;

const octokit = new Octokit({
  auth: `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`,
});

//------------------ get / -----------------
app.get("/", (req, res) => {
  console.log("welcome to my server");
});

//----------------- fetch Grad data ------------------
const userName = "rahamb1";

app.get("/fetchGradData", async (req, res) => {
  try {
    // Use Octokit to make an API request to GitHub
    const response = await octokit.request("GET /users/{owner}", {
      owner: userName,
    });

    // I need to retirve these from data :
    //name	github username	profile-pic	github link	repos numbers	skills                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          - cv link - linked link
    // name, github_username, skills, projects, cv, linkedin, profile_pic_url;
    const userData = response.data;
    console.log(userData);

    const githubUsername = userData.login || "Not available"; //working
    const name = userData.name || "Not available"; //not working maybe because of null value in this case
    const reposNumber = userData.public_repos || "Not available"; // working
    const profilePic = userData.avatar_url || "Not available";
    console.log(githubUsername, name, reposNumber, profilePic);
    //still need these skills,repos.projects,repos.cv,repos.linkedin,
    //one issue here, if the user hasn't update all the info then we'll have a null>>solved with || "Not available"
    //better try to fetch more than once if error occured, as sometimes it just need to refresh
    //..store this data in the object repos to store it in db later = for testing = later I'll push immediately
    repos.github_username = "edit this";
    console.log(repos.name);

    //  // Send the data as a JSON response
    res.json({
      userName: githubUsername,
      name: name,
      repos_number: reposNumber,
      profile_pic: profilePic,
    });
  } catch (error) {
    console.error("Error fetching data from GitHub:", error.message);
    res.status(500).json({ error: "Failed to fetch data from GitHub" });
  }
});

//---------------- listen --------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
