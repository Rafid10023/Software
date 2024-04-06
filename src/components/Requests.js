import './Requests.css'; // Make sure to import the CSS file
import React, { useState, useEffect } from 'react';

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/potential')
      .then(response => response.json())
      .then(data => setRequests(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAccept = (name) => {
    fetch('http://localhost:5000/accept', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      setRequests(requests.filter(request => request.name !== name));
    })
    .catch(error => console.error('Error accepting request:', error));
  };

  const handleDeny = (name) => {
    fetch('http://localhost:5000/deny', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      setRequests(requests.filter(request => request.name !== name));
    })
    .catch(error => console.error('Error denying request:', error));
  };

  return (
    <div className="requests-container">
      {requests.map((request, index) => (
        <div className="request-row" key={index}>
          <span className="request-name">{request.name}</span>
          <button className="approve" onClick={() => handleAccept(request.name)}>Approve</button>
          <span className="check">✔</span>
          <button className="deny" onClick={() => handleDeny(request.name)}>Deny</button>
          <span className="cross">✖</span>
        </div>
      ))}
    </div>
  );
};

export default Requests;

