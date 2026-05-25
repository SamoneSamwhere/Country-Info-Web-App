import { formatPopulation, formatArea, getCurrencies, getLanguages, getCapital } from '../utils/formatters';
import CountryGlobe from './CountryGlobe';
import './ComparePanel.css';

/* ── icons for each row ─────────────────────────────── */
const ROW_ICONS = {
  Capital:    '🏛',
  Region:     '🌍',
  Subregion:  '📍',
  Languages:  '🗣',
  Currencies: '💰',
  Continent:  '🌐',
  Timezones:  '🕐',
  TLD:        '🔗',
  Borders:    '🤝',
};

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
  { label: 'Population', key: 'population', fmt: formatPopulation, icon: '👥' },
  { label: 'Area',       key: 'area',       fmt: v => formatArea(v), icon: '📐' },
];

/* ── mini OSM map iframe ─────────────────────────────── */
function MiniMap({ latlng, name, zoom = 4 }) {
  if (!latlng || latlng.length < 2) return (
    <div className="cp-minimap cp-minimap-empty">
      <span>🗺</span><p>No map data</p>
    </div>
  );
  const [lat, lng] = latlng;
  const delta = 18; // degrees of bbox
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  const src  = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  return (
    <div className="cp-minimap">
      <iframe
        title={`Map of ${name}`}
        src={src}
        loading="lazy"
        scrolling="no"
      />
    </div>
  );
}

/* ── bar comparison row ──────────────────────────────── */
function BarRow({ label, icon, valA, valB, fmtA, fmtB }) {
  const total = (valA + valB) || 1;
  const pctA  = Math.max(4, Math.round((valA / total) * 100));
  const pctB  = Math.max(4, 100 - pctA);
  const winA  = valA > valB;
  const winB  = valB > valA;

  return (
    <div className="cp-bar-row">
      <div className="cp-bar-top">
        <span className={`cp-bar-val${winA ? ' cp-winner' : ''}`}>
          {winA && <span className="cp-win-badge">Winner</span>}
          {fmtA}
        </span>
        <span className="cp-bar-metric">
          <span className="cp-bar-icon">{icon}</span>
          {label}
        </span>
        <span className={`cp-bar-val cp-bar-val-b${winB ? ' cp-winner' : ''}`}>
          {fmtB}
          {winB && <span className="cp-win-badge">Winner</span>}
        </span>
      </div>
      <div className="cp-bar-track">
        <div className="cp-bar-fill cp-bar-a" style={{ width: `${pctA}%` }} />
        <div className="cp-bar-gap" />
        <div className="cp-bar-fill cp-bar-b" style={{ width: `${pctB}%` }} />
      </div>
    </div>
  );
}

/* ── main component ──────────────────────────────────── */
export default function ComparePanel({ countryA, countryB }) {
  if (!countryA || !countryB) return null;

  return (
    <div className="cp fade-up">

      {/* ── Country header cards ── */}
      <div className="cp-header">

        {/* Country A */}
        <div className="cp-country-card cp-card-a">
          <div className="cp-flag-wrap">
            <img src={countryA.flags?.svg || countryA.flags?.png} alt={countryA.name?.common} className="cp-flag-img" />
          </div>
          <div className="cp-country-meta">
            <h2 className="cp-country-name">{countryA.name?.common}</h2>
            <span className="badge badge-indigo">{countryA.region}</span>
          </div>
          <MiniMap latlng={countryA.latlng} name={countryA.name?.common} />
        </div>

        {/* VS divider */}
        <div className="cp-vs-col">
          <div className="cp-vs">VS</div>
        </div>

        {/* Country B */}
        <div className="cp-country-card cp-card-b">
          <div className="cp-flag-wrap">
            <img src={countryB.flags?.svg || countryB.flags?.png} alt={countryB.name?.common} className="cp-flag-img" />
          </div>
          <div className="cp-country-meta">
            <h2 className="cp-country-name">{countryB.name?.common}</h2>
            <span className="badge badge-emerald">{countryB.region}</span>
          </div>
          <MiniMap latlng={countryB.latlng} name={countryB.name?.common} />
        </div>

      </div>

      {/* ── Globe arc ── */}
      {(countryA.latlng || countryB.latlng) && (
        <div className="cp-globe">
          <div className="cp-globe-label">
            <span className="cp-globe-dot cp-dot-a" />
            {countryA.name?.common}
            <span style={{ margin: '0 8px', color: 'var(--txt-3)' }}>↔</span>
            <span className="cp-globe-dot cp-dot-b" />
            {countryB.name?.common}
          </div>
          <CountryGlobe countries={[countryA, countryB]} height={380} />
        </div>
      )}

      {/* ── Numeric bars ── */}
      <div className="cp-section">
        <p className="cp-section-label">By the numbers</p>
        <div className="cp-bars">
          {NUMERIC_ROWS.map(({ label, key, fmt, icon }) => (
            <BarRow
              key={label}
              label={label}
              icon={icon}
              valA={countryA[key] || 0}
              valB={countryB[key] || 0}
              fmtA={fmt(countryA[key])}
              fmtB={fmt(countryB[key])}
            />
          ))}
        </div>
      </div>

      {/* ── Text comparison table ── */}
      <div className="cp-section">
        <p className="cp-section-label">Details</p>
        <div className="cp-table">
          {TEXT_ROWS.map(({ label, fn }) => (
            <div key={label} className="cp-row">
              <span className="cp-cell cp-cell-a">{fn(countryA)}</span>
              <span className="cp-label">
                <span className="cp-row-icon">{ROW_ICONS[label]}</span>
                {label}
              </span>
              <span className="cp-cell cp-cell-b">{fn(countryB)}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
