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

const { Pool } = require('pg'); // is a pacakge  for dabase interface. 
const pool = new Pool({
 
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: true,
});
const port = process.env.PORT || 3000;

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
    });

    // fetch github repos
    const repos = await fetch(`https://api.github.com/users/${userData.login}/repos`, {
    method: "GET",
    headers: {
      Authorization: await req.get("Authorization"),
    },
  })
    .then((response) => {
      return response.json();
    });

  for(const repo of repos) {
    // fetch all languages used in the repository
    const repoLanguages = await fetch(`https://api.github.com/repos/${userData.login}/${repo.name}/languages`, {
      method: "GET",
      headers: {
        Authorization: await req.get("Authorization"),
      },
    })
    .then((response) => response.json());

    const languages = Object.keys(repoLanguages);
    for(const lang of languages) {
      await pool.query('INSERT INTO Skill (lang_name) VALUES ($1) ON CONFLICT (lang_name) DO NOTHING', [lang]);
    }
  // insert the repo into the database and get its ID
  const insertRepoResult = await pool.query('INSERT INTO Repository (name, prs) VALUES ($1, $2) RETURNING id', [repo.name, repo.prs]);
  let repoId = null;
  if (result.rows.length > 0) {
    repoId = insertRepoResult.rows[0].id;
  }

// link the repo with its skills
for(const lang of languages) {
  await pool.query('INSERT INTO Repository_Skill (repository_id, skill_id) VALUES ($1, (SELECT id FROM Skill WHERE lang_name = $2)) ON CONFLICT DO NOTHING',
    [repoId, lang]
  );
}
}

console.log(userData);
res.json(userData);
});

  
//--------------------------------------------------------//

//--------------------Port listen(5) HERE-------------------//

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//------------------------------------------------------//
