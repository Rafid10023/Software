// HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      <div className="header">
        <div className="allTextHeader">
        <p className="Title">HappyHounds</p>

        <Link to="/" className="Home-page">
          HOME
        </Link>
        <Link to="/profile" className="profile">
          PROFILE
        </Link>
        <Link to="/login" className="login">
          LOGIN
        </Link>
        </div>

      </div>
      <div className="main-content">
        <div className="LeftBox">
          <input type="text" placeholder="Enter your subject" className="Text-Box" />
          <input type="text" placeholder="Enter your subject" className="Text-Box" />
        </div>
        <div className="RightBox">
          <p>bruh</p>
        </div>
      </div>
      <div className="footer">
        <Link to="/contact" className="contact">
          CONTACT US
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
