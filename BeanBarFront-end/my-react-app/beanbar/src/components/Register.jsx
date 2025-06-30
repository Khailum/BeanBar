import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const navigate = useNavigate();

  const initialValues = {
    fullName: '', idNumber: '', email: '',
    phoneNumber: '', address: '',
    password: '', confirmPassword: ''
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

  const getDOBFromID = (id) => {
    if (!/^\d{13}$/.test(id)) return '';
    const yearPrefix = parseInt(id.slice(0, 2), 10) < 25 ? '20' : '19';
    return `${yearPrefix}${id.slice(0, 2)}-${id.slice(2, 4)}-${id.slice(4, 6)}`;
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
      const payload = {
        FullName: formValues.fullName.trim(),
        CustomerID: formValues.idNumber.trim(),
        Email: formValues.email.trim().toLowerCase(),
        PhoneNumber: formValues.phoneNumber.trim(),
        Address: formValues.address.trim(),
        Password: formValues.password,
        UserRole: "Customer",
        DateOfBirth: getDOBFromID(formValues.idNumber.trim())
      };

      const response = await fetch('https://livehost7233/api/Users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        setFormErrors(data.errors || {});
        setDuplicateError(data.message || 'Registration failed.');
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      setFormValues(initialValues);
      setAgreed(false);

      if (data.user) {
        sessionStorage.setItem('registeredUser', JSON.stringify(data.user));
        sessionStorage.setItem('CustomerId', data.user.CustomerID);
      }

      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      console.error('Registration error:', err);
      setDuplicateError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="register-page">
        {isSuccess && (
          <div className="success-popup">
            <div className="checkmark">&#10003;</div>
            <p>Registration successful! Redirecting...</p>
          </div>
        )}

        <form className={`register-form ${isSuccess ? 'fade-out' : ''}`} onSubmit={handleSubmit} noValidate>
          <h2 className="title">Create Account</h2>
          <i className="fas fa-user-circle login-icon-main"></i>
          {duplicateError && <p className="error duplicate-error">{duplicateError}</p>}

          {[
            { name: 'fullName', placeholder: 'Full Name' },
            { name: 'idNumber', placeholder: 'ID Number' },
            { name: 'email', placeholder: 'Email', type: 'email' },
            { name: 'phoneNumber', placeholder: 'Phone Number' },
            { name: 'address', placeholder: 'Address (optional)' },
            { name: 'password', placeholder: 'Password', type: 'password' },
            { name: 'confirmPassword', placeholder: 'Confirm Password', type: 'password' }
          ].map(({ name, placeholder, type = 'text' }) => (
            <div key={name} className="register-input-wrapper">
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formValues[name]}
                onChange={handleChange}
              />
              {formErrors[name] && <p className="error">{formErrors[name]}</p>}
            </div>
          ))}

          <div className="register-terms">
            <label>
              <input
                type="checkbox"
                className="checkbox"
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
            Already have an account? <Link to="/login" className='login'>Login</Link>
          </p>
        </form>
      </div>

      <button className='arrow'><a href='/' className='arrow'>&#8592;</a></button>
    </>
  );
}

export default Register;
