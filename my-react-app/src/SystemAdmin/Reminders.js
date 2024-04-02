import React, { useState } from 'react';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import './style.css'; 
import { BsBellSlashFill, BsBellFill } from "react-icons/bs";

const Reminders = () => {
  // Sample data for demonstration
  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', type: 'Walker', notifications: true },
    { id: 2, name: 'User 2', type: 'Owner', notifications: false },
    { id: 3, name: 'User 3', type: 'Owner', notifications: true },
    { id: 4, name: 'User 4', type: 'Walker', notifications: false },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  // Function to toggle notification status
  const toggleNotification = (userId) => {
    setUsers(prevUsers => prevUsers.map(user => {
      if (user.id === userId) {
        return { ...user, notifications: !user.notifications };
      }
      return user;
    }));
  };

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
      <h1>REMINDERS</h1>
      <input className='searchbar'
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Type</th>
            <th>Notifications</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.type}</td>
              <td>{user.notifications ? 'On' : 'Off'}</td>
              <td>
                <button onClick={() => toggleNotification(user.id)}>
                  {user.notifications ? <BsBellSlashFill /> : <BsBellFill />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reminders;
