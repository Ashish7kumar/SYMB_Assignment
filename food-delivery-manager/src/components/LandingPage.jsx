import "./LandingPage.css";

const FEATURES = [
  {
    icon: "🛒",
    title: "Add Orders Instantly",
    desc: "Create new delivery orders in seconds with full validation and real-time feedback.",
  },
  {
    icon: "📦",
    title: "Live Order Tracking",
    desc: "View every order in a clean dashboard — filter by status, distance, or payment.",
  },
  {
    icon: "🚴",
    title: "Smart Delivery Assignment",
    desc: "One click assigns the nearest unpaid order automatically. No manual sorting needed.",
  },
  {
    icon: "✅",
    title: "Mark & Complete",
    desc: "Close out deliveries cleanly. Completed orders are archived and stats update live.",
  },
];

const STATS = [
  { value: "< 1s", label: "Assignment Speed" },
  { value: "100%", label: "Client-Side Logic" },
  { value: "0 ms", label: "Load Latency" },
  { value: "∞", label: "Orders Supported" },
];

export default function LandingPage({ onEnter }) {
  return (
    <div className="landing">

    
      <div className="grain" />

      {/* ── Nav ── */}
      <nav className="lnav">
        <div className="lnav-logo">
          <span className="lnav-dot" />
          DeliveryOS
        </div>
        <button className="lnav-cta" onClick={onEnter}>
          Open Dashboard →
        </button>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-badge">⚡ Real-time order management</div>

        <h1 className="hero-title">
          Deliver Smarter.<br />
          <span className="hero-accent">Not Harder.</span>
        </h1>

        <p className="hero-sub">
          A blazing-fast food delivery order manager that automatically assigns
          the nearest unpaid order — so your team stays focused on the food, not the spreadsheets.
        </p>

        <div className="hero-actions">
          <button className="btn-hero-primary" onClick={onEnter}>
            Launch Dashboard
            <span className="btn-arrow">→</span>
          </button>
          <div className="hero-note">No sign-up. No backend. Just works.</div>
        </div>

        {/* ── Floating mock cards ── */}
        <div className="hero-cards">
          <div className="mock-card mc1">
            <div className="mc-top">
              <span className="mc-id">ORD-A1B2</span>
              <span className="mc-pill unpaid">Unpaid</span>
            </div>
            <div className="mc-name">🍕 Pizza Palace</div>
            <div className="mc-meta">3 items · 4.5 km</div>
          </div>
          <div className="mock-card mc2">
            <div className="mc-top">
              <span className="mc-id">ORD-C3D4</span>
              <span className="mc-pill paid">Paid</span>
            </div>
            <div className="mc-name">🍔 Burger Barn</div>
            <div className="mc-meta">2 items · 2.1 km</div>
          </div>
          <div className="mock-card mc3">
            <div className="mc-top">
              <span className="mc-id">ORD-E5F6</span>
              <span className="mc-pill done">Done ✓</span>
            </div>
            <div className="mc-name">🍣 Sushi Stop</div>
            <div className="mc-meta">5 items · 7.8 km</div>
          </div>
          <div className="mock-assign">
            <span className="ma-label">🚴 Assigned →</span>
            <span className="ma-val">Pizza Palace · 4.5 km</span>
          </div>
        </div>
      </section>

     
      <section className="stats-strip">
        {STATS.map((s) => (
          <div className="stat-item" key={s.label}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

    
      <section className="features">
        <div className="section-tag">// Features</div>
        <h2 className="section-title">Everything you need.<br />Nothing you don't.</h2>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div className="feature-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

     
      <section className="cta-banner">
        <div className="cta-glow" />
        <h2 className="cta-title">Ready to manage your first order?</h2>
        <p className="cta-sub">Jump straight into the dashboard — no setup required.</p>
        <button className="btn-hero-primary" onClick={onEnter}>
          Go to Dashboard
          <span className="btn-arrow">→</span>
        </button>
      </section>

      
      <footer className="lfooter">
        
        <span>Built By Ashish</span>
      </footer>
    </div>
  );
}