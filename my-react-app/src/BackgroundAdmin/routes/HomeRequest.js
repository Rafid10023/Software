import React, {useState} from 'react';
import '../routes/Request.css';
import TopSection from '../components/TopSection'; // Adjust the path as necessary
import Sidebar from '../components/Sidebar';
import Requests from '../components/Requests'; // Adjust the path as necessary

// Main App component that uses the imported components
const Request = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div>
      <TopSection OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Requests />
      {/* other components or content */}
    </div>
  );
};

// Render the App component to the DOM

export default Request;