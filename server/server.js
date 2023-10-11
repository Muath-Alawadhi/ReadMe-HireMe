//To Do:
//we still need skills from repos path
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
  console.log(githubAccessToken); // printing the access token for checking

  // After getting the token, immediately fetch and insert data into the database
  await fetchAndInsertData();
  res.json({ success: true });
});

//------------------ get / ---------------------
app.get("/", (req, res) => {
  console.log("welcome to my server");
});

//----------------- fetch Grad data ------------------
async function fetchAndInsertData() {
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

      const userData = userDataResponse.data;
      const githubUserName = userData.login || "Not available";
      const name = userData.name || "Name Not available";
      const reposNumber = userData.public_repos || "Not available";
      const profilePicLink = userData.avatar_url || "Not available";
      // console.log(githubUserName, name, reposNumber, profilePicLink);

      // ---------------------repo.languages--------------------------
      const reposResponse = await axios.get(userData.repos_url, {
        // Using the repos_url to fetch repositories first ^ ^
        headers: {
          Authorization: `token ${githubAccessToken}`,
        },
      });
      // Extract language data from repositories...o-o
      const repos = reposResponse.data;
      console.log(repos);

      const uniqueLanguages = new Set();

      // Iterate through user's repositories to extract languages
      for (const repo of repos) {
        const language = repo.language;
        if (language && language !== "null") {
          uniqueLanguages.add(language);
        }
      }

      const allLanguages = [...uniqueLanguages];
      //-------------------end of repo.languages ----------------------

      //  ------------------- fetch readme file  ----------------------
      const readmeDataResponse = await axios.get(
        `https://api.github.com/repos/${githubUserName}/${githubUserName}/readme`,

        {
          headers: {
            Authorization: `token ${githubAccessToken}`,
          },
        }
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

      // still need to add cvLink and linkedin to DB in separate branch

      //------------------- end of readme file  ----------------------
      // -----------------Database-----------------------------------------
      // putting data into graduates 
      app.post("/insertData", async (req, res) => {
      await client.query(
        'INSERT INTO graduates (github_username, name, profile_pic_url, readme_content, cv_link, linkedin_link) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (github_username) DO UPDATE SET name = EXCLUDED.name, profile_pic_url = EXCLUDED.profile_pic_url, readme_content = EXCLUDED.readme_content, cv_link = EXCLUDED.cv_link, linkedin_link = EXCLUDED.linkedin_link RETURNING id',
        [githubUserName, name, profilePicLink, readmeContent, cvLink, linkedin]
      ).then(res => {
        const graduateId = res.rows[0].id;
        // putting data into repository
        for (const repo of repos) {
          client.query(
            'INSERT INTO repositories (graduate_id, repo_name, repo_language) VALUES ($1, $2, $3) ON CONFLICT (graduate_id, repo_name) DO UPDATE SET repo_language = EXCLUDED.repo_language',
            [graduateId, repo.name, repo.language]
          );
        }
        // putting data into skills 
        for (const language of allLanguages) {
          client.query(
            'INSERT INTO skills (graduate_id, language) VALUES ($1, $2) ON CONFLICT (graduate_id, language) DO NOTHING',
            [graduateId, language]
          );
        }
      });
         await client.query('COMMIT');
    client.release();
    res.json({ success: true });
      });
  
  }catch (error) {
     await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
})};
//------------------ Endpoint for FrontEnd --------------
/* app.get("/api/fetchGradData", async (req, res) => {
  try {
    const client = await pool.connect();

    // fetch data from the 'graduates' table
    const graduateData = await client.query('SELECT id, github_username, name, profile_pic_url, readme_content, cv_link, linkedin_link FROM graduates;');

    // fetch related repositories and skills for each graduate
    const grads = graduateData.rows;
    for (const grad of grads) {
      const reposData = await client.query('SELECT repo_name, repo_language FROM repositories WHERE graduate_id = $1;', [grad.id]);
      const skillsData = await client.query('SELECT language FROM skills WHERE graduate_id = $1;', [grad.id]);

      grad.repos = reposData.rows;
      grad.skills = skillsData.rows.map(row => row.language);
    }

    client.release();
    res.json(grads);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `internal connection to DB error` });
  }
}); */

//---------------- end of Endpoint for FrontEnd  --------------------

//---------------- listen --------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
