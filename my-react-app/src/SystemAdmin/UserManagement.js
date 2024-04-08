import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import './style.css'; 
import { BsSearch } from "react-icons/bs";

// Rest of the code remains the same...

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/accepted")
      .then(res => res.json())
      .then(users => {
        setUsers(users);
        console.log(users);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

const deleteUser = (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      fetch(`http://localhost:5000/delete/${userId}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        console.log(data.message); // Log success message
        // Remove the deleted user from the users state
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
    }
  };

  return (
    <div className="sys-container">
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <h1>USER MANAGEMENT</h1>
      <input
        className='searchbar'
        type="text"
        placeholder= "Search for user"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Type</th>
              <th>User Since</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.type}</td>
                <td>{user.date}</td>
                <td>{user.id && <button onClick={() => deleteUser(user.id)}>Remove User</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;
