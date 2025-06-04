import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setLoginError("");
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
    setLoginSuccess(false);

    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);

      const emailToSearch = formValues.email.trim().toLowerCase();
      const enteredPassword = formValues.password.trim();

      try {
        const res = await fetch(
          `http://localhost:3000/users?email=${encodeURIComponent(emailToSearch)}`
        );

        if (!res.ok) throw new Error("Failed to fetch user data");

        const users = await res.json();

        if (users.length === 0) {
          setLoginError("User not found");
          setLoading(false);
          return;
        }

        const user = users[0];

        if (user.password !== enteredPassword) {
          setLoginError("Incorrect password");
          setLoading(false);
          return;
        }

        setLoginSuccess(true);

        // Remove password before saving
        const { password, ...userWithoutPassword } = user;
        sessionStorage.setItem("user", JSON.stringify(userWithoutPassword));

        setTimeout(() => {
          navigate("/", { state: { user: userWithoutPassword } });
        }, 1000);
      } catch (error) {
        console.error("Login failed:", error);
        setLoginError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-page">
      {loginSuccess && (
        <div className="ui message success">Login Successful!</div>
      )}
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
            required
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>

        <div className="login-input-wrapper">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
          {formErrors.password && <p className="error">{formErrors.password}</p>}
        </div>

        <div className="login-remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
        </div>

        <button className="login-submit" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="login-register">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
