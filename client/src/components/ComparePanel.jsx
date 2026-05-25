import { formatPopulation, formatArea, getCurrencies, getLanguages, getCapital } from '../utils/formatters';
import CountryGlobe from './CountryGlobe';
import './ComparePanel.css';

const ROWS = [
  { label: 'Capital',    fn: c => getCapital(c.capital) },
  { label: 'Population', fn: c => formatPopulation(c.population) },
  { label: 'Area',       fn: c => formatArea(c.area) },
  { label: 'Region',     fn: c => c.region || '—' },
  { label: 'Subregion',  fn: c => c.subregion || '—' },
  { label: 'Languages',  fn: c => getLanguages(c.languages) },
  { label: 'Currencies', fn: c => getCurrencies(c.currencies) },
  { label: 'Continent',  fn: c => c.continents?.join(', ') || '—' },
  { label: 'Timezones',  fn: c => c.timezones?.slice(0, 2).join(', ') || '—' },
  { label: 'TLD',        fn: c => c.tld?.join(', ') || '—' },
  { label: 'Borders',    fn: c => c.borders?.length ? c.borders.join(', ') : 'None' },
];

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

      {/* Table */}
      <div className="cp-table">
        {ROWS.map(({ label, fn }) => (
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
