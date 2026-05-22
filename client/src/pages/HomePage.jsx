import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const stats = [
  { label: 'Countries', value: '195+' },
  { label: 'Regions', value: '5' },
  { label: 'Languages', value: '7K+' },
  { label: 'Currencies', value: '180+' },
];

export default function HomePage() {
  const { user } = useAuth();
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-content">
          <div className="hero-eyebrow">🌍 Country Info App</div>
          <h1 className="hero-title">
            Explore Every<br />
            <span className="hero-accent">Corner of Earth</span>
          </h1>
          <p className="hero-sub">
            Discover detailed information about 195+ countries — populations, capitals,
            currencies, languages, flags, and more. Compare nations side by side and save your favorites.
          </p>
          <div className="hero-actions">
            <Link to="/explore" className="btn btn-primary hero-btn">Explore Countries →</Link>
            {!user && (
              <Link to="/register" className="btn btn-ghost hero-btn">Sign Up Free</Link>
            )}
          </div>
        </div>
      </section>

      <section className="stats-bar container">
        {stats.map(s => (
          <div key={s.label} className="stat-item">
            <span className="stat-num">{s.value}</span>
            <span className="stat-lbl">{s.label}</span>
          </div>
        ))}
      </section>

      <section className="features container">
        <h2 className="section-title">What You Can Do</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Search & Explore</h3>
            <p>Search any country by name or filter by region. Instantly browse all 195+ countries with key stats.</p>
            <Link to="/explore" className="feature-link">Start Exploring →</Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚖️</div>
            <h3>Compare Countries</h3>
            <p>Pick any two countries and compare them side by side — population, area, currency, languages, and more.</p>
            <Link to="/compare" className="feature-link">Compare Now →</Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon">★</div>
            <h3>Save Favorites</h3>
            <p>Create an account to bookmark your favorite countries and add personal notes to each one.</p>
            <Link to={user ? '/favorites' : '/register'} className="feature-link">
              {user ? 'My Favorites →' : 'Sign Up to Save →'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
