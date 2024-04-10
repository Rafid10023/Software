import './Requests.css'; // Make sure to import the CSS file
import React, { useState, useEffect } from 'react';

const Requests = () => {
  const [dogWalkers, setDogWalkers] = useState([]);

  useEffect(() => {
    fetchDogWalkers();
  }, []);

  const fetchDogWalkers = () => {
    // Fetch dog walkers data from the server or local file
    fetch('http://localhost:5000/dog_walkers')
      .then(response => response.json())
      .then(data => setDogWalkers(data.dog_walkers))
      .catch(error => console.error('Error fetching dog walkers:', error));
  };

  const handleAccept = (name) => {
    // Handle accepting a dog walker
    console.log(`Accepting ${name}`);
  };

  const handleDeny = (name) => {
    // Handle denying a dog walker
    console.log(`Denying ${name}`);
  };

  return (
    <div className="requests-container">
      {dogWalkers.length > 0 ? (
        dogWalkers.map((walker, index) => (
          <div className="request-row" key={index}>
            <span className="request-name">{walker.name}</span>
            <button className="approve" onClick={() => handleAccept(walker.name)}>Approve</button>
            <span className="check">✔</span>
            <button className="deny" onClick={() => handleDeny(walker.name)}>Deny</button>
            <span className="cross">✖</span>
          </div>
        ))
      ) : (
        <p>No requests available</p>
      )}
    </div>
  );
};

export default Requests;