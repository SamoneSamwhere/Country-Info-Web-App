import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = useCallback(async () => {
    if (!user) { setFavorites([]); return; }
    setLoading(true);
    try {
      const res = await axios.get('/api/favorites');
      setFavorites(res.data.data || []);
    } catch {
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchFavorites(); }, [fetchFavorites]);

  const addFavorite = async (country) => {
    const payload = {
      countryCode: country.cca3,
      countryName: country.name?.common,
      flagUrl: country.flags?.png || country.flags?.svg,
      region: country.region,
      population: country.population,
      capital: country.capital?.[0] || '',
      note: ''
    };
    const res = await axios.post('/api/favorites', payload);
    setFavorites(prev => [...prev, res.data.data]);
    return res.data;
  };

  const removeFavorite = async (id) => {
    await axios.delete(`/api/favorites/${id}`);
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  const updateNote = async (id, note) => {
    const res = await axios.patch(`/api/favorites/${id}`, { note });
    setFavorites(prev => prev.map(f => f.id === id ? res.data.data : f));
    return res.data;
  };

  const isFavorite = (countryCode) => favorites.some(f => f.countryCode === countryCode);

  const getFavoriteId = (countryCode) => {
    const fav = favorites.find(f => f.countryCode === countryCode);
    return fav ? fav.id : null;
  };

  return (
    <FavoritesContext.Provider value={{ favorites, loading, addFavorite, removeFavorite, updateNote, isFavorite, getFavoriteId, fetchFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
};
