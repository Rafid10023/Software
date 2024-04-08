// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";
import login from "./LoginPages/login";
import profile from "./profile";
import SystemAdmin from "./SystemAdmin/SystemAdmin";
import UserManagement from "./SystemAdmin/UserManagement";
import RnR from "./SystemAdmin/RnR";
import Reminders from "./SystemAdmin/Reminders";
import Reports from "./SystemAdmin/Reports";
import Settings from "./SystemAdmin/Settings";
import LoginAdmin from "./LoginPages/login";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />{" "}
          <Route path="/profile" element={<profile />} />{" "}
          <Route path="/login" element={<LoginAdmin />} />{" "}
          <Route path="/system-admin" element={<SystemAdmin />} />{" "}
          <Route path="/user-management" element={<UserManagement />} />{" "}
          <Route path="/rnr" element={<RnR />} />{" "}
          <Route path="/reminders" element={<Reminders />} />{" "}
          <Route path="/reminders" element={<Reminders />} />{" "}
          <Route path="/reports" element={<Reports />} />{" "}
          {/* Use ContactPage component for /contact route */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;