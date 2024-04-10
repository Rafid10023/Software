import './style.css';
import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Sidebar from './Sidebar.js';

function Reports() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <main>
            <div className="sys-container">
            <Header OpenSidebar={OpenSidebar}/>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <h1>REPORTS</h1>
            <p>No reports from customer support.</p>
            </div>
        </main>
    )
}
    
export default Reports;
