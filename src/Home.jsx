import Header from "./components/Header.jsx";

export default function Home() {
  return (
    <>
      <Header />

      {/* ================= HERO ================= */}
      <section className="home-hero">
        <div className="container">
          <div className="row align-items-center min-vh-75">

            <div className="col-lg-7">

              <span className="hero-badge">
                <i className="bi bi-stars me-2"></i>
                Build something meaningful
              </span>

              <h1 className="hero-title mt-4">
                Find the right
                <span className="foundmet-gradient-text">
                  {" "}co-founder
                </span>
                <br />
                to build your future.
              </h1>

              <p className="hero-description">
                FoundMet helps ambitious developers, designers, marketers,
                and entrepreneurs discover people who share their vision
                and want to build something real together.
              </p>

              <div className="hero-buttons mt-4">

                <a href="/explore" className="btn btn-foundmet btn-lg">
                  <i className="bi bi-search me-2"></i>
                  Find a Co-Founder
                </a>

                <a
                  href="/register"
                  className="btn btn-outline-dark btn-lg"
                >
                  Start Building
                  <i className="bi bi-arrow-right ms-2"></i>
                </a>

              </div>

              <div className="hero-trust mt-4">
                <div className="avatar-stack">
                  <div className="mini-avatar avatar-1">A</div>
                  <div className="mini-avatar avatar-2">R</div>
                  <div className="mini-avatar avatar-3">P</div>
                  <div className="mini-avatar avatar-4">S</div>
                </div>

                <div>
                  <strong>Builders are joining FoundMet</strong>
                  <small>
                    Connect with people who want to build.
                  </small>
                </div>
              </div>

            </div>

            {/* Hero visual */}
            <div className="col-lg-5 mt-5 mt-lg-0">

              <div className="hero-visual">

                <div className="floating-card floating-card-one">
                  <div className="floating-icon">
                    <i className="bi bi-code-slash"></i>
                  </div>

                  <div>
                    <strong>Developer</strong>
                    <small>Looking for co-founder</small>
                  </div>
                </div>

                <div className="hero-main-card">

                  <div className="connection-line"></div>

                  <div className="profile-circle profile-blue">
                    <i className="bi bi-person"></i>
                  </div>

                  <div className="connection-symbol">
                    <i className="bi bi-link-45deg"></i>
                  </div>

                  <div className="profile-circle profile-purple">
                    <i className="bi bi-person"></i>
                  </div>

                  <h4>Great things happen<br />when people connect.</h4>

                  <p>
                    Find someone who complements your skills,
                    ideas and ambition.
                  </p>

                </div>

                <div className="floating-card floating-card-two">
                  <div className="floating-icon purple-icon">
                    <i className="bi bi-lightbulb"></i>
                  </div>

                  <div>
                    <strong>New Startup Idea</strong>
                    <small>Looking for a team</small>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ================= STATS ================= */}
      <section className="home-stats">
        <div className="container">
          <div className="row g-4 text-center">

            <div className="col-6 col-lg-3">
              <div className="stat-item">
                <h2>1K+</h2>
                <p>Builders</p>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="stat-item">
                <h2>500+</h2>
                <p>Connections</p>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="stat-item">
                <h2>200+</h2>
                <p>Startup Ideas</p>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="stat-item">
                <h2>50+</h2>
                <p>Projects</p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="home-section">
        <div className="container">

          <div className="section-heading text-center">
            <span className="section-label">HOW IT WORKS</span>

            <h2>
              From an idea to a
              <span className="foundmet-gradient-text">
                {" "}real team.
              </span>
            </h2>

            <p>
              FoundMet makes it easier to find the right people
              and start building together.
            </p>
          </div>

          <div className="row g-4 mt-4">

            <div className="col-md-4">
              <div className="feature-card">

                <div className="feature-number">01</div>

                <div className="feature-icon">
                  <i className="bi bi-person-plus"></i>
                </div>

                <h3>Create your profile</h3>

                <p>
                  Tell the community about your skills, experience,
                  interests and what you're looking to build.
                </p>

              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">

                <div className="feature-number">02</div>

                <div className="feature-icon">
                  <i className="bi bi-search"></i>
                </div>

                <h3>Discover builders</h3>

                <p>
                  Explore founders and creators based on their
                  skills, ideas, interests and goals.
                </p>

              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">

                <div className="feature-number">03</div>

                <div className="feature-icon">
                  <i className="bi bi-chat-heart"></i>
                </div>

                <h3>Connect & build</h3>

                <p>
                  Connect with people who share your vision
                  and start turning your ideas into reality.
                </p>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ================= FEATURED FOUNDERS ================= */}
      <section className="home-section founders-section">
        <div className="container">

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5">

            <div className="section-heading mb-0">
              <span className="section-label">DISCOVER BUILDERS</span>

              <h2>
                Meet ambitious
                <span className="foundmet-gradient-text">
                  {" "}founders.
                </span>
              </h2>

              <p>
                Find people with the skills and mindset you need.
              </p>
            </div>

            <a
              href="/explore"
              className="view-all-link mt-3 mt-md-0"
            >
              Explore all
              <i className="bi bi-arrow-right ms-2"></i>
            </a>

          </div>


          <div className="row g-4">

            <Founder
              letter="A"
              name="Arjun Sharma"
              role="Full Stack Developer"
              location="Kolkata, India"
              skills={["React", "Node.js", "MongoDB"]}
              looking="Business Co-Founder"
            />

            <Founder
              letter="P"
              name="Priya Das"
              role="Product Designer"
              location="Bangalore, India"
              skills={["UI/UX", "Figma", "Product"]}
              looking="Technical Co-Founder"
            />

            <Founder
              letter="R"
              name="Rahul Mehta"
              role="AI / ML Engineer"
              location="Delhi, India"
              skills={["Python", "AI", "Machine Learning"]}
              looking="Growth Co-Founder"
            />

          </div>

        </div>
      </section>


      {/* ================= IDEAS ================= */}
      <section className="home-section">
        <div className="container">

          <div className="section-heading text-center">
            <span className="section-label">STARTUP IDEAS</span>

            <h2>
              Ideas deserve the
              <span className="foundmet-gradient-text">
                {" "}right team.
              </span>
            </h2>

            <p>
              Discover ideas that need people like you.
            </p>
          </div>


          <div className="row g-4 mt-4">

            <Idea
              icon="bi-shop"
              category="SaaS"
              title="Smart Business Management"
              description="A simple platform helping small businesses manage their everyday operations."
              looking="Developer + Marketing"
            />

            <Idea
              icon="bi-mortarboard"
              category="EdTech"
              title="Student Mentor Network"
              description="Connect students with experienced mentors and professionals."
              looking="Technical Co-Founder"
            />

            <Idea
              icon="bi-robot"
              category="AI"
              title="AI Tools for Small Teams"
              description="Practical AI tools designed for startups and small businesses."
              looking="Product + Growth"
            />

          </div>

        </div>
      </section>


      {/* ================= STORIES ================= */}
      <section className="home-section stories-section">
        <div className="container">

          <div className="section-heading">
            <span className="section-label">FOUNDER STORIES</span>

            <h2>
              Building isn't
              <span className="foundmet-gradient-text">
                {" "}easy.
              </span>
            </h2>

            <p>
              Share your journey, struggles and lessons with
              people building alongside you.
            </p>
          </div>


          <div className="row g-4 mt-3">

            <div className="col-lg-7">
              <div className="story-feature-card">

                <span className="story-tag">
                  Founder Journey
                </span>

                <h3>
                  Why finding the right co-founder
                  can change everything.
                </h3>

                <p>
                  Building a startup isn't only about having a great
                  idea. It's about finding people who believe in the
                  same mission and are willing to build through the
                  difficult parts.
                </p>

                <a href="/explore">
                  Read more
                  <i className="bi bi-arrow-right ms-2"></i>
                </a>

              </div>
            </div>


            <div className="col-lg-5">

              <div className="story-small-card">
                <div className="story-icon">
                  <i className="bi bi-rocket-takeoff"></i>
                </div>

                <div>
                  <h4>Start before you're ready</h4>
                  <p>
                    Your first step doesn't need to be perfect.
                  </p>
                </div>
              </div>

              <div className="story-small-card mt-3">
                <div className="story-icon purple">
                  <i className="bi bi-people"></i>
                </div>

                <div>
                  <h4>Build with people</h4>
                  <p>
                    The right team can turn an idea into something real.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= CTA ================= */}
      <section className="home-cta">
        <div className="container">

          <div className="cta-box">

            <div className="cta-content">

              <span>
                <i className="bi bi-stars me-2"></i>
                Your next chapter starts here
              </span>

              <h2>
                Don't build your dream
                <br className="d-none d-md-block" />
                <span>alone.</span>
              </h2>

              <p>
                Meet people. Share ideas. Find your co-founder.
                Start building something that matters.
              </p>

              <a
                href="/register"
                className="btn btn-light btn-lg"
              >
                Join FoundMet
                <i className="bi bi-arrow-right ms-2"></i>
              </a>

            </div>

          </div>

        </div>
      </section>


      {/* ================= FOOTER ================= */}
      <footer className="foundmet-footer">

        <div className="container">

          <div className="row g-5">

            <div className="col-lg-4">

              <a href="/" className="footer-brand">
                <span className="footer-logo">
                  F
                </span>

                <span>FoundMet</span>
              </a>

              <p className="footer-description">
                A community for ambitious people to find
                co-founders, discover ideas and build meaningful
                products together.
              </p>

              <div className="footer-socials">

                <a href="#" aria-label="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>

                <a href="#" aria-label="GitHub">
                  <i className="bi bi-github"></i>
                </a>

                <a href="#" aria-label="Twitter">
                  <i className="bi bi-twitter-x"></i>
                </a>

                <a href="#" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>

              </div>

            </div>


            <div className="col-6 col-lg-2">

              <h5>Platform</h5>

              <a href="/explore">Explore</a>
              <a href="/ideas">Ideas</a>
              <a href="/projects">Projects</a>
              <a href="/register">Join</a>

            </div>


            <div className="col-6 col-lg-2">

              <h5>Company</h5>

              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="#">Community</a>
              <a href="#">Blog</a>

            </div>


            <div className="col-6 col-lg-2">

              <h5>Resources</h5>

              <a href="#">Help Center</a>
              <a href="#">Guidelines</a>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>

            </div>


            <div className="col-6 col-lg-2">

              <h5>Get Started</h5>

              <a href="/login">Login</a>
              <a href="/register">Create Profile</a>
              <a href="/explore">Find a Co-Founder</a>

            </div>

          </div>


          <div className="footer-bottom">

            <span>
              © {new Date().getFullYear()} FoundMet. All rights reserved.
            </span>

            <span>
              Built for people who build.
            </span>

          </div>

        </div>

      </footer>
    </>
  );
}


