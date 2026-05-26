import React from 'react';
import './WeatherMain.css';

function formatTime(unix, timezone) {
  const date = new Date((unix + timezone) * 1000);
  return date.toUTCString().slice(-12, -7);
}

function formatDate() {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function round(n) {
  return Math.round(n);
}

function WeatherMain({ weather, unitSymbol }) {
  const { name, sys, main, weather: wArr, timezone } = weather;
  const iconCode = wArr[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  return (
    <div className="glass weatherMainCard">
      {/* Left side */}
      <div className="left">
        <div className="location">
          <span className="locationText">
            {name}, {sys.country}
          </span>
        </div>
        <p className="dateTime">{formatDate()}</p>

        <div className="tempRow">
          <span className="temp">{round(main.temp)}</span>
          <span className="tempUnit">{unitSymbol}</span>
        </div>

        <p className="description">{wArr[0]?.description}</p>

        <div className="highLow">
          <span className="highLowItem">
            <span>▲</span> {round(main.temp_max)}{unitSymbol}
          </span>
          <span className="highLowItem">
            <span>▼</span> {round(main.temp_min)}{unitSymbol}
          </span>
        </div>
      </div>

      {/* Right side */}
      <div className="right">
        <img
          src={iconUrl}
          alt={wArr[0]?.description}
          className="weatherIcon"
        />
        <div className="sunriseSunset">
          <div className="sunItem">
            <span className="sunEmoji">🌅</span>
            <span className="sunLabel">Sunrise</span>
            <span className="sunTime">{formatTime(sys.sunrise, timezone)}</span>
          </div>
          <div className="sunDivider" />
          <div className="sunItem">
            <span className="sunEmoji">🌇</span>
            <span className="sunLabel">Sunset</span>
            <span className="sunTime">{formatTime(sys.sunset, timezone)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherMain;