import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const stats = [
  { label: 'Countries', value: '195+' },
  { label: 'Regions', value: '5' },
  { label: 'Languages', value: '7K+' },
  { label: 'Currencies', value: '180+' },
];

const features = [
  {
    icon: '🔍',
    title: 'Search & Explore',
    desc: 'Search any country by name or filter by region. Instantly browse all 195+ countries with key stats at a glance.',
    link: '/explore',
    label: 'Start Exploring',
  },
  {
    icon: '⚖️',
    title: 'Compare Countries',
    desc: 'Pick any two countries and compare them side by side — population, area, currency, languages, and more.',
    link: '/compare',
    label: 'Compare Now',
  },
  {
    icon: '★',
    title: 'Save Favorites',
    desc: 'Create an account to bookmark your favorite countries and attach personal notes to each one.',
    link: '/register',
    label: 'Get Started',
    authLink: '/favorites',
    authLabel: 'My Favorites',
  },
];

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="home-page">

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>
        <div className="container hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Powered by REST Countries API
          </div>
          <h1 className="hero-title">
            Explore Every<br />
            <span className="hero-accent">Corner of Earth</span>
          </h1>
          <p className="hero-sub">
            Discover detailed information about 195+ countries — populations, capitals,
            currencies, languages, flags, and more. Compare nations side by side and save your favorites.
          </p>
          <div className="hero-actions">
            <Link to="/explore" className="btn btn-primary hero-btn">
              <span className="hero-btn-icon">🌍</span>
              Explore Countries
            </Link>
            {!user && (
              <Link to="/register" className="btn btn-ghost hero-btn">
                Sign Up Free
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar container">
        {stats.map(s => (
          <div key={s.label} className="stat-item">
            <span className="stat-num">{s.value}</span>
            <span className="stat-lbl">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="features container">
        <p className="section-eyebrow">What You Can Do</p>
        <h2 className="section-title">Everything in One Place</h2>
        <p className="section-sub">All the tools you need to explore, compare, and track the world's nations.</p>
        <div className="features-grid">
          {features.map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon-wrap">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <Link
                to={user && f.authLink ? f.authLink : f.link}
                className="feature-link"
              >
                {user && f.authLabel ? f.authLabel : f.label} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="cta-section container">
          <div className="cta-banner">
            <div className="cta-content">
              <h2>Ready to start exploring?</h2>
              <p>Create a free account to save favorites and add personal notes to countries.</p>
            </div>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-primary">Create Account</Link>
              <Link to="/explore" className="btn btn-ghost">Browse First</Link>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
