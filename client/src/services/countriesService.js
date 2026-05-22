import axios from 'axios';

const BASE = import.meta.env.VITE_COUNTRIES_API || 'https://restcountries.com/v3.1';

// /all endpoint has a 10-field limit — use only what cards need
const LIST_FIELDS = 'name,cca3,flags,population,region,subregion,capital,languages,currencies,area';
// Single-country endpoints have no such limit
const DETAIL_FIELDS = 'name,cca3,flags,population,region,subregion,capital,languages,currencies,area,borders,timezones,continents,tld';

// GET /v3.1/all - Fetch all countries (core fields for listing)
export const getAllCountries = async () => {
  const res = await axios.get(`${BASE}/all?fields=${LIST_FIELDS}`);
  return res.data;
};

// GET /v3.1/name/:name - Search by country name
export const searchByName = async (name) => {
  const res = await axios.get(`${BASE}/name/${encodeURIComponent(name)}?fields=${LIST_FIELDS}`);
  return res.data;
};

// GET /v3.1/region/:region - Filter by region
export const getByRegion = async (region) => {
  const res = await axios.get(`${BASE}/region/${encodeURIComponent(region)}?fields=${LIST_FIELDS}`);
  return res.data;
};

// GET /v3.1/alpha/:code - Get single country full detail
export const getByCode = async (code) => {
  const res = await axios.get(`${BASE}/alpha/${code}?fields=${DETAIL_FIELDS}`);
  return Array.isArray(res.data) ? res.data[0] : res.data;
};

export const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
