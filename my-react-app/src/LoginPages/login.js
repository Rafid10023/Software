import React, { useState } from 'react';
import './LoginPage.css';
import { getUserDatabase } from './UserDatabase.js';
import SystemAdmin from '../SystemAdmin/SystemAdmin.js';

function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getUserDatabase();
    const foundUser = users.find(user => user[0] === email && user[1] === password);
    if (foundUser) {
      console.log('Login successful');
      setIsLoggedIn(true);
    } else {
      console.log('Incorrect username or password');
    }
  }

  return isLoggedIn ? <SystemAdmin /> : (
    <form onSubmit={handleSubmit} method='POST'>
      <div className="container">
        <div className="login-box">
          <h1>Happy Hounds</h1>
          <p>Welcome back!</p>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit'>LOGIN</button>
        </div>
      </div>
    </form>
  );
}

export default LoginAdmin;
