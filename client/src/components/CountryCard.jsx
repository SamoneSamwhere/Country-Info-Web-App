import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { formatPopulation } from '../utils/formatters';
import './CountryCard.css';

export default function CountryCard({ country }) {
  const { user } = useAuth();
  const { isFavorite, addFavorite, removeFavorite, getFavoriteId } = useFavorites();
  const code = country.cca3;
  const fav = isFavorite(code);

  const handleFavToggle = async (e) => {
    e.preventDefault();
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
    <Link to={`/country/${code}`} className="country-card card fade-up">
      <div className="card-flag">
        <img
          src={country.flags?.png || country.flags?.svg}
          alt={`Flag of ${country.name?.common}`}
          loading="lazy"
        />
      </div>
      <div className="card-body">
        <div className="card-header-row">
          <h3 className="card-name">{country.name?.common}</h3>
          {user && (
            <button
              className={`fav-btn ${fav ? 'active' : ''}`}
              onClick={handleFavToggle}
              title={fav ? 'Remove from favorites' : 'Add to favorites'}
            >
              {fav ? '★' : '☆'}
            </button>
          )}
        </div>
        <div className="card-meta">
          <span className="badge">{country.region}</span>
        </div>
        <div className="card-stats">
          <div className="stat">
            <span className="stat-label">Population</span>
            <span className="stat-value">{formatPopulation(country.population)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Capital</span>
            <span className="stat-value">{country.capital?.[0] || 'N/A'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
