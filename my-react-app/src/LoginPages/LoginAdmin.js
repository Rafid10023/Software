import React, { useState } from 'react';
import './LoginPage.css';
import SystemAdmin from '../SystemAdmin/SystemAdmin.js';

function LoginAdmin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        console.log('Login successful');
        setIsLoggedIn(true);
      } else {
        console.log('Incorrect username or password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return isLoggedIn ? <SystemAdmin /> : (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="login-box">
          <h1>Happy Hounds</h1>
          <p>Welcome back!</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
