import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/explore',  label: 'Explore' },
  { to: '/compare',  label: 'Compare' },
  { to: '/favorites',label: 'Favorites', authOnly: true },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); setOpen(false); };
  const isActive = (p) => location.pathname === p || location.pathname.startsWith(p + '/');
  const initials = user?.username?.slice(0, 2).toUpperCase() ?? '??';

  return (
    <nav className="navbar">
      <div className="navbar-inner container">

        <Link to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <div className="logo-icon">🌍</div>
          <span className="logo-wordmark">Globe<span>Scope</span></span>
        </Link>

        <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>

        <div className={`navbar-links${open ? ' open' : ''}`}>
          {NAV_LINKS.filter(l => !l.authOnly || user).map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link${isActive(l.to) ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >{l.label}</Link>
          ))}

          <div className="nav-auth">
            {user ? (
              <>
                <div className="nav-user-pill">
                  <span className="nav-avatar">{initials}</span>
                  {user.username}
                </div>
                <button className="btn btn-ghost btn-sm" onClick={handleLogout}>Sign out</button>
              </>
            ) : (
              <>
                <Link to="/login"    className="btn btn-ghost btn-sm"   onClick={() => setOpen(false)}>Sign in</Link>
                <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>Get started</Link>
              </>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}
