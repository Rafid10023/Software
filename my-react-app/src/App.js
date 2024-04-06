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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Users />} />
          <Route path="/loginOwner" element={<LoginDogOwner />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signupDogOwner" element={<SignUpDogOwner />} />
          <Route path="/loginWalker" element={<LoginDowWalker />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/logincsupport" element={<Logincsupport />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
