import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { formatPopulation } from '../utils/formatters';
import './FavoritesPage.css';

export default function FavoritesPage() {
  const { favorites, loading, removeFavorite, updateNote } = useFavorites();
  const [editId,   setEditId]   = useState(null);
  const [noteText, setNoteText] = useState('');
  const [saving,   setSaving]   = useState(false);

  const startEdit = (fav) => { setEditId(fav.id); setNoteText(fav.note || ''); };
  const cancelEdit = () => setEditId(null);

  const saveNote = async (id) => {
    setSaving(true);
    try { await updateNote(id, noteText); setEditId(null); }
    catch {}
    finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (window.confirm('Remove this country from favorites?')) await removeFavorite(id);
  };

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>;

  return (
    <div className="fav-page container">

      <div className="fav-head">
        <div>
          <h1 className="fav-title">My Favorites</h1>
          <p className="fav-meta">{favorites.length} saved {favorites.length === 1 ? 'country' : 'countries'}</p>
        </div>
        <Link to="/explore" className="btn btn-secondary">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Add more
        </Link>
      </div>

      {favorites.length === 0 ? (
        <div className="fav-empty">
          <div className="fav-empty-star">☆</div>
          <h3>No favorites yet</h3>
          <p>Explore countries and tap the star to save them here for quick access.</p>
          <Link to="/explore" className="btn btn-primary">Explore countries</Link>
        </div>
      ) : (
        <div className="fav-list">
          {favorites.map(fav => (
            <div key={fav.id} className="fav-card">
              <Link to={`/country/${fav.countryCode}`} className="fav-flag">
                <img src={fav.flagUrl} alt={fav.countryName} />
              </Link>

              <div className="fav-info">
                <div className="fav-info-top">
                  <Link to={`/country/${fav.countryCode}`} className="fav-name">{fav.countryName}</Link>
                  <span className="badge badge-indigo">{fav.region}</span>
                </div>

                <div className="fav-meta-row">
                  <span>🏛 {fav.capital || '—'}</span>
                  <span>·</span>
                  <span>👥 {formatPopulation(fav.population)}</span>
                  <span>·</span>
                  <span className="fav-code">{fav.countryCode}</span>
                </div>

                {editId === fav.id ? (
                  <div className="fav-note-edit">
                    <textarea
                      value={noteText}
                      onChange={e => setNoteText(e.target.value)}
                      placeholder="Write a note about this country…"
                      rows={2}
                      className="input fav-note-input"
                      autoFocus
                    />
                    <div className="fav-note-actions">
                      <button className="btn btn-primary btn-sm" onClick={() => saveNote(fav.id)} disabled={saving}>
                        {saving ? 'Saving…' : 'Save'}
                      </button>
                      <button className="btn btn-ghost btn-sm" onClick={cancelEdit}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="fav-note-display" onClick={() => startEdit(fav)}>
                    {fav.note
                      ? <span className="fav-note-text">📝 {fav.note}</span>
                      : <span className="fav-note-placeholder">+ Add a note…</span>
                    }
                  </div>
                )}
              </div>

              <div className="fav-actions">
                <button className="fav-action-btn" onClick={() => startEdit(fav)} title="Edit note">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9.5 2.5l2 2-7 7H2.5v-2l7-7z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="fav-action-btn fav-action-danger" onClick={() => remove(fav.id)} title="Remove">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M5 4V2.5h4V4M5.5 6.5v4M8.5 6.5v4M3 4l.75 7.5h6.5L11 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
