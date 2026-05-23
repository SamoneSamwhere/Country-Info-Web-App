import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getByCode } from '../services/countriesService';
import CountryDetail from '../components/CountryDetail';

export default function CountryPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getByCode(code);
        setCountry(data);
      } catch {
        setError('Country not found.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [code]);

  return (
    <div className="container" style={{ paddingTop: '32px' }}>
      <button
        className="btn btn-ghost"
        onClick={() => navigate(-1)}
        style={{ marginBottom: '28px', gap: '8px' }}
      >
        ← Back
      </button>
      {loading && (
        <div className="spinner-wrap">
          <div className="spinner" />
          <span className="spinner-text">Loading country…</span>
        </div>
      )}
      {error && (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          color: 'var(--text-muted)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌐</div>
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Country Not Found</h3>
          <p style={{ color: 'var(--danger)' }}>{error}</p>
        </div>
      )}
      {country && <CountryDetail country={country} />}
    </div>
  );
}
