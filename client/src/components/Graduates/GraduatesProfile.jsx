import React from "react";
import "./GraduatesProfile.css";

function GraduatesProfile(props) {
  const { name, username, repo, language, image } = props.profile;

  return (
    <div>
      {/* Display profile information here */}
      <h1>{name}</h1>
      <p>Username: {username}</p>
      <p>Repo: {repo}</p>
      <p>Languages: {language}</p>
      <img src={image} alt={name} />
    </div>
  );
}

export default GraduatesProfile;