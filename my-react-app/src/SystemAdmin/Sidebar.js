import React from 'react';
import { Link } from "react-router-dom";
import 
{BsGrid1X2Fill, BsFillEnvelopeFill, BsPeopleFill,
    BsFillBellFill, BsBarChartFill, BsFillGearFill}
 from 'react-icons/bs';
import './style.css';

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to='/system-admin'><BsGrid1X2Fill className='icon'/> Dashboard</Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/user-management'><BsPeopleFill className='icon'/> User Management </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/rnr'><BsFillEnvelopeFill className='icon'/> Ratings & Reviews</Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/reminders'><BsFillBellFill className='icon'/> Reminders</Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/reports'><BsBarChartFill className='icon'/> Reports </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/settings'><BsFillGearFill className='icon'/> Settings</Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/login'>Logout</Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar;