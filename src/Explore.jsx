import { useState } from "react";
import Header from "./components/Header.jsx";
import "./global.css";
const founders = [
  {
    id: 1,
    name: "Arjun Sharma",
    username: "arjunsharma",
    role: "Full Stack Developer",
    location: "Kolkata, India",
    skills: ["React", "Node.js", "MongoDB"],
    lookingFor: "Business Co-Founder",
    idea: "Building a SaaS platform for small businesses.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Priya Das",
    username: "priyadas",
    role: "Product Designer",
    location: "Bangalore, India",
    skills: ["UI/UX", "Figma", "Product"],
    lookingFor: "Technical Co-Founder",
    idea: "Working on a platform connecting students with mentors.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    username: "rahulmehta",
    role: "AI/ML Engineer",
    location: "Delhi, India",
    skills: ["Python", "Machine Learning", "AI"],
    lookingFor: "Marketing Co-Founder",
    idea: "AI-powered tools for small businesses.",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 4,
    name: "Sneha Roy",
    username: "sneharoy",
    role: "Marketing & Growth",
    location: "Mumbai, India",
    skills: ["Marketing", "SEO", "Growth"],
    lookingFor: "Technical Co-Founder",
    idea: "Building a community-driven career platform.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
];

export default function Explore() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");

  const filteredFounders = founders.filter((founder) => {
    const matchesSearch =
      founder.name.toLowerCase().includes(search.toLowerCase()) ||
      founder.role.toLowerCase().includes(search.toLowerCase()) ||
      founder.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      );

    const matchesRole =
      role === "All" || founder.role === role;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="explore-page">
<Header/>
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
                Discover ambitious developers, designers, marketers,
                and entrepreneurs who are looking to build something
                meaningful.
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
                placeholder="Search by name, role or skill..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="form-select role-filter"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="All">All roles</option>
              <option value="Full Stack Developer">
                Developer
              </option>
              <option value="Product Designer">
                Designer
              </option>
              <option value="AI/ML Engineer">
                AI / ML
              </option>
              <option value="Marketing & Growth">
                Marketing
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
                {filteredFounders.length} people found
              </p>
            </div>

            <button className="btn btn-light border">
              <i className="bi bi-sliders me-2"></i>
              Filters
            </button>
          </div>

          <div className="row g-4">

            {filteredFounders.map((founder) => (
              <div
                className="col-12 col-md-6 col-xl-4"
                key={founder.id}
              >
                <FounderCard founder={founder} />
              </div>
            ))}

          </div>

          {filteredFounders.length === 0 && (
            <div className="empty-explore text-center py-5">
              <i className="bi bi-search display-4 text-secondary"></i>

              <h3 className="h5 fw-bold mt-3">
                No founders found
              </h3>

              <p className="text-secondary">
                Try searching for another skill or role.
              </p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}


/* Founder Card */

function FounderCard({ founder }) {
  return (
    <div className="founder-card">

      <div className="d-flex justify-content-between align-items-start">

        <div className="d-flex align-items-center gap-3">

          <img
            src={founder.avatar}
            alt={founder.name}
            className="founder-avatar"
          />

          <div>
            <h3 className="founder-name">
              {founder.name}
            </h3>

            <p className="founder-role mb-0">
              {founder.role}
            </p>
          </div>

        </div>

        <button className="icon-btn">
          <i className="bi bi-three-dots"></i>
        </button>

      </div>

      <div className="founder-location mt-3">
        <i className="bi bi-geo-alt me-1"></i>
        {founder.location}
      </div>

      <p className="founder-idea mt-3">
        {founder.idea}
      </p>

      <div className="mb-3">

        <small className="text-secondary d-block mb-2">
          Skills
        </small>

        <div className="d-flex flex-wrap gap-2">

          {founder.skills.map((skill) => (
            <span
              className="skill-tag"
              key={skill}
            >
              {skill}
            </span>
          ))}

        </div>

      </div>

      <div className="looking-for">
        <small className="text-secondary d-block">
          Looking for
        </small>

        <strong>
          {founder.lookingFor}
        </strong>
      </div>

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