import React, { useState } from 'react';
import './Header.css';

function Header({ unit, unitSymbol, onToggleUnit }) {
  const [activeLink, setActiveLink] = useState('Home');
  const links = ['Home', 'Forecast', 'About'];

  return (
    <header className="header">
      {/* Logo */}
      <a className="logo" href="/">
        <span className="logoIcon">⛅</span>
        <span className="logoText">
          Sky<span className="logoAccent">Cast</span>
        </span>
      </a>

      {/* Nav Links */}
      <nav className="nav">
        {links.map((link) => (
          <button
            key={link}
            className={`navLink ${activeLink === link ? 'active' : ''}`}
            onClick={() => setActiveLink(link)}
          >
            {link}
          </button>
        ))}
      </nav>

      {/* Unit Toggle */}
      <div className="navRight">
        <button
          className="unitToggle"
          onClick={onToggleUnit}
          title={`Switch to ${unit === 'metric' ? '°F' : '°C'}`}
        >
          {unitSymbol} ⇄ {unit === 'metric' ? '°F' : '°C'}
        </button>
      </div>
    </header>
  );
}

export default Header;