// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ContactPage from "./contactpages/ContactPage";
import Login from "./LoginPages/Users";
import Profile from "./contactpages/Profilecssupport";

import LoginAdmin from "./LoginPages/LoginAdmin";
import Logincsupport from "./LoginPages/Logincsupport";
import LoginDogOwner from "./LoginPages/LoginDogOwner";
import LoginDogWalker from "./LoginPages/LoginDogWalker";
import SignUp from "./LoginPages/SignUp";
import SignUpDogOwner from "./LoginPages/SignUpDogOwner";

import Appointment from "./dogowner copy/appointment";
import History from "./dogowner copy/history";
import Chat from "./dogowner copy/chat";
import Home from "./dogowner copy/home";
import ConfirmPage from "./dogowner copy/ConfirmPage";

import SystemAdmin from "./SystemAdmin/SystemAdmin";
import UserManagement from "./SystemAdmin/UserManagement";
import RnR from "./SystemAdmin/RnR";
import Reminders from "./SystemAdmin/Reminders";
import Reports from "./SystemAdmin/Reports";
import Settings from "./SystemAdmin/Settings";


import { AuthProvider } from './LoginPages/AuthContext';

const App = () => {
  return (
    <div>
      <Router>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />{" "}
          <Route path="/Profile" element={<Profile />} />{" "}
          <Route path="/Login" element={<Login />} />{" "}
          {/* Use ContactPage component for /contact route */}
          <Route path="/loginAdmin" element={<LoginAdmin />} />{" "}
          <Route path="/loginWalker" element={<LoginDogWalker />} />{" "}
          <Route path="/logincsupport" element={<Logincsupport />} />{" "}
          <Route path="/signup" element={<SignUp />} />{" "}
          <Route path="/signupDogOwner" element={<SignUpDogOwner />} />{" "}
          <Route path="/loginOwner" element={<LoginDogOwner />} />{" "}


          <Route path="/appointment" element={<Appointment />} />
          <Route path="/history" element={<History />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/dogownerhome" element={<Home/>} />
          <Route path="/confirm" element={<ConfirmPage/>}/>

          <Route path="/system-admin" element={<SystemAdmin />} />{" "}
          <Route path="/user-management" element={<UserManagement />} />{" "}
          <Route path="/rnr" element={<RnR />} />{" "}
          <Route path="/reminders" element={<Reminders />} />{" "}
          <Route path="/settings" element={<Settings />} />{" "}
          <Route path="/reports" element={<Reports />} />{" "}
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
