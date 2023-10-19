import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css"; 

const handleLoginClick = () => {
  const clientId = "4b7ee8342a11859ac626";
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
};

const Signup = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-4 mb-4">
          <span className="text-danger">Hire </span>
          <span  className="text-white">Me</span>
        </h1>
        <button className="btn btn-dark btn-lg mb-3" onClick={handleLoginClick}>
          <i className="fa fa-github me-2"></i> Sign Up with GitHub
        </button>
        <p className="lead text-white">  
          Already Signed Up? <Link to="/graduates" className="text-danger">Go To Graduates</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;



