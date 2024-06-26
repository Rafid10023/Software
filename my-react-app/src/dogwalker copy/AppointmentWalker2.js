import React from 'react';
import './HomePageWalker2.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the CSS for the calendar
import './calendar.css';
import { useAuth } from '../LoginPages/AuthContext';

export default function Appointment() {
    const [date, setDate] = React.useState(new Date());
    const navigate = useNavigate(); // Hook for navigation
    const { logout } = useAuth()

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    
    const onChange = (newDate) => {
        setDate(newDate);
    };
    const handleConfirm = () => {
        // Store the selected date
        localStorage.setItem('selectedDate', date.toISOString());
        // Navigate to the confirm page
        navigate('/confirm');
    };
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
        <div className='main-container'>
            <div className='rectangle'>
                <Link to="/dogownerhome" className='happy-hounds'>HappyHounds</Link>
                <div className='frame'>
                    <div className='frame-1'>
                        <Link to="/appointment" className='appointment'>Payment</Link>
                        <Link to="/history" className='history'>History</Link>
                        <Link to="/chat" className='chat'>Chat</Link>
                        <Link to="/login" className='rectangle-2'onClick={handleLogout}>logout</Link>
                    </div>
                </div>
            </div>
            <div className='rectangle-history'>
                <div class="relative-wrapper">
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
            <div className='footer1'>
                <span className='contact-us'>Contact Us</span>
            </div>
        </div>
    );
}