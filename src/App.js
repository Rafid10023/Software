import React from 'react';
import './index.css';

export default function Main() {
  return (
    <div className='main-container'>
      <div className='rectangle'>
        <span className='happy-hounds'>HappyHounds</span>
        <div className='frame'>
          <div className='frame-1'>
            <span className='appointment'>Appointment</span>
            <span className='history'>History</span>
            <span className='chat'>chat</span>
            <button className='rectangle-2' />
            <span className='logout'>logout</span>
          </div>
        </div>
      </div>
      <div className='rectangle-3'>
        <div className='flex-column-d'>
          <span className='welcome-hassan'>Welcome hassan</span>
          <div className='rectangle-4'>
            <span className='today'>today: </span>
            <span className='march'>24 March:</span>
            <div className='ellipse' />
            <span className='liam-time'>liam | 11:00</span>
            <div className='ellipse-5' />
            <span className='emily-time'>emily | 16:00</span>
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
