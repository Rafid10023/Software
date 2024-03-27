// HomePage.js
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <p>This is the homepage content.</p>
      <p>Check out our other pages:</p>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
