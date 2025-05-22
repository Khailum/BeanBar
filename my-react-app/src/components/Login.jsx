import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import './Login.css';

function Login() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setItSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setItSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters!";
    }
    return errors;
  };

  return (
    <div className='login-page'>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className='ui message success'>Login Successfully</div>
      ) : null}

      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className='heading'>Login</h2>
        <i className="fas fa-user-circle login-icon-main"></i>

        <div className='login-input-wrapper'>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={formValues.username}
            onChange={handleChange}
          />
          <i className="fas fa-user login-icon" />
              <p className='error'>{formErrors.username}</p>
        </div>
    

        <div className='login-input-wrapper'>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formValues.email}
            onChange={handleChange}
          />
          <i className="fas fa-envelope login-icon" />
                  <p  className='error'>{formErrors.email}</p>

        </div>

        <div className='login-input-wrapper'>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formValues.password}
            onChange={handleChange}
          />
          <i className="fas fa-lock login-icon" />
             <p  className='error'>{formErrors.password}</p>
        </div>
     

        <div className="login-remember-forgot">
          <label>
            <input type='checkbox' /> Remember me
          </label>
         
        </div>

        <button 
          className="login-submit" 
          type="submit" 
          disabled={Object.keys(formErrors).length > 0}
        >
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
