import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Users from './LoginPages/Users';
import LoginDogOwner from './LoginPages/LoginDogOwner';
import LoginDowWalker from './LoginPages/LoginDogWalker';
import LoginAdmin from './LoginPages/LoginAdmin';
import SignUp from './LoginPages/SignUp';
function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route index element = {<Users/>}/>
      <Route path='/loginOwner' element={<LoginDogOwner/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/loginWalker' element={<LoginDowWalker/>}/>
      <Route path= '/loginAdmin' element={<LoginAdmin/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;