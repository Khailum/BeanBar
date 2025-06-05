import React, { useState, useEffect } from 'react';
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
  const [isSubmit, setIsSubmit] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [duplicateError, setDuplicateError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setDuplicateError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit && Object.keys(formErrors).length === 0) {
      const registerUser = async () => {
        setIsSubmitting(true);

        try {
          // Fetch existing users to check for duplicates
          const response = await fetch('http://localhost:3000/users');
          if (!response.ok) throw new Error('Failed to fetch users');
          const users = await response.json();

          const emailToCheck = formValues.email.trim().toLowerCase();
          const idToCheck = formValues.idNumber.trim();

          const emailExists = users.some(user => user.email.toLowerCase() === emailToCheck);
          const idExists = users.some(user => user.customerId === idToCheck);

          if (emailExists) {
            setDuplicateError('An account with this email already exists.');
            setIsSubmitting(false);
            return;
          }
          if (idExists) {
            setDuplicateError('An account with this ID number already exists.');
            setIsSubmitting(false);
            return;
          }

          // Prepare new user object
          const newUser = {
            customerId: idToCheck,
            fullName: formValues.fullName.trim(),
            email: emailToCheck,
            phoneNumber: formValues.phoneNumber.trim(),
            address: formValues.address.trim(),
            password: formValues.password,
            userRole: 'Customer',
            isActive: 1,
            createdAt: new Date().toISOString(),
          };

          // POST to /users
          const postResponse = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
          });

          if (!postResponse.ok) throw new Error('Failed to save user');

          const savedUser = await postResponse.json();

          // Save user info without password to sessionStorage
          const { password, ...userWithoutPassword } = savedUser;
          sessionStorage.setItem('registeredUser', JSON.stringify(userWithoutPassword));
          sessionStorage.setItem('CustomerId', savedUser.customerId);

          // Now POST user profile to /userprofile
          const userProfileData = {
            customerId: savedUser.customerId, // Link to the user by ID
            fullName: savedUser.fullName,
            email: savedUser.email,
            phoneNumber: savedUser.phoneNumber,
            address: savedUser.address,
            createdAt: savedUser.createdAt,
            // Add any additional profile fields if needed
          };

          const profileResponse = await fetch('http://localhost:3000/userprofile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userProfileData),
          });

          if (!profileResponse.ok) throw new Error('Failed to save user profile');

          setIsSuccess(true);
          setFormValues(initialValues);
          setAgreed(false);
          setIsSubmitting(false);

          setTimeout(() => navigate('/'), 3000);
        } catch (error) {
          console.error('Registration error:', error);
          setDuplicateError('Something went wrong. Please try again later.');
          setIsSubmitting(false);
        }
      };

      registerUser();
    }
  }, [formErrors, isSubmit, formValues, navigate]);

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const idRegex = /^[0-9]{13}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!values.fullName.trim()) errors.fullName = 'Full name is required.';
    if (!values.idNumber || !idRegex.test(values.idNumber)) errors.idNumber = 'ID must be 13 digits.';
    if (!values.email || !emailRegex.test(values.email)) errors.email = 'Invalid email format.';
    if (!values.phoneNumber || !phoneRegex.test(values.phoneNumber)) errors.phoneNumber = 'Phone number must be 10 digits.';
    if (!values.password || !passwordRegex.test(values.password))
      errors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character.';
    if (!values.confirmPassword || values.confirmPassword !== values.password)
      errors.confirmPassword = 'Passwords do not match.';
    if (!agreed) errors.terms = 'You must agree to the terms.';

    return errors;
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
          {isSubmit && formErrors.fullName && <p className="error">{formErrors.fullName}</p>}
        </div>

        <div className="register-input-wrapper">
          <input
            type="text"
            name="idNumber"
            placeholder="ID Number"
            value={formValues.idNumber}
            onChange={handleChange}
          />
          {isSubmit && formErrors.idNumber && <p className="error">{formErrors.idNumber}</p>}
        </div>

        <div className="register-input-wrapper">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
          />
          {isSubmit && formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>

        <div className="register-input-wrapper">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formValues.phoneNumber}
            onChange={handleChange}
          />
          {isSubmit && formErrors.phoneNumber && <p className="error">{formErrors.phoneNumber}</p>}
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
          {isSubmit && formErrors.password && <p className="error">{formErrors.password}</p>}
        </div>

        <div className="register-input-wrapper">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
          {isSubmit && formErrors.confirmPassword && <p className="error">{formErrors.confirmPassword}</p>}
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
          {isSubmit && formErrors.terms && <p className="error">{formErrors.terms}</p>}
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
