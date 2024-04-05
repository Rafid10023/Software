import React, { useState, useEffect } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

export default function History() {
    const [pastAppointments, setPastAppointments] = useState([]);

    useEffect(() => {
        // Fetch past appointments from Flask API
        fetch('http://127.0.0.1:5000/past-appointments')
          .then(response => response.json())
          .then(data => {
            setPastAppointments(data);
          })
          .catch(error => console.error('Error fetching past appointments:', error));
      }, []);
    return (
        <div className='main-container'>
            <div className='rectangle'>
             <Link to="/" className='happy-hounds'>HappyHounds</Link>
                <div className='frame'>
                    <div className='frame-1'>
                        <Link to="/appointment" className='appointment'>Appointment</Link>
                        <Link to="/history" className='history'>History</Link>
                        <Link to="/chat" className='chat'>Chat</Link>
                        {/* If logout is meant to perform an action, keep it as a button and handle onClick */}
                        <button className='rectangle-2'>logout</button>
                        {/* <span className='logout'>logout</span> */}
                    </div>
                </div>
            </div>
            <div className='rectangle-history'>
            <div className='frame-4'>
                <span className='past'>past</span>
                <div className='img' />
            </div>
            {pastAppointments.length > 0 ? (
          pastAppointments.map((appointment, index) => (
            <div key={index} className='flex-row-cb'>
              <div className='ellipsee' /> {/* You might want to put a profile picture or icon here */}
              <span className='dan'>{appointment.walker}</span>
              <span className='date-time'>{`${new Date(appointment.date).toLocaleDateString('en-US')} | ${appointment.time}`}</span>
            </div>
          ))
        ) : (
          <span>No past appointments.</span>
        )}
            {/* <div className='flex-row-ae'>
                <div className='ellipsee-5' />
                <span className='opal'>Opal</span>
                <div className='main-content' />
                <span className='number-5'>5 </span>
                <span className='date-time-6'>2 January | 9:25</span>
            </div> */}
            </div>
            <div className='footer'>
                <span className='contact-us'>Contact Us</span>
            </div>
      </div>
  );
}



