import React, { useState, useEffect } from 'react';
import './LoginPage.css';


function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    useEffect(() => {
      fetch("/login").then(
        res => res.json()
      ).then(
        data => {
          if (data === true)
            console.log("login successful")
          else
            console.log("login not successful")
        }
      )
    }

    )

  return (
    <form method='POST'>
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
        <button >LOGIN</button>
      </div>
    </div>
    </form>
  );
}

export default LoginAdmin;