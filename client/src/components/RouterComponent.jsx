import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home/Home";
import Graduates from "./Graduates/Graduates";
import Signup from "./signup/Signup";

import GraduatesProfile from "./GraduatesProfile/GraduatesProfile";
import GitHubCallback from "./signup/GitHubCallback/GitHubCallback";

function RouterComponent() {
  const customNavbarStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    margin: "20px 7rem 0px 7rem",
    borderRadius: "10px",
  };

  const linkStyle = {
    color: "rgb(52, 71, 103)",
  };

  const iconStyle = {
    marginRight: "5px",
  };

  return (
    <Router>
      <div>
        <nav
          style={customNavbarStyle}
          className="navbar navbar-expand-lg fixed-top"
        >
          <div className="container">
            <Link className="navbar-brand" to="/Home" style={linkStyle}>
              <span style={{ color: "#d12f2f",fontWeight:"bold" }}>ReadMe</span><span style={{ fontWeight:"bold" }}>-HireMe</span> 
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/Home" style={linkStyle}>
                    <i className="fa fa-home" style={iconStyle}></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/graduates" style={linkStyle}>
                    <i className="fa fa-graduation-cap" style={iconStyle}></i>{" "}
                    Graduates
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" style={linkStyle}>
                    <i className="fa fa-user-plus" style={iconStyle}></i> Signup
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/graduates" element={<Graduates />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/Graduates/GraduatesProfile"
              element={<GraduatesProfile />}
            />
            <Route path="/github-callback" element={<GitHubCallback />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default RouterComponent;
