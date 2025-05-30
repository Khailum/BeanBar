import React, { useState, useEffect } from 'react';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [ratingFilter, setRatingFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api/reviews';

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
    <div>
      <h2>Reviews</h2>
      <label htmlFor="ratingFilter">Filter by Rating:</label>
      <select
        id="ratingFilter"
        value={ratingFilter}
        onChange={e => setRatingFilter(e.target.value)}
      >
        <option value="">All</option>
        {[5,4,3,2,1].map(n => (
          <option key={n} value={n}>{n} Stars</option>
        ))}
      </select>

      {loading && <p>Loading reviews…</p>}
      {error && <p style={{color:'red'}}>Error: {error}</p>}

      {!loading && !error && (
        <table border="1" cellPadding="8" style={{ width:'100%', marginTop:20 }}>
          <thead>
            <tr>
              <th>ReviewID</th><th>CustomerID</th><th>ItemID</th>
              <th>Rating</th><th>Comment</th><th>ReviewDate</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0
              ? <tr><td colSpan="6" style={{textAlign:'center'}}>No reviews found.</td></tr>
              : filtered.map(r => (
                <tr key={r.ReviewID}>
                  <td>{r.ReviewID}</td>
                  <td>{r.CustomerID}</td>
                  <td>{r.ItemID}</td>
                  <td>{r.Rating}</td>
                  <td>{r.Comment}</td>
                  <td>{new Date(r.ReviewDate).toLocaleDateString()}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Review;
