import axios from 'axios';

const BASE = import.meta.env.VITE_COUNTRIES_API || 'https://restcountries.com/v3.1';

const FIELDS = 'name,cca3,flags,population,region,capital,languages,currencies,area,borders';

// GET /v3.1/all - Fetch all countries (core fields for listing)
export const getAllCountries = async () => {
  const res = await axios.get(`${BASE}/all?fields=${FIELDS}`);
  return res.data;
};

// GET /v3.1/name/:name - Search by country name
export const searchByName = async (name) => {
  const res = await axios.get(`${BASE}/name/${encodeURIComponent(name)}?fields=${FIELDS}`);
  return res.data;
};

// GET /v3.1/region/:region - Filter by region
export const getByRegion = async (region) => {
  const res = await axios.get(`${BASE}/region/${encodeURIComponent(region)}?fields=${FIELDS}`);
  return res.data;
};

// GET /v3.1/alpha/:code - Get single country full detail (two calls to bypass 10-field limit)
export const getByCode = async (code) => {
  const FIELDS_EXTRA = 'cca3,subregion,continents,timezones,tld';
  const [res1, res2] = await Promise.all([
    axios.get(`${BASE}/alpha/${code}?fields=${FIELDS}`),
    axios.get(`${BASE}/alpha/${code}?fields=${FIELDS_EXTRA}`)
  ]);
  const base = Array.isArray(res1.data) ? res1.data[0] : res1.data;
  const extra = Array.isArray(res2.data) ? res2.data[0] : res2.data;
  return { ...base, ...extra };
};

export const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
