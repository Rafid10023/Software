import React, {useEffect, useState} from 'react';
import './index.css';
import { Link, useLocation } from 'react-router-dom';

export default function Home() {
    // const location = useLocation();
    // const latestAppointment = location.state

    // Function to add a new appointment if it's not a duplicate
    // const addAppointmentIfNew = (newAppointment) => {
    //     const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    //     const isDuplicate = appointments.some(appointment =>
    //     appointment.date === newAppointment.date &&
    //     appointment.walker === newAppointment.walker &&
    //     appointment.time === newAppointment.time
    //     );
    //     if (!isDuplicate) {
    //     appointments.push(newAppointment);
    //     localStorage.setItem('appointments', JSON.stringify(appointments));
    //     }
    //     return appointments; // return updated appointments
    // };

    // const getAndSortAppointments = () => {
    //     const storedAppointments = localStorage.getItem('appointments');
    //     let appointments = storedAppointments ? JSON.parse(storedAppointments) : [];
    //     if (latestAppointment) {
    //       // Add new appointment if it's not a duplicate
    //       appointments = addAppointmentIfNew(latestAppointment);
    //     }
    //     // Sort the appointments by date
    //     return appointments.sort((a, b) => new Date(a.date) - new Date(b.date));
    //   };
    
      // State to store sorted appointments
    //   const [sortedAppointments, setSortedAppointments] = React.useState([]);
    
    //   useEffect(() => {
    //     fetch('http://127.0.0.1:5000/appointments')
    //       .then(response => response.json())
    //       .then(data => {
    //         // Assuming `data` is an array of appointments
    //         const sortedAppointments = data.sort((a, b) => new Date(a.date) - new Date(b.date));
    //         setSortedAppointments(sortedAppointments);
    //       })
    //       .catch((error) => {
    //         console.error('Error:', error);
    //       });
    //   }, []);
    
    //   const handleLogout = () => {
    //     localStorage.clear(); // Clear local storage
    //     // Add any additional logout logic if necessary
    //   };
    // Add a state for the current appointment
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
                    const [startHour, endHour] = appt.time.split('-').map(Number);
                    // Check if the appointment is upcoming or past
                    if (appointmentDate.setHours(endHour, 0, 0, 0) < now) {
                        // Appointment has ended
                        newPast.push(appt);
                    } else if (appointmentDate.setHours(startHour, 0, 0, 0) <= now) {
                        // Appointment is current
                        setCurrentAppointment(appt);
                    } else {
                        // Appointment is upcoming
                        newUpcoming.push(appt);
                    }
                });

                // Sort appointments
                newUpcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
                newPast.sort((a, b) => new Date(b.date) - new Date(a.date)); // Assuming you want the most recent past appointments first

                setUpcomingAppointments(newUpcoming);
                setPastAppointments(newPast);
            })
            .catch(error => console.error('Error:', error));
    }, []);


    const handleLogout = () => {
        localStorage.clear();
    };
      

    return(
        <div className='main-container'>
            <div className='rectangle'>
             <Link to="/" className='happy-hounds'>HappyHounds</Link>
                <div className='frame'>
                    <div className='frame-1'>
                        <Link to="/appointment" className='appointment'>Appointment</Link>
                        <Link to="/history" className='history'>History</Link>
                        <Link to="/chat" className='chat'>Chat</Link>
                        {/* If logout is meant to perform an action, keep it as a button and handle onClick */}
                        <button className='rectangle-2'onClick={handleLogout}>logout</button>
                    </div>
                </div>
            </div>
            {currentAppointment && (
                <div className="current-appointment-banner">
                    Appointment with {currentAppointment.walker} is happening now!
                </div>
            )}
            <div className='rectangle-3'>
                <div className='flex-column-d'>
                <span className='welcome-hassan'>Welcome hassan</span>
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
                                        {appointment.walker} | {appointment.time}
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
                </span>
                <div className='flex-column-ae'>
                <span className='tasks'>Tasks</span>
                <button className='rectangle-7'>
                    <span className='add-task'>Add task</span>
                </button>
                </div>
            </div>
            <div className='rectangle-8'>
                <span className='contact-us'>Contact Us</span>
            </div>
        </div>
    );
}





