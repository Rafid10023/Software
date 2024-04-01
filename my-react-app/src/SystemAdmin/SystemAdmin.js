import React from "react";
import Sidebar from "./Sidebar";
import { useState } from "react"; 
import "./style.css";
import Header from "./Header";
import 
{ BsFillArchiveFill, BsChatLeftQuoteFill, BsCheckCircleFill, BsDatabaseAdd, BsGraphUpArrow, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'

function SystemAdmin () {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
 
    return (
    <main>
    <div className='main-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <div className='main-title'>
            <h1>DASHBOARD</h1>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Total Users</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>17,000</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>New Sign Ups</h3>
                    <BsGraphUpArrow className='card_icon'/>
                </div>
                <h1>16</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Active Bookings</h3>
                    <BsDatabaseAdd className='card_icon'/>
                </div>
                <h1>758</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Complete Bookings</h3>
                    <BsCheckCircleFill className='card_icon'/>
                </div>
                <h1>17,000</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Total Reviews</h3>
                    <BsChatLeftQuoteFill
                    className='card_icon'/>
                </div>
                <h1>6,000</h1>
            </div>
        </div>
        </div>
    </main>
    )
}
    
export default SystemAdmin;