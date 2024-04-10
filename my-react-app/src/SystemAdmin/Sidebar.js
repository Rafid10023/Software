import React from 'react';
import { Link } from "react-router-dom";
import 
{BsGrid1X2Fill, BsFillEnvelopeFill, BsPeopleFill,
    BsFillBellFill, BsBarChartFill, BsFillGearFill}
from 'react-icons/bs';
import './style.css';

function Sidebar({openSidebarToggle, OpenSidebar}) {
return (
    <aside id="sys-sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to='/system-admin'><BsGrid1X2Fill className='sys-icon'/> Dashboard</Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/user-management'><BsPeopleFill className='sys-icon'/> User Management </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/rnr'><BsFillEnvelopeFill className='sys-icon'/> Ratings & Reviews</Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/reminders'><BsFillBellFill className='sys-icon'/> Reminders</Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/reports'><BsBarChartFill className='sys-icon'/> Reports </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/settings'><BsFillGearFill className='sys-icon'/> Settings</Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/login'>Logout</Link>
            </li>
        </ul>
    </aside>
)
}

export default Sidebar;