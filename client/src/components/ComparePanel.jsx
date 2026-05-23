import { formatPopulation, formatArea, getCurrencies, getLanguages, getCapital } from '../utils/formatters';
import CountryGlobe from './CountryGlobe';
import './ComparePanel.css';

const rows = [
  { label: 'Capital', fn: c => getCapital(c.capital) },
  { label: 'Population', fn: c => formatPopulation(c.population) },
  { label: 'Area', fn: c => formatArea(c.area) },
  { label: 'Region', fn: c => c.region || 'N/A' },
  { label: 'Subregion', fn: c => c.subregion || 'N/A' },
  { label: 'Languages', fn: c => getLanguages(c.languages) },
  { label: 'Currencies', fn: c => getCurrencies(c.currencies) },
  { label: 'Continent', fn: c => c.continents?.join(', ') || 'N/A' },
  { label: 'Timezones', fn: c => c.timezones?.slice(0, 2).join(', ') || 'N/A' },
  { label: 'TLD', fn: c => c.tld?.join(', ') || 'N/A' },
  { label: 'Borders', fn: c => c.borders?.length ? c.borders.join(', ') : 'None' },
];

export default function ComparePanel({ countryA, countryB }) {
  if (!countryA || !countryB) return null;

  return (
    <div className="compare-panel fade-up">
      <div className="compare-header">
        <div className="compare-flag-col">
          <img src={countryA.flags?.svg || countryA.flags?.png} alt={countryA.name?.common} />
          <h2>{countryA.name?.common}</h2>
          <span className="badge">{countryA.region}</span>
        </div>
        <div className="compare-vs-badge">VS</div>
        <div className="compare-flag-col">
          <img src={countryB.flags?.svg || countryB.flags?.png} alt={countryB.name?.common} />
          <h2>{countryB.name?.common}</h2>
          <span className="badge">{countryB.region}</span>
        </div>
      </div>

      {(countryA.latlng || countryB.latlng) && (
        <div className="compare-globe-wrap">
          <CountryGlobe countries={[countryA, countryB]} height={400} />
        </div>
      )}

      <div className="compare-table">
        {rows.map(({ label, fn }) => {
          const valA = fn(countryA);
          const valB = fn(countryB);
          return (
            <div key={label} className="compare-row">
              <div className="compare-cell cell-a">{valA}</div>
              <div className="compare-label">{label}</div>
              <div className="compare-cell cell-b">{valB}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
