// HomePage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [subject, setSubject] = useState("");
  const [mainText, setMainText] = useState("");

  const handleClearText = () => {
    setSubject("");
    setMainText("");
  };

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
          <p className="MessageTitle">Send us a Message</p>
          <input
            type="text"
            placeholder="Enter your subject"
            className="Text-Box-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Enter your subject"
            className="Text-Box-main"
            value={mainText}
            onChange={(e) => setMainText(e.target.value)}
          />
          <button onClick={handleClearText}>Clear Text</button>
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
