import React, { useState } from 'react';
import "./style.css";
import Header from './Header.js';
import Sidebar from './Sidebar.js';

const Settings = () => {
  // State variables to manage settings
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [emailNotification, setEmailNotification] = useState(true);
  const [smsNotification, setSmsNotification] = useState(false);
  const [language, setLanguage] = useState('English');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to backend or perform necessary actions
    console.log("Form submitted!");
  };

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='settings-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <div className='settings-content'>
      <h2>Settings</h2>
      <form className='settings-form' onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="checkbox"
              checked={notificationEnabled}
              onChange={(e) => setNotificationEnabled(e.target.checked)}
            />
            Enable Notifications
          </label>
        </div>
        
        <div>
          <label>
            <input
              type="checkbox"
              checked={emailNotification}
              onChange={(e) => setEmailNotification(e.target.checked)}
            />
            Email Notifications
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={smsNotification}
              onChange={(e) => setSmsNotification(e.target.checked)}
            />
            SMS Notifications
          </label>
        </div>
        <div>
          <label>
            Language:
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
      </div>
    </div>
  );
};

export default Settings;
