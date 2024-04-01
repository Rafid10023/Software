import React, { useState } from 'react';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import './style.css'; 

const UserManagement = () => {
  // Sample data for demonstration
  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', type: 'Walker', userSince: '02/03/2024' },
    { id: 2, name: 'User 2', type: 'Owner', userSince: '03/03/2024' },
    { id: 3, name: 'User 3', type: 'Walker', userSince: '16/03/2024' },
    { id: 4, name: 'User 4', type: 'Owner', userSince: '16/03/2024' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  // Function to filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className="container"> {/* Apply container class */}
    <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <h1>User Management</h1>
      <input
      className='searchbar'
        type="text"
        placeholder="Search by user name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Type</th>
            <th>User Since</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.type}</td>
              <td>{user.userSince}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;