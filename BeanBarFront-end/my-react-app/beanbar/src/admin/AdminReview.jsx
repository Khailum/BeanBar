
import  { useState, useEffect } from 'react';
import './AdminReview.css';

const AdminReview = () => {
  const [reviews, setReviews] = useState([]);
  const [ratingFilter, setRatingFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'https://localhost:7233/api/Reviews';

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const filtered = ratingFilter
    ? reviews.filter(r => r.Rating === Number(ratingFilter))
    : reviews;

  return (
    <div className="admin-page">
      <h2>Reviews</h2>
      
      <div className="filter-section">
        <label htmlFor="ratingFilter">Filter by Rating:</label>
        <select
          id="ratingFilter"
          value={ratingFilter}
          onChange={e => setRatingFilter(e.target.value)}
          className="dropdown"
        >
          <option value="">All</option>
          {[5, 4, 3, 2, 1].map(n => (
            <option key={n} value={n}>{n} Stars</option>
          ))}
        </select>
      </div>

      {loading && <p className="loading-text">Loading reviews…</p>}
      {error && <p className="error-text">Error: {error}</p>}

      {!loading && !error && (
        <table className="reviews-table">
          <thead>
            <tr>
              <th>ReviewID</th>
              <th>CustomerID</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>ReviewDate</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-results">No reviews found.</td>
              </tr>
            ) : (
              filtered.map(r => (
                <tr key={r.reviewID}>
                  <td>{r.reviewID}</td>
                  <td>{r.customerID}</td>
                  <td>{r.rating}</td>
                  <td>{r.comment}</td>
                  <td>{new Date(r.reviewDate).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminReview;
