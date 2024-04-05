import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import emailSymbol from "./images/email.jpg";
import locationSymbol from "./images/location.jpg";
import messageSymbol from "./images/message.jpg";
import phoneSymbol from "./images/phone.jpg";
import "./HomePage.css";

const HomePage = () => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    // Fetch the JSON data from your Flask server
    fetch("/members")
      .then((response) => response.json())
      .then((data) => {
        setJsonData(data);
      })
      .catch((error) => {
        console.error("Error fetching JSON data:", error);
      });
  }, []);

  const handleDelete = (arrayIndex, objIndex) => {
    axios
      .delete(`/delete_data/${arrayIndex}/${objIndex}`)
      .then((response) => {
        console.log(response.data);
        // If deletion is successful, update the state to reflect the change
        setJsonData((prevData) => {
          const newData = [...prevData];
          newData[arrayIndex].splice(objIndex, 1);
          return newData;
        });
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  return (
    <div>
      <div className="header">
        <div className="allTextHeader">
          <div>
            <p className="Title">HappyHounds</p>
          </div>

          <div className="headerLinks">
            <Link to="/" className="Home-page">
              HOME
            </Link>
            <Link to="/profile" className="profile">
              PROFILE
            </Link>
            <Link to="/login" className="login">
              LOGIN
            </Link>
          </div>
        </div>
      </div>

      <div className="main-content">
        
        <div>

          <ul>
            <li><header className="TitleMain">Welcome Back USERNAME HERE </header></li>



            {jsonData.map((array, arrayIndex) => (
              <div key={arrayIndex}>
                {array.map((obj, objIndex) => (
                  <li key={objIndex}>
                    <p>Subject: {obj.subject}</p>
                    <p>Main Text: {obj.mainText}</p>
                    <button onClick={() => handleDelete(arrayIndex, objIndex)}>Delete</button>



                  </li>
                ))}


                
              </div>
            ))}
        
          </ul>

      
        </div>
 
      </div>

      <div className="footer">
        <Link to="/contact" className="contact">
          CONTACT US
        </Link>
      </div>
    </div>
  );
};

export default HomePage;