import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { formatPopulation } from '../utils/formatters';
import axios from 'axios';
import './ProfilePage.css';

export default function ProfilePage() {
  const { user, login } = useAuth();
  const { favorites, loading: favLoading, removeFavorite } = useFavorites();

  const [tab, setTab] = useState('info'); // 'info' | 'edit'
  const [form, setForm] = useState({ username: user?.username || '', email: user?.email || '', password: '', confirm: '' });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError]   = useState('');

  const initials = user?.username?.slice(0, 2).toUpperCase() ?? '??';

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError(''); setSuccess('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirm) {
      return setError('Passwords do not match.');
    }
    if (form.password && form.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
    setSaving(true);
    try {
      const payload = { username: form.username, email: form.email };
      if (form.password) payload.password = form.password;
      await axios.patch('/api/auth/update', payload);
      setSuccess('Profile updated successfully!');
      setForm(f => ({ ...f, password: '', confirm: '' }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (window.confirm('Remove from favorites?')) await removeFavorite(id);
  };

  return (
    <div className="profile-page container">

      {/* Profile hero */}
      <div className="profile-hero">
        <div className="profile-hero-avatar">{initials}</div>
        <div className="profile-hero-info">
          <h1 className="profile-hero-name">{user?.username}</h1>
          <p className="profile-hero-email">{user?.email}</p>
        </div>
        <div className="profile-hero-stats">
          <div className="profile-stat">
            <span className="profile-stat-num">{favorites.length}</span>
            <span className="profile-stat-label">Favorites</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button className={`profile-tab${tab === 'info' ? ' active' : ''}`} onClick={() => setTab('info')}>
          My Favorites
        </button>
        <button className={`profile-tab${tab === 'edit' ? ' active' : ''}`} onClick={() => setTab('edit')}>
          Edit Profile
        </button>
      </div>

      {/* Favorites tab */}
      {tab === 'info' && (
        <div className="profile-favs">
          {favLoading ? (
            <div className="spinner-wrap"><div className="spinner" /></div>
          ) : favorites.length === 0 ? (
            <div className="profile-fav-empty">
              <span>☆</span>
              <p>No favorites saved yet.</p>
              <Link to="/explore" className="btn btn-primary btn-sm">Explore countries</Link>
            </div>
          ) : (
            <div className="pfav-list">
              {favorites.map(fav => (
                <div key={fav.id} className="pfav-card">
                  <Link to={`/country/${fav.countryCode}`} className="pfav-flag">
                    <img src={fav.flagUrl} alt={fav.countryName} />
                  </Link>
                  <div className="pfav-info">
                    <Link to={`/country/${fav.countryCode}`} className="pfav-name">{fav.countryName}</Link>
                    <div className="pfav-meta">
                      <span>{fav.capital || '—'}</span>
                      <span>·</span>
                      <span>{formatPopulation(fav.population)}</span>
                      <span>·</span>
                      <span className="pfav-region">{fav.region}</span>
                    </div>
                    {fav.note && <p className="pfav-note">📝 {fav.note}</p>}
                  </div>
                  <button className="pfav-remove" onClick={() => remove(fav.id)} title="Remove">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 4h10M5 4V2.5h4V4M5.5 6.5v4M8.5 6.5v4M3 4l.75 7.5h6.5L11 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit profile tab */}
      {tab === 'edit' && (
        <div className="profile-edit-wrap">
          <div className="profile-edit-card">
            <h2 className="profile-edit-title">Update your profile</h2>
            <p className="profile-edit-sub">Change your display name, email, or password.</p>

            {error   && <div className="auth-error">{error}</div>}
            {success && <div className="profile-success">{success}</div>}

            <form className="auth-form" onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Username</label>
                <input className="input" name="username" value={form.username} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="input" name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">New password <span style={{fontWeight:400,textTransform:'none',letterSpacing:0}}>(leave blank to keep current)</span></label>
                <input className="input" name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••" />
              </div>
              {form.password && (
                <div className="form-group">
                  <label className="form-label">Confirm new password</label>
                  <input className="input" name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="••••••" />
                </div>
              )}
              <button className="btn btn-primary auth-submit" disabled={saving}>
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
