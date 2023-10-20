import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./Signup.css";
const handleLoginClick = () => {
  const clientId = "4b7ee8342a11859ac626";
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
};

const Signup = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="container2"></div>
        <div
          className=" d-flex align-items-center justify-content-center " id="card"
        >
          <div
            className="d-flex flex-column align-items-center"
            id="Hire-Me-box"
          >
            <h2 className="Hire-Me">
              Hire <span className="me">Me</span>
            </h2>

            <button
              className="btn btn-secondary btn-lg"
              onClick={handleLoginClick}
              style={{ width: "20rem" }}
            >
              <i className="fa fa-github me-2"></i> Sign Up with GitHub
            </button>
            <p className="lead">
              Already Signed Up?
              <Link to="/graduates" className="Graduates">
                Go To Graduates
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
