import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { api } from "./api";

export default function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login"); // 'login' | 'register'

  useEffect(() => {
    api
      .get("/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (!user) {
    if (authMode === "register") {
      return (
        <Register
          onRegistered={() => setAuthMode("login")}
          onShowLogin={() => setAuthMode("login")}
        />
      );
    }

    return (
      <Login
        onLogin={setUser}
        onShowRegister={() => setAuthMode("register")}
      />
    );
  }

  const handleLogout = async () => {
    await api.post("/logout");
    window.location.reload();
  };

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-logo">
          IT<span>Desk</span>
        </div>

        <div>
          <div className="app-nav-section-title">Navigation</div>
          <div className="app-nav">
            <div className="app-nav-item active">Tickets</div>
          </div>
        </div>
      </aside>

      <main className="app-main">
        <header className="app-header">
          <div>
            <div className="app-header-title">
              {user.role === "admin"
                ? "Admin ticket overview"
                : user.role === "staff"
                ? "Assigned tickets"
                : "My tickets"}
            </div>
            <div className="app-header-subtitle">
              Monitor, prioritize, and resolve IT issues in one place.
            </div>
          </div>

          <div className="app-header-right">
            <span>{user.email}</span>
            <span className="role-pill">{user.role}</span>
            <button className="btn-ghost" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {user.role === "admin" && <AdminDashboard />}
        {user.role === "staff" && <StaffDashboard />}
        {user.role === "user" && <UserDashboard />}
      </main>
    </div>
  );
}
