import React from "react";
import "./GraduatesProfileContainer.css";
import GPTopContainer from "./GraduatesProfileComponents/GPTopContainer";
import GPMenuBarContainer from "./GraduatesProfileComponents/GPMenuBarContainer";
import GPCardsContainer from "./GraduatesProfileComponents/GPCardsContainer";

function GraduatesProfileContainer() {
  return (
    <div className="GraduatesProfileBlock">
      <GPTopContainer />
      <GPMenuBarContainer />
      <GPCardsContainer />
    </div>
  );
}

export default GraduatesProfileContainer;
