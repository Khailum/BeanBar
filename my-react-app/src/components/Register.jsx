import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

function Register() {
  const initialValues = {
    idNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
   
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit && Object.keys(formErrors).length === 0) {
      console.log("Form Submitted", formValues);
      setIsSuccess(true);
      // Reset form if needed
      // setFormValues(initialValues);
      // setAgreed(false);
    } else {
      setIsSuccess(false);
    }
  }, [formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPhone = /^[0-9]{10}$/;
    const regexIdNumber = /^[0-9]{13}$/;

    if (!values.idNumber) {
      errors.idNumber = 'ID number is required!';
    } else if (!regexIdNumber.test(values.idNumber)) {
      errors.idNumber = 'ID number must be exactly 13 digits!';
    }

    if (!values.firstName.trim()) {
      errors.firstName = 'First name is required!';
    }

    if (!values.lastName.trim()) {
      errors.lastName = 'Last name is required!';
    }

    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regexEmail.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone number is required!';
    } else if (!regexPhone.test(values.phoneNumber)) {
      errors.phoneNumber = 'Phone number must be exactly 10 digits!';
    }

    if (!agreed) {
      errors.terms = 'You must agree to the terms.';
    }

    return errors;
  };

  return (
    <div className="register-page">
      {isSuccess && (
        <div className="ui message success"> Registration Successful</div>
      )}

      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <h2 className='title'> Register</h2>
        <i className="fas fa-user-circle register-icon-main"></i>

        <div className="register-input-wrapper">
          <input
            type="text"
            name="idNumber"
            placeholder="ID Number"
            value={formValues.idNumber}
            onChange={handleChange}
          />
        
         {isSubmit && <p className="error">{formErrors.idNumber}</p>} 
        </div>
        
 
        <div className="register-input-wrapper">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formValues.firstName}
            onChange={handleChange}
          />
          <i className="fas fa-user register-icon" />
          {isSubmit && <p className="error">{formErrors.firstName}</p>}
        </div>
        

        <div className="register-input-wrapper">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formValues.lastName}
            onChange={handleChange}
          />
          <i className="fas fa-user register-icon" />
                {isSubmit && <p className="error">{formErrors.lastName}</p>}
        </div>
  

        <div className="register-input-wrapper">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
          />
          <i className="fas fa-envelope register-icon" />
          {isSubmit && <p className="error">{formErrors.email}</p>}
        </div>
        

        <div className="register-input-wrapper">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formValues.phoneNumber}
            onChange={handleChange}
          />
          <i className="fas fa-phone register-icon" />
          {isSubmit && <p className="error">{formErrors.phoneNumber}</p>}
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

        {/* <div className="register-input-wrapper">
          <input type="file" name="picture" onChange={handleFileChange} />
          <i className="fas fa-upload register-icon" />
        </div> */}

        <div className="register-terms">
          <label>
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />{" "}
            I agree to the terms and conditions
          </label>
            {isSubmit && <p className="error">{formErrors.terms}</p>}
        </div>
      

        <button
          className="register-submit"
          type="submit"
        >
          Register
        </button>

        <div className="register-login">
          <p>
            Already have an account? <Link to="/login" className='link'>Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
