import React, { useState } from 'react';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import './style.css'; 
import { BsSearch } from "react-icons/bs";

const UserManagement = () => {
  // Sample data for demonstration
  const [users, setUsers] = useState([
    { id: 1, name: 'Stephanie Rodriguez', type: 'Owner', userSince: '02/03/2024' },
    { id: 2, name: 'Benjamin Patel', type: 'Owner', userSince: '02/03/2024' },
    { id: 3, name: 'Jacob Russo', type: 'Walker', userSince: '03/03/2024' },
    { id: 4, name: 'Alexander Khan', type: 'Owner', userSince: '03/03/2024' },
    { id: 5, name: 'Olivia Jensen', type: 'Walker', userSince: '05/03/2024' },
    { id: 6, name: 'Ethan Li', type: 'Walker', userSince: '07/03/2024' },
    { id: 7, name: 'Madison Kim', type: 'Walker', userSince: '09/03/2024' },
    { id: 8, name: 'Daniel Smith', type: 'Owner', userSince: '10/03/2024' },
    { id: 9, name: 'Ava Sullivan', type: 'Walker', userSince: '15/03/2024' },
    { id: 10, name: 'William Hernandez', type: 'Owner', userSince: '15/03/2024' },
    { id: 11, name: 'Emma Williams', type: 'Owner', userSince: '15/03/2024' },
    { id: 12, name: 'Grace Murphy', type: 'Walker', userSince: '17/03/2024' },
    { id: 13, name: 'Matthew Thompson', type: 'Owner', userSince: '19/03/2024' },
    { id: 14, name: 'Isabella Martinez', type: 'Walker', userSince: '20/03/2024' },
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
    <div className="sys-container"> {/* Apply container class */}
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