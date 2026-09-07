import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";

export default function Header() {
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
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/explore">
                  Explore
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/ideas">
                  Ideas
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/projects">
                  Projects
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>

            </ul>

            {/* Right Side */}
            <div className="d-flex flex-column flex-lg-row gap-2">

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

            </div>
          </div>

        </div>
      </nav>
    </header>
  );
}