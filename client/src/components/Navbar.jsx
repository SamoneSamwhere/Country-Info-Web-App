import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const initials = user?.username?.slice(0, 2).toUpperCase() || '??';

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <span className="logo-globe">🌍</span>
          <span className="logo-text">Globe<span>Scope</span></span>
        </Link>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link
            to="/explore"
            className={`nav-link ${isActive('/explore') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >Explore</Link>
          <Link
            to="/compare"
            className={`nav-link ${isActive('/compare') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >Compare</Link>
          {user && (
            <Link
              to="/favorites"
              className={`nav-link ${isActive('/favorites') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >Favorites</Link>
          )}

          <div className="nav-auth">
            {user ? (
              <>
                <span className="nav-user">
                  <span className="nav-avatar">{initials}</span>
                  {user.username}
                </span>
                <button className="btn btn-ghost btn-sm" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
