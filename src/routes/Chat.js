import React from 'react';
import '../routes/Chat.css';
import Chat from '../components/Chats'; // Adjust the path as necessary

// Main App component that uses the imported components
const Home = () => {

  return (
    <div>
      <Chat />
      {/* other components or content */}
    </div>
  );
};

// Render the App component to the DOM

export default Home;
