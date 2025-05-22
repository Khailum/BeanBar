import React from 'react';
import {
  faCheckCircle,
  faArrowLeft,
  faCalendar,
  faClock,
  faUsers,
  faMapPin,
  faUser,
  faPhone,
  faEnvelope,
  faCommentDots,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Confirmation = ({ reservation, onBack, onReset }) => {
  const tableTypeLabels = {
    window: 'Window Seating',
    patio: 'Outdoor Patio',
    bar: 'Coffee Bar',
    lounge: 'Lounge Area',
    private: 'Private Room',
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes), 0);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  const handleMakeReservation = () => {
    const confirmationEl = document.getElementById('confirmation-content');
    const successEl = document.getElementById('success-message');

    if (confirmationEl && successEl) {
      confirmationEl.classList.add('fade-out');
      setTimeout(() => {
        confirmationEl.style.display = 'none';
        successEl.style.display = 'block';
        successEl.classList.add('fade-in');
      }, 300);
    }
  };

  return (
    <div className="confirmation-container">
      <div id="confirmation-content" className="confirmation-content">
        <div className="header">
          <button onClick={onBack} className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h3>Review Your Reservation</h3>
        </div>

        <div className="reservation-details">
          <h4>Reservation Details</h4>
          <div className="info-item">
            <FontAwesomeIcon icon={faCalendar} />
            <div>
              <strong>Date:</strong> {formatDate(reservation.date)}
            </div>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faClock} />
            <div>
              <strong>Time:</strong> {formatTime(reservation.time)}
            </div>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faUsers} />
            <div>
              <strong>Party Size:</strong> {reservation.partySize} {reservation.partySize === 1 ? 'Person' : 'People'}
            </div>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faMapPin} />
            <div>
              <strong>Table Type:</strong> {tableTypeLabels[reservation.tableType] || reservation.tableType}
            </div>
          </div>

          <h4>Contact Information</h4>
          <div className="info-item">
            <FontAwesomeIcon icon={faUser} />
            <div><strong>Name:</strong> {reservation.name}</div>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faEnvelope} />
            <div><strong>Email:</strong> {reservation.email}</div>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faPhone} />
            <div><strong>Phone:</strong> {reservation.phone}</div>
          </div>
          {reservation.specialRequests && (
            <div className="info-item">
              <FontAwesomeIcon icon={faCommentDots} />
              <div><strong>Special Requests:</strong> {reservation.specialRequests}</div>
            </div>
          )}
        </div>

        <div className="policy-box">
          <FontAwesomeIcon icon={faExclamationTriangle} className="policy-icon" />
          <div>
            <h5>Reservation Policy</h5>
            <p>
              Please note that we hold tables for 15 minutes past the reservation time. To cancel or modify your reservation, please contact us at least 2 hours before your scheduled time.
            </p>
          </div>
        </div>

        <div className="button-group">
          <button onClick={onBack} className="button secondary">Back</button>
          <button onClick={handleMakeReservation} className="button primary">Confirm Reservation</button>
        </div>
      </div>

      <div id="success-message" className="success-message" style={{ display: 'none' }}>
        <div className="success-icon">
          <FontAwesomeIcon icon={faCheckCircle} size="3x" color="green" />
        </div>
        <h3>Reservation Confirmed!</h3>
        <p>
          Thank you, {reservation.name}! Your table has been reserved for {formatDate(reservation.date)} at {formatTime(reservation.time)}.
        </p>
        <p>
          A confirmation has been sent to {reservation.email}. We look forward to serving you at Aromatic Haven!
        </p>
        <button onClick={onReset} className="button primary">Make Another Reservation</button>
      </div>
    </div>
  );
};

export default Confirmation;
