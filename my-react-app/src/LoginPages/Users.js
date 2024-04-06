import React from "react";
import "./Users.css";
import DogWalkerImage from "./DogWalker.jpg";
import AdminImage from "./Admin.jpg";
import DogOwnerImage from "./DogOwner.jpg";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();
  const handleClickLoginOwner = () => {
    navigate("/loginOwner");
  };
  const handleClickLoginWalker = () => {
    navigate("/loginWalker");
  };
  const handleClickLoginAdmin = () => {
    navigate("/loginAdmin");
  };

  const handleClickSignUp = () => {
    navigate("/signup");
  };

  const handleClickSignUpDogOwner = () => {
    navigate("/signupDogOwner");
  };
  const handleClickLogincsupport = () => {
    navigate("/logincsupport");
  };

  return (
    <div className="container">
      <h1>Are you a... </h1>
      <div className="buttonGroup">
        <div className="buttonBox">
          <h2>DOG WALKER</h2>
          <img src={DogWalkerImage} />
          <div className="buttonContainer">
            <button onClick={handleClickLoginWalker}>LOGIN</button>
            <div className="signUpButton">
              <button onClick={handleClickSignUp}>SIGN UP</button>
            </div>
          </div>
        </div>
        <div className="buttonBox">
          <h2>DOG OWNER</h2>
          <img src={DogOwnerImage} />
          <div className="buttonContainer">
            <button onClick={handleClickLoginOwner}>LOGIN</button>
            <div className="signUpButton">
              <button onClick={handleClickSignUpDogOwner}>SIGN UP</button>
            </div>
          </div>
        </div>
        <div className="buttonBox">
          <h2>ADMIN</h2>
          <img src={AdminImage} />
          <div className="buttonContainer">
            <button onClick={handleClickLoginAdmin}> LOGIN</button>
          </div>
        </div>

        <div className="buttonBox">
          <h2>CUSTOMER SUPPORT</h2>
          <img src={AdminImage} />
          <div className="buttonContainer">
            <button onClick={handleClickLogincsupport}> LOGIN</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
