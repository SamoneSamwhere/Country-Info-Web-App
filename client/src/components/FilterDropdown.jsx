import { REGIONS } from '../services/countriesService';
import './FilterDropdown.css';

export default function FilterDropdown({ value, onChange }) {
  return (
    <div className="filter-dropdown">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="filter-select"
      >
        <option value="">All Regions</option>
        {REGIONS.map(r => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      <span className="filter-arrow">▾</span>
    </div>
  );
}
