// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";
import login from "./login";
import profile from "./profile";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />{" "}
          <Route path="/profile" element={<profile />} />{" "}
          <Route path="/login" element={<login />} />{" "}
          {/* Use ContactPage component for /contact route */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
