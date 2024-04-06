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
    
      const handleRatingChange = (id, newRating) => {
        // Send a PUT request to update the rating for the given appointment ID
        fetch(`http://127.0.0.1:5000/appointments/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rating: newRating }),
        })
        .then(response => response.json())
        .then(data => {
            // Update the appointments in state with the new rating
            const updatedAppointments = pastAppointments.map(appt =>
                appt.id === id ? { ...appt, rating: newRating } : appt
            );
            setPastAppointments(updatedAppointments);
        })
        .catch(error => console.error('Error updating appointment:', error));
    };
    
    const handleRatingClick = (appointment) => {
        if (appointment.rating > 0) {
          alert('You have already rated this appointment.');
          return;
        }
      
        const userRating = window.prompt('Please enter your rating (1-5):');
        const rating = parseInt(userRating, 10);
      
        if (rating >= 1 && rating <= 5) {
          handleRatingChange(appointment.id, rating);
        } else {
          alert('Invalid rating. Please enter a number from 1 to 5.');
        }
      };
      
      const renderRating = (appointment) => {
        if (appointment.rating > 0) {
        //   return <span className='main-content'>{'⭐'.repeat(appointment.rating)}</span>;
            return (
                <>
                    <div className="number-5">{appointment.rating}</div>
                    <div className='main-content'></div>
                </>
            );
        } else {
          return (
            <button onClick={() => handleRatingClick(appointment)} className="main-content">
              Rate
            </button>
          );
        }
      };

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
              {renderRating(appointment)}
              {/* <button className='main-content'></button> */}
            </div>
          ))
        ) : (
          <div className='past-app'>No past appointments.</div>
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



