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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
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
          // Check if a user already exists
          const existingUsersResponse = await fetch('http://localhost:3000/Users');
          const existingUsers = await existingUsersResponse.json();

          if (existingUsers.length > 0) {
            alert('Only one user is allowed to register.');
            setIsSuccess(false);
            setIsSubmitting(false);
            return;
          }

          // Proceed with registration
          const response = await fetch('http://localhost:3000/Users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customerID: formValues.idNumber,
              fullName: formValues.fullName,
              email: formValues.email,
              phoneNumber: formValues.phoneNumber,
              address: formValues.address,
              password: formValues.password
            }),
          });

          if (!response.ok) throw new Error('Registration failed');

          const data = await response.json();
          console.log('Registered:', data);
          setIsSuccess(true);
          setFormValues(initialValues);
          setAgreed(false);
          setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
          console.error('Error:', err);
          alert('Something went wrong during registration.');
          setIsSuccess(false);
        } finally {
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
    if (!values.email || !emailRegex.test(values.email)) errors.email = 'Invalid email.';
    if (!values.phoneNumber || !phoneRegex.test(values.phoneNumber)) errors.phoneNumber = 'Phone must be 10 digits.';
    if (!values.password || !passwordRegex.test(values.password))
      errors.password = 'Password must include upper/lowercase, number, special char, and be 8+ characters.';
    if (!values.confirmPassword || values.confirmPassword !== values.password)
      errors.confirmPassword = 'Passwords do not match.';
    if (!agreed) errors.terms = 'You must accept terms and conditions.';

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

        <div className="register-input-wrapper">
          <input type="text" name="fullName" placeholder="Full Name" value={formValues.fullName} onChange={handleChange} />
          {isSubmit && formErrors.fullName && <p className="error">{formErrors.fullName}</p>}
        </div>

        <div className="register-input-wrapper">
          <input type="text" name="idNumber" placeholder="ID Number" value={formValues.idNumber} onChange={handleChange} />
          {isSubmit && formErrors.idNumber && <p className="error">{formErrors.idNumber}</p>}
        </div>

        <div className="register-input-wrapper">
          <input type="email" name="email" placeholder="Email" value={formValues.email} onChange={handleChange} />
          {isSubmit && formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>

        <div className="register-input-wrapper">
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={formValues.phoneNumber} onChange={handleChange} />
          {isSubmit && formErrors.phoneNumber && <p className="error">{formErrors.phoneNumber}</p>}
        </div>

        <div className="register-input-wrapper">
          <input type="text" name="address" placeholder="Address (optional)" value={formValues.address} onChange={handleChange} />
        </div>

        <div className="register-input-wrapper">
          <input type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange} />
          {isSubmit && formErrors.password && <p className="error">{formErrors.password}</p>}
        </div>

        <div className="register-input-wrapper">
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formValues.confirmPassword} onChange={handleChange} />
          {isSubmit && formErrors.confirmPassword && <p className="error">{formErrors.confirmPassword}</p>}
        </div>

        <div className="register-terms">
          <label>
            <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} /> I agree to the terms and conditions
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
