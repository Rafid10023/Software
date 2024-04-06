import React, { useState, useEffect } from 'react';
import './MidSection.css';
import { Link } from 'react-router-dom';

function MidSection() {
  const [accepted, setAccepted] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/accepted') // Fetch from the correct endpoint
      .then(response => response.json())
      .then(data => setAccepted(data))
      .catch(error => console.error('Error fetching accepted users:', error));
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <div className="dashboard">
        <div className="approved-users">
          <ul>
            <li><h2>Approved Users</h2></li>
            {accepted.map((user, index) => (
              <li key={index}>
                <span>{user.name}</span>
                {/* Assuming you want to display the date, ensure it's properly formatted */}
                <span>{user.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MidSection;
