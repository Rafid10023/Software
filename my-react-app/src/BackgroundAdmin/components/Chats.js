import React, { useState } from 'react';
import './Chats.css';
import TopSection from './TopSection';
import Sidebar from './Sidebar';

function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const handleUserClick = (user) => {
    setSelectedUser(user);
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

  return (
    <div className="chat-container">
      <TopSection OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <div className="chat-content">
        <div className="chat-list">
          <div className="chat-search">
            <input type="text" placeholder="Search" />
          </div>
          <button
            className={`chat-user ${selectedUser === 'Daisy' ? 'active' : ''}`}
            onClick={() => handleUserClick('Daisy')}>
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
    </div>
  );
}

export default Chat;
