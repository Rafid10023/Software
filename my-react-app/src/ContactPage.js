import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import emailSymbol from "./images/email.jpg";
import locationSymbol from "./images/location.jpg";
import messageSymbol from "./images/message.jpg";
import phoneSymbol from "./images/phone.jpg";
import "./ContactPage.css";

const ContactPage = () => {
  const [subject, setSubject] = useState("");
  const [mainText, setMainText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data object to be sent to the server
    const data = [
      {
        subject: subject,
        mainText: mainText,
      },
    ];

    // Send the data to the backend server using Axios
    axios
      .post("/submit_data", data)
      .then((response) => {
        console.log(response.data);
        // Optionally, you can reset the form fields after successful submission
        setSubject("");
        setMainText("");
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  const handleClearText = () => {
    setSubject("");
    setMainText("");
  };

  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/members")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <div className="header">
        <div className="allTextHeader">
          <div>
            <p className="Title">HappyHounds</p>
          </div>

          <div className="headerLinks">
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
      </div>

      <div className="main-content">
        <div className="LeftBox">
          <form onSubmit={handleSubmit}>
            <p className="MessageTitle">Send us a Message</p>

            <input
              type="text"
              placeholder="Enter your subject"
              className="Text-Box-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              placeholder="Enter your subject"
              className="Text-Box-main"
              value={mainText}
              onChange={(e) => setMainText(e.target.value)}
            />
            <button type="submit">Submit</button>
            <button onClick={handleClearText}>Clear Text</button>
          </form>
        </div>

        <div className="RightBox">
          <div className="box">
            <img
              src={emailSymbol}
              alt="Example"
              className="Symbol"
              style={{ width: "4vw", height: "auto" }}
            />
            <p>Email us at:</p>
            <p>HappyHounds@gmail.com</p>
          </div>
          <div className="box">
            <img
              src={locationSymbol}
              alt="Example"
              className="Symbol"
              style={{ width: "4vw", height: "auto" }}
            />
            <p>Find us at:</p>
            <p>HappyHounds@gmail.com</p>
          </div>
          <div className="box">
            <img
              src={messageSymbol}
              alt="Example"
              className="Symbol"
              style={{ width: "4vw", height: "auto" }}
            />
            <p>Fax us at:</p>
            <p className="fax-number">+1 (555) 123-4567</p>
          </div>
          <div className="box">
            <img
              src={phoneSymbol}
              alt="Example"
              className="Symbol"
              style={{ width: "4vw", height: "auto" }}
            />
            <p>Call us at:</p>
            <p>+44-3020-647-330</p>
          </div>
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

export default ContactPage;
