import { useState, useEffect, useMemo } from 'react';
import { getAllCountries, searchByName, getByRegion } from '../services/countriesService';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import './ExplorePage.css';

export default function ExplorePage() {
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getAllCountries();
        setAllCountries(data);
      } catch {
        setError('Failed to load countries. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    let list = allCountries;
    if (region) {
      list = list.filter(c => c.region === region);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.name?.common?.toLowerCase().includes(q) ||
        c.name?.official?.toLowerCase().includes(q) ||
        c.capital?.[0]?.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => a.name?.common?.localeCompare(b.name?.common));
  }, [allCountries, search, region]);

  return (
    <div className="explore-page container">
      <div className="explore-header">
        <div>
          <h1 className="explore-title">Explore Countries</h1>
          <p className="explore-sub">
            {loading ? 'Loading...' : `${filtered.length} countries found`}
          </p>
        </div>
        <div className="explore-controls">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name or capital..." />
          <FilterDropdown value={region} onChange={setRegion} />
        </div>
      </div>

      {error && <div className="error-box">{error}</div>}

      {loading ? (
        <div className="spinner" />
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <span>🌐</span>
          <p>No countries found matching your search.</p>
          <button className="btn btn-ghost" onClick={() => { setSearch(''); setRegion(''); }}>
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-4">
          {filtered.map(c => (
            <CountryCard key={c.cca3} country={c} />
          ))}
        </div>
      )}
    </div>
  );
}
