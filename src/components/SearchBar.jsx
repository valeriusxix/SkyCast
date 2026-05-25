import { useState } from 'react'

const styles = {
  wrapper: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    maxWidth: '640px',
    margin: '0 auto',
  },
  inputWrap: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: '18px',
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.6)',
    pointerEvents: 'none',
    lineHeight: 1,
  },
  input: {
    width: '100%',
    padding: '14px 18px 14px 46px',
    background: 'rgba(255,255,255,0.14)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: '50px',
    color: '#ffffff',
    fontFamily: "'Figtree', sans-serif",
    fontSize: '0.97rem',
    fontWeight: 400,
    outline: 'none',
    transition: 'all 0.22s ease',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
    letterSpacing: '0.01em',
  },
  searchBtn: {
    padding: '14px 26px',
    background: 'rgba(144, 202, 249, 0.3)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    border: '1px solid rgba(144, 202, 249, 0.45)',
    borderRadius: '50px',
    color: '#ffffff',
    fontFamily: "'Figtree', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    letterSpacing: '0.03em',
    boxShadow: '0 4px 20px rgba(100,160,255,0.2), inset 0 1px 0 rgba(255,255,255,0.25)',
    transition: 'all 0.22s ease',
    whiteSpace: 'nowrap',
  },
  geoBtn: {
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.12)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    border: '1px solid rgba(255,255,255,0.22)',
    borderRadius: '50px',
    color: 'rgba(255,255,255,0.85)',
    cursor: 'pointer',
    fontSize: '1.1rem',
    lineHeight: 1,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
    transition: 'all 0.22s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

function SearchBar({ onSearch, onGeolocate }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) onSearch(query.trim())
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit(e)
  }

  return (
    <form style={styles.wrapper} onSubmit={handleSubmit}>
      {/* Search input */}
      <div style={styles.inputWrap}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          style={styles.input}
          type="text"
          placeholder="Search city or region…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
            e.currentTarget.style.boxShadow =
              '0 4px 24px rgba(100,160,255,0.2), inset 0 1px 0 rgba(255,255,255,0.25)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.14)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
            e.currentTarget.style.boxShadow =
              '0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
          }}
        />
      </div>

      {/* Search button */}
      <button
        type="submit"
        style={styles.searchBtn}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(144, 202, 249, 0.45)'
          e.currentTarget.style.transform = 'translateY(-1px)'
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(100,160,255,0.35), inset 0 1px 0 rgba(255,255,255,0.3)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(144, 202, 249, 0.3)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(100,160,255,0.2), inset 0 1px 0 rgba(255,255,255,0.25)'
        }}
      >
        Search
      </button>

      {/* Geolocation button */}
      <button
        type="button"
        style={styles.geoBtn}
        onClick={onGeolocate}
        title="Use my location"
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
          e.currentTarget.style.transform = 'translateY(-1px) scale(1.04)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
          e.currentTarget.style.transform = 'translateY(0) scale(1)'
        }}
      >
        📍
      </button>
    </form>
  )
}

export default SearchBar
