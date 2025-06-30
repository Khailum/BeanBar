import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const validate = ({ email, password }) => {
    const errors = {};
    if (!email) errors.email = "Email is required!";
    else if (!emailRegex.test(email)) errors.email = "Invalid email format!";
    if (!password) errors.password = "Password is required!";
    else if (password.length < 4)
      errors.password = "Password must be ≥ 4 chars";
    else if (password.length > 15)
      errors.password = "Password must be ≤ 15 chars";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setRememberMe(checked);
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
      setLoginError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginSuccess(false);

    const trimmedValues = {
      email: formValues.email.trim().toLowerCase(),
      password: formValues.password.trim(),
    };

    const errors = validate(trimmedValues);
    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    setLoading(true);

    try {
      // Hardcoded admin check
      if (
        trimmedValues.email === "beanbar.04@gmail.com" &&
        trimmedValues.password === "beanbar@28"
      ) {
const adminUser = {
  Email: "beanbar.04@gmail.com",
  FullName: "Admin User",
  UserRole: "Admin",
  CustomerID: "0000000000000",
  PhoneNumber: "0000000000",
  Address: "Admin Address",
  DateOfBirth: null,
};


        const fakeToken = "hardcoded-admin-token";

        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("token", fakeToken);
        storage.setItem("user", JSON.stringify(adminUser));

        setLoginSuccess(true);

        setTimeout(() => {
          console.log("Navigating to the admin's dashboard");
          navigate("/admin/dashboard");
        }, 1500);

        return;
      }

      // Normal API login
      const resp = await fetch("https://localhost:7233/api/Users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trimmedValues),
      });

      if (!resp.ok) {
        const errorText = await resp.text();
        throw new Error(errorText || "Login failed.");
      }

     const data = await resp.json();

const storage = rememberMe ? localStorage : sessionStorage;
storage.setItem("token", data.Token);
storage.setItem("user", JSON.stringify(data.User));

setLoginSuccess(true);

setTimeout(() => {
  if (data.User.UserRole && data.User.UserRole.toLowerCase() === "admin") {
    navigate("/admin/dashboard");
  } else {
    navigate("/");
  }
}, 1500);

    } catch (err) {
      setLoginError(err.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {loginError && <div className="ui message error">{loginError}</div>}
      {loginSuccess && (
        <div className="login-success-message">Login Successful!</div>
      )}
      {loading && <div className="loading">Logging in…</div>}

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
          {formErrors.password && (
            <p className="error">{formErrors.password}</p>
          )}
        </div>

        <div className="login-remember-forgot">
          <label>
            <input
              type="checkbox"
              className="checkbox"
              checked={rememberMe}
              onChange={handleChange}
            />{" "}
            Remember me
          </label>
        </div>

        <button className="login-submit" type="submit" disabled={loading}>
          {loading ? "Logging in…" : "Login"}
        </button>

        <div className="login-register">
          <p>
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
