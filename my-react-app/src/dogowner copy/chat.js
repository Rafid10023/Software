import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, } from '../LoginPages/AuthContext';
import './dogowner.css';

function Chat() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const { logout } = useAuth();
    let navigate = useNavigate();

   
    const handleUserClick = (user) => {
      setSelectedUser(user);
      // Fetch messages for the selected user, or load them from somewhere
      // For now, let's assume messages are hardcoded
      if (user === "Daisy") {
        setMessages([
          { content: "Hello", sender: "Daisy", time: "23 March, 2:27" },
          { content: "could you fix this?", sender: "Daisy", time: "23 March, 2:28" },
          { content: "Done.", sender: "John", time: "23 March, 2:28" },
          { content: "You're welcome!", sender: "John", time: "23 March, 2:29" }
        ]);
      } else if (user === "John") {
        setMessages([
          { content: "hello", sender: "Daisy", time: "23 March, 2:27" },
          { content: "hello john", sender: "John", time: "23 March, 2:27" },
          { content: "Could you finish this for me?", sender: "Daisy", time: "23 March, 2:27" },
          { content: "Done", sender: "John", time: "23 March, 2:28" }
        ]);
      }
    };
    const handleLogout = () => {
        logout();
        navigate('/');
    };
  
    return (
        <div className='main-container'>
            <div className='rectangle'>
             <Link to="/dogownerhome" className='happy-hounds'>HappyHounds</Link>
                <div className='frame'>
                    <div className='frame-1'>
                        <Link to="/appointment" className='appointment'>Appointment</Link>
                        <Link to="/history" className='history'>History</Link>
                        <Link to="/chat" className='chat'>Chat</Link>
                        {/* If logout is meant to perform an action, keep it as a button and handle onClick */}
                        <Link to="/login" className='rectangle-2'onClick={handleLogout}>logout</Link>
                    </div>
                </div>
            </div>
            <div className="chat-container">
        <div className="chat-list">
          <div className="chat-search">
            <input type="text" placeholder="Search" />
          </div>
          <button
            className={`chat-user ${selectedUser === 'Daisy' ? 'active' : ''}`}
            onClick={() => handleUserClick('Daisy')}
          >
            <div className="user-photo"></div>
            <div className="user-info">
              <p className="user-name">Daisy</p>
              <p className="user-status">Typing...</p>
            </div>
          </button>
          <button
            className={`chat-user ${selectedUser === 'John' ? 'active' : ''}`}
            onClick={() => handleUserClick('John')}
          >
            <div className="user-photo"></div>
            <div className="user-info">
              <p className="user-name">John</p>
              <p className="user-status">Have a good day</p>
            </div>
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === selectedUser ? 'sent' : 'received'}`}
            >
              <div className="message-date">{message.time}</div>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
        </div>
      </div>
      <div className='rectangle-8'>
            <span className='contact-us'>Contact Us</span>
        </div>
    </div>
    );
  }
  
  export default Chat;

