import { useState, useEffect } from 'react';
import { getAllCountries } from '../services/countriesService';

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getAllCountries()
      .then(data => { if (!cancelled) setCountries(data); })
      .catch(() => { if (!cancelled) setError('Failed to load countries.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { countries, loading, error };
}
