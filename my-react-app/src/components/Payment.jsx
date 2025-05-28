import React, { useState } from 'react';
import './Payment.css';
import visaLogo from '../assets/Visa_inc._logo.svg';
import mastercardLogo from '../assets/mastercard-logo.svg';

// Detect card type by prefix
const detectCardType = (number) => {
  const cleaned = number.replace(/\s+/g, '');
  if (/^5[1-5]/.test(cleaned)) return 'mastercard';
  if (/^4/.test(cleaned)) return 'visa';
  return '';
};

// Luhn algorithm for card number validation
const validateLuhn = (number) => {
  let sum = 0;
  let shouldDouble = false;
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

const PaymentComponent = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [error, setError] = useState('');

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // digits only
    setCardNumber(value);
    const type = detectCardType(value);
    setCardType(type);
  };

  const getCardLogo = () => {
    switch (cardType) {
      case 'mastercard':
        return mastercardLogo;
      case 'visa':
        return visaLogo;
      default:
        return null;
    }
  };

  const validateExpiryDate = (date) => {
    if (!date || !date.includes('/')) return false;

    const [monthStr, yearStr] = date.split('/');
    if (!monthStr || !yearStr) return false;

    const month = parseInt(monthStr, 10);
    if (isNaN(month) || month < 1 || month > 12) return false;

    let year = parseInt(yearStr, 10);
    if (yearStr.length === 2) {
      year += 2000; // Convert YY to 20YY
    }
    if (isNaN(year)) return false;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;

    return true;
  };

  const validateCvc = (value, cardType) => {
    // Visa and Mastercard typically 3 digits; some cards (e.g., Amex) 4 digits
    if (cardType === 'amex') {
      return /^\d{4}$/.test(value);
    }
    return /^\d{3}$/.test(value);
  };

  const handlePayment = () => {
    const trimmedAccountHolder = accountHolder.trim();
    const trimmedAccountNumber = accountNumber.trim();
    const trimmedCardNumber = cardNumber.trim();
    const trimmedExpiryDate = expiryDate.trim();
    const trimmedCvc = cvc.trim();

    // Account Holder: Allow letters, spaces, hyphens, apostrophes
    if (!/^[a-zA-Z\s\-']{2,}$/.test(trimmedAccountHolder)) {
      setError('Please Enter Valid Account Holder');
      return;
    }

    if (trimmedAccountNumber.length !== 13) {
      setError('Account Number must be exactly 13 digits.');
      return;
    }

    if (trimmedCardNumber.length < 13 || trimmedCardNumber.length > 19) {
      setError('Card Number must be between 13 and 19 digits.');
      return;
    }

    if (!validateLuhn(trimmedCardNumber)) {
      setError('Invalid card number.');
      return;
    }

    if (!validateExpiryDate(trimmedExpiryDate)) {
      setError('Expiry Date must be valid and not expired.');
      return;
    }

    if (!validateCvc(trimmedCvc, cardType)) {
      setError('CVC must be 3 digits (4 digits for Amex).');
      return;
    }

    setError('');
    alert('Payment processed successfully!');
    // Your real payment logic here
  };

  return (
    <div className="payment-container">
      <h2>Payment Details</h2>

      <div className="input-wrapper">
        <input
          type="text"
          value={accountHolder}
          onChange={(e) => {
            const allowed = e.target.value.replace(/[^a-zA-Z\s\-']/g, '');
            setAccountHolder(allowed);
          }}
          placeholder="Account Holder"
        />
      </div>

      <div className="input-wrapper">
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/\D/g, '');
            if (digitsOnly.length <= 13) {
              setAccountNumber(digitsOnly);
            }
          }}
          placeholder="Account Number (13 digits)"
          maxLength="13"
        />
      </div>

      <div className="input-wrapper card-input">
        <input
          type="text"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="Card Number"
          maxLength="19"
        />
        {getCardLogo() && (
          <img src={getCardLogo()} alt="Card Logo" className="card-logo" />
        )}
      </div>

      <div className="input-row">
        <input
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          placeholder="MM/YY"
          maxLength="5"
        />
        <input
          type="text"
          value={cvc}
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/\D/g, '');
            if (digitsOnly.length <= 4) setCvc(digitsOnly);
          }}
          placeholder="CVC"
          maxLength="4"
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button className="pay-button" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default PaymentComponent;