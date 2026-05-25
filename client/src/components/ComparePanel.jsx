import { formatPopulation, formatArea, getCurrencies, getLanguages, getCapital } from '../utils/formatters';
import CountryGlobe from './CountryGlobe';
import './ComparePanel.css';

const TEXT_ROWS = [
  { label: 'Capital',    fn: c => getCapital(c.capital) },
  { label: 'Region',     fn: c => c.region || '—' },
  { label: 'Subregion',  fn: c => c.subregion || '—' },
  { label: 'Languages',  fn: c => getLanguages(c.languages) },
  { label: 'Currencies', fn: c => getCurrencies(c.currencies) },
  { label: 'Continent',  fn: c => c.continents?.join(', ') || '—' },
  { label: 'Timezones',  fn: c => c.timezones?.slice(0, 2).join(', ') || '—' },
  { label: 'TLD',        fn: c => c.tld?.join(', ') || '—' },
  { label: 'Borders',    fn: c => c.borders?.length ? c.borders.join(', ') : 'None' },
];

const NUMERIC_ROWS = [
  { label: 'Population', key: 'population', fmt: formatPopulation, higher: 'larger' },
  { label: 'Area',       key: 'area',       fmt: v => formatArea(v), higher: 'larger' },
];

function BarRow({ label, valA, valB, fmtA, fmtB }) {
  const total = valA + valB || 1;
  const pctA = Math.round((valA / total) * 100);
  const pctB = 100 - pctA;
  const winA = valA > valB;
  const winB = valB > valA;

  return (
    <div className="cp-bar-row">
      <div className="cp-bar-label-row">
        <span className={`cp-bar-val${winA ? ' cp-winner' : ''}`}>
          {winA && <span className="cp-crown">▲</span>}{fmtA}
        </span>
        <span className="cp-bar-metric">{label}</span>
        <span className={`cp-bar-val cp-bar-val-b${winB ? ' cp-winner' : ''}`}>
          {fmtB}{winB && <span className="cp-crown">▲</span>}
        </span>
      </div>
      <div className="cp-bar-track">
        <div className="cp-bar-fill cp-bar-a" style={{ width: `${pctA}%` }} />
        <div className="cp-bar-fill cp-bar-b" style={{ width: `${pctB}%` }} />
      </div>
    </div>
  );
}

export default function ComparePanel({ countryA, countryB }) {
  if (!countryA || !countryB) return null;

  return (
    <div className="cp fade-up">

      {/* Globe */}
      {(countryA.latlng || countryB.latlng) && (
        <div className="cp-globe">
          <CountryGlobe countries={[countryA, countryB]} height={400} />
        </div>
      )}

      {/* Flag header */}
      <div className="cp-header">
        <div className="cp-country">
          <img src={countryA.flags?.svg || countryA.flags?.png} alt={countryA.name?.common} />
          <h2>{countryA.name?.common}</h2>
          <span className="badge badge-indigo">{countryA.region}</span>
        </div>
        <div className="cp-vs">VS</div>
        <div className="cp-country cp-country-b">
          <img src={countryB.flags?.svg || countryB.flags?.png} alt={countryB.name?.common} />
          <h2>{countryB.name?.common}</h2>
          <span className="badge badge-emerald">{countryB.region}</span>
        </div>
      </div>

      {/* Numeric bar comparisons */}
      <div className="cp-bars">
        {NUMERIC_ROWS.map(({ label, key, fmt }) => (
          <BarRow
            key={label}
            label={label}
            valA={countryA[key] || 0}
            valB={countryB[key] || 0}
            fmtA={fmt(countryA[key])}
            fmtB={fmt(countryB[key])}
          />
        ))}
      </div>

      {/* Text rows table */}
      <div className="cp-table">
        {TEXT_ROWS.map(({ label, fn }) => (
          <div key={label} className="cp-row">
            <span className="cp-cell cp-cell-a">{fn(countryA)}</span>
            <span className="cp-label">{label}</span>
            <span className="cp-cell cp-cell-b">{fn(countryB)}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
