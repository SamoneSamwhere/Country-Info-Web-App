import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const STATS = [
  { value: '195+', label: 'Countries' },
  { value: '5',    label: 'Regions'   },
  { value: '7,000+', label: 'Languages'},
  { value: '180+', label: 'Currencies'},
];

const FEATURES = [
  {
    num: '01',
    title: 'Search & Explore',
    desc: 'Browse all 195+ countries. Filter by region, search by name or capital, and jump straight to any nation in seconds.',
    to: '/explore',
    cta: 'Go to Explore',
  },
  {
    num: '02',
    title: 'Compare Side by Side',
    desc: 'Select any two countries and see their population, area, language, currency, and borders compared in one clean view.',
    to: '/compare',
    cta: 'Go to Compare',
  },
  {
    num: '03',
    title: 'Save Your Favorites',
    desc: 'Sign up to bookmark countries you care about and attach personal notes to each one. Your own reference list.',
    to: '/register',
    toAuth: '/favorites',
    cta: 'Create account',
    ctaAuth: 'My Favorites',
  },
];

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="home">

      {/* ── Hero ─────────────────────────────── */}
      <section className="home-hero">
        <div className="container home-hero-inner">

          <div className="home-hero-left">
            <p className="home-kicker">REST Countries API · IT 301 Final Project</p>
            <h1 className="home-h1">
              Explore every<br />
              country on Earth.
            </h1>
            <p className="home-sub">
              Detailed profiles on 195+ nations — populations, capitals,
              currencies, languages, flags, borders and more.
              Compare any two countries and build your own collection.
            </p>
            <div className="home-cta-row">
              <Link to="/explore" className="btn btn-primary btn-lg">Start exploring</Link>
              {!user && <Link to="/register" className="btn btn-ghost btn-lg">Sign up free</Link>}
            </div>
          </div>

          <div className="home-hero-right">
            {STATS.map(s => (
              <div key={s.label} className="home-stat">
                <span className="home-stat-val">{s.value}</span>
                <span className="home-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Divider ── */}
      <div className="container"><div className="divider" /></div>

      {/* ── Features ─────────────────────────── */}
      <section className="home-features container">
        {FEATURES.map((f, i) => (
          <div key={f.num} className="home-feature fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="home-feature-num">{f.num}</span>
            <div className="home-feature-body">
              <h3 className="home-feature-title">{f.title}</h3>
              <p className="home-feature-desc">{f.desc}</p>
            </div>
            <Link
              to={user && f.toAuth ? f.toAuth : f.to}
              className="home-feature-link"
            >
              {user && f.ctaAuth ? f.ctaAuth : f.cta} →
            </Link>
          </div>
        ))}
      </section>

      {/* ── CTA ───────────────────────────────── */}
      {!user && (
        <>
          <div className="container"><div className="divider" /></div>
          <section className="home-cta-section container">
            <div className="home-cta-left">
              <h2 className="home-cta-h2">Ready to get started?</h2>
              <p className="home-cta-p">Create a free account to save favorites and add personal notes to any country.</p>
            </div>
            <div className="home-cta-right">
              <Link to="/register" className="btn btn-primary btn-lg">Create free account</Link>
              <Link to="/explore"  className="btn btn-ghost btn-lg">Browse first</Link>
            </div>
          </section>
        </>
      )}

      <div style={{ height: 80 }} />
    </div>
  );
}
