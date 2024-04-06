import React, { useState } from "react";
import "./LoginPage.css";

function SignUpDogOwner() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/signupDogOwner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: name, password }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Sign up successful");
      // Reset input fields after successful sign-up
      setName("");
      setPassword("");
    } else {
      console.log("Sign up unsuccessful");
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1>HappyHounds</h1>
        <p>Welcome!</p>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">SIGN UP</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpDogOwner;
