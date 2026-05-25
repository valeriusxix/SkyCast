import { useState } from 'react'

const headerStyles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: '0 32px',
    height: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(24px) saturate(200%)',
    WebkitBackdropFilter: 'blur(24px) saturate(200%)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.12)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
  },
  logoIcon: {
    fontSize: '1.6rem',
    lineHeight: 1,
  },
  logoText: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 800,
    fontSize: '1.5rem',
    color: '#ffffff',
    letterSpacing: '0.04em',
    textShadow: '0 2px 12px rgba(0,0,0,0.25)',
  },
  logoAccent: {
    color: '#90caf9',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
}

const navLinkStyle = (active) => ({
  fontFamily: "'Figtree', sans-serif",
  fontWeight: active ? 600 : 400,
  fontSize: '0.9rem',
  color: active ? '#ffffff' : 'rgba(255,255,255,0.72)',
  textDecoration: 'none',
  padding: '6px 14px',
  borderRadius: '99px',
  background: active ? 'rgba(255,255,255,0.18)' : 'transparent',
  border: active ? '1px solid rgba(255,255,255,0.28)' : '1px solid transparent',
  cursor: 'pointer',
  transition: 'all 0.22s ease',
  letterSpacing: '0.02em',
})

const unitToggleStyle = (active) => ({
  fontFamily: "'Figtree', sans-serif",
  fontWeight: 600,
  fontSize: '0.85rem',
  padding: '6px 16px',
  borderRadius: '99px',
  border: '1px solid rgba(255,255,255,0.3)',
  background: active ? 'rgba(144,202,249,0.25)' : 'rgba(255,255,255,0.1)',
  color: '#ffffff',
  cursor: 'pointer',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  boxShadow: active
    ? '0 2px 12px rgba(144,202,249,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
    : 'inset 0 1px 0 rgba(255,255,255,0.15)',
  transition: 'all 0.22s ease',
  letterSpacing: '0.03em',
})

const mobileMenuBtnStyle = {
  display: 'none',
  background: 'rgba(255,255,255,0.12)',
  border: '1px solid rgba(255,255,255,0.25)',
  borderRadius: '10px',
  color: '#ffffff',
  padding: '8px 10px',
  cursor: 'pointer',
  fontSize: '1.1rem',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
}

function Header({ unit, unitSymbol, onToggleUnit }) {
  const [activeLink, setActiveLink] = useState('Home')
  const links = ['Home', 'Forecast', 'About']

  return (
    <header style={headerStyles.header}>
      {/* Logo */}
      <a style={headerStyles.logo} href="/">
        <span style={headerStyles.logoIcon}>⛅</span>
        <span style={headerStyles.logoText}>
          Sky<span style={headerStyles.logoAccent}>Cast</span>
        </span>
      </a>

      {/* Nav Links */}
      <nav style={headerStyles.nav}>
        {links.map((link) => (
          <button
            key={link}
            style={navLinkStyle(activeLink === link)}
            onClick={() => setActiveLink(link)}
            onMouseEnter={(e) => {
              if (activeLink !== link) {
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              }
            }}
            onMouseLeave={(e) => {
              if (activeLink !== link) {
                e.currentTarget.style.color = 'rgba(255,255,255,0.72)'
                e.currentTarget.style.background = 'transparent'
              }
            }}
          >
            {link}
          </button>
        ))}
      </nav>

      {/* Unit Toggle */}
      <div style={headerStyles.navRight}>
        <button
          style={unitToggleStyle(true)}
          onClick={onToggleUnit}
          title={`Switch to ${unit === 'metric' ? '°F' : '°C'}`}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(144,202,249,0.35)'
            e.currentTarget.style.transform = 'scale(1.04)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(144,202,249,0.25)'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          {unitSymbol} ⇄ {unit === 'metric' ? '°F' : '°C'}
        </button>
      </div>
    </header>
  )
}

export default Header
