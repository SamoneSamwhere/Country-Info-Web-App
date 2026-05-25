import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { formatPopulation, formatArea, getCurrencies, getLanguages, getCapital } from '../utils/formatters';
import CountryGlobe from './CountryGlobe';
import './CountryDetail.css';

const InfoRow = ({ label, value }) => (
  <div className="cd-row">
    <span className="cd-row-label">{label}</span>
    <span className="cd-row-value">{value || '—'}</span>
  </div>
);

export default function CountryDetail({ country }) {
  const { user } = useAuth();
  const { isFavorite, addFavorite, removeFavorite, getFavoriteId } = useFavorites();
  if (!country) return null;

  const code = country.cca3;
  const fav  = isFavorite(code);

  const toggle = async () => {
    if (!user) return;
    try { fav ? await removeFavorite(getFavoriteId(code)) : await addFavorite(country); }
    catch {}
  };

  return (
    <article className="cd fade-up">

      {/* ── Hero banner ── */}
      <div className="cd-hero">
        <div className="cd-hero-flag">
          <img src={country.flags?.svg || country.flags?.png} alt={`Flag of ${country.name?.common}`} />
        </div>
        <div className="cd-hero-info">
          <div className="cd-chips">
            {country.region   && <span className="badge badge-indigo">{country.region}</span>}
            {country.subregion&& <span className="badge badge-emerald">{country.subregion}</span>}
          </div>
          <h1 className="cd-name">{country.name?.common}</h1>
          {country.name?.official && <p className="cd-official">{country.name.official}</p>}
          {user && (
            <button className={`btn btn-sm cd-fav-btn${fav ? ' cd-fav-active' : ''}`} onClick={toggle}>
              {fav ? '★ Saved' : '☆ Save to favorites'}
            </button>
          )}
        </div>
      </div>

      {/* ── Globe ── */}
      {country.latlng && (
        <div className="cd-globe">
          <CountryGlobe countries={[country]} height={340} />
        </div>
      )}

      {/* ── Info grid ── */}
      <div className="cd-grid">

        <div className="cd-card">
          <div className="cd-card-head"><span>🏛️</span> General</div>
          <div className="cd-rows">
            <InfoRow label="Capital"        value={getCapital(country.capital)} />
            <InfoRow label="Population"     value={formatPopulation(country.population)} />
            <InfoRow label="Area"           value={formatArea(country.area)} />
            <InfoRow label="Continent"      value={country.continents?.join(', ')} />
            <InfoRow label="Top-Level Domain" value={country.tld?.join(', ')} />
          </div>
        </div>

        <div className="cd-card">
          <div className="cd-card-head"><span>💬</span> Culture</div>
          <div className="cd-rows">
            <InfoRow label="Languages"  value={getLanguages(country.languages)} />
            <InfoRow label="Currencies" value={getCurrencies(country.currencies)} />
            <InfoRow label="Timezones"  value={
              country.timezones?.length
                ? country.timezones.slice(0,3).join(', ') + (country.timezones.length > 3 ? '…' : '')
                : null
            }/>
          </div>
        </div>

        {country.borders?.length > 0 && (
          <div className="cd-card cd-card-wide">
            <div className="cd-card-head"><span>🗺️</span> Borders with</div>
            <div className="cd-borders">
              {country.borders.map(b => (
                <span key={b} className="cd-border-tag">{b}</span>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
