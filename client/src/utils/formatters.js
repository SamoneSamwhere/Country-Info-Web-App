export const formatPopulation = (num) => {
  if (!num) return 'N/A';
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num.toLocaleString();
};

export const formatArea = (num) => {
  if (!num) return 'N/A';
  return num.toLocaleString() + ' km²';
};

export const getCurrencies = (currencies) => {
  if (!currencies) return 'N/A';
  return Object.values(currencies)
    .map(c => `${c.name} (${c.symbol || '?'})`)
    .join(', ');
};

export const getLanguages = (languages) => {
  if (!languages) return 'N/A';
  return Object.values(languages).join(', ');
};

export const getCapital = (capital) => {
  if (!capital || capital.length === 0) return 'N/A';
  return capital.join(', ');
};
