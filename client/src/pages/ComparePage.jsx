import { useState, useEffect, useMemo } from 'react';
import { getAllCountries, getByCode } from '../services/countriesService';
import ComparePanel from '../components/ComparePanel';
import './ComparePage.css';

export default function ComparePage() {
  const [allCountries, setAllCountries] = useState([]);
  const [codeA, setCodeA] = useState('');
  const [codeB, setCodeB] = useState('');
  const [countryA, setCountryA] = useState(null);
  const [countryB, setCountryB] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCountries().then(data => {
      const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      setAllCountries(sorted);
    }).catch(() => {});
  }, []);

  const handleCompare = async () => {
    if (!codeA || !codeB) return;
    setLoading(true);
    try {
      const [a, b] = await Promise.all([getByCode(codeA), getByCode(codeB)]);
      setCountryA(a);
      setCountryB(b);
    } catch {
      alert('Error loading country data.');
    } finally {
      setLoading(false);
    }
  };

  const canCompare = codeA && codeB && codeA !== codeB;

  return (
    <div className="compare-page container">
      <div className="compare-page-header">
        <h1>Compare Countries</h1>
        <p>Select two countries to compare them side by side.</p>
      </div>

      <div className="compare-selectors">
        <div className="selector-group">
          <label>Country A</label>
          <select value={codeA} onChange={e => setCodeA(e.target.value)} className="country-select">
            <option value="">Select a country...</option>
            {allCountries.map(c => (
              <option key={c.cca3} value={c.cca3}>{c.name?.common}</option>
            ))}
          </select>
        </div>

        <div className="compare-btn-wrap">
          <button
            className="btn btn-primary"
            onClick={handleCompare}
            disabled={!canCompare || loading}
          >
            {loading ? 'Loading...' : 'Compare ⚖️'}
          </button>
        </div>

        <div className="selector-group">
          <label>Country B</label>
          <select value={codeB} onChange={e => setCodeB(e.target.value)} className="country-select">
            <option value="">Select a country...</option>
            {allCountries.map(c => (
              <option key={c.cca3} value={c.cca3}>{c.name?.common}</option>
            ))}
          </select>
        </div>
      </div>

      {codeA && codeB && codeA === codeB && (
        <p className="compare-warn">Please select two different countries.</p>
      )}

      {countryA && countryB && <ComparePanel countryA={countryA} countryB={countryB} />}

      {!countryA && !countryB && (
        <div className="compare-empty">
          <span>⚖️</span>
          <p>Select two countries above and click Compare to see a detailed breakdown.</p>
        </div>
      )}
    </div>
  );
}
