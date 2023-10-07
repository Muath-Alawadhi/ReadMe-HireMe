//To Do:
//add env for port and token
//find solution for regular token expiration
//we still need skills from repos path

const { Octokit } = require("@octokit/core"); //library to fetch from Github api
const express = require("express");
const app = express();
// const { Pool } = require("pg");

const pool = require("./DBConfig");

const port = 6000;

const octokit = new Octokit({
  auth: `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`,
});

const username = "rahmab1";

const userObject = {
  userName: "",
  fullName: "",
  skills: [],
  cvLink: "",
  linkedinLink: "",
  profilePic: "",
  reposNumber: 0,
};

//declate object here to store all data from api response

//------------------ get / ---------------------
app.get("/", (req, res) => {
  console.log("welcome to my server");
});

//----------------- fetch Grad data ------------------

app.get("/fetchGradData", async (req, res) => {
  const client = await pool.connect();
  try {
    //--(1)--giving username fetch --> name , repos number , profile_pic_url ---

    const response = await octokit.request("GET /users/{owner}", {
      owner: "rahmab1",
    });

    const userData = response.data;
    // console.log(userData);

    const githubUserName = userData.login || "Not available";
    const name = userData.name || "Name Not available";
    const reposNumber = userData.public_repos || "Not available";
    const profilePicLink = userData.avatar_url || "Not available";
    console.log(githubUserName, name, reposNumber, profilePicLink);

    // ---------------------repo.languages--------------------------
    const reposUrl = userData.repos_url;
    // Using the repos_url to fetch repositories first ^ ^
    const reposResponse = await octokit.request("GET " + reposUrl);

    // Extract language data from repositories...o-o
    const repos = reposResponse.data;

    const uniqueLanguages = new Set();

    repos.forEach((repo) => {
    const language = repo.language;
    
    if (language && language !== "null") {
    uniqueLanguages.add(language);
    }
    });

    const allLanguages = [...uniqueLanguages];

    //-------------------end of repo.languages ----------------------
    await client.query("BEGIN"); // starting client
    //  putting Grad  data into the test_graduate  table and
    const insertQuery = `
    INSERT INTO Test_Graduate(userName, name, repos_number, profile_pic, skills)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;

    // putting the  values in an array in the table  and storing the result.
    const values = [
      githubUserName,
      name,
      reposNumber,
      profilePicLink,
      allLanguages,
    ];
    const result = await client.query(insertQuery, values);

    // committing client
    await client.query("COMMIT");

    client.release();

    //Send the data as a JSON response
    res.json({
      userName: githubUserName,
      name: name,
      repos_number: reposNumber,
      profile_pic: profilePicLink,
      skills: allLanguages,
    });
  } catch (error) {
    console.error("Error fetching data from GitHub:", error.message);
    res.status(500).json({ error: "Failed to fetch data from GitHub" });
    await client.query("ROLLBACK");
    throw new Error(
      "Failed to insert data into the database. Please try again later."
    );
  }
});

//---------------- listen --------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
