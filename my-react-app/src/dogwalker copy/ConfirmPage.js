import React, { useState, useEffect } from 'react';
import './HomePageWalker.css';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../LoginPages/AuthContext';


const ConfirmPage = () => {
  const selectedDate = new Date(localStorage.getItem('selectedDate'));
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDog, setSelectedDog] = useState(null);
  const [dogs, setDogs] = useState([]);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  }

  useEffect(() => {
    fetch('http://127.0.0.1:5000/dogs')
      .then(response => response.json())
      .then(data => {
        setDogs(data.dogs);
      })
      .catch(error => console.error('Error fetching dogs:', error))
  }, []);

    const checkSelectionsAndNavigate = () => {
      if (selectedTime && selectedDog) {
      navigate('/', { state: {date: selectedDate, time: selectedTime, dog: selectedDog}});
      }
    };

    function generateUniqueID() {
      return uuidv4(); // Generate a unique UUID
    }

    const handleTimeSelection = (timeSlot) => {
        setSelectedTime(timeSlot);
        checkBoth();
      };

    const handleDogSelection = (dogName) => {
        setSelectedDog(dogName);
        checkBoth();
    };

    const checkBoth = () =>{
        checkSelectionsAndNavigate();
    }

    const confirmAppointment = () => {
      if (selectedTime && selectedDog && user.username) {
        const appointment = {
          id: generateUniqueID(),
          date: selectedDate.toISOString(),
          time: selectedTime,
          dog: selectedDog,
          rating: 0,
          walkerUsername: user.username

        };

        fetch('http://127.0.0.1:5000/appointmentsWalker', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(appointment),
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          console.log('Booking Request saved:', data);
          navigate('/dogwalkerhome');
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
      } else {
        alert('Please select both dog and a time slot')
      }
    };

    const getTimeSlots = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const timeSlots = [
        {slot: "9-10", startHour: 9},
        {slot: "11-12", startHour: 11},
        {slot: "13-14", startHour: 13},
        {slot: "16-17", startHour: 16}
      ];

      return timeSlots.filter(slot => selectedDate.toDateString() === currentTime.toDateString() ? slot.startHour > currentHour : true);


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
      
      <div className='vertical-container-Home'>

        <div className='img-1-confirm'>
          <div className='group-4-confirm'>
              <span className='text-c-confirm'>Choose your dog</span>
              <div className='box-4-confirm'>
                {dogs.map((dog, index) => (
                    <div key={index} className={`dog ${selectedDog === dog ? 'selected-confirm' : ''}`} onClick={() => handleDogSelection(dog)}>
                        <div className={`pic-2-confirm ${selectedDog === dog ? 'selected-confirm' : ''}`}></div>
                        <span className={`text-d-confirm ${selectedDog === dog ? 'selected-confirm' : ''}`}>{dog}</span>
                  </div>
                ))}


              </div>
          </div>    
          <button className='pic-confirm'></button>

        </div>

        

        {/* <div className='vertical-rectangle-1-Home'>
          <span className='text-c'>Choose your Dog</span>
          <div className='flex-column-d-Home-Confirm'>
              {dogs.map((dog, index) => (
                  <div key={index} className={`dog ${selectedDog === dog ? 'selected' : ''}`} onClick={() => handleDogSelection(dog)}>
                      <div className={`pic-2 ${selectedDog === dog ? 'selected' : ''}`}></div>
                      <span className={`text-d ${selectedDog === dog ? 'selected' : ''}`}>{dog}</span>
                </div>                  
              ))}

            

            <div className='rectangle-Appointment-Home'>
            
              
              
            </div>
          </div>
          <span className='upcoming-appointments-Home'>
            
          </span>

        </div> */}
        
        {/* <div className='vertical-rectangle-1-Home'>

          <div className='flex-column-d-Home'>

            <span className='welcome-Name-Home'>Choose Time</span>

            <div className='rectangle-Appointment-Home'>
              {getTimeSlots().length > 0 ?(
                getTimeSlots().map((timeSlot, index) => (
                  <button
                    key={index}
                    className = {`wrapper-Appointment ${selectedTime === timeSlot.slot ? 'selected' : ''}`}
                    onClick={() => handleTimeSelection(timeSlot.slot)}
                  >
                    {timeSlot.slot}
                  </button>
                ))
              ) : (
                <span className = "else">No times available for the selected date.</span>
              )}


            </div>
            <button onClick={confirmAppointment} className="button-confirm">Confirm</button>
          </div>

          <span className='upcoming-appointment-Home'>

          </span>    

        </div> */}

        <div className='box-2-confirm'>
          <span className='text-6-confirm'>Choose time</span>
          <div className='box-3-confirm'>
          {getTimeSlots().length > 0 ? (
              getTimeSlots().map((timeSlot, index) => (  
              <button
                key={index}
                className={`wrapper-confirm ${selectedTime === timeSlot.slot ? 'selected-confirm' : ''}`}
                onClick={() => handleTimeSelection(timeSlot.slot)}
              >
                {timeSlot.slot}
              </button>
            ))
            ) : (
              <span className="else-confirm">No times available for the selected date.</span>
          )}
          <button onClick={confirmAppointment} className="button-confirm-button">Confirm</button>
          </div>  
        </div>



      </div>

      
    </div>

    <div className="footer-Home">
      <span className='contact-us'>Contact Us</span>
    </div>
  </div>
  );
}
  

export default ConfirmPage;