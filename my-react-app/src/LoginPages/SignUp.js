import React, { useState } from 'react';
import './LoginPage.css';
import { addUser } from './UserDatabase.js';
function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState([]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(email);
      addUser([email, password])
    }



  return (
    <form onSubmit={handleSubmit}>
    <div className="container">
      <div className="login-box">
        <h1>HappyHounds</h1>
        <p>Welcome!</p>
        <div className="input-container">
        <input
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
        <button>SIGN UP</button>
      </div>
    </div>
    </form>
  );
}

export default SignUp;