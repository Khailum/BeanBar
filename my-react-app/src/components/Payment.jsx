  import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';
import visaLogo from '../assets/Visa_inc._logo.svg';
import mastercardLogo from '../assets/mastercard-logo.svg';

// Card type detection - UPDATED AND UNCOMMENTED
const detectCardType = (number) => {
  if (!number) return '';
  const digits = number.replace(/\D/g, '');

  if (digits.startsWith('4')) return 'visa';

  const firstTwo = parseInt(digits.slice(0, 2), 10);
  const firstFour = parseInt(digits.slice(0, 4), 10);

  if ((firstTwo >= 51 && firstTwo <= 55) || (firstFour >= 2221 && firstFour <= 2720)) {
    return 'mastercard';
  }

  return '';
};

// Luhn, expiry, CVC validation are still commented out as per your code

const PaymentComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice, cartItems, orderNum, deliveryOption } = location.state || {};

  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [error, setError] = useState('');

  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);

    setCardType(detectCardType(raw)); // ENABLED card type detection
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 3) value = `${value.slice(0, 2)}/${value.slice(2)}`;
    setExpiryDate(value);
  };

  const getCardLogo = () => {
    if (cardType === 'visa') return visaLogo;
    if (cardType === 'mastercard') return mastercardLogo;
    return null;
  };

const handlePayment = async () => {
  const trimmedCardNumber = cardNumber.replace(/\s/g, '');
  const trimmedAccountHolder = accountHolder.trim();
  const trimmedAccountNumber = accountNumber.trim();
  const trimmedCvc = cvc.trim();

  if (!/^[a-zA-Z\s\-']{2,}$/.test(trimmedAccountHolder)) {
    setError('Please enter a valid Account Holder name.');
    return;
  }

  if (trimmedAccountNumber.length !== 9) {
    setError('Account Number must be exactly 9 digits.');
    return;
  }

  setError('');

  try {
    const res = await fetch('http://localhost:3000/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNum,
        totalPrice,
        deliveryOption,
        cartItems,
        paymentDetails: {
          accountHolder: trimmedAccountHolder,
          accountNumber: trimmedAccountNumber,
          cardNumber: trimmedCardNumber,
          expiryDate,
          cvc: trimmedCvc,
          cardType,
        },
      }),
    });

    if (!res.ok) throw new Error('Payment failed');

    alert('Payment processed successfully!');

    if (deliveryOption === 'delivery') {
      navigate('/track-delivery', { state: { orderNum, cartItems } });
    } else {
      navigate('/order-success', { state: { orderNum, totalPrice } });
    }

  } catch (err) {
    console.error(err);
    setError('Payment processing failed. Please try again.');
  }
};

  return (
    <div className="payment-container">
      <h2>Payment Details</h2>

      {orderNum && (
        <div className="order-summary">
          <p><strong>Order Number:</strong> {orderNum}</p>
          <p><strong>Total Price:</strong> R{totalPrice?.toFixed(2)}</p>
          <p><strong>Delivery Option:</strong> {deliveryOption}</p>
          <p><strong>Items:</strong> {cartItems?.length} item(s)</p>
        </div>
      )}

      <div className="input-wrapper">
        <input
          type="text"
          value={accountHolder}
          onChange={(e) =>
            setAccountHolder(e.target.value.replace(/[^a-zA-Z\s\-']/g, ''))
          }
          placeholder="Account Holder"
        />
      </div>

      <div className="input-wrapper">
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 9);
            setAccountNumber(value);
          }}
          placeholder="Account Number (9 digits)"
          maxLength="9"
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
          onChange={handleExpiryChange}
          placeholder="MM/YY"
          maxLength="5"
        />
        <input
          type="text"
          value={cvc}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 4);
            setCvc(value);
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
