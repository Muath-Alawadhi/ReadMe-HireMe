// Given a github username I want to retrieve information about this person's
//repos and store it in the database: access to github API
//Issue number 4
//Given a github username I want to retrieve information about this person's
//repos and store it in the database:
//Access to github API
//Access to github token
//---------- Read READMI.md if the code doesn't work on your local laptop  ---------------
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser"); //is a middleware for Express.js
const port = process.env.PORT || 5000;

const fetch = (
  ...args ///////fetching (node.js library)
) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

//------------------------GitHub OAuth (1)Apps information ----------------------
//// the ClintID and ClintSecret info on the env file
const ClintID = process.env.GITHUB_CLIENT_ID;
const ClintSecret = process.env.GITHUB_CLIENT_SECRET;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//----------------testing (2)the gte--------------------------//
app.get("/", (req, res) => {
  console.log("welcome to my server");
});
//--------------------------------------------------------//

//-------------- code being passed (3) from the frontend----//
app.get("/getAccessToken", async (req, res) => {
  console.log(req.query.code); // testing or console the outputwe will be a code from the request
  //and we will use it to access to get  the token

  const params = `?client_id=${ClintID}&client_secret=${ClintSecret}&code=${req.query.code}`;

  await fetch("https://github.com/login/oauth/access_token" + params, {
    ///// posting the token
    method: "post",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("result", data); ///// testing the output
      res.json(data);
    });
});
//--------------------------------------------------------//

////-------------------Get user(4) data---------------------//
app.get("/getUserData", async (req, res) => {
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: await req.get("Authorization"),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});
//--------------------------------------------------------//

//---------------------Add Repo Data------------------------//
//This is for test purposes , adding username and repo name manually
//

app.get("/fetchRepoData", async (req, res) => {
  try {
    // Use Octokit to make an API request to GitHub
    const response = await octokit.request("GET /repos/{owner}/{repo}", {
      owner: "rahmab1",
      repo: "fp-repo",
    });

    const repositories = response.data;

    // Send the data as a JSON response
    res.json({ repositories });
  } catch (error) {
    console.error("Error fetching data from GitHub:", error.message);
    res.status(500).json({ error: "Failed to fetch data from GitHub" });
  }
});

//--------------------------------------------------------//

//--------------------Port listen(5) HERE-------------------//

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//------------------------------------------------------//
