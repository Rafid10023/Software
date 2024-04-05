import React, { useState, useEffect } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';

const ConfirmPage = () => {
  // Retrieve the stored date when the component loads
  const selectedDate = new Date(localStorage.getItem('selectedDate'));
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedWalker, setSelectedWalker] = useState(null);
  const [walkers, setWalkers] = useState([]); // State to hold walkers
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the walkers from the Flask API
    fetch('http://127.0.0.1:5000/walkers')
      .then(response => response.json())
      .then(data => {
        setWalkers(data.walkers); // Set the fetched walkers to state
      })
      .catch(error => console.error('Error fetching walkers:', error));
  }, []);

    const checkSelectionsAndNavigate = () => {
        if (selectedTime && selectedWalker) {
        // Navigate to the new page and pass the selections as state
        navigate('/', { state: { date: selectedDate, time: selectedTime, walker: selectedWalker } });
        }
    };


    const handleTimeSelection = (timeSlot) => {
        setSelectedTime(timeSlot);
        checkBoth();
      };

    const handleWalkerSelection = (walkerName) => {
        setSelectedWalker(walkerName);
        checkBoth();
    };
    const checkBoth = () => {
        checkSelectionsAndNavigate();
    }

    const confirmAppointment = () => {
      if (selectedTime && selectedWalker) {
        const appointment = {
          date: selectedDate.toISOString(),
          time: selectedTime,
          walker: selectedWalker,
        };
    
        // Send a POST request to the Flask server
        fetch('http://127.0.0.1:5000/appointments', {
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
          console.log('Appointment saved:', data);
          navigate('/');
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
      } else {
        alert('Please select both a walker and a time slot.');
      }
    };

    const getTimeSlots = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const timeSlots = [
        { slot: "9-10", startHour: 9 },
        { slot: "11-12", startHour: 11 },
        { slot: "13-14", startHour: 13 },
        { slot: "16-17", startHour: 16 }
      ];
  
      // Filter out slots that are in the past
      return timeSlots.filter(slot => selectedDate.toDateString() === currentTime.toDateString() ? slot.startHour > currentHour : true);
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
                        <button className='rectangle-2'>logout</button>
                    </div>
                </div>
            </div>
            <div className='box-2'>
                <span className='text-6'>Choose time</span>
                <div className='box-3'>
                {getTimeSlots().length > 0 ? (
                    getTimeSlots().map((timeSlot, index) => (
                    <button
                      key={index}
                      className={`wrapper ${selectedTime === timeSlot.slot ? 'selected' : ''}`}
                      onClick={() => handleTimeSelection(timeSlot.slot)}
                    >
                      {timeSlot.slot}
                    </button>
                  ))
                  ) : (
                    <span className="else">No times available for the selected date.</span>
                )}
                </div>
            </div>
            <div className='wrapper-3'>
                <span className='text-b'>Contact Us</span>
            </div>
            <div className='img-1'>
                <div className='group-4'>
                    <span className='text-c'>Choose your walker</span>
                    <div className='box-4'>
                        {walkers.map((walker, index) => (
                            <div key={index} className={`walker ${selectedWalker === walker ? 'selected' : ''}`} onClick={() => handleWalkerSelection(walker)}>
                                <div className={`pic-2 ${selectedWalker === walker ? 'selected' : ''}`}></div>
                                <span className={`text-d ${selectedWalker === walker ? 'selected' : ''}`}>{walker}</span>
                          </div>
                        ))}
                        {/* <div className='box-5'>
                            <span className='text-d'>Bob</span>
                            <span className='text-e'>John</span>
                            <span className='text-f'>Lucy</span>
                            <span className='text-10'>Noah</span>
                            <span className='text-11'>Olivia</span>
                        </div> */}
                    </div>
                </div>
                <button className='pic'></button>
            </div>
            <button onClick={confirmAppointment} className="button">Confirm</button>
            {/* <div className='section'>
                <div className='pic-2' />
                <div className='pic-3' />
                <div className='img-2' />
                <div className='img-3' />
                <div className='pic-4' />
            </div> */}
            {/* <div className='group-5' /> */}
        </div>
    );
}

export default ConfirmPage;
