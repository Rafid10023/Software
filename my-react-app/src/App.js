import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import HomePageWalker from "./HomePageWalker";
import AppointmentWalker from './AppointmentWalker';
import ChatWalker from "./ChatWalker";
import HistoryWalker from "./HistoryWalker";
import ProfileWalker from "./ProfileWalker";
import ConfirmPage from "./ConfirmPage";

const App = () => {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePageWalker />} />
          <Route path="/appointmentWalker" element={<AppointmentWalker />} />
          <Route path="/chatWalker" element={<ChatWalker />} />
          <Route path="/historyWalker" element={<HistoryWalker />} />
          <Route path="/profileWalker" element={<ProfileWalker />} />
          <Route path="/confirm" element={<ConfirmPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
