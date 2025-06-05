import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const navigate = useNavigate();

  const initialValues = {
    fullName: '',
    idNumber: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [duplicateError, setDuplicateError] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    setFormErrors({});
    setDuplicateError('');
  };

  // Minimal frontend validation just for UX
  const validate = (values) => {
    const errors = {};
    if (!values.fullName.trim()) errors.fullName = 'Full name is required.';
    if (!values.idNumber.trim()) errors.idNumber = 'ID Number is required.';
    if (!values.email.trim()) errors.email = 'Email is required.';
    if (!values.phoneNumber.trim()) errors.phoneNumber = 'Phone number is required.';
    if (!values.password) errors.password = 'Password is required.';
    if (values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords do not match.';
    if (!agreed) errors.terms = 'You must agree to the terms.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setDuplicateError('');

    const errors = validate(formValues);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Send registration data to server endpoint
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formValues.fullName.trim(),
          idNumber: formValues.idNumber.trim(),
          email: formValues.email.trim().toLowerCase(),
          phoneNumber: formValues.phoneNumber.trim(),
          address: formValues.address.trim(),
          password: formValues.password,
          agreedToTerms: agreed,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Backend validation error or duplicate error
        if (data.errors) {
          setFormErrors(data.errors);
        } else if (data.message) {
          setDuplicateError(data.message);
        } else {
          setDuplicateError('Registration failed. Please try again.');
        }
        setIsSubmitting(false);
        return;
      }

      // Success
      setIsSuccess(true);
      setFormValues(initialValues);
      setAgreed(false);
      setIsSubmitting(false);

      // Optionally save user info if sent back (except password)
      if (data.user) {
        sessionStorage.setItem('registeredUser', JSON.stringify(data.user));
        sessionStorage.setItem('CustomerId', data.user.customerId);
      }

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Registration error:', error);
      setDuplicateError('Something went wrong. Please try again later.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      {isSuccess && (
        <div className="success-popup">
          <div className="checkmark">&#10003;</div>
          <p>Registration successful! Redirecting...</p>
        </div>
      )}

      <form className={`register-form ${isSuccess ? 'fade-out' : ''}`} onSubmit={handleSubmit} noValidate>
        <h2 className="title">Create Account</h2>

        {duplicateError && <p className="error duplicate-error">{duplicateError}</p>}

        <div className="register-input-wrapper">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formValues.fullName}
            onChange={handleChange}
          />
          {formErrors.fullName && <p className="error">{formErrors.fullName}</p>}
        </div>

        <div className="register-input-wrapper">
          <input
            type="text"
            name="idNumber"
            placeholder="ID Number"
            value={formValues.idNumber}
            onChange={handleChange}
          />
          {formErrors.idNumber && <p className="error">{formErrors.idNumber}</p>}
        </div>

        <div className="register-input-wrapper">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>

        <div className="register-input-wrapper">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formValues.phoneNumber}
            onChange={handleChange}
          />
          {formErrors.phoneNumber && <p className="error">{formErrors.phoneNumber}</p>}
        </div>

        <div className="register-input-wrapper">
          <input
            type="text"
            name="address"
            placeholder="Address (optional)"
            value={formValues.address}
            onChange={handleChange}
          />
        </div>

        <div className="register-input-wrapper">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
          />
          {formErrors.password && <p className="error">{formErrors.password}</p>}
        </div>

        <div className="register-input-wrapper">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
          {formErrors.confirmPassword && <p className="error">{formErrors.confirmPassword}</p>}
        </div>

        <div className="register-terms">
          <label>
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />
            I agree to the terms and conditions
          </label>
          {formErrors.terms && <p className="error">{formErrors.terms}</p>}
        </div>

        <button type="submit" className="register-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>

        <p className="register-login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
