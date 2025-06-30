import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Review.css';

const CustomerReview = () =>  {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const submitReview = () => {
    if (rating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }

    setReviewSubmitting(true);
    setTimeout(() => {
      console.log('Review submitted:', { rating, reviewText });
      setReviewSubmitting(false);
      navigate('/');
    }, 1000);
  };

  const skipReview = () => navigate('/');

  return (
    <div className="review-section">
      <h3>Rate Your Experience</h3>
      <p className="review-subtitle">How was your experience with us?</p>

      <div className="rating-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        className="review-textarea"
        placeholder="Tell us about your experience... (optional)"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />

      <div className="review-buttons">
        <button
          className="submit-review-btn"
          onClick={submitReview}
          disabled={reviewSubmitting || rating === 0}
        >
          {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
        <button
          className="skip-review-btn"
          onClick={skipReview}
          disabled={reviewSubmitting}
        >
          Skip Review
        </button>
      </div>
    </div>
  );
};

export default CustomerReview;
