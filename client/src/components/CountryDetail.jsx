import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { formatPopulation, formatArea, getCurrencies, getLanguages, getCapital } from '../utils/formatters';
import CountryGlobe from './CountryGlobe';
import './CountryDetail.css';

export default function CountryDetail({ country }) {
  const { user } = useAuth();
  const { isFavorite, addFavorite, removeFavorite, getFavoriteId } = useFavorites();

  if (!country) return null;

  const code = country.cca3;
  const fav = isFavorite(code);

  const handleFavToggle = async () => {
    if (!user) return;
    try {
      if (fav) {
        await removeFavorite(getFavoriteId(code));
      } else {
        await addFavorite(country);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="country-detail fade-up">
      <div className="detail-hero">
        <div className="detail-flag">
          <img
            src={country.flags?.svg || country.flags?.png}
            alt={`Flag of ${country.name?.common}`}
          />
        </div>
        <div className="detail-headline">
          <h1 className="detail-name">{country.name?.common}</h1>
          {country.name?.official && (
            <p className="detail-official">{country.name.official}</p>
          )}
          <div className="detail-badges">
            {country.region && <span className="badge badge-region">{country.region}</span>}
            {country.subregion && <span className="badge badge-subregion">{country.subregion}</span>}
          </div>
          {user && (
            <button
              className={`btn ${fav ? 'btn-warning' : 'btn-ghost'} fav-toggle-btn`}
              onClick={handleFavToggle}
            >
              {fav ? '★ Remove Favorite' : '☆ Add to Favorites'}
            </button>
          )}
        </div>
      </div>

      {country.latlng && (
        <div className="detail-globe-wrap">
          <CountryGlobe countries={[country]} height={360} />
        </div>
      )}

      <div className="detail-grid">
        <div className="detail-card">
          <div className="detail-card-title"><span>🏛️</span> General Info</div>
          <div className="detail-rows">
            <div className="detail-row"><span>Capital</span><strong>{getCapital(country.capital)}</strong></div>
            <div className="detail-row"><span>Population</span><strong>{formatPopulation(country.population)}</strong></div>
            <div className="detail-row"><span>Area</span><strong>{formatArea(country.area)}</strong></div>
            <div className="detail-row"><span>Continent</span><strong>{country.continents?.join(', ') || 'N/A'}</strong></div>
            <div className="detail-row"><span>Top-Level Domain</span><strong>{country.tld?.join(', ') || 'N/A'}</strong></div>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-card-title"><span>💬</span> Culture</div>
          <div className="detail-rows">
            <div className="detail-row"><span>Languages</span><strong>{getLanguages(country.languages)}</strong></div>
            <div className="detail-row"><span>Currencies</span><strong>{getCurrencies(country.currencies)}</strong></div>
            <div className="detail-row"><span>Timezones</span><strong>{country.timezones?.slice(0, 3).join(', ')}{country.timezones?.length > 3 ? '…' : ''}</strong></div>
          </div>
        </div>

        {country.borders && country.borders.length > 0 && (
          <div className="detail-card detail-card-wide">
            <div className="detail-card-title"><span>🗺️</span> Bordering Countries</div>
            <div className="border-tags">
              {country.borders.map(b => (
                <span key={b} className="border-tag">{b}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
