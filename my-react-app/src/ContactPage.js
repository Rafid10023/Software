// HomePage.js
import React from "react";
import { Link } from "react-router-dom";

const ContactPage = () => {
  return (
    <div>
      <h2>Welcome tasdfasdfge</h2>
      <p>This is the homepage content.</p>
      <p>Check out oasdfasdfges:</p>
      <ul>
        <li>
          <Link to="/">HomePage</Link>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default ContactPage;
