import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { formatPopulation } from '../utils/formatters';
import './CountryCard.css';

export default function CountryCard({ country }) {
  const { user } = useAuth();
  const { isFavorite, addFavorite, removeFavorite, getFavoriteId } = useFavorites();
  const code = country.cca3;
  const fav  = isFavorite(code);

  const toggle = async (e) => {
    e.preventDefault();
    if (!user) return;
    try { fav ? await removeFavorite(getFavoriteId(code)) : await addFavorite(country); }
    catch {}
  };

  return (
    <Link to={`/country/${code}`} className="cc">
      <div className="cc-flag">
        <img src={country.flags?.png || country.flags?.svg} alt="" loading="lazy" />
        {user && (
          <button className={`cc-fav${fav ? ' active' : ''}`} onClick={toggle}>
            {fav ? '★' : '☆'}
          </button>
        )}
      </div>
      <div className="cc-body">
        <p className="cc-region">{country.region}</p>
        <h3 className="cc-name">{country.name?.common}</h3>
        <div className="cc-meta">
          <span>{country.capital?.[0] || '—'}</span>
          <span className="cc-dot">·</span>
          <span>{formatPopulation(country.population)}</span>
        </div>
      </div>
    </Link>
  );
}
