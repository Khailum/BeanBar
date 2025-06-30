import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';
import visaLogo from '../assets/Visa_inc._logo.svg';
import mastercardLogo from '../assets/mastercard-logo.svg';
import OrderSummary from './OrderSummary';

const detectCardType = (number) => {
  const digits = number?.replace(/\D/g, '');
  if (digits.startsWith('4')) return 'visa';
  const firstTwo = parseInt(digits.slice(0, 2), 10);
  const firstFour = parseInt(digits.slice(0, 4), 10);
  if ((firstTwo >= 51 && firstTwo <= 55) || (firstFour >= 2221 && firstFour <= 2720)) {
    return 'mastercard';
  }
  return '';
};

const PaymentComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice = 0, cartItems = [], orderNum, deliveryOption, pricing } = location.state || {};

  const [accountHolder, setAccountHolder] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [error, setError] = useState('');
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const getCardLogo = () => {
    if (cardType === 'visa') return visaLogo;
    if (cardType === 'mastercard') return mastercardLogo;
    return null;
  };

  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(input.replace(/(.{4})/g, '$1 ').trim());
    setCardType(detectCardType(input));
  };

  const handleExpiryChange = (e) => {
    let input = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (input.length >= 3) input = input.slice(0, 2) + '/' + input.slice(2);
    setExpiryDate(input);
  };

  const validatePaymentDetails = () => {
    const cardNum = cardNumber.replace(/\s/g, '');
    const trimmedName = accountHolder.trim();
    const trimmedAcc = accountNumber.trim();
    const trimmedCvc = cvc.trim();

    if (!/^[a-zA-Z\s\-']{2,}$/.test(trimmedName)) return setError('Enter a valid name.');
    if (trimmedAcc.length !== 9) return setError('Account Number must be 9 digits.');
    if (cardNum.length !== 16) return setError('Card Number must be 16 digits.');
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) return setError('Use MM/YY format.');
    
    const [month, year] = expiryDate.split('/').map(Number);
    const now = new Date();
    if (year < now.getFullYear() % 100 || (year === now.getFullYear() % 100 && month < now.getMonth() + 1)) {
      return setError('Card is expired.');
    }

    if (trimmedCvc.length < 3 || trimmedCvc.length > 4) return setError('CVC must be 3 or 4 digits.');

    setError('');
    return true;
  };

  const handlePayment = async () => {
    if (!validatePaymentDetails()) return;

    setPaymentProcessing(true);
    try {
      const response = await fetch('https://localhost:7233/api/CardDetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountHolder,
          accountNumber,
          cardNumber: cardNumber.replace(/\s/g, ''),
          expiryDate,
          cvc
        })
      });

      if (!response.ok) throw new Error('Failed to process payment');

      if (deliveryOption === 'delivery') {
        navigate('/tracking', { state: { orderNum, totalPrice, cartItems, pricing } });
      } else {
        setShowReview(true);
      }
    } catch (err) {
      console.error(err);
      setError('Payment failed. Try again.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  const submitReview = async () => {
    if (rating === 0) return alert('Select a rating first.');

    setReviewSubmitting(true);
    try {
      const reviewRes = await fetch('https://localhost:7233/api/Reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNum, rating, reviewText })
      });

      if (!reviewRes.ok) throw new Error('Review failed');

      navigate('/');
    } catch (err) {
      console.error('Review error', err);
      alert('Could not submit review.');
    } finally {
      setReviewSubmitting(false);
    }
  };

  const calculatedPricing = pricing || {
    subtotal: totalPrice * 0.8,
    tax: totalPrice * 0.05,
    deliveryFee: deliveryOption === 'delivery' ? 100 : 0,
    tip: 0,
    total: totalPrice,
  };

  return (
    <div className="payment-container">
      <h2>{showReview ? 'Review Your Experience' : 'Payment Details'}</h2>

      {!showReview && <OrderSummary items={cartItems} pricing={calculatedPricing} />}

      {!showReview ? (
        <>
          <div className="input-wrapper">
            <input
              type="text"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value.replace(/[^a-zA-Z\s\-']/g, ''))}
              placeholder="Account Holder"
              autoComplete="name"
            />
          </div>

          <div className="input-wrapper">
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
              placeholder="Account Number (9 digits)"
              maxLength={9}
              autoComplete="off"
            />
          </div>

          <div className="input-wrapper card-input">
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="Card Number"
              maxLength={19}
              autoComplete="cc-number"
            />
            {getCardLogo() && <img src={getCardLogo()} alt="Card Logo" className="card-logo" />}
          </div>

          <div className="input-row">
            <input
              type="text"
              value={expiryDate}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              maxLength={5}
              autoComplete="cc-exp"
            />
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="CVC"
              maxLength={4}
              autoComplete="cc-csc"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button className="checkout" onClick={handlePayment} disabled={paymentProcessing}>
            {paymentProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </>
      ) : (
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
            placeholder="Tell us about your experience..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={4}
          ></textarea>

          <div className="review-buttons">
            <button
              className="submit-review-btn"
              onClick={submitReview}
              disabled={reviewSubmitting || rating === 0}
            >
              {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
            <button className="skip-review-btn" onClick={() => navigate('/')} disabled={reviewSubmitting}>
              Skip Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentComponent;
