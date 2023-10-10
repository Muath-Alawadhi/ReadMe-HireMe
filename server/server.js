//To Do:
//add env for port and token
//find solution for regular token expiration
//we still need skills from repos path
//
//sometimes when trying to test code , we are having issues with DB connection
//so, we just need comment out all DB code in order to test other parts, then uncomment them
//or we can wait for some time till the DB connection is back to normal
//

const axios = require("axios"); //library to fetch from Github api
const express = require("express");
const app = express();
const pool = require("./DBConfig");
const cors = require("cors"); //Middleware: to handle CORS-related headers and behavior.
const bodyParser = require("body-parser"); //Middleware: To handle incoming HTTP requests
require("dotenv").config();

const port = 8000;
app.use(bodyParser.json());
app.use(cors());

//-------------GitHup OAuth----------------------
const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
//-----------------------------------------------
let githubAccessToken = null; // Variable to store the access token

//---------------- get the access_token --------------------
app.post("/access-code", async (req, res) => {
  const { code } = req.body;
  console.log(code);
  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    null,
    {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      },
      headers: {
        Accept: "application/json",
      },
    }
  );

  const { access_token } = response.data;
  githubAccessToken = access_token;
  console.log(githubAccessToken); // printing the access token

  // After getting the token, immediately fetch and insert data into the database
  await fetchAndInsertData();
  res.json({ success: true });
});

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

    const userDataResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${githubAccessToken}`,
      },
    });
    console.log(userDataResponse);

    const userData = response.data;
    // console.log(userData);

    const githubUserName = userData.login || "Not available";
    const name = userData.name || "Name Not available";
    const reposNumber = userData.public_repos || "Not available";
    const profilePicLink = userData.avatar_url || "Not available";
    // console.log(githubUserName, name, reposNumber, profilePicLink);

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

    //------------------- fetch readme file  ----------------------
    const readmeDataResponse = await octokit.request(
      "Get /repos/{owner}/{repo}/readme",
      { owner: "rahmab1", repo: "rahmab1" }
    );
    // The README content will be in base64-encoded,so we need to decode it
    const readmeContent = Buffer.from(
      readmeDataResponse.data.content,
      "base64"
    ).toString("utf-8");
    // console.log(readmeContent);

    // cvRegex & linkedinRegex to match CV and LinkedIn links
    const cvRegex =
      /(?:cv|resume|portfolio)\s*:\s*?(https?:\/\/(?:www\.)?(?:[a-zA-Z0-9-]+\.)+(?:[a-zA-Z]{2,})(?:\/[^\s]*)?)/i;
    const linkedinRegex = /(https?:\/\/www\.linkedin\.com\/\S+)/i;

    // Search for CV and LinkedIn links in the README content
    const cvMatch = readmeContent.match(cvRegex);
    const linkedinMatch = readmeContent.match(linkedinRegex);

    const cvLink = cvMatch ? cvMatch[0] : "CV link not found";
    const linkedin = linkedinMatch
      ? linkedinMatch[0]
      : "LinkedIn link not found";

    //still need to add cvLink and linkedin to DB in separate branch

    //------------------- end of readme file  ----------------------

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

    // // committing client
    await client.query("COMMIT");

    client.release();

    //Send the data as a JSON response
    res.json({
      userName: githubUserName,
      name: name,
      repos_number: reposNumber,
      profile_pic: profilePicLink,
      skills: allLanguages,
      cv: cvLink,
      linkedIn: linkedin,
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

//------------------ Endpoint for FrontEnd --------------

app.get("/api/fetchGradData", async (req, res) => {
  try {
    const client = await pool.connect();
    const resultOfQuery = await client.query(`select * from test_graduate;`);

    client.release();

    const gradData = resultOfQuery.rows; //gradData is an array of objects , each object is a row

    res.json(gradData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `internal connection to DB error` });
  }
});

//---------------- end of Endpoint for FrontEnd  --------------------

//---------------- listen --------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
