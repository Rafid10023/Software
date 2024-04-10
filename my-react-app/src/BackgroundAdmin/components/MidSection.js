import React, { useState, useEffect } from 'react';
import './MidSection.css';

function MidSection() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/accepted')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching accepted users:', error));
  }, []);

  return (
    <>
    <div className='bg-container'>
      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Approved Users</th></tr>
            <tr>
              <th>User Name</th>
              <th>User Since</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </>
  );
}

export default MidSection;
