import React, { useState } from "react";
import { api } from "../api";

export default function Login({ onLogin, onShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/login", { email, password });
    const me = await api.get("/me");
    onLogin(me.data);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-inner">
          <div className="app-badge">
            <span className="app-badge-dot" />
            IT Support · Internal Portal
          </div>
          <h1 className="auth-title">Sign in to your workspace</h1>
          <p className="auth-subtitle">
            Track issues, assign tickets, and keep your IT operations flowing.
          </p>

          <form className="auth-form" onSubmit={submit}>
            <div>
              <div className="field-label">Email</div>
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="auth-actions">
              <button className="btn-primary">Sign in</button>
            </div>
          </form>

          <div className="auth-footer">
            <span>Don’t have an account?</span>
            <button
              type="button"
              className="auth-link"
              onClick={onShowRegister}
            >
              Create one
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
