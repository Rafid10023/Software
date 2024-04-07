import React from 'react';
import './HomePageWalker.css';
import { Link, useNavigate } from 'react-router-dom';

function ProfileWalker() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
      console.log('Logging out...')
      navigate('/');
    }



    return (
    <div>
      <div className="header-Home">
        <div className="allTextHeader-Home">
            <span className='happy-hounds-Home'>HappyHounds</span>
        </div>
        <div className='frame-1-Home'>
          <Link to="/" className='home-Home'>Home</Link>
          <Link to="/chatWalker" className='chat-Home'>Chat</Link>
          <Link to="/appointmentWalker" className='appointment-Home'>Appointment</Link>
          <Link to="/historyWalker" className='history-Home'>History</Link>    
          <Link to="/profileWalker" className='profile-Home'>Profile</Link>        
          <button className='logout-Home' onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className='main-container-Home'>
        
        <div className='vertical-container-Home'>

          {/* <div className='vertical-rectangle-1-Home'>

            <div className='flex-column-d-Home'>
              <span className='welcome-Name-Home'>Welcome Ji Won</span>
              <div className='rectangle-Appointment-Home'>
                <span className='today-Home'>today: </span>
                <span className='future-Home'>24 March:</span>
                <div className='ellipse-today-Home' />
                <span className='today-time-Home'>liam | 11:00</span>
                <div className='ellipse-future-Home' />
                <span className='future-time-Home'>emily | 16:00</span>
              </div>
            </div>
            <span className='upcoming-appointments-Home'>
              upcoming
              <br />
              appointments
            </span>

          </div> */}
          
          <div className='vertical-rectangle-2-Home'>
            <div className='task-details-Home'>
           
            </div>
            <div className='flex-column-ae-Home'>
              <span className='tasks-Home'>Profile</span>
              <button className='task-button-Home'>
                <span className='add-task-Home'>Change</span>
              </button>
            </div>       

          </div>      
        </div>

        {/* <div className='horizontal-container-Home'>
          <div className='horizontal-rectangle-1-Home'>
            
          </div>
          <div className='horizontal-rectangle-2-Home'>
          </div>         
        </div> */}
      </div>

      <div className="footer-Home">
        <span className='contact-us'>Contact Us</span>
      </div>
    </div>
    );
  }
  

  export default ProfileWalker;