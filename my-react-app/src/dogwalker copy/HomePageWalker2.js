import React, {useEffect, useState} from 'react';
import './HomePageWalker2.css';
import { Link, useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../LoginPages/AuthContext';

export default function Home() {

    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const [tasks, setTasks] = useState([]);
    const { user, logout } = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        if (user && user.username) {
          fetch(`http://127.0.0.1:5000/appointments?walker=${user.username}`)
            .then(response => response.json())
            .then(appointments => {
              const now = new Date();
              const newUpcoming = [];
              const newPast = [];
    
              appointments.forEach(appt => {
                    // Ensure the appointment is for the logged-in walker
                    if(appt.walker == user.username) {
                    const appointmentDate = new Date(appt.date);
                    const [startHour, endHour] = appt.time.split('-').map(Number);
        
                    const appointmentEndDate = new Date(appointmentDate);
                    appointmentEndDate.setHours(endHour, 0, 0, 0);
        
                    const appointmentStartDate = new Date(appointmentDate);
                    appointmentStartDate.setHours(startHour, 0, 0, 0);
        
                    if (appointmentEndDate < now) {
                    newPast.push(appt);
                    } else if (appointmentStartDate <= now && now <= appointmentEndDate) {
                    setCurrentAppointment(appt);
                    } else {
                    newUpcoming.push(appt);
                    }
                }
              });
    
              newUpcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
              newPast.sort((a, b) => new Date(b.date) - new Date(a.date));
    
              setUpcomingAppointments(newUpcoming);
              setPastAppointments(newPast);

              if (newUpcoming.length > 0) {
                const ownerUsername = newUpcoming[0].ownerUsername;
                fetch(`http://127.0.0.1:5000/tasks/${ownerUsername}`)
                    .then(response => response.json())
                    .then(taskFromServer => {
                        setTasks(taskFromServer);
                    })
                    .catch(error => console.error('Error fetching tasks:',error));
              } else {
                    setTasks([]); // Clear task if there are no upcoming appointment
              }

            })
            .catch(error => console.error('Error:', error));

            // Fetching Tasks
            // fetch(`http://127.0.0.1:5000/tasks/${user.username}`)
            // .then(response => response.json())
            // .then(tasksFromServer => {
            //     setTasks(tasksFromServer); // Set the fetched tasks to state
            // })
            // .catch(error => console.error('Error fetching tasks:', error));
            
        }
      }, [user.username]);


    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
 

    return(
        <div className='main-container'>
            <div className='rectangle'>
             <Link to="/dogwalkerhome" className='happy-hounds'>HappyHounds</Link>
                <div className='frame'>
                    <div className='frame-1'>
                        <Link to="/paymentWalker" className='appointment-walker'>Payment</Link>
                        <Link to="/historyWalker" className='history-walker'>History</Link>
                        <Link to="/chatWalker" className='chat-walker'>Chat</Link>
                        {/* If logout is meant to perform an action, keep it as a button and handle onClick */}
                        <Link to="/login" className='rectangle-2'onClick={handleLogout}>logout</Link>
                    </div>
                </div>
            </div>
            {currentAppointment && (
                <div className="banner-container">
                    <span className="banner-text">Appointment with {currentAppointment.ownerUsername} is happening now!</span>
                    <button onClick={() => setCurrentAppointment(null)} className="banner-close">&times;</button>
              </div>
            )}
            <div className='rectangle-3'>
                <div className='flex-column-d'>
                <span className='welcome-hassan'>Welcome {user.username}</span>
                <div className='rectangle-4'>
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
                                <div className='wrapper-4'>
                                    <div className='ellipse'></div>
                                    <span className='liam-time'>
                                        {appointment.ownerUsername} | {appointment.time}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                </div>
                <span className='upcoming-appointments'>
                upcoming
                <br />
                appointments
                </span>
            </div>
            <div className='rectangle-6'>
                <span className='specific-route'>
                {tasks.map((task, index) => (
                    <div key={index} className="task-item">
                        {task.content}  {/* Or however you want to display your tasks */}
                    </div>
                ))}
                </span>
                <div className='flex-column-ae'>
                <span className='tasks'>Tasks</span>
                
                </div>
            </div>
            <div className='rectangle-8'>
            <Link to="/contact">
                CONTACT US
                </Link>
            </div>
        </div>
    );
}





