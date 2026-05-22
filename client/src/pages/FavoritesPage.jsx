import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { formatPopulation } from '../utils/formatters';
import './FavoritesPage.css';

export default function FavoritesPage() {
  const { favorites, loading, removeFavorite, updateNote } = useFavorites();
  const [editId, setEditId] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [saving, setSaving] = useState(false);

  const startEdit = (fav) => {
    setEditId(fav.id);
    setNoteText(fav.note || '');
  };

  const saveNote = async (id) => {
    setSaving(true);
    try {
      await updateNote(id, noteText);
      setEditId(null);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (id) => {
    if (window.confirm('Remove this country from favorites?')) {
      await removeFavorite(id);
    }
  };

  if (loading) return <div className="spinner" />;

  return (
    <div className="favorites-page container">
      <div className="fav-header">
        <div>
          <h1>My Favorites</h1>
          <p>{favorites.length} saved {favorites.length === 1 ? 'country' : 'countries'}</p>
        </div>
        <Link to="/explore" className="btn btn-ghost">+ Add More</Link>
      </div>

      {favorites.length === 0 ? (
        <div className="fav-empty">
          <span>★</span>
          <h3>No favorites yet</h3>
          <p>Browse countries and click the star icon to save them here.</p>
          <Link to="/explore" className="btn btn-primary">Explore Countries</Link>
        </div>
      ) : (
        <div className="fav-list">
          {favorites.map(fav => (
            <div key={fav.id} className="fav-item card">
              <Link to={`/country/${fav.countryCode}`} className="fav-flag-wrap">
                <img src={fav.flagUrl} alt={fav.countryName} />
              </Link>
              <div className="fav-info">
                <div className="fav-name-row">
                  <Link to={`/country/${fav.countryCode}`} className="fav-name">{fav.countryName}</Link>
                  <span className="badge">{fav.region}</span>
                </div>
                <div className="fav-stats">
                  <span>🏛️ {fav.capital || 'N/A'}</span>
                  <span>👥 {formatPopulation(fav.population)}</span>
                  <span>🔑 {fav.countryCode}</span>
                </div>

                {editId === fav.id ? (
                  <div className="note-edit">
                    <textarea
                      value={noteText}
                      onChange={e => setNoteText(e.target.value)}
                      placeholder="Add a personal note..."
                      rows={2}
                      className="note-input"
                    />
                    <div className="note-edit-actions">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => saveNote(fav.id)}
                        disabled={saving}
                      >
                        {saving ? 'Saving...' : 'Save Note'}
                      </button>
                      <button className="btn btn-ghost btn-sm" onClick={() => setEditId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="note-display" onClick={() => startEdit(fav)}>
                    {fav.note ? (
                      <p className="note-text">📝 {fav.note}</p>
                    ) : (
                      <p className="note-placeholder">+ Add a note...</p>
                    )}
                  </div>
                )}
              </div>
              <div className="fav-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => startEdit(fav)}>✏️ Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleRemove(fav.id)}>🗑 Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
