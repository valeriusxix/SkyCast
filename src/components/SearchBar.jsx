import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, onGeolocate }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit(e);
  };

  return (
    <form className="searchBarWrapper" onSubmit={handleSubmit}>
      {/* Search input */}
      <div className="inputWrap">
        <span className="searchIcon">🔍</span>
        <input
          className="searchInput"
          type="text"
          placeholder="Search city or region…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Search button */}
      <button type="submit" className="searchBtn">
        Search
      </button>

      {/* Geolocation button */}
      <button
        type="button"
        className="geoBtn"
        onClick={onGeolocate}
        title="Use my location"
      >
        📍
      </button>
    </form>
  );
}

export default SearchBar;