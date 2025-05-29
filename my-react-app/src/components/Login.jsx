// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/Users?email=${formValues.email}&password=${formValues.password}`);
        const data = await res.json();

        if (data.length > 0) {
          const user = data[0];
          setLoginSuccess(true);

          // Save to localStorage
          localStorage.setItem("user", JSON.stringify(user));

          // Check if user exists in userprofile
          const profileCheck = await fetch(`http://localhost:3000/userprofile?customerID=${user.customerID}`);
          const profileExists = await profileCheck.json();

          if (profileExists.length === 0) {
            // Create user profile
            await fetch("http://localhost:3000/userprofile", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(user),
            });
          }

          setTimeout(() => {
            navigate('/userprofile', { state: { user } });
          }, 1000);
        } else {
          alert("Invalid email or password.");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Something went wrong during login.");
      } finally {
        setLoading(false);
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be at least 4 characters.";
    } else if (values.password.length > 15) {
      errors.password = "Password must not exceed 15 characters.";
    }

    return errors;
  };

  return (
    <div className="login-page">
      {loginSuccess && <div className="ui message success">Login Successful!</div>}
      {loading && <div className="loading">Logging in...</div>}

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2 className="heading">Login</h2>
        <i className="fas fa-user-circle login-icon-main"></i>

        <div className="login-input-wrapper">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
            autoComplete="username"
          />
          <p className="error">{formErrors.email}</p>
        </div>

        <div className="login-input-wrapper">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <p className="error">{formErrors.password}</p>
        </div>

        <div className="login-remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
        </div>

        <button className="login-submit" type="submit" disabled={loading}>
          Login
        </button>

        <div className="login-register">
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
