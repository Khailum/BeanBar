import React, { useState } from 'react';
import './ReservationPage.css';

const initialForm = {
  name: '',
  email: '',
  date: '',
  time: '',
  guests: 1,
  occasion: '',
  notes: ''
};

export default function ReservationPage() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [reservations, setReservations] = useState([]);

  const timeSlots = Array.from({ length: 9 }, (_, i) => `${(i + 9).toString().padStart(2, '0')}:00`);

  const getAvailableTimes = (date) => {
    const bookedTimes = reservations
      .filter((res) => res.date === date)
      .map((res) => res.time);
    return timeSlots.filter((slot) => !bookedTimes.includes(slot));
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, email, date, time, guests } = formData;

    const today = new Date().setHours(0, 0, 0, 0);
    const selectedDate = new Date(date).setHours(0, 0, 0, 0);

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!date) {
      newErrors.date = 'Date is required';
    } else if (selectedDate < today) {
      newErrors.date = 'Date cannot be in the past';
    }

    if (!time) newErrors.time = 'Time is required';
    if (guests < 1) newErrors.guests = 'Minimum of 1 guest';

    const alreadyBooked = reservations.find(
      (res) => res.date === date && res.time === time
    );
    if (alreadyBooked) newErrors.time = 'Selected time is already booked';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setReservations([...reservations, { ...formData, status: 'Booked' }]);
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormData(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <div className="resv-container">
      <h2 className='reserve-header'>Reserve a Table</h2>

      {submitted ? (
        <div className="resv-confirmation">
          <p>
            Thank you, <strong>{formData.name}</strong>! Your reservation for <strong>{formData.guests}</strong>{' '}
            {formData.guests > 1 ? 'guests' : 'guest'} at <strong>{formData.time}</strong> on{' '}
            <strong>{formData.date}</strong> has been confirmed.
          </p>
          <button className="resv-btn" onClick={resetForm}>
            Book Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="resv-form-group">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'resv-error' : ''}
            />
            {errors.name && <small className="resv-error-message">{errors.name}</small>}
          </div>

          {/* Email */}
          <div className="resv-form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'resv-error' : ''}
            />
            {errors.email && <small className="resv-error-message">{errors.email}</small>}
          </div>

          {/* Date */}
          <div className="resv-form-group">
            <label htmlFor="date">Date</label>
            <input
              name="date"
              id="date"
              type="date"
              min={todayDate}
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? 'resv-error' : ''}
            />
            {errors.date && <small className="resv-error-message">{errors.date}</small>}
          </div>

          {/* Time */}
          <div className="resv-form-group">
            <label htmlFor="time">Time</label>
            <select
              name="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              disabled={!formData.date}
              className={errors.time ? 'resv-error' : ''}
            >
              <option value="">Select a time</option>
              {formData.date &&
                getAvailableTimes(formData.date).map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
            </select>
            {errors.time && <small className="resv-error-message">{errors.time}</small>}
          </div>

          {/* Guests */}
          <div className="resv-form-group">
            <label htmlFor="guests">Guests</label>
            <input
              name="guests"
              id="guests"
              type="number"
              min="1"
              value={formData.guests}
              onChange={handleChange}
              className={errors.guests ? 'resv-error' : ''}
            />
            {errors.guests && <small className="resv-error-message">{errors.guests}</small>}
          </div>

          {/* Occasion */}
          <div className="resv-form-group">
            <label htmlFor="occasion">Occasion</label>
            <select
              name="occasion"
              id="occasion"
              value={formData.occasion}
              onChange={handleChange}
            >
              <option value="">Select Occasion</option>
              <option value="Leisure">Leisure</option>
              <option value="Study">Study</option>
              <option value="Birthday">Birthday</option>
              <option value="Business Meeting">Business Meeting</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Notes */}
          <div className="resv-form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              name="notes"
              id="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              className="resv-textarea"
              placeholder="Any additional information..."
            ></textarea>
          </div>

          {/* Submit */}
          <button type="submit" className="resv-btn">
            Book Reservation
          </button>
        </form>
      )}
    </div>
  );
}
