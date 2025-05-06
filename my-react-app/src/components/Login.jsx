import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className='login-page'>
      <form className="login-form" action="">
        {/* <h1 className="login-title">Login</h1> */}
        <i className="fas fa-user-circle login-icon-main"></i>

        <div className='login-input-wrapper'>
          <input type='text' placeholder='Username' required />
          <i className="fas fa-user login-icon" />
        </div>

        <div className='login-input-wrapper'>
          <input type='password' placeholder='Password' required />
          <i className="fas fa-lock login-icon" />
        </div>

        <div className='login-input-wrapper'>
          <input type='email' placeholder='Email Address' required />
          <i className="fas fa-envelope login-icon" />
        </div>

        <div className="login-remember-forgot">
          <label><input type='checkbox' /> Remember me</label>
          <a href="#">Forgot?</a>
        </div>

        <button className="login-submit" type="submit">Login</button>

        <div className="login-register">
          <p>Don't have an account? <a href="#">Register</a></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
