import React from 'react';
import ReactDOM from 'react-dom';
import '../routes/Chat.css';
import TopSection from '../components/TopSection'; // Adjust the path as necessary
import Chat from '../components/Chats'; // Adjust the path as necessary

// Main App component that uses the imported components
const Home = () => {
  return (
    <div className="app-background">
      <TopSection />
      <Chat />
      {/* other components or content */}
    </div>
  );
};

// Render the App component to the DOM

export default Home;
