// HomePage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsEnvelope, BsFillGeoAltFill, BsFillChatLeftQuoteFill, BsFillTelephoneFill } from "react-icons/bs";
import phoneSymbol from './images/phone.jpg';
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
      <div class="header">
        <div class="allTextHeader">
            <div>
                <p class="Title">HappyHounds</p>
            </div>

            <div class="headerLinks">
                <Link to="/" className="Home-page">
            HOME
          </Link>
          <Link to="/profile" className="profile">
            PROFILE
          </Link>
          <Link to="/login" className="login">
            LOGIN
          </Link>
          <Link to="/system-admin" className="login">
            SYSADMIN
          </Link>
            </div>

        </div>
    </div>


    <div class="main-content">
        <div class="LeftBox">
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

        <div class="RightBox">
            <div class="box">
            <BsEnvelope />
            </div>
            <div class="box">
            <BsFillGeoAltFill />
            </div>
            <div class="box">
            <BsFillChatLeftQuoteFill />
            </div>
            <div class="box">
            <BsFillTelephoneFill />
            </div>
        </div>

    </div>

    <div class="footer">
        <Link to="/contact" className="contact">
          CONTACT US
        </Link>
    </div>

    </div>
  );
};

export default HomePage;
