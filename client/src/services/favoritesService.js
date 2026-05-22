import axios from 'axios';

const BASE = '/api/favorites';

export const getFavorites = () => axios.get(BASE);

export const addFavorite = (payload) => axios.post(BASE, payload);

export const updateFavorite = (id, note) => axios.patch(`${BASE}/${id}`, { note });

export const deleteFavorite = (id) => axios.delete(`${BASE}/${id}`);
