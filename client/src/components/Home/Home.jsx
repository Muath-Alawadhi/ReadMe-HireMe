import React, { useEffect } from "react";
import "./home.css";
import logo from "./cyf_brand.png";

function Home() {
  useEffect(() => {
    document.body.classList.add("home");
    return () => {
      document.body.classList.remove("home");
    };
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="left-content"></div>
      </div>
      <footer className="footer">
        <div className="container">
          <div className="button-content">
            <h1 className="place">
              The right place to find{" "}
              <span style={{ color: "#d12f2f" }}>skilled</span>{" "}
              <a className="graduates" href="../Graduates/Graduates.jsx">
                graduates!
              </a>
            </h1>
            <div className="icons">
              <i className="icon-html fab fa-html5"></i>
              <i className="icon-css fab fa-css3"></i>
              <i className="icon-js fab fa-js"></i>
              <i className="icon-react fab fa-react"></i>
              <i className="icon-node fab fa-node-js"></i>
              <img
                src="https://cdn.icon-icons.com/icons2/2699/PNG/512/postgresql_src_logo_icon_170834.png"
                alt=""
                className="pasl"
              />
            </div>
            <span className="border-line"></span>
            <a
              href="https://codeyourfuture.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={logo} alt="CYF" className="logo" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
