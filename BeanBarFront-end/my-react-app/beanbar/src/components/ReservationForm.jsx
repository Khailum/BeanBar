import { useState } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { format, addDays, setHours, setMinutes } from 'date-fns';
import { useNotification } from '../context/NotificationContext';
import "react-datepicker/dist/react-datepicker.css";
import './ReservationForm.css';

const OCCASIONS = [
  "Regular Visit",
  "Birthday",
  "Anniversary",
  "Business Meeting",
  "Date Night",
  "Family Gathering",
  "Other"
];

const ReservationForm = () => {
  const { showNotification } = useNotification();
  const tomorrow = addDays(new Date(), 1);

  // Form state, initialized with sensible defaults
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: setHours(setMinutes(tomorrow, 0), 12), // Tomorrow at 12:00 PM
    guests: 2,
    occasion: OCCASIONS[0],
    notes: "",
    otherOccasion: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generic input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // DatePicker change handler
  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date }));
  };

  // Increase/decrease guest count, constrained 1-8
  const handleGuestChange = (change) => {
    setFormData(prev => {
      const newCount = prev.guests + change;
      if (newCount >= 1 && newCount <= 8) {
        return { ...prev, guests: newCount };
      }
      return prev;
    });
  };

  // Real backend POST request to create a reservation
  const submitReservation = async (reservationData) => {
    // Construct payload to match your backend model
    const payload = {
      CustomerName: reservationData.name.trim(),
      Email: reservationData.email.trim(),
      Phone: reservationData.phone.trim(),
      ReservationDate: reservationData.date.toISOString(),  // Use ISO string for date
      PartySize: reservationData.guests,
      Occasion: reservationData.occasion === "Other" && reservationData.otherOccasion
        ? reservationData.otherOccasion.trim()
        : reservationData.occasion,
      Notes: reservationData.notes.trim()
    };

    try {
      const response = await fetch('https://livehost7233/api/TableReservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to make reservation');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Reservation submission error:', error);
      throw error;
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send reservation data to backend
      await submitReservation(formData);

      // Compose success message including occasion fallback
      const occasion =
        formData.occasion === "Other" && formData.otherOccasion
          ? formData.otherOccasion
          : formData.occasion;

      showNotification(
        `Thank you, ${formData.name}! Your table for ${formData.guests} on ${format(formData.date, "MMMM d 'at' h:mm a")} has been reserved for your ${occasion}. A confirmation email has been sent if provided. We'll see you soon at BeanBar!`,
        'success'
      );

      // Reset form to initial state
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: setHours(setMinutes(tomorrow, 0), 12),
        guests: 2,
        occasion: OCCASIONS[0],
        notes: "",
        otherOccasion: ""
      });
    } catch (error) {
      showNotification('Sorry, there was an error processing your reservation. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter allowed times for DatePicker based on business hours
  const filterTime = (time) => {
    const day = new Date(time).getDay();
    const hours = new Date(time).getHours();

    if (day === 0) {
      return false; // Closed Sundays
    } else if (day >= 1 && day <= 5) {
      return hours >= 9 && hours < 18; // Mon-Fri 9 AM - 6 PM
    } else if (day === 6) {
      return hours >= 10 && hours < 14; // Sat 10 AM - 2 PM
    }
    return false;
  };

  // Animation variants for staggered fade-in
  const formVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="reservation-form" noValidate>
        <h3>Table Reservation</h3>

        {/* Full Name */}
        <motion.div className="form-group" custom={0} initial="hidden" animate="visible" variants={formVariants}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </motion.div>

        {/* Email and Phone Row */}
        <div className="form-row">
          <motion.div className="form-group" custom={1} initial="hidden" animate="visible" variants={formVariants}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </motion.div>

          <motion.div className="form-group" custom={2} initial="hidden" animate="visible" variants={formVariants}>
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
            />
          </motion.div>
        </div>

        {/* Date & Time */}
        <motion.div className="form-group" custom={3} initial="hidden" animate="visible" variants={formVariants}>
          <label>Reservation Date & Time</label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            showTimeSelect
            filterTime={filterTime}
            minDate={tomorrow}
            timeIntervals={60}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="date-picker"
            required
          />
          <div className="business-hours-info">
            <small>📍 Business Hours: Mon-Fri 9AM-6PM, Sat 10AM-2PM, Closed Sundays</small>
          </div>
        </motion.div>

        {/* Guests Counter */}
        <motion.div className="form-group" custom={4} initial="hidden" animate="visible" variants={formVariants}>
          <label>Number of Guests (Max 8)</label>
          <div className="guest-counter">
            <button
              type="button"
              onClick={() => handleGuestChange(-1)}
              disabled={formData.guests <= 1}
              className="counter-btn"
            >
              -
            </button>
            <span className="guest-count">{formData.guests}</span>
            <button
              type="button"
              onClick={() => handleGuestChange(1)}
              disabled={formData.guests >= 8}
              className="counter-btn"
            >
              +
            </button>
          </div>
        </motion.div>

        {/* Occasion */}
        <motion.div className="form-group" custom={5} initial="hidden" animate="visible" variants={formVariants}>
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
            required
          >
            {OCCASIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          {formData.occasion === "Other" && (
            <input
              type="text"
              name="otherOccasion"
              value={formData.otherOccasion}
              onChange={handleChange}
              placeholder="Please specify occasion"
              className="other-occasion"
              required
            />
          )}
        </motion.div>

        {/* Special Requests */}
        <motion.div className="form-group" custom={6} initial="hidden" animate="visible" variants={formVariants}>
          <label htmlFor="notes">Special Requests (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            rows="3"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional information"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div className="form-group" custom={7} initial="hidden" animate="visible" variants={formVariants}>
          <button type="submit" disabled={isSubmitting} className="submit-button">
            {isSubmitting ? 'Submitting...' : 'Reserve Table'}
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default ReservationForm;
