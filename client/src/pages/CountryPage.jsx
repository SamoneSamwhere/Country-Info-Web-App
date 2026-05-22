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
    <div className="container" style={{ paddingTop: '24px' }}>
      <button
        className="btn btn-ghost"
        onClick={() => navigate(-1)}
        style={{ marginBottom: '16px' }}
      >
        ← Back
      </button>
      {loading && <div className="spinner" />}
      {error && <p style={{ color: 'var(--danger)', padding: '40px 0' }}>{error}</p>}
      {country && <CountryDetail country={country} />}
    </div>
  );
}
