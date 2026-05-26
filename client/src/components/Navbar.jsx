import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useState, useRef, useEffect } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/explore',  label: 'Explore' },
  { to: '/compare',  label: 'Compare' },
  { to: '/about',    label: 'About' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggle: toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen]         = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => { logout(); navigate('/'); setOpen(false); setProfileOpen(false); };
  const isActive = (p) => location.pathname === p || location.pathname.startsWith(p + '/');
  const initials = user?.username?.slice(0, 2).toUpperCase() ?? '??';

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

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
          {NAV_LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link${isActive(l.to) ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >{l.label}</Link>
          ))}

          <button className="nav-theme-btn" onClick={toggleTheme} aria-label="Toggle theme" title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 9.5A5.5 5.5 0 016.5 2.5a5.5 5.5 0 100 11 5.5 5.5 0 007-4z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>

          <div className="nav-auth">
            {user ? (
              <div className="nav-profile-wrap" ref={profileRef}>
                <button
                  className={`nav-user-pill${profileOpen ? ' active' : ''}`}
                  onClick={() => setProfileOpen(o => !o)}
                >
                  <span className="nav-avatar">{initials}</span>
                  <span className="nav-username">{user.username}</span>
                  <svg className={`nav-chevron${profileOpen ? ' rotated' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {profileOpen && (
                  <div className="nav-profile-dropdown">
                    {/* User Info */}
                    <div className="npd-header">
                      <div className="npd-avatar">{initials}</div>
                      <div className="npd-user-info">
                        <span className="npd-name">{user.username}</span>
                        <span className="npd-email">{user.email}</span>
                      </div>
                    </div>

                    <div className="npd-divider" />

                    {/* Favorites quick link */}
                    <Link
                      to="/favorites"
                      className="npd-item"
                      onClick={() => setProfileOpen(false)}
                    >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M7.5 12.5L2.5 7.5C1.5 6.5 1.5 4.5 3 3.5c1.5-1 3 0 4.5 1.5C9 3.5 10.5 2.5 12 3.5c1.5 1 1.5 3 .5 4L7.5 12.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>My Favorites</span>
                      {favorites.length > 0 && (
                        <span className="npd-badge">{favorites.length}</span>
                      )}
                    </Link>

                    {/* Edit profile */}
                    <Link
                      to="/profile"
                      className="npd-item"
                      onClick={() => setProfileOpen(false)}
                    >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
                        <path d="M2 13c0-2.5 2.5-4.5 5.5-4.5S13 10.5 13 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                      <span>Edit Profile</span>
                    </Link>

                    <div className="npd-divider" />

                    <button className="npd-item npd-signout" onClick={handleLogout}>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M5.5 13H3a1 1 0 01-1-1V3a1 1 0 011-1h2.5M10 10.5L13 7.5l-3-3M13 7.5H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
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