/* ================= FOUNDER COMPONENT ================= */

function Founder({
  letter,
  name,
  role,
  location,
  skills,
  looking,
}) {
  return (
    <div className="col-md-6 col-lg-4">

      <div className="home-founder-card">

        <div className="d-flex align-items-center gap-3">

          <div className="founder-profile-avatar">
            {letter}
          </div>

          <div>
            <h4>{name}</h4>
            <p>{role}</p>
          </div>

        </div>

        <div className="founder-location">
          <i className="bi bi-geo-alt me-1"></i>
          {location}
        </div>

        <div className="founder-skills">

          {skills.map((skill) => (
            <span key={skill}>
              {skill}
            </span>
          ))}

        </div>

        <div className="founder-looking">
          <small>Looking for</small>
          <strong>{looking}</strong>
        </div>

        <a
          href="/explore"
          className="btn btn-outline-primary w-100 mt-3"
        >
          View Profile
        </a>

      </div>

    </div>
  );
}


/* ================= IDEA COMPONENT ================= */

function Idea({
  icon,
  category,
  title,
  description,
  looking,
}) {
  return (
    <div className="col-md-6 col-lg-4">

      <div className="idea-card">

        <div className="idea-icon">
          <i className={`bi ${icon}`}></i>
        </div>

        <span className="idea-category">
          {category}
        </span>

        <h3>{title}</h3>

        <p>{description}</p>

        <div className="idea-footer">
          <span>
            <i className="bi bi-people me-1"></i>
            {looking}
          </span>

          <i className="bi bi-arrow-up-right"></i>
        </div>

      </div>

    </div>
  );
}