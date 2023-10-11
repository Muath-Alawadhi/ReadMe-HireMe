import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home/Home";
import Graduates from "./Graduates/Graduates";
import Signup from "./signup/Signup";
import GraduatesProfile from "./GraduatesProfile/GraduatesProfile";
import GitHubCallback from "./signup/GitHubCallback/GitHubCallback";


function RouterComponent() {
  const customNavbarStyle = {
    backgroundColor: "rgb(34, 25, 74, 0.848)",
  };
  const myPage = {
    color: "azure",
  };
  return (
    <Router>
      <div style={myPage}>
        <nav style={customNavbarStyle} className="navbar navbar-expand-lg ">
          <div className="container">
            <Link className="navbar-brand" to="/Home" style={myPage}>
              ReadMe-HireMe
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
                {" "}
                <li className="nav-item">
                  <Link className="nav-link" to="/Home" style={myPage}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/graduates" style={myPage}>
                    Graduates
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" style={myPage}>
                    Signup
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
