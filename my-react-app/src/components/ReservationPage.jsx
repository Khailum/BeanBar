import React from 'react';
import { motion } from 'framer-motion';
import ReservationForm from './ReservationForm';
import './ReservationPage.css';

const ReservationPage = () => {
  return (
    <div className="reservation-page">
      <motion.div
        className="reservation-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Reserve Your Table</h2>
        <p>
          Experience the perfect blend of ambiance and flavor at BeanBar. Reserve your table now to savor our artisanal coffee creations in a warm, inviting atmosphere.
        </p>
      </motion.div>

      <div className="reservation-container">
        <motion.div
          className="reservation-image"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="image-container">
            <img
              src="https://i.ibb.co/G35YwtDk/reservation.jpg"
              alt="BeanBar coffee shop interior"
            />
          </div>
          <div className="reservation-highlights">
            {/* You can add your SVG highlights here */}
          </div>
        </motion.div>

        <motion.div
          className="reservation-form-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ReservationForm />
        </motion.div>
      </div>
    </div>
  );
};

export default ReservationPage;
