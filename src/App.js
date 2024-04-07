import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Users from "./LoginPages/Users";
import LoginDogOwner from "./LoginPages/LoginDogOwner";
import LoginDowWalker from "./LoginPages/LoginDogWalker";
import LoginAdmin from "./LoginPages/LoginAdmin";
import SignUp from "./LoginPages/SignUp";
import SignUpDogOwner from "./LoginPages/SignUpDogOwner";
import Logincsupport from "./LoginPages/Logincsupport";

import Appointment from "./dogowner copy/appointment";
import History from "./dogowner copy/history";
import Chat from "./dogowner copy/chat";
import Home from "./dogowner copy/home";
import ConfirmPage from "./dogowner copy/ConfirmPage";

import { AuthProvider } from './LoginPages/AuthContext';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/*Login pages are from loginOwner - logincsupport */}
            <Route index element={<Users />} />
            <Route path="/loginOwner" element={<LoginDogOwner />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signupDogOwner" element={<SignUpDogOwner />} />
            <Route path="/loginWalker" element={<LoginDowWalker />} />
            <Route path="/loginAdmin" element={<LoginAdmin />} />
            <Route path="/logincsupport" element={<Logincsupport />} />
            {/* Dog owner pages are from appointment - confirm */}
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/history" element={<History />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/dogownerhome" element={<Home/>} />
            <Route path="/confirm" element={<ConfirmPage/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
