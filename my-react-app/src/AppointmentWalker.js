import React from 'react';
import './HomePageWalker.css';
import { Link, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function AppointmentWalker() {
    const [date, setDate] = React.useState(new Date());
    const navigate = useNavigate();

    const onChange = (newDate) => {
      setDate(newDate);
    }
    const handleConfirm = () => {
      localStorage.setItem('selectedDate', date.toISOString());
      navigate('/confirm');
    };
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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

          <div className='vertical-rectangle-1-Home-Wrapper'>
            <div className='calendar-container'>
              <Calendar
                onChange={onChange}
                value={date}
                minDate={today}
              />
            </div>     
          </div>
          <button class="confirm" onClick={handleConfirm}>Next</button>
               
        </div>

        
      </div>

      <div className="footer-Home">
        <span className='contact-us'>Contact Us</span>
      </div>
    </div>
    );
  }
      
  

  export default AppointmentWalker;