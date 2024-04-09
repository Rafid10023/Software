import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// LoginPages
import Users from "./LoginPages/Users";
import LoginDogOwner from "./LoginPages/LoginDogOwner";
import LoginDowWalker from "./LoginPages/LoginDogWalker";
import LoginAdmin from "./LoginPages/LoginAdmin";
import SignUp from "./LoginPages/SignUp";
import SignUpDogOwner from "./LoginPages/SignUpDogOwner";
import Logincsupport from "./LoginPages/Logincsupport";

// DogOwner Hub
import Appointment from "./dogowner copy/appointment";
import History from "./dogowner copy/history";
import Chat from "./dogowner copy/chat";
import Home from "./dogowner copy/home";
import ConfirmPage from "./dogowner copy/ConfirmPage";

// DogWalker Hub
import HomePageWalker from "./dogwalker copy/HomePageWalker";
import AppointmentWalker from './dogwalker copy/AppointmentWalker';
import ChatWalker from "./dogwalker copy/ChatWalker";
import HistoryWalker from "./dogwalker copy/HistoryWalker";
import ProfileWalker from "./dogwalker copy/ProfileWalker";
import ConfirmPageWalker from "./dogwalker copy/ConfirmPage";


import { AuthProvider } from './LoginPages/AuthContext';

function App () {


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
            {/* Dog walker pages */}
            <Route path="/dogwalkerhome" element={<HomePageWalker />} />
            <Route path="/appointmentWalker" element={<AppointmentWalker />} />
            <Route path="/chatWalker" element={<ChatWalker />} />
            <Route path="/historyWalker" element={<HistoryWalker />} />
            <Route path="/profileWalker" element={<ProfileWalker />} />
            <Route path="/confirmWalker" element={<ConfirmPageWalker />} />
          </Routes>
        </AuthProvider>      
      </BrowserRouter>
    </div>
  );
}
export default App;
