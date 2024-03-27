// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
//import AboutPage from "./AboutPage";
//import ContactPage from "./ContactPage";

const App = () => {
  return (
    <div>
      <header>HELLO</header>
      <Router>
        <Routes>
          {" "}
          {/* Wrap Routes around Route components */}
          <Route path="/" element={<HomePage />} />
          {/* Add more routes here */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
