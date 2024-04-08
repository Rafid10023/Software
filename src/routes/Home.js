import React from "react";
import { useState } from "react"; 
import "./Home.css";
import TopSection from "../components/TopSection";
import Sidebar from "../components/Sidebar";
import MidSection from '../components/MidSection';

function Home () {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
 
    return (
    <main>
    <div className='main-container'>
    <TopSection OpenSidebar={OpenSidebar}/>
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <div className='main-title'>
            <h1>DASHBOARD</h1>
        </div>
    <MidSection />
        </div>
    </main>
    )
}
    
export default Home;