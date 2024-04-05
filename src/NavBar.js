import { Link, BrowserRouter as Router } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className='frame-1'>
      
      <Link to="/appointment" className='appointment'>Appointment</Link>
      <Link to="/history" className='history'>History</Link>
      <Link to="/chat" className='chat'>Chat</Link>
      
      
      {/* If logout is meant to perform an action, keep it as a button and handle onClick */}
      <button className='rectangle-2'>logout</button>
      {/* <span className='logout'>logout</span> */}
    </div>
  );
}
// import React from 'react';
// import { Link } from 'react-router-dom';

// function NavBar() {
//   const handleLinkClick = (path) => {
//     console.log(`Link to ${path} was clicked`);
//   };

//   return (
//     <div className='frame-1'>
//       <Link to="/appointment" onClick={() => handleLinkClick('/appointment')} className='appointment'>Appointment</Link>
//       <Link to="/history" onClick={() => handleLinkClick('/history')} className='history'>History</Link>
//       <Link to="/chat" onClick={() => handleLinkClick('/chat')} className='chat'>Chat</Link>
//       {/* ... other links */}
//     </div>
//   );
// }

// export default NavBar;