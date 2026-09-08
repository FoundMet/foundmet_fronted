import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpeg";

export default function Header() {
  const location = useLocation();
  const [, setSessionKey] = useState(0);

  const currentUser = (() => {
    try {
      const stored = localStorage.getItem("foundmet_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("foundmet_token");
    localStorage.removeItem("foundmet_user");
    setSessionKey((prev) => prev + 1);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
        <div className="container">

          {/* Logo */}
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center gap-2"
          >
            <img
              src={logo}
              alt="FoundMet Logo"
              className="foundmet-logo"
            />

            <span className="fw-bold fs-4 foundmet-gradient-text">
              FoundMet
            </span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#foundmetNavbar"
            aria-controls="foundmetNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation */}
          <div
            className="collapse navbar-collapse"
            id="foundmetNavbar"
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link className={`nav-link ${isActive("/") ? "active fw-bold text-primary" : ""}`} to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive("/explore") ? "active fw-bold text-primary" : ""}`} to="/explore">
                  Explore
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive("/ideas") ? "active fw-bold text-primary" : ""}`} to="/explore">
                  Ideas
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive("/projects") ? "active fw-bold text-primary" : ""}`} to="/explore">
                  Projects
                </Link>
              </li>

            </ul>

            {/* Right Side */}
            <div className="d-flex align-items-center flex-column flex-lg-row gap-2">
              {currentUser ? (
                <div className="d-flex align-items-center gap-2">
                  <Link
                    to="/dashboard"
                    className={`btn btn-sm rounded-pill px-3 fw-semibold ${
                      isActive("/dashboard") ? "btn-primary" : "btn-light border text-main"
                    }`}
                  >
                    <i className="bi bi-speedometer2 me-1"></i> Dashboard
                  </Link>

                  <Link to="/dashboard" className="d-flex align-items-center gap-2 text-decoration-none">
                    <img
                      src={
                        currentUser.photo ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          currentUser.name || "User"
                        )}&background=0B5CFF&color=fff`
                      }
                      alt={currentUser.name}
                      className="rounded-circle border"
                      style={{ width: "36px", height: "36px", objectFit: "cover" }}
                    />
                    <span className="fw-semibold text-main small d-none d-md-inline">{currentUser.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger btn-sm px-3 rounded-pill"
                    title="Log out"
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-outline-primary px-4"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="btn btn-foundmet px-4"
                  >
                    Join FoundMet
                  </Link>
                </>
              )}
            </div>
          </div>

        </div>
      </nav>
    </header>
  );
}