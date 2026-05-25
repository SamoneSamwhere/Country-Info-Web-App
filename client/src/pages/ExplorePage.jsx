import { useState, useEffect, useMemo } from 'react';
import { getAllCountries } from '../services/countriesService';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import './ExplorePage.css';

export default function ExplorePage() {
  const [all, setAll]       = useState([]);
  const [loading, setLoad]  = useState(true);
  const [error, setError]   = useState('');
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    setLoad(true);
    getAllCountries()
      .then(setAll)
      .catch(() => setError('Could not load countries. Check your connection.'))
      .finally(() => setLoad(false));
  }, []);

  const filtered = useMemo(() => {
    let list = region ? all.filter(c => c.region === region) : all;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.name?.common?.toLowerCase().includes(q) ||
        c.name?.official?.toLowerCase().includes(q) ||
        c.capital?.[0]?.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a,b) => a.name?.common?.localeCompare(b.name?.common));
  }, [all, search, region]);

  const clear = () => { setSearch(''); setRegion(''); };

  return (
    <div className="explore-page container">

      {/* Header */}
      <div className="explore-head">
        <div>
          <h1 className="explore-title">Explore Countries</h1>
          <p className="explore-meta">
            {loading ? 'Loading…' : <><strong className="explore-count">{filtered.length}</strong> {filtered.length === 1 ? 'country' : 'countries'} found</>}
          </p>
        </div>
        <div className="explore-controls">
          <SearchBar value={search} onChange={setSearch} placeholder="Search country or capital…" />
          <FilterDropdown value={region} onChange={setRegion} />
        </div>
      </div>

      {/* Active filters */}
      {(search || region) && (
        <div className="explore-filters">
          {search && <span className="filter-chip">"{search}" <button onClick={() => setSearch('')}>✕</button></span>}
          {region && <span className="filter-chip">{region} <button onClick={() => setRegion('')}>✕</button></span>}
          <button className="filter-clear" onClick={clear}>Clear all</button>
        </div>
      )}

      {error && (
        <div className="explore-error">
          <span>⚠️</span> {error}
        </div>
      )}

      {loading ? (
        <div className="spinner-wrap"><div className="spinner" /><span className="spinner-text">Loading countries…</span></div>
      ) : filtered.length === 0 ? (
        <div className="explore-empty">
          <div className="explore-empty-icon">🌐</div>
          <h3>No countries found</h3>
          <p>Try adjusting your search or filters.</p>
          <button className="btn btn-secondary" onClick={clear}>Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-4">
          {filtered.map(c => <CountryCard key={c.cca3} country={c} />)}
        </div>
      )}
    </div>
  );
}
