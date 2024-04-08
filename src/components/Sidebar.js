import React from 'react';
import { Link } from 'react-router-dom';
import '../components/SideBar.css';
import 
{BsGrid1X2Fill, BsFillEnvelopeFill, BsPeopleFill,
  BsClipboard2CheckFill, BsChatLeftQuoteFill, BsFillBellFill, BsFillGearFill}
 from 'react-icons/bs';

 function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
    <ul className='sidebar-list'>
      <li className="sidebar-list-item">
        <Link to="/" className="menuItem"><BsGrid1X2Fill className='icon'/> Dashboard</Link>
      </li>
      <li className='sidebar-list-item'>
        <Link to='/user-management'><BsPeopleFill className='icon'/> User Management </Link>
      </li>
      <li className='sidebar-list-item'>
        <Link to='/ratings-reviews'><BsFillEnvelopeFill className='icon'/> Ratings & Reviews</Link>
      </li>
      <li className='sidebar-list-item'>
        <Link to='/reminders'><BsFillBellFill className='icon'/> Reminders</Link>
      </li>
      <li className='sidebar-list-item'>
        <Link to="/settings"><BsFillGearFill className='icon'/> Settings</Link>
      </li>   
      <li className='sidebar-list-item'>
        <Link to="/Chat"><BsChatLeftQuoteFill className='icon'/> Chat</Link>
      </li> 
      <li className='sidebar-list-item'>
        <Link to="/Requests"><BsClipboard2CheckFill className='icon'/> Requests</Link>
      </li>
      <li className='sidebar-list-item'>
        <Link to='/login'>Logout</Link>
      </li> 
    </ul>
    </aside>
  );
};

export default Sidebar;
