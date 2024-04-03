import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';

function LoginDogOwner({ credentials }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', { email, password });
      if (response.data.success) {
        alert('Login successful');
        // Redirect or perform other actions upon successful login
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in');
    }
  };

  return (
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
        <button onClick={handleLogin}>LOGIN</button>
        <p>New Here? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
}

export default LoginDogOwner;