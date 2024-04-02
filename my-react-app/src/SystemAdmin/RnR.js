import React, { useState } from 'react';
import "./style.css";
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import { BsFillTrash3Fill, BsFillFlagFill, BsFlag } from "react-icons/bs";

const RnR = () => {
  // Sample data for demonstration
  const [reviews, setReviews] = useState([
    { id: 1, userName: 'User 1', dateCreated: '02/03/2024', rating: 4, review: 'Service was amazing, very happy with...' },
    { id: 2, userName: 'User 2', dateCreated: '02/03/2024', rating: 5, review: 'Excellent service!' },
    { id: 3, userName: 'User 3', dateCreated: '05/03/2024', rating: 3, review: 'Not terrible but not amazing, walker ar...' },
    { id: 4, userName: 'User 4', dateCreated: '07/03/2024', rating: 2, review: 'Very disappointed! Absolutely shocked...' },
  ]);

  const [filterType, setFilterType] = useState('none');
  const [filterValue, setFilterValue] = useState('');

  // Function to delete a review
  const deleteReview = (reviewId) => {
    setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
  };

  // Function to toggle the flagged property of a review
  const toggleFlag = (reviewId) => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === reviewId ? { ...review, flagged: !review.flagged } : review
      )
    );
  };

  // Function to filter reviews based on filter type and value
  const filteredReviews = reviews.filter(review => {
    if (filterType === 'rating') {
      return review.rating === parseInt(filterValue);
    } else if (filterType === 'date') {
      return review.dateCreated === filterValue;
    } else {
      return true; // No filter applied
    }
  });

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className="sys-container"> {/* Apply container class */}
    <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <h1>RATINGS AND REVIEWS</h1>
      <div>
        <label>Filter By:</label>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="none">None</option>
          <option value="rating">Rating</option>
          <option value="date">Date Created</option>
        </select>
        {filterType !== 'none' && (
          <input
            type="text"
            placeholder={`Enter ${filterType === 'rating' ? 'rating' : 'date (DD/MM/YYYY)'}`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Date Created</th>
            <th>User Name</th>
            <th>Ratings</th>
            <th>Review</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReviews.map(review => (
            <tr key={review.id}>
              <td>{review.dateCreated}</td>
              <td>{review.userName}</td>
              <td>{'★'.repeat(review.rating)}</td>
              <td>{review.review}</td>
              <td>
                <button onClick={() => deleteReview(review.id)}><BsFillTrash3Fill /></button>
                <button onClick={() => toggleFlag(review.id)}>
                  {review.flagged ? <BsFlag /> : <BsFillFlagFill />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RnR;
