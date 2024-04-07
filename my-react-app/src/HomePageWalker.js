import React, { useEffect, useState} from 'react';
import './HomePageWalker.css';
import { Link, useNavigate } from 'react-router-dom';

function HomePageWalker() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
      console.log('Logging out...')
      navigate('/');
    }

    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [currentAppointment, setCurrentAppointment] = useState(null);

    useEffect(() => {
      fetch('http://127.0.0.1:5000/appointments')
        .then(response => response.json())
        .then(appointments => {
          const now = new Date();
          const newUpcoming = [];
          const newPast = [];

          appointments.forEach(appt => {
              const appointmentDate = new Date(appt.date);
              const [startHour, endHour] =appt.time.split('-').map(Number);
              if (appointmentDate.setHours(endHour, 0, 0, 0) < now) {
                newPast.push(appt);
              } else if (appointmentDate.setHours(startHour, 0, 0, 0) <= now){
                  setCurrentAppointment(appt);
              } else {
                  newUpcoming.push(appt);
              }
          });

          newUpcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
          newPast.sort((a,b) => new Date(b.date) - new Date(a.date));

          setUpcomingAppointments(newUpcoming);
          setPastAppointments(newPast);
        })
        .catch(error => console.error('Error:', error));


    }, []);

    


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

        {currentAppointment && (
            <div className="banner-container">
                <span className="banner-text">Appointment with {currentAppointment.dog} is happening now!</span>
                <button onClick={() => setCurrentAppointment(null)} className="banner-close">&times;</button>
            </div>
        )}
        
        <div className='rectangle-3-doh'>
              <div className='flex-column-doh'>
              <span className='welcome-user'>Welcome Jiwon</span>
              <div className='rectangle-4-doh'>
                  {upcomingAppointments.length === 0 ? (
                      <span className='no-appointments-doh'>No appointments to display</span>
                      ) : (
                      upcomingAppointments.map((appointment, index) => (
                          <div key={index} className='appointment-entry-doh'>
                              <span className='today-doh'>
                                  {new Date(appointment.date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  })}
                              </span>
                              <div className='wrapper-4-doh'>
                                  <div className='ellipse-doh'></div>
                                  <span className='liam-time-doh'>
                                      {appointment.dog} | {appointment.time}
                                  </span>
                              </div>
                          </div>
                      ))
                  )}
              </div>
              </div>
              <span className='upcoming-appointments-doh'>
              upcoming
              <br />
              appointments
              </span>
          </div>


        <div className='vertical-rectangle-2-Home'>
          <div className='task-details-Home'>
          
          </div>
          <div className='flex-column-ae-Home'>
            <span className='tasks-Home'>Notification</span>
            <button className='task-button-Home'>
              <span className='add-task-Home'>Delete</span>
            </button>
          </div>       

        </div> 

        {/* <div className='vertical-container-Home'>
          <div className="banner-container-Home">
            
          </div>

          <div className='vertical-rectangle-1-Home'>
            

            <div className='flex-column-d-Home'>
              <span className='welcome-Name-Home'>Welcome Ji Won</span>
              <div className='rectangle-Appointment-Home'>
                {currentAppointment && (
                  <div className="banner-container">
                      <span className="banner-text">Appointment with {currentAppointment.dog} is happening now!</span>
                      <button onClick={() => setCurrentAppointment(null)} className="banner-close">&times;</button>
                  </div>
                )}
                {upcomingAppointments.length === 0 ? (
                  <span className='no-appointments'>No appointments to display</span>
                  ) : (
                  upcomingAppointments.map((appointment, index) => (
                    <div key={index} className='appointment-entry'>
                      <span className='today'>
                        {new Date(appointment.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        })}
                      </span>
                      <div className='wrapper-4-Home'>
                        <div className='ellipse-Home'></div>
                        <span className='liam-time-Home'>
                          {appointment.dog} | {appointment.time}
                        </span>
                      </div>
                    </div>
                  ))
                )}
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
            
            </div>
            <div className='flex-column-ae-Home'>
              <span className='tasks-Home'>Notification</span>
              <button className='task-button-Home'>
                <span className='add-task-Home'>Delete</span>
              </button>
            </div>       

          </div>      
        </div> */}

        
      </div>

      <div className="footer-Home">
        <span className='contact-us'>Contact Us</span>
      </div>
    </div>
    );
  }
  

  export default HomePageWalker;