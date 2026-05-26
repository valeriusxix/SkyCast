import React from 'react';
import './ForecastSection.css';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getDailyForecasts(list) {
  const days = {};
  list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });
  return Object.entries(days)
    .slice(0, 5)
    .map(([date, items]) => {
      const temps = items.map((i) => i.main.temp);
      const maxTemp = Math.max(...temps);
      const minTemp = Math.min(...temps);
      const noon = items.find((i) => i.dt_txt.includes('12:00')) || items[Math.floor(items.length / 2)];
      const pops = items.map((i) => i.pop || 0);
      const maxPop = Math.max(...pops);
      const d = new Date(date);
      return {
        date,
        dayName: DAYS[d.getDay()],
        dateStr: `${d.getDate()} ${MONTHS[d.getMonth()]}`,
        high: Math.round(maxTemp),
        low: Math.round(minTemp),
        icon: noon.weather[0]?.icon,
        description: noon.weather[0]?.description,
        pop: Math.round(maxPop * 100),
      };
    });
}

function ForecastSection({ forecast, unitSymbol }) {
  const days = getDailyForecasts(forecast.list);

  return (
    <div className="section">
      <p className="sectionTitle">5-Day Forecast</p>
      <div className="grid">
        {days.map((day, i) => (
          <div key={day.date} className="glass card">
            <span className="dayLabel">
              {i === 0 ? 'Today' : day.dayName.slice(0, 3)}
            </span>
            <span className="dateLabel">{day.dateStr}</span>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
              className="icon"
            />
            <span className="desc">{day.description}</span>
            <div className="tempRow">
              <span className="high">{day.high}{unitSymbol}</span>
              <span className="divider">/</span>
              <span className="low">{day.low}{unitSymbol}</span>
            </div>
            {day.pop > 0 && (
              <div className="popBadge">
                <span>💧</span> {day.pop}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastSection;