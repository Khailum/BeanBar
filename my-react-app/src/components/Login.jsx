import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      const emailToSearch = formValues.email.trim().toLowerCase();
      console.log("Searching user by email:", emailToSearch);

      try {
        // 1. Attempt direct search
        const res = await fetch(`http://localhost:3000/customers?email=${encodeURIComponent(emailToSearch)}`);
        if (!res.ok) throw new Error("Failed to fetch user data");
        let users = await res.json();

        // 2. Fallback: Fetch all users and manually filter
        if (users.length === 0) {
          const allRes = await fetch("http://localhost:3000/customers");
          if (!allRes.ok) throw new Error("Failed to fetch all users");
          const allUsers = await allRes.json();
          users = allUsers.filter((u) =>
            (u.email || u.Email || "").toLowerCase() === emailToSearch
          );
        }

        // 3. If no users found
        if (users.length === 0) {
          setLoginError("User not found");
          setLoading(false);
          return;
        }

        const user = users[0];
        const userPassword = user.password || "";

        // 4. Check password
        if (userPassword !== formValues.password) {
          setLoginError("Incorrect password");
          setLoading(false);
          return;
        }

        // 5. Login success
        setLoginSuccess(true);
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));

        // 6. Check or create user profile
        const profileRes = await fetch(`http://localhost:3000/userprofile?customerID=${user.customerID}`);
        const profileExists = await profileRes.json();

        if (profileExists.length === 0) {
          await fetch("http://localhost:3000/userprofile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userWithoutPassword),
          });
        }

        // 7. Redirect after short delay
        setTimeout(() => {
          navigate("/", { state: { user: userWithoutPassword } });
        }, 1000);

      } catch (err) {
        console.error("Login failed:", err);
        setLoginError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-page">
      {loginSuccess && <div className="ui message success">Login Successful!</div>}
      {loginError && <div className="ui message error">{loginError}</div>}
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
