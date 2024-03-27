// HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      <div className="header">
        <h2 className="Title">HappyHounds</h2>
        <Link to="/">HomePage</Link> {/* Move the link inside the header */}
      </div>
      <div className="main-content">
        <p>bruh</p>
      </div>
      <div className="footer">
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
};

export default HomePage;
