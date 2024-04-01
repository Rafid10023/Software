import React from 'react';
import { Link } from "react-router-dom";
import 
{BsGrid1X2Fill, BsFillEnvelopeFill, BsPersonCircle, BsPeopleFill,
    BsFillBellFill, BsFillGearFill}
 from 'react-icons/bs';

import './style.css';

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsPersonCircle  className='icon_header'/> System Admin
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

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
                <Link to='/settings'><BsFillGearFill className='icon'/> Settings</Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar;