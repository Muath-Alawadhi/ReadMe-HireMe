// Details.js
import React, { useEffect } from "react";
import "./Details.css";

function Details() {
  useEffect(() => {
    // Add a class to the body element when on the Home page
    document.body.classList.add("is-home");
    // Remove the class when leaving the Home page
    return () => {
      document.body.classList.remove("is-home");
    };
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="left-content">
          <h1 className="place">
            The right place to find
            <br />
            skilled graduates.
          </h1>
          <button className="btn btn-danger">Discover More!</button>
        </div>
        <div className="right-content">
          <p className="icon-text">Explore the technologies:</p>
          <div className="icons">
            <i className="icon-html fab fa-html5"></i>
            <i className="icon-css fab fa-css3"></i>
            <i className="icon-js fab fa-js"></i>
            <i className="icon-react fab fa-react"></i>
            <i className="icon-node fab fa-node-js"></i>
            <i className="icon-psql fab fa-postgresql"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
