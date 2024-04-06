import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import '../components/SideBar.css';
import dashboardIcon from '../icons/Dashboard.png';
import userManagementIcon from '../icons/user.png';
import ratingsIcon from '../icons/email_send.png';
import remindersIcon from '../icons/notification_active.png';
import settingsIcon from '../icons/Settings.png';
import chatIcon from '../icons/chat.png';
import requestsIcon from '../icons/Requests.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="menuItems">
        {/* Use Link components with 'to' attribute for navigation */}
        <Link to="/" className="menuItem">
          <img src={dashboardIcon} alt="Dashboard" className="icon" />
          <span>Dashboard</span>
        </Link>
        <Link to="/user-management" className="menuItem">
          <img src={userManagementIcon} alt="User Management" className="icon" />
          <span>User Management</span>
        </Link>
        <Link to="/ratings-reviews" className="menuItem">
          <img src={ratingsIcon} alt="Ratings & Reviews" className="icon" />
          <span>Ratings & Reviews</span>
        </Link>
        <Link to="/reminders" className="menuItem">
          <img src={remindersIcon} alt="Reminders" className="icon" />
          <span>Reminders</span>
        </Link>
        <Link to="/settings" className="menuItem">
          <img src={settingsIcon} alt="Settings" className="icon" />
          <span>Settings</span>
        </Link>
        <Link to="/Chat" className="menuItem">
          <img src={chatIcon} alt="Chat" className="icon" />
          <span>Chat</span>
        </Link>
        <Link to="/Requests" className="menuItem">
          <img src={requestsIcon} alt="Requests" className="icon" />
          <span>Requests</span>
        </Link>
      </div>
      {/* Rest of the sidebar content */}
    </div>
  );
};

export default Sidebar;
