import React, { useState } from 'react';
import './LoginPage.css';

function LoginDogOwner() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Login successful");
    } else {
      console.log("Login unsuccessful");
    }
  }

  return (
    <div className="container">
      <div className="login-box">
        <h1>HappyHounds</h1>
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
        <button onClick={handleLogin}>LOGIN</button>
        <p>New Here? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
}

export default LoginDogOwner;