import React, { useState } from 'react';
import './LoginPage.css';
import { getUserDatabase } from './UserDatabase.js';

function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    const users = getUserDatabase();
    const foundUser = users.find(user => user[0] === email && user[1] === password);
    if (foundUser) {
      
      console.log('Login successful');
    } else {
      
      console.log('Incorrect username or password');
    }
  }
  return (
    <form onSubmit={handleSubmit} method='POST'>
    <div className="container">
      <div className="login-box">
        <h1>HappyHounds</h1>
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