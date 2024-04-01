import React, { useState } from 'react';
import './LoginPage.css';

function LoginDogOwner({ credentials }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = credentials.find(
      (cred) => cred.email === email && cred.password === password
    );
    if (user) {
      alert('Login successful!');
    } else {
      alert('Invalid email or password!');
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
