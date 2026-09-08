import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import "./global.css";

export default function Dashboard() {
  const navigate = useNavigate();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState("overview");

  // Read current user session
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem("foundmet_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Read connections
  const [connections, setConnections] = useState(() => {
    try {
      const stored = localStorage.getItem("foundmet_connections");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("foundmet_token");
    localStorage.removeItem("foundmet_user");
    setCurrentUser(null);
    navigate("/login");
  };

  const removeConnection = (id, name) => {
    const updated = { ...connections };
    delete updated[id];
    setConnections(updated);
    localStorage.setItem("foundmet_connections", JSON.stringify(updated));
    showToast(`Removed connection with ${name}`);
  };

  const handleConnectRecommended = (builder) => {
    if (!currentUser) return;
    const updated = { ...connections, [builder.id]: "pending" };
    setConnections(updated);
    localStorage.setItem("foundmet_connections", JSON.stringify(updated));
    showToast(`Connection request sent to ${builder.name}!`);
  };

  // Demo user login if unauthenticated
  const handleQuickDemo = () => {
    const demoUser = {
      _id: "demo_founder_1",
      name: "Alex Morgan",
      email: "alex@foundmet.io",
      role: "founder",
      hasProject: "yes",
      projectDetails: "AI-assisted co-founder matchmaking platform for developers and designers.",
      projectLink: "https://foundmet.io",
      projectStatus: "development",
      lookingFor: ["cto", "cfo"],
      address: "Bangalore, India",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    };
    localStorage.setItem("foundmet_token", "demo_token_123");
    localStorage.setItem("foundmet_user", JSON.stringify(demoUser));
    setCurrentUser(demoUser);
    showToast("Logged in as Demo Founder Alex Morgan!");
  };

  // Mock list of recommended connections
  const recommendedBuilders = [
    {
      id: "rec_1",
      name: "Rohan Varma",
      role: "co-founder",
      skills: ["React", "Node.js", "AI"],
      location: "Bangalore, India",
      looking: "CTO",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: "rec_2",
      name: "Elena Rostova",
      role: "founder",
      skills: ["Growth", "Fintech", "Sales"],
      location: "London / Remote",
      looking: "CEO",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: "rec_3",
      name: "Karan Patel",
      role: "founder",
      skills: ["Python", "Computer Vision"],
      location: "Mumbai, India",
      looking: "CFO",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    },
  ];

  const totalConnectionsCount = Object.keys(connections).length;

  if (!currentUser) {
    return (
      <div className="dashboard-page min-vh-100 bg-background d-flex flex-column">
        <Header />
        <div className="container my-auto py-5 text-center">
          <div className="card foundmet-card border-0 shadow-sm p-4 p-md-5 mx-auto" style={{ maxWidth: "500px" }}>
            <div className="rounded-circle bg-light d-inline-flex p-3 mx-auto mb-3 text-primary">
              <i className="bi bi-person-lock fs-1"></i>
            </div>
            <h2 className="fw-bold mb-2">Founder Dashboard</h2>
            <p className="text-secondary small mb-4">
              Please sign in to access your startup dashboard, manage connections, and discover team members.
            </p>
            <div className="d-grid gap-2">
              <Link to="/login" className="btn btn-foundmet py-2">
                Sign In to Your Account
              </Link>
              <Link to="/register" className="btn btn-outline-primary py-2">
                Create New Profile
              </Link>
              <button
                type="button"
                onClick={handleQuickDemo}
                className="btn btn-outline-secondary py-2 mt-2"
              >
                <i className="bi bi-lightning-charge-fill text-warning me-1"></i>
                Instant Demo Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page min-vh-100 bg-background d-flex flex-column">
      <Header />

      {/* Floating Toast */}
      {toastMessage && (
        <div
          className="position-fixed bottom-0 end-0 m-4 p-3 bg-dark text-white rounded-4 shadow-lg d-flex align-items-center gap-3 fade-in"
          style={{ zIndex: 1050 }}
        >
          <i className="bi bi-info-circle-fill text-primary fs-5"></i>
          <span className="small fw-semibold">{toastMessage}</span>
          <button
            type="button"
            className="btn-close btn-close-white ms-auto"
            onClick={() => setToastMessage("")}
          ></button>
        </div>
      )}

      <div className="container-fluid flex-grow-1 px-lg-4 py-4">
        <div className="row g-4">
          
          {/* ================= SIDEBAR (PRD Section 24) ================= */}
          <div className="col-12 col-lg-3 col-xl-2">
            <div className="card foundmet-card border-0 shadow-sm p-3 sticky-top" style={{ top: "85px" }}>
              {/* Mini user profile summary */}
              <div className="text-center pb-3 border-bottom mb-3">
                <img
                  src={
                    currentUser.photo ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      currentUser.name || "Founder"
                    )}&background=0B5CFF&color=fff&size=100`
                  }
                  alt={currentUser.name}
                  className="rounded-circle border mb-2 shadow-xs"
                  style={{ width: "64px", height: "64px", objectFit: "cover" }}
                />
                <h6 className="fw-bold mb-0 text-main">{currentUser.name}</h6>
                <span className="badge bg-primary text-white text-capitalize mt-1">
                  {currentUser.role === "co-founder" ? "Co-Founder" : "Founder"}
                </span>
                <small className="text-secondary d-block mt-1">
                  <i className="bi bi-geo-alt me-1"></i>
                  {currentUser.address || "Global Builder"}
                </small>
              </div>

              {/* Sidebar Menu Links */}
              <nav className="nav flex-column gap-1">
                {[
                  { key: "overview", label: "Overview", icon: "bi-speedometer2" },
                  { key: "projects", label: "My Projects", icon: "bi-rocket-takeoff" },
                  { key: "connections", label: "Connections", icon: "bi-people", count: totalConnectionsCount },
                  { key: "ideas", label: "Startup Ideas", icon: "bi-lightbulb" },
                  { key: "notifications", label: "Notifications", icon: "bi-bell" },
                  { key: "settings", label: "Settings", icon: "bi-gear" },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveTab(item.key)}
                    className={`btn text-start d-flex align-items-center justify-content-between px-3 py-2 rounded-3 border-0 ${
                      activeTab === item.key
                        ? "btn-primary text-white fw-bold"
                        : "btn-light text-secondary"
                    }`}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <i className={`bi ${item.icon}`}></i>
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && (
                      <span className={`badge rounded-pill ${activeTab === item.key ? "bg-white text-primary" : "bg-primary text-white"}`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}

                <hr className="my-2" />

                <Link
                  to="/explore"
                  className="btn btn-light text-start text-primary fw-semibold px-3 py-2 rounded-3"
                >
                  <i className="bi bi-compass me-2"></i>
                  Discover Founders
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-outline-danger text-start px-3 py-2 rounded-3 mt-2"
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Log Out
                </button>
              </nav>
            </div>
          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="col-12 col-lg-9 col-xl-10">
            {/* Top Welcome Banner */}
            <div
              className="p-4 p-md-5 rounded-4 text-white mb-4 position-relative overflow-hidden shadow-sm"
              style={{
                background: "linear-gradient(135deg, #0B5CFF 0%, #7038F5 100%)",
              }}
            >
              <div className="row align-items-center position-relative" style={{ zIndex: 2 }}>
                <div className="col-md-8">
                  <span className="badge bg-white text-primary rounded-pill px-3 py-1 fw-bold mb-2">
                    <i className="bi bi-stars me-1"></i> Founder Hub
                  </span>
                  <h1 className="display-6 fw-bold mb-2">
                    Welcome back, {currentUser.name}! 👋
                  </h1>
                  <p className="opacity-90 mb-0">
                    {currentUser.hasProject === "yes"
                      ? "Your venture is actively gaining visibility in the community."
                      : "Looking for exciting startups and visionary teams to join."}
                  </p>
                </div>
                <div className="col-md-4 text-md-end mt-3 mt-md-0">
                  <Link to="/explore" className="btn btn-light btn-lg rounded-pill fw-bold text-primary px-4 shadow-sm">
                    <i className="bi bi-search me-2"></i> Find Co-Founders
                  </Link>
                </div>
              </div>
            </div>

            {/* KPI Metric Cards */}
            <div className="row g-3 mb-4">
              <div className="col-6 col-md-3">
                <div className="card foundmet-card border-0 shadow-sm p-3 text-center">
                  <div className="role-icon mx-auto mb-2 bg-primary-subtle text-primary">
                    <i className="bi bi-people-fill fs-5"></i>
                  </div>
                  <h3 className="fw-bold mb-0">{totalConnectionsCount}</h3>
                  <small className="text-secondary">Connections</small>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div className="card foundmet-card border-0 shadow-sm p-3 text-center">
                  <div className="role-icon mx-auto mb-2 bg-success-subtle text-success">
                    <i className="bi bi-eye-fill fs-5"></i>
                  </div>
                  <h3 className="fw-bold mb-0">124</h3>
                  <small className="text-secondary">Profile Views</small>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div className="card foundmet-card border-0 shadow-sm p-3 text-center">
                  <div className="role-icon mx-auto mb-2 bg-warning-subtle text-warning">
                    <i className="bi bi-rocket-takeoff-fill fs-5"></i>
                  </div>
                  <h3 className="fw-bold mb-0 text-capitalize">
                    {currentUser.projectStatus || "Active"}
                  </h3>
                  <small className="text-secondary">Startup Stage</small>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div className="card foundmet-card border-0 shadow-sm p-3 text-center">
                  <div className="role-icon mx-auto mb-2 bg-info-subtle text-info">
                    <i className="bi bi-check-circle-fill fs-5"></i>
                  </div>
                  <h3 className="fw-bold mb-0">100%</h3>
                  <small className="text-secondary">Profile Complete</small>
                </div>
              </div>
            </div>

            {/* Section: Overview Details */}
            {activeTab === "overview" && (
              <div className="row g-4">
                {/* Left: My Project Card */}
                <div className="col-12 col-xl-7">
                  <div className="card foundmet-card border-0 shadow-sm p-4 h-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0">
                        <i className="bi bi-rocket-takeoff text-primary me-2"></i>
                        My Startup Showcase
                      </h5>
                      <span className="badge bg-success-subtle text-success text-capitalize">
                        {currentUser.hasProject === "yes" ? currentUser.projectStatus || "In Development" : "Open to Ideas"}
                      </span>
                    </div>

                    {currentUser.hasProject === "yes" ? (
                      <div>
                        <p className="text-main fs-6 mb-3">
                          {currentUser.projectDetails || "No project description provided yet."}
                        </p>

                        {currentUser.projectLink && (
                          <div className="mb-3">
                            <a
                              href={currentUser.projectLink}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-outline-primary btn-sm rounded-pill"
                            >
                              <i className="bi bi-link-45deg me-1"></i>
                              {currentUser.projectLink}
                            </a>
                          </div>
                        )}

                        <div className="border-top pt-3 mt-3">
                          <small className="text-secondary d-block mb-2 fw-semibold">
                            Looking For Team Members:
                          </small>
                          <div className="d-flex flex-wrap gap-2">
                            {Array.isArray(currentUser.lookingFor) && currentUser.lookingFor.length > 0 ? (
                              currentUser.lookingFor.map((r) => (
                                <span key={r} className="badge bg-primary text-white text-uppercase px-3 py-2">
                                  {r}
                                </span>
                              ))
                            ) : (
                              <span className="text-muted small">Open to all roles</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4 bg-light rounded-3">
                        <i className="bi bi-lightbulb fs-2 text-warning"></i>
                        <p className="text-secondary mt-2 mb-3 small">
                          You haven't listed an active project yet.
                        </p>
                        <Link to="/explore" className="btn btn-foundmet btn-sm rounded-pill px-4">
                          Explore Ideas to Join
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Recommended Co-Founders */}
                <div className="col-12 col-xl-5">
                  <div className="card foundmet-card border-0 shadow-sm p-4 h-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0">Recommended for You</h5>
                      <Link to="/explore" className="small text-primary fw-semibold">
                        View All
                      </Link>
                    </div>

                    <div className="d-flex flex-column gap-3">
                      {recommendedBuilders.map((builder) => (
                        <div key={builder.id} className="p-3 bg-light rounded-3 border d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={builder.avatar}
                              alt={builder.name}
                              className="rounded-circle border"
                              style={{ width: "42px", height: "42px", objectFit: "cover" }}
                            />
                            <div>
                              <h6 className="fw-bold mb-0 small">{builder.name}</h6>
                              <small className="text-secondary text-capitalize" style={{ fontSize: "11px" }}>
                                {builder.role} • {builder.location}
                              </small>
                              <div className="d-flex gap-1 mt-1">
                                {builder.skills.map((s) => (
                                  <span key={s} className="skill-tag" style={{ fontSize: "10px", padding: "2px 6px" }}>
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleConnectRecommended(builder)}
                            disabled={connections[builder.id] === "pending" || connections[builder.id] === "connected"}
                            className={`btn btn-sm rounded-pill px-3 ${
                              connections[builder.id] === "connected"
                                ? "btn-success"
                                : connections[builder.id] === "pending"
                                ? "btn-secondary"
                                : "btn-outline-primary"
                            }`}
                          >
                            {connections[builder.id] === "connected"
                              ? "Connected"
                              : connections[builder.id] === "pending"
                              ? "Requested"
                              : "Connect"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom: Active Connections Table / Grid */}
                <div className="col-12">
                  <div className="card foundmet-card border-0 shadow-sm p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0">
                        <i className="bi bi-people text-primary me-2"></i>
                        Active Connections & Pending Requests
                      </h5>
                      <span className="badge bg-light text-secondary border">
                        {totalConnectionsCount} Active
                      </span>
                    </div>

                    {totalConnectionsCount > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>Founder</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(connections).map(([id, status]) => (
                              <tr key={id}>
                                <td>
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="avatar-sm rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
                                      <i className="bi bi-person-fill"></i>
                                    </div>
                                    <div>
                                      <strong className="d-block text-main">Founder ID: {id.substring(0, 10)}...</strong>
                                      <small className="text-secondary">Community Member</small>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span className={`badge ${status === "connected" ? "bg-success" : "bg-secondary"}`}>
                                    {status === "connected" ? "Connected" : "Request Pending"}
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <Link to="/explore" className="btn btn-sm btn-outline-primary rounded-pill">
                                      View in Feed
                                    </Link>
                                    <button
                                      type="button"
                                      onClick={() => removeConnection(id, "Founder")}
                                      className="btn btn-sm btn-outline-danger rounded-pill"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-secondary">
                        <i className="bi bi-chat-heart fs-2 text-muted"></i>
                        <p className="mt-2 mb-2 small">You have no active connection requests yet.</p>
                        <Link to="/explore" className="btn btn-outline-primary btn-sm rounded-pill px-4">
                          Browse Explore Feed
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Section: Projects Tab */}
            {activeTab === "projects" && (
              <div className="card foundmet-card border-0 shadow-sm p-4">
                <h4 className="fw-bold mb-3">My Projects & Startup Milestones</h4>
                {currentUser.hasProject === "yes" ? (
                  <div className="p-4 border rounded-3 bg-light">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="fw-bold text-main">{currentUser.name}'s Project</h5>
                      <span className="badge bg-primary text-capitalize">{currentUser.projectStatus || "In Development"}</span>
                    </div>
                    <p className="text-secondary">{currentUser.projectDetails}</p>
                    {currentUser.projectLink && (
                      <a href={currentUser.projectLink} target="_blank" rel="noreferrer" className="btn btn-foundmet btn-sm rounded-pill">
                        Open Project Link <i className="bi bi-arrow-up-right ms-1"></i>
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <p className="text-secondary">No active project listed. You can register a new idea or project anytime.</p>
                  </div>
                )}
              </div>
            )}

            {/* Section: Connections Tab */}
            {activeTab === "connections" && (
              <div className="card foundmet-card border-0 shadow-sm p-4">
                <h4 className="fw-bold mb-3">All Connections</h4>
                <p className="text-secondary small mb-4">
                  Manage your co-founder network and ongoing partnerships.
                </p>
                <div className="d-flex gap-2 mb-3">
                  <Link to="/explore" className="btn btn-foundmet btn-sm rounded-pill px-4">
                    <i className="bi bi-search me-1"></i> Explore More Builders
                  </Link>
                </div>
              </div>
            )}

            {/* Section: Settings Tab */}
            {activeTab === "settings" && (
              <div className="card foundmet-card border-0 shadow-sm p-4">
                <h4 className="fw-bold mb-3">Account Settings</h4>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Display Name</label>
                  <input type="text" className="form-control" defaultValue={currentUser.name} disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input type="email" className="form-control" defaultValue={currentUser.email} disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Founder Role</label>
                  <input type="text" className="form-control text-capitalize" defaultValue={currentUser.role} disabled />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
