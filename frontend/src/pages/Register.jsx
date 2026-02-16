import React, { useState } from "react";
import { api } from "../api";

export default function Register({ onRegistered, onShowLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/register", { email, password });
      onRegistered();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-inner">
          <div className="app-badge">
            <span className="app-badge-dot" />
            IT Support · New User
          </div>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">
            You’ll be able to submit tickets and track their status.
          </p>

          <form className="auth-form" onSubmit={submit}>
            <div>
              <div className="field-label">Work email</div>
              <input
                className="input"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="field-label">Password</div>
              <input
                className="input"
                type="password"
                placeholder="Choose a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="auth-actions">
              <button className="btn-primary" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </button>
            </div>
          </form>

          <div className="auth-footer">
            <span>Already have an account?</span>
            <button
              type="button"
              className="auth-link"
              onClick={onShowLogin}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
