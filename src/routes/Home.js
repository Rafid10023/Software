import React from 'react';
import ReactDOM from 'react-dom';
import '../routes/Home.css';
import TopSection from '../components/TopSection'; // Adjust the path as necessary
import MidSection from '../components/MidSection'; // Adjust the path as necessary

// Main App component that uses the imported components
const Home = () => {
  return (
    <div className="app-background">
      <TopSection />
      <MidSection />
      {/* other components or content */}
    </div>
  );
};

// Render the App component to the DOM
ReactDOM.render(<Home/>, document.getElementById('root'));

export default Home;

