import React from 'react';
import './WeatherDetails.css';

// Helper functions
function getWindDir(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}

function getVisibility(m) {
  if (m >= 10000) return 'Excellent';
  if (m >= 5000) return 'Good';
  if (m >= 2000) return 'Moderate';
  return 'Poor';
}

// StatCard component (internal)
function StatCard({ icon, iconBg, label, value, subtext, barValue }) {
  return (
    <div className="glass statCard">
      <div className="topRow">
        <div className="iconWrap" style={{ background: iconBg }}>
          {icon}
        </div>
        <span className="statLabel">{label}</span>
      </div>
      <span className="statValue">{value}</span>
      {subtext && <span className="subtext">{subtext}</span>}
      {typeof barValue === 'number' && (
        <div className="barWrap">
          <div className="bar" style={{ width: `${barValue}%` }} />
        </div>
      )}
    </div>
  );
}

function WeatherDetails({ weather, windUnit, unitSymbol }) {
  const { main, wind, clouds, visibility, sys } = weather;

  const feelsLike = Math.round(main.feels_like);
  const humidity = main.humidity;
  const pressure = main.pressure;
  const windSpeed = wind?.speed ?? 0;
  const windDeg = wind?.deg ?? 0;
  const cloudCover = clouds?.all ?? 0;
  const vis = visibility ?? 10000;
  const visKm = (vis / 1000).toFixed(1);

  return (
    <div className="weatherDetailsSection">
      <p className="sectionTitle">Weather Details</p>
      <div className="detailsGrid">
        <StatCard
          icon="🌡️"
          iconBg="rgba(255, 120, 100, 0.22)"
          label="Feels Like"
          value={`${feelsLike}${unitSymbol}`}
          subtext={
            feelsLike < Math.round(main.temp)
              ? 'Feels colder than actual'
              : feelsLike > Math.round(main.temp)
              ? 'Feels warmer than actual'
              : 'Feels about right'
          }
        />

        <StatCard
          icon="💧"
          iconBg="rgba(100, 180, 255, 0.22)"
          label="Humidity"
          value={`${humidity}%`}
          subtext={
            humidity > 80
              ? 'Very humid'
              : humidity > 60
              ? 'Humid'
              : humidity > 40
              ? 'Comfortable'
              : 'Dry'
          }
          barValue={humidity}
        />

        <StatCard
          icon="💨"
          iconBg="rgba(140, 220, 200, 0.22)"
          label="Wind Speed"
          value={`${windSpeed}`}
          subtext={`${windUnit} · ${getWindDir(windDeg)} direction`}
        />

        <StatCard
          icon="🔵"
          iconBg="rgba(144, 202, 249, 0.22)"
          label="Pressure"
          value={`${pressure}`}
          subtext="hPa · Sea level"
        />

        <StatCard
          icon="👁️"
          iconBg="rgba(200, 160, 255, 0.22)"
          label="Visibility"
          value={`${visKm} km`}
          subtext={getVisibility(vis)}
          barValue={Math.min(100, (vis / 10000) * 100)}
        />

        <StatCard
          icon="☁️"
          iconBg="rgba(180, 200, 240, 0.22)"
          label="Cloud Cover"
          value={`${cloudCover}%`}
          subtext={
            cloudCover > 80
              ? 'Overcast'
              : cloudCover > 50
              ? 'Mostly cloudy'
              : cloudCover > 20
              ? 'Partly cloudy'
              : 'Clear skies'
          }
          barValue={cloudCover}
        />
      </div>
    </div>
  );
}

export default WeatherDetails;