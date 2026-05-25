const styles = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    paddingBottom: '16px',
  },
  sectionTitle: {
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 600,
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    paddingLeft: '4px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
    gap: '14px',
  },
  card: {
    padding: '22px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    cursor: 'default',
    transition: 'transform 0.22s ease, box-shadow 0.22s ease',
  },
  dayLabel: {
    fontFamily: "'Figtree', sans-serif",
    fontSize: '0.82rem',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  dateLabel: {
    fontFamily: "'Figtree', sans-serif",
    fontSize: '0.78rem',
    color: 'rgba(255,255,255,0.4)',
  },
  icon: {
    width: '58px',
    height: '58px',
    filter: 'drop-shadow(0 4px 12px rgba(144,202,249,0.5))',
  },
  desc: {
    fontFamily: "'Figtree', sans-serif",
    fontSize: '0.82rem',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    textTransform: 'capitalize',
    letterSpacing: '0.02em',
  },
  tempRow: {
    display: 'flex',
    gap: '10px',
    alignItems: 'baseline',
    marginTop: '2px',
  },
  high: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#ffffff',
  },
  low: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '1.1rem',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.45)',
  },
  divider: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: '1rem',
  },
  popBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    background: 'rgba(100, 160, 255, 0.18)',
    border: '1px solid rgba(100,160,255,0.25)',
    borderRadius: '99px',
    padding: '3px 10px',
    fontFamily: "'Figtree', sans-serif",
    fontSize: '0.78rem',
    fontWeight: 600,
    color: '#90caf9',
  },
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function getDailyForecasts(list) {
  const days = {}
  list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0]
    if (!days[date]) days[date] = []
    days[date].push(item)
  })
  return Object.entries(days)
    .slice(0, 5)
    .map(([date, items]) => {
      const temps = items.map((i) => i.main.temp)
      const maxTemp = Math.max(...temps)
      const minTemp = Math.min(...temps)
      // Pick noon slot or middle slot for icon & description
      const noon = items.find((i) => i.dt_txt.includes('12:00')) || items[Math.floor(items.length / 2)]
      const pops = items.map((i) => i.pop || 0)
      const maxPop = Math.max(...pops)
      const d = new Date(date)
      return {
        date,
        dayName: DAYS[d.getDay()],
        dateStr: `${d.getDate()} ${MONTHS[d.getMonth()]}`,
        high: Math.round(maxTemp),
        low: Math.round(minTemp),
        icon: noon.weather[0]?.icon,
        description: noon.weather[0]?.description,
        pop: Math.round(maxPop * 100),
      }
    })
}

function ForecastSection({ forecast, unitSymbol }) {
  const days = getDailyForecasts(forecast.list)

  return (
    <div style={styles.section}>
      <p style={styles.sectionTitle}>5-Day Forecast</p>
      <div style={styles.grid}>
        {days.map((day, i) => (
          <div
            key={day.date}
            className="glass"
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow =
                '0 14px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.28)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = ''
            }}
          >
            <span style={styles.dayLabel}>
              {i === 0 ? 'Today' : day.dayName.slice(0, 3)}
            </span>
            <span style={styles.dateLabel}>{day.dateStr}</span>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
              style={styles.icon}
            />
            <span style={styles.desc}>{day.description}</span>
            <div style={styles.tempRow}>
              <span style={styles.high}>{day.high}{unitSymbol}</span>
              <span style={styles.divider}>/</span>
              <span style={styles.low}>{day.low}{unitSymbol}</span>
            </div>
            {day.pop > 0 && (
              <div style={styles.popBadge}>
                <span>💧</span> {day.pop}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ForecastSection
