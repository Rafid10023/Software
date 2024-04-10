import React, { useState, useEffect } from 'react';
import './HomePageWalker2.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../LoginPages/AuthContext';


export default function History() {
    const [pastAppointments, setPastAppointments] = useState([]);
    const navigate = useNavigate();
    const { logout, user } = useAuth()

    useEffect(() => {
      if (user && user.username) {
          // Fetch past appointments for logged-in user from Flask API
          fetch(`http://127.0.0.1:5000/past-appointments?walker=${user.username}`)
          .then(response => response.json())
          .then(data => {
              // Filter appointments again on the client-side if needed
              const filteredAppointments = data.filter(appt => appt.walker === user.username);
              setPastAppointments(filteredAppointments);
          })
          .catch(error => console.error('Error fetching past appointments:', error));
      }
  }, [user.username]); // Dependency on user.username ensures effect runs when username changes
    
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

      const handleLogout = () => {
        logout();
        navigate('/');
    };
      
      const renderRating = (appointment) => {
        if (appointment.rating > 0) {
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
             <Link to="/dogwalkerhome" className='happy-hounds'>HappyHounds</Link>
                <div className='frame'>
                    <div className='frame-1'>
                        <Link to="/paymentWalker" className='appointment-walker'>Payment</Link>
                        <Link to="/historyWalker" className='history-walker'>History</Link>
                        <Link to="/chatWalker" className='chat-walker'>Chat</Link>
                        <Link to="/login" className='rectangle-2'onClick={handleLogout}>logout</Link>
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
              <span className='dan'>{appointment.ownerUsername}</span>
              <span className='date-time'>{`${new Date(appointment.date).toLocaleDateString('en-US')} | ${appointment.time}`}</span>
              {renderRating(appointment)}
              {/* <button className='main-content'></button> */}
            </div>
          ))
        ) : (
          <div className='past-app'>No past appointments.</div>
        )}
            </div>
            <div className='footer1'>
                <span className='contact-us'>Contact Us</span>
            </div>
      </div>
  );
}



