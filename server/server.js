const { Octokit } = require("@octokit/core");
const express = require("express");
const app = express();
const port = 3000;

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

/*
app.get("/", async (req, res) => {
  // Your code to fetch and display graduate data goes here
  // Inside the app.get('/', ...) route handler
  const username = "ali-nasir-ali"; // Replace with the graduate's GitHub username
  const repository = "ali-nasir-ali"; // Replace with the repository name
  // https://github.com/ali-nasir-ali/ali-nasir-ali/blob/main/README.md

  
  const response = await axios.get(
    `https://api.github.com/repos/${username}/${repository}`
    // {
    //   headers: {
    //     Authorization: "Bearer YOUR_GITHUB_TOKEN",
    //   },
    // }
  );

  const readmeContent = Buffer.from(response.data.content, "base64").toString();

  // You can parse the README content here and send it as a JSON response
  // For now, let's send the raw content as is
  res.send(readmeContent);
});
*/

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
