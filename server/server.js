const { Octokit } = require("@octokit/core");
const express = require("express");
const app = express();
const port = 3000;
// const dotenv = require("dotenv").config();
const octokit = new Octokit({
  auth: `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`,
});

app.get("/", (req, res) => {
  console.log("welcome to my server");
});

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
