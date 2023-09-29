import React from "react";
import SignUpContainer from "./SignUpContainer";
import LearnMoreContainer from "./LearnMoreContainer";
import "./TopContainer.css";


function TopContainer() {
  return (
    <div className="TopContainerBlock">
        <SignUpContainer />
        <LearnMoreContainer />
    </div>
  );
}

export default TopContainer;
