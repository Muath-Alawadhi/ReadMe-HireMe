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

app.get("/fetchGradData", async (req, res) => {
  try {
    // Use Octokit to make an API request to GitHub
    const response = await octokit.request("GET /users/{owner}", {
      owner: "rahmab1",
    });

    // name, github_username, repos, profile_pic_url , skills, cv, linkedin ;
    //we still need skills from repos path
    const userData = response.data;
    // console.log(userData);

    const githubUserName = userData.login || "Not available";
    const name = userData.name || "Name Not available";
    const reposNumber = userData.public_repos || "Not available";
    const profilePicLink = userData.avatar_url || "Not available";
    console.log(githubUserName, name, reposNumber, profilePicLink);

    //Send the data as a JSON response
    res.json({
      userName: githubUserName,
      name: name,
      repos_number: reposNumber,
      profile_pic: profilePicLink,
    });

    // res.send(userData);
  } catch (error) {
    console.error("Error fetching data from GitHub:", error.message);
    res.status(500).json({ error: "Failed to fetch data from GitHub" });
  }
});

//---------------- listen --------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
