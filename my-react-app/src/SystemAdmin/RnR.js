import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import { BsFillTrash3Fill, BsFillFlagFill, BsFlag, BsFilter, BsPencilSquare } from "react-icons/bs";
import { Link, useHistory } from 'react-router-dom';

const RnR = () => {
  const [reviews, setReviews] = useState([]);
  const [editingRating, setEditingRating] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterType, setFilterType] = useState('none');
  const [filterValue, setFilterValue] = useState('');
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []); // Fetch reviews only once when the component mounts

  const fetchReviews = () => {
    fetch("http://localhost:5000/reviews")
      .then(res => res.json())
      .then(data => {
        setReviews(data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  };

  const editReview = (reviewId) => {
    setEditingReview(reviewId);
  };

  const updateReview = (reviewId, updatedReview) => {
    fetch(`http://localhost:5000/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedReview), // Include both review text and rating
    })
    .then(res => res.json())
    .then(data => {
      // Handle success message
      console.log(data.message);
      fetchReviews(); // Fetch updated reviews from the server
    })
    .catch(error => {
      console.error('Error updating review:', error);
    });
  };   

  const handleReviewUpdate = (reviewId, updatedReviewText, updatedRating) => {
    const updatedReview = {
      review: updatedReviewText,
      rating: updatedRating // Include the updated rating
    };
    updateReview(reviewId, updatedReview);
  };  
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const deleteReview = (reviewId) => {
    // Implement deletion logic here
  };

  const toggleFlag = (reviewId) => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === reviewId ? { ...review, flagged: !review.flagged } : review
      )
    );
  };

  const filteredReviews = reviews.filter(review => {
    if (filterType === 'rating') {
      return review.rating === parseInt(filterValue);
    } else if (filterType === 'date') {
      return review.dateCreated === filterValue;
    } else {
      return true; // No filter applied
    }
  });

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="sys-container">
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <h1>RATINGS AND REVIEWS</h1>
      {/* Filter section */}
      <div className='filter'>
        <BsFilter onClick={toggleDropdown} />
        <label> Filter Results By </label>
        {showDropdown && (
          <div>
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
        )}
      </div>
      {/* Reviews table */}
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
            <td>{review.date}</td>
            <td>{review.name}</td>
            <td>
              {/* Display star rating as editable when in edit mode */}
              {editingReview === review.id ? (
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={editingRating !== null ? editingRating : review.rating}
                  onChange={(e) => setEditingRating(parseInt(e.target.value))}
                />
              ) : (
                Array.from({ length: review.rating }, (_, index) => (
                  <span key={index}>★</span>
                ))
              )}
            </td>
            <td>
              {editingReview === review.id ? (
                <input
                  type="text"
                  value={review.review}
                  onChange={(e) => {
                    const newReview = { ...review, review: e.target.value };
                    handleReviewUpdate(review.id, newReview, review.rating);
                  }}
                />
              ) : (
                review.review
              )}
            </td>
            <td>
              {/* Delete, flag toggle, edit buttons */}
              <button onClick={() => deleteReview(review.id)}><BsFillTrash3Fill /></button>
              <button onClick={() => toggleFlag(review.id)}>
                {review.flagged ? <BsFlag /> : <BsFillFlagFill />}
              </button>
              {editingReview === review.id ? (
                <button onClick={() => {
                  setEditingReview(null);
                  setEditingRating(null);
                  }
                }>Done</button>
                ) : ( <button onClick={() => editReview(review.id)}><BsPencilSquare /></button> )
              }
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default RnR;
