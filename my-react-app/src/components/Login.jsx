import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors]   = useState({});
  const [loading, setLoading]         = useState(false);
  const [loginError, setLoginError]   = useState("");
  const [rememberMe, setRememberMe]   = useState(false);

  /* ---------- helpers ---------- */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const validate = ({ email, password }) => {
    const errors = {};
    if (!email)               errors.email    = "Email is required!";
    else if (!emailRegex.test(email))
                               errors.email    = "Invalid email format!";
    if (!password)            errors.password = "Password is required!";
    else if (password.length < 4)
                               errors.password = "Password must be ≥ 4 chars";
    else if (password.length > 15)
                               errors.password = "Password must be ≤ 15 chars";
    return errors;
  };

  /* ---------- handlers ---------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") setRememberMe(checked);
    else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
      setLoginError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    const trimmedValues = {
      email: formValues.email.trim().toLowerCase(),
      password: formValues.password.trim(),
    };

    const errors = validate(trimmedValues);
    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    setLoading(true);

    try {
      const emailQ = encodeURIComponent(trimmedValues.email);
      const resp = await fetch(`http://localhost:3000/users?email=${emailQ}`);

      if (!resp.ok) throw new Error("Network error");

      const users = await resp.json();
      if (!users.length) throw new Error("User not found");

      const user = users[0];
      if (user.password !== trimmedValues.password)
        throw new Error("Incorrect password");

      /* 🙈 never store password */
      const { password, ...safeUser } = user;

      /* 🛰️ POST user info to /userprofile */
      const postResp = await fetch("http://localhost:3000/userprofile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(safeUser),
      });

      if (!postResp.ok) {
        console.warn("Failed to post user profile:", postResp.statusText);
        // Optionally, you can set an error or notify user here
      }

      /* 🗄️ save to sessionStorage or localStorage */
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("user", JSON.stringify(safeUser));

      /* ⏩ navigate home */
      navigate("/", { state: { user: safeUser } });
    } catch (err) {
      console.error(err);
      setLoginError(err.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI ---------- */
  return (
    <div className="login-page">
      {loginError && <div className="ui message error">{loginError}</div>}
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
          {formErrors.password && <p className="error">{formErrors.password}</p>}
        </div>

        <div className="login-remember-forgot">
          <label>
            <input
              type="checkbox"
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
