import React from 'react';
import './HourlyForecast.css';

function formatHour(dtTxt) {
  const date = new Date(dtTxt);
  const h = date.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}${ampm}`;
}

function isNow(dtTxt) {
  const now = new Date();
  const slot = new Date(dtTxt);
  return Math.abs(now - slot) < 1.5 * 60 * 60 * 1000;
}

function HourlyForecast({ forecast, unitSymbol }) {
  const slots = forecast.list.slice(0, 16);

  return (
    <div className="section">
      <p className="sectionTitle">Hourly Forecast · 48h</p>
      <div className="glass hourlyGlassWrapper">
        <div className="scrollWrap">
          <div className="track">
            {slots.map((slot) => {
              const now = isNow(slot.dt_txt);
              const pop = Math.round((slot.pop || 0) * 100);
              const icon = slot.weather[0]?.icon;
              return (
                <div
                  key={slot.dt}
                  className={`item ${now ? 'itemNow' : ''}`}
                >
                  <span className={`timeLabel ${now ? 'timeLabelNow' : ''}`}>
                    {now ? 'Now' : formatHour(slot.dt_txt)}
                  </span>
                  <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={slot.weather[0]?.description}
                    className="icon"
                  />
                  <span className="temp">
                    {Math.round(slot.main.temp)}{unitSymbol}
                  </span>
                  {pop > 0 && (
                    <span className="pop">
                      <span>💧</span> {pop}%
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HourlyForecast;