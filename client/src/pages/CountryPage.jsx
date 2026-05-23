import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getByCode } from '../services/countriesService';
import CountryDetail from '../components/CountryDetail';
import './CountryPage.css';

export default function CountryPage() {
  const { code } = useParams();
  const navigate  = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    setLoading(true); setError(''); setCountry(null);
    getByCode(code)
      .then(setCountry)
      .catch(() => setError('Country not found.'))
      .finally(() => setLoading(false));
  }, [code]);

  return (
    <div className="country-page container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Back
      </button>

      {loading && (
        <div className="spinner-wrap"><div className="spinner" /><span className="spinner-text">Loading…</span></div>
      )}
      {error && (
        <div className="country-not-found">
          <span>🌐</span>
          <h3>Country not found</h3>
          <p>{error}</p>
          <button className="btn btn-secondary" onClick={() => navigate('/explore')}>Back to Explore</button>
        </div>
      )}
      {country && <CountryDetail country={country} />}
    </div>
  );
}
