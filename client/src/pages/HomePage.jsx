import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const STATS = [
  { value: '195+', label: 'Countries',   icon: '🌍' },
  { value: '5',    label: 'Regions',     icon: '🗺️' },
  { value: '7K+',  label: 'Languages',   icon: '💬' },
  { value: '180+', label: 'Currencies',  icon: '💰' },
];

const FEATURES = [
  {
    icon: '🔍',
    title: 'Search & Explore',
    desc: 'Instantly browse all 195+ countries. Filter by region, search by name or capital, and discover in seconds.',
    to: '/explore',
    cta: 'Start exploring',
    color: 'indigo',
  },
  {
    icon: '⚖️',
    title: 'Side-by-Side Compare',
    desc: 'Pick any two nations and compare population, area, language, currency, timezones, and borders in one view.',
    to: '/compare',
    cta: 'Compare now',
    color: 'emerald',
  },
  {
    icon: '★',
    title: 'Personal Favorites',
    desc: 'Save the countries that matter to you. Add private notes, revisit anytime from your personal dashboard.',
    to: '/register',
    toAuth: '/favorites',
    cta: 'Create account',
    ctaAuth: 'My favorites',
    color: 'amber',
  },
];

export default function HomePage() {
  const { user } = useAuth();
  return (
    <div className="home">

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="hero-glow hero-glow-3" />

        <div className="container hero-inner">
          <div className="hero-badge fade-up">
            <span className="hero-badge-dot" />
            Powered by REST Countries API
          </div>

          <h1 className="hero-h1 fade-up" style={{animationDelay:'0.08s'}}>
            The world's data,<br />
            <span className="gradient-text">beautifully explored</span>
          </h1>

          <p className="hero-p fade-up" style={{animationDelay:'0.16s'}}>
            Discover detailed profiles on 195+ countries — populations, capitals,
            currencies, languages, borders &amp; more. Compare nations and build your own collection.
          </p>

          <div className="hero-cta fade-up" style={{animationDelay:'0.24s'}}>
            <Link to="/explore" className="btn btn-primary btn-lg">
              <span>Explore countries</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            {!user && (
              <Link to="/register" className="btn btn-secondary btn-lg">Sign up free</Link>
            )}
          </div>

          {/* Floating stat pills */}
          <div className="hero-pills fade-up" style={{animationDelay:'0.32s'}}>
            {STATS.map(s => (
              <div key={s.label} className="hero-pill">
                <span className="hero-pill-icon">{s.icon}</span>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section container">
        <div className="section-header">
          <p className="eyebrow"><span className="eyebrow-dot"/>Everything you need</p>
          <h2 className="section-h2">One app. All the world's data.</h2>
          <p className="section-sub">Three powerful tools that work together to help you learn about any country on Earth.</p>
        </div>

        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div key={f.title} className={`feature-card feature-card-${f.color} fade-up`} style={{animationDelay:`${i*0.08}s`}}>
              <div className="feature-icon-box">{f.icon}</div>
              <h3 className="feature-h3">{f.title}</h3>
              <p className="feature-p">{f.desc}</p>
              <Link
                to={user && f.toAuth ? f.toAuth : f.to}
                className="feature-link"
              >
                {user && f.ctaAuth ? f.ctaAuth : f.cta}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      {!user && (
        <section className="section container">
          <div className="cta-card">
            <div className="cta-glow" />
            <div className="cta-body">
              <p className="eyebrow"><span className="eyebrow-dot"/>Free forever</p>
              <h2 className="cta-h2">Start exploring the world today</h2>
              <p className="cta-p">Create a free account in seconds to unlock favorites, personal notes, and your own country collection.</p>
              <div className="cta-actions">
                <Link to="/register" className="btn btn-primary btn-lg">Create free account</Link>
                <Link to="/explore"  className="btn btn-secondary btn-lg">Browse first</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="home-footer-spacer" />
    </div>
  );
}
