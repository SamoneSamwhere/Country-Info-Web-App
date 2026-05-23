import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate     = useNavigate();
  const [form, setForm]       = useState({ username: '', email: '', password: '', confirm: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    if (form.password.length < 6)       return setError('Password must be at least 6 characters.');
    setLoading(true);
    try { await register(form.username, form.email, form.password); navigate('/explore'); }
    catch (err) { setError(err.response?.data?.message || 'Registration failed. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">🌍</div>
          <span className="auth-logo-text">Globe<span>Scope</span></span>
        </div>

        <h2 className="auth-title">Create an account</h2>
        <p className="auth-sub">Free forever. Start saving your favorite countries.</p>

        {error && <div className="auth-error">⚠️ {error}</div>}

        <form className="auth-form" onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="input" type="text" name="username" value={form.username} onChange={change} placeholder="yourname" required autoComplete="username" />
          </div>
          <div className="form-group">
            <label className="form-label">Email address</label>
            <input className="input" type="email" name="email" value={form.email} onChange={change} placeholder="you@example.com" required autoComplete="email" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="input" type="password" name="password" value={form.password} onChange={change} placeholder="Min. 6 characters" required autoComplete="new-password" />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm password</label>
            <input className="input" type="password" name="confirm" value={form.confirm} onChange={change} placeholder="••••••••" required autoComplete="new-password" />
          </div>
          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
