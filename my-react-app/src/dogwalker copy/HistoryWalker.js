import React, { useState, useEffect } from 'react';
import './HomePageWalker.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../LoginPages/AuthContext';

function HistoryWalker() {
    const [pastAppointments, setPastAppointments] = useState([]);
    const navigate = useNavigate();
    const { logout, user } = useAuth()
    
    const handleLogout = () => {
      logout();
      navigate('/');
    }

    useEffect(() => {
      if (user && user.username) {
        fetch(`http://127.0.0.1:5000/past-appointmentsWalker?walkerUsername=${user.username}`)
        .then(response => response.json())
        .then(data => {
            setPastAppointments(data);
        })
        .catch(error => console.error('Error fetching past appointments:', error));


      }
    }, [user.username]);


      const handleRatingChange = (id, newRating) => {
        fetch(`http://127.0.0.1:5000/appointmentsWalker/${id}`, {
          method: 'PUT',
          header: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rating: newRating }),
        })
        .then(response => response.json())
        .then(data => {
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
          return (
              <>
                <div className="number-5">{appointment.rating}</div>
                <div className='main-content'></div>
              </>
          );
      } else {
        return (
          <button onClick={() => handleRatingClick(appointment)} className="main-content-star">
          Rate
          </button>

        )
      }
    };

    return (
    <div>
      <div className="header-Home">
        <div className="allTextHeader-Home">
            <span className='happy-hounds-Home'>HappyHounds</span>
        </div>
        <div className='frame-1-Home'>
          <Link to="/dogwalkerhome" className='home-Home'>Home</Link>
          <Link to="/chatWalker" className='chat-Home'>Chat</Link>
          <Link to="/appointmentWalker" className='appointment-Home'>Appointment</Link>
          <Link to="/historyWalker" className='history-Home'>History</Link>             
          <Link to="/profileWalker" className='profile-Home'>Profile</Link>
          <button className='logout-Home' onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className='main-container-Home'>
        
        {/* <div className='vertical-container-Home'>

          <div className='vertical-rectangle-1-Home'>

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

          </div>
          
          <div className='vertical-rectangle-2-Home'>
            <div className='task-details-Home'>
            1: Follow a Specific Route
            <br />
            2: Feeding Instructions
            <br />
            3: Medication Administration
            <br />
            4: Update on Dog's Behaviour
            <br />
            5: Reinforce Training Commands <br />
            6: Apply Treatments
            <br />
            7: Watch for Health Issues
            <br />
            8: Avoid Specific Areas or Dogs
            </div>
            <div className='flex-column-ae-Home'>
              <span className='tasks-Home'>Tasks</span>
              <button className='task-button-Home'>
                <span className='add-task-Home'>Add task</span>
              </button>
            </div>       

          </div>      
        </div> */}

        <div className='horizontal-container-Home'>
          <div className='horizontal-rectangle-1-Home'>
            <span className='upcoming-appointments-Home-History'>
              Payment History
            </span>
            
            
          </div>
          <div className='horizontal-rectangle-2-Home'>
            <span className='upcoming-appointments-Home-History'>
              walk History
            </span>

            {pastAppointments.length > 0 ? (
          pastAppointments.map((appointment, index) => (
            <div key={index} className='flex-row-cb'>
              <div className='ellipsee-dog' />
              <span className='dan'>{appointment.dog}</span>
              <span className='date-time'>{`${new Date(appointment.date).toLocaleDateString('en-US')} | ${appointment.time}`}</span>
              {renderRating(appointment)}
            </div>
          ))
        ) : (
          <div className='past-app'>No past appointments.</div>
        )}
          </div>         
        </div>
      </div>

      <div className="footer-Home">
        <span className='contact-us'>Contact Us</span>
      </div>
    </div>
    );
  }
  

  export default HistoryWalker;