import React from 'react';
import '../routes/Request.css';
import TopSection from '../components/TopSection'; // Adjust the path as necessary
import Requests from '../components/Requests'; // Adjust the path as necessary

// Main App component that uses the imported components
const Home = () => {
  return (
    <div className="app-background">
      <TopSection />
      <Requests />
      {/* other components or content */}
    </div>
  );
};

// Render the App component to the DOM

export default Home;