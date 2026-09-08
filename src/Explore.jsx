
import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import "./global.css";
import axios from "axios";

export default function Explore() {
  const [founders, setFounders] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch feed data
  useEffect(() => {
    const fetchFounders = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          "https://foundmet-backend.onrender.com/api/v1/users"
        );

        setFounders(response.data.users || []);

      } catch (error) {
        console.error("Feed Error:", error);

        setError("Unable to load founders.");

      } finally {
        setLoading(false);
      }
    };

    fetchFounders();
  }, []);

  // Search + role filter
  const filteredFounders = founders.filter((founder) => {
    const searchText = search.toLowerCase().trim();

    const lookingForText = Array.isArray(founder.lookingFor)
      ? founder.lookingFor.join(" ")
      : founder.lookingFor || "";

    const matchesSearch =
      founder.name?.toLowerCase().includes(searchText) ||
      founder.role?.toLowerCase().includes(searchText) ||
      founder.projectDetails
        ?.toLowerCase()
        .includes(searchText) ||
      lookingForText
        .toLowerCase()
        .includes(searchText);

    const matchesRole =
      role === "All" ||
      founder.role?.toLowerCase() === role.toLowerCase();

    return matchesSearch && matchesRole;
  });

  return (
    <div className="explore-page">

      <Header />

      {/* Hero */}
      <section className="explore-hero">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">

              <span className="explore-badge">
                Find your people
              </span>

              <h1 className="display-5 fw-bold mt-3">
                Find Your{" "}
                <span className="foundmet-gradient-text">
                  Co-Founder
                </span>
              </h1>

              <p className="lead text-secondary mt-3">
                Discover ambitious founders, developers, designers,
                marketers, and entrepreneurs who are looking to build
                something meaningful.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="explore-search">
        <div className="container">

          <div className="search-box">

            <div className="search-input-wrapper">
              <i className="bi bi-search"></i>

              <input
                type="text"
                className="form-control"
                placeholder="Search by name, project or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="form-select role-filter"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="All">
                All roles
              </option>

              <option value="founder">
                Founder
              </option>

              <option value="co-founder">
                Co-Founder
              </option>
            </select>

          </div>

        </div>
      </section>

      {/* Results */}
      <section className="explore-results">
        <div className="container">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h2 className="h4 fw-bold mb-1">
                Discover Founders
              </h2>

              <p className="text-secondary mb-0">
                {loading
                  ? "Loading..."
                  : `${filteredFounders.length} people found`}
              </p>
            </div>

            <button className="btn btn-light border">
              <i className="bi bi-sliders me-2"></i>
              Filters
            </button>

          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-5">
              <div
                className="spinner-border"
                role="status"
              ></div>

              <p className="text-secondary mt-3">
                Finding founders...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          {/* Cards */}
          {!loading && !error && (
            <div className="row g-4">

              {filteredFounders.map((founder) => (
                <div
                  className="col-12 col-md-6 col-xl-4"
                  key={founder._id}
                >
                  <FounderCard founder={founder} />
                </div>
              ))}

            </div>
          )}

          {/* Empty */}
          {!loading &&
            !error &&
            filteredFounders.length === 0 && (
              <div className="empty-explore text-center py-5">

                <i className="bi bi-search display-4 text-secondary"></i>

                <h3 className="h5 fw-bold mt-3">
                  No founders found
                </h3>

                <p className="text-secondary">
                  Try searching for another name, project or role.
                </p>

              </div>
            )}

        </div>
      </section>

    </div>
  );
}


/* =========================================
   Founder Card
========================================= */

function FounderCard({ founder }) {

  const lookingFor = Array.isArray(founder.lookingFor)
    ? founder.lookingFor
    : [];

  return (
    <div className="founder-card">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-start">

        <div className="d-flex align-items-center gap-3">

          <img
            src={
              founder.photo ||
              "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(founder.name)
            }
            alt={founder.name}
            className="founder-avatar"
          />

          <div>

            <h3 className="founder-name">
              {founder.name}
            </h3>

            <p className="founder-role mb-0">
              {founder.role === "co-founder"
                ? "Co-Founder"
                : "Founder"}
            </p>

          </div>

        </div>

        <button className="icon-btn">
          <i className="bi bi-three-dots"></i>
        </button>

      </div>


      {/* Location */}
      {founder.address && (
        <div className="founder-location mt-3">

          <i className="bi bi-geo-alt me-1"></i>

          {founder.address}

        </div>
      )}


      {/* Project */}
      {founder.hasProject === "yes" &&
        founder.projectDetails && (

          <p className="founder-idea mt-3">
            {founder.projectDetails}
          </p>

        )}


      {/* Project Status */}
      {founder.hasProject === "yes" &&
        founder.projectStatus && (

          <div className="mb-3">

            <small className="text-secondary d-block mb-2">
              Project Status
            </small>

            <span className="skill-tag text-capitalize">
              {founder.projectStatus}
            </span>

          </div>

        )}


      {/* Looking For */}
      {lookingFor.length > 0 && (

        <div className="looking-for">

          <small className="text-secondary d-block mb-2">
            Looking for
          </small>

          <div className="d-flex flex-wrap gap-2">

            {lookingFor.map((role) => (

              <span
                className="skill-tag"
                key={role}
              >
                {role.toUpperCase()}
              </span>

            ))}

          </div>

        </div>

      )}


      {/* Buttons */}
      <div className="d-flex gap-2 mt-4">

        <button className="btn btn-foundmet flex-grow-1">

          <i className="bi bi-person-plus me-2"></i>

          Connect

        </button>

        <button className="btn btn-light border">

          <i className="bi bi-eye"></i>

        </button>

      </div>

    </div>
  );
}