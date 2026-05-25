import { useState, useEffect } from 'react';
import { getAllCountries, getByCode } from '../services/countriesService';
import ComparePanel from '../components/ComparePanel';
import './ComparePage.css';

export default function ComparePage() {
  const [all,      setAll]      = useState([]);
  const [codeA,    setCodeA]    = useState('');
  const [codeB,    setCodeB]    = useState('');
  const [cA,       setCA]       = useState(null);
  const [cB,       setCB]       = useState(null);
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    getAllCountries()
      .then(d => setAll([...d].sort((a,b) => a.name.common.localeCompare(b.name.common))))
      .catch(() => {});
  }, []);

  const compare = async () => {
    if (!codeA || !codeB) return;
    setLoading(true);
    try {
      const [a, b] = await Promise.all([getByCode(codeA), getByCode(codeB)]);
      setCA(a); setCB(b);
    } catch { alert('Error loading country data.'); }
    finally  { setLoading(false); }
  };

  const canCompare = codeA && codeB && codeA !== codeB;

  return (
    <div className="cmp-page container">

      <div className="cmp-head">
        <div>
          <h1 className="cmp-title">Compare Countries</h1>
          <p className="cmp-sub">Select two nations for a detailed side-by-side breakdown.</p>
        </div>
      </div>

      <div className="cmp-selector-card">
        <div className="cmp-selector-group">
          <label className="cmp-label">First country</label>
          <select value={codeA} onChange={e => setCodeA(e.target.value)} className="cmp-select">
            <option value="">Choose a country…</option>
            {all.map(c => <option key={c.cca3} value={c.cca3}>{c.name?.common}</option>)}
          </select>
        </div>

        <div className="cmp-vs-col">
          <div className="cmp-vs-badge">VS</div>
          <button
            className="btn btn-primary"
            onClick={compare}
            disabled={!canCompare || loading}
          >
            {loading ? 'Loading…' : 'Compare'}
          </button>
        </div>

        <div className="cmp-selector-group">
          <label className="cmp-label">Second country</label>
          <select value={codeB} onChange={e => setCodeB(e.target.value)} className="cmp-select">
            <option value="">Choose a country…</option>
            {all.map(c => <option key={c.cca3} value={c.cca3}>{c.name?.common}</option>)}
          </select>
        </div>
      </div>

      {codeA && codeB && codeA === codeB && (
        <p className="cmp-warn">Please choose two different countries.</p>
      )}

      {cA && cB
        ? <ComparePanel countryA={cA} countryB={cB} />
        : (
          <div className="cmp-empty">
            <div className="cmp-empty-icon">⚖️</div>
            <h3>Ready to compare</h3>
            <p>Choose two countries above, then hit <strong>Compare</strong> to see the full breakdown.</p>
          </div>
        )
      }
    </div>
  );
}
