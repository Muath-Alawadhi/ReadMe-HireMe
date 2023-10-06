//To Do:
//add env for port and token
//find solution for regular token expiration
//we still need skills from repos path

const { Octokit } = require("@octokit/core"); //library to fetch from Github api
const express = require("express");
const app = express();
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

//------------------ get / -----------------
app.get("/", (req, res) => {
  console.log("welcome to my server");
});

//----------------- fetch Grad data ------------------

app.get("/fetchAllGradData", async (req, res) => {
  try {
    //--(1)--giving username fetch --> name , repos number , profile_pic_url ---

    const response = await octokit.request("GET /users/{owner}", {
      owner: "rahmab1",
    });

    const userData = response.data;

    //to access specific data from the object we have in response.data
    userObject.userName = userData.login || "Not available";

    userObject.fullName = userData.name || "Name Not available";
    userObject.reposNumber = userData.public_repos || "Not available";
    userObject.profilePic = userData.avatar_url || "Not available";

    //--(2)--giving username fetch --> skills (programming langueages from all users repos) ---
    //
    //
    //
    //
    //

    //--(3)--giving username fetch --> cv link & linkedin link from readme file ---
    //readme file is stored in a repo , repo's name is same as username
    //
    //
    const readmeDataResponse = await octokit.request(
      "GET /repos/{owner}/{repo}/readme",
      {
        owner: "ali-nasir-ali",
        repo: "ali-nasir-ali",
      }
    );
    //extract from readme file -- regExpression ------------

    // if (response.data.content) {
    // The README content will be in base64-encoded format, so decode it
    const readmeContent = Buffer.from(
      readmeDataResponse.data.content,
      "base64"
    ).toString("utf-8");

    // cvRegex & linkedinRegex to match CV and LinkedIn links
    const cvRegex =
      /(?:cv|resume|portfolio)\s*:\s*?(https?:\/\/(?:www\.)?(?:[a-zA-Z0-9-]+\.)+(?:[a-zA-Z]{2,})(?:\/[^\s]*)?)/i;
    const linkedinRegex = /(https?:\/\/www\.linkedin\.com\/\S+)/i;

    // Search for CV and LinkedIn links in the README content
    const cvMatch = readmeContent.match(cvRegex);
    const linkedinMatch = readmeContent.match(linkedinRegex);

    // Extract the matched links
    userObject.cvLink = cvMatch ? cvMatch[0] : "CV link not found";
    userObject.linkedinLink = linkedinMatch
      ? linkedinMatch[0]
      : "LinkedIn link not found";

    // Send the CV and LinkedIn links as a response
    // const extractedData = {
    //   cvLink,
    //   linkedinLink,
    // };
    // res.json(extractedData);
    // }
    // else {
    //   console.error("Failed to fetch README:", response.status);
    //   res.status(404).json({ error: "README content not found" });
    // }

    //-------------------DataBase starts here

    //

    //-------------------DataBase ends here
    //Send the data as a JSON response
    res.json({
      userObject,
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
