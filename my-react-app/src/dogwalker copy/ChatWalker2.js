import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, } from '../LoginPages/AuthContext';
import './HomePageWalker2.css';

function Chat() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const { logout } = useAuth();
    let navigate = useNavigate();

   
    const handleUserClick = (user) => {
      setSelectedUser(user);
      // Fetch messages for the selected user, or load them from somewhere
      // For now, let's assume messages are hardcoded
      if (user === "Olivia") {
        setMessages([
          { content: "Hello", sender: "Olivia", time: "10 April, 11:02" },
          { content: "did you see my dog?", sender: "Olivia", time: "10 April, 11:02" },
          { content: "no.", sender: "James", time: "10 April, 11:13" },
          { content: "sorry", sender: "James", time: "10 April, 11:13" }
        ]);
      } else if (user === "James") {
        setMessages([
          { content: "hello", sender: "Olivia", time: "11 April, 2:27" },
          { content: "hi", sender: "James", time: "11 April, 2:27" },
          { content: "Could you finish this for me?", sender: "Olivia", time: "11 April, 2:27" },
          { content: "Done", sender: "James", time: "11 April, 2:28" }
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
            <div className="chat-container">
        <div className="chat-list">
          <div className="chat-search">
            <input type="text" placeholder="Search" />
          </div>
          <button
            className={`chat-user ${selectedUser === 'Olivia' ? 'active' : ''}`}
            onClick={() => handleUserClick('Olivia')}
          >
            <div className="user-photo"></div>
            <div className="user-info">
              <p className="user-name">Olivia</p>
              <p className="user-status">Typing...</p>
            </div>
          </button>
          <button
            className={`chat-user ${selectedUser === 'James' ? 'active' : ''}`}
            onClick={() => handleUserClick('James')}
          >
            <div className="user-photo"></div>
            <div className="user-info">
              <p className="user-name">James</p>
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

