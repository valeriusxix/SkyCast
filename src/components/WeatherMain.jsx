const styles = {
  card: {
    padding: '36px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
    flexWrap: 'wrap',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  location: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  locationText: {
    fontFamily: "'Figtree', sans-serif",
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#ffffff',
    letterSpacing: '0.01em',
  },
  flag: {
    fontSize: '1.3rem',
  },
  dateTime: {
    fontFamily: "'Figtree', sans-serif",
    fontSize: '0.875rem',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.65)',
    letterSpacing: '0.02em',
    fontStyle: 'italic',
  },
  tempRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '4px',
  },
  temp: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '6rem',
    fontWeight: 800,
    color: '#ffffff',
    lineHeight: 1,
    textShadow: '0 4px 24px rgba(0,0,0,0.22)',
    letterSpacing: '-0.02em',
  },
  tempUnit: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '2.2rem',
    fontWeight: 300,
    color: 'rgba(255,255,255,0.75)',
    marginTop: '12px',
  },
  description: {
    fontFamily: "'Figtree', sans-serif",
    fontSize: '1.05rem',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: '0.04em',
    textTransform: 'capitalize',
  },
  highLow: {
    fontFamily: "'Figtree', sans-serif",
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.65)',
    display: 'flex',
    gap: '14px',
  },
  highLowItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  weatherIcon: {
    width: '120px',
    height: '120px',
    filter: 'drop-shadow(0 8px 24px rgba(144,202,249,0.5))',
    animation: 'float 4s ease-in-out infinite',
  },
  sunriseSunset: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  sunItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
  },
  sunEmoji: {
    fontSize: '1rem',
  },
  sunLabel: {
    fontFamily: "'Figtree', sans-serif",
    fontSize: '0.72rem',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  sunTime: {
    fontFamily: "'Figtree', sans-serif",
    fontSize: '0.88rem',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.85)',
  },
}

const floatKeyframes = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
`

function formatTime(unix, timezone) {
  const date = new Date((unix + timezone) * 1000)
  return date.toUTCString().slice(-12, -7)
}

function formatDate() {
  const now = new Date()
  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function round(n) {
  return Math.round(n)
}

function WeatherMain({ weather, unitSymbol }) {
  const { name, sys, main, weather: wArr, wind, timezone } = weather
  const iconCode = wArr[0]?.icon
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`

  return (
    <>
      <style>{floatKeyframes}</style>
      <div className="glass" style={styles.card}>
        {/* Left side */}
        <div style={styles.left}>
          <div style={styles.location}>
            <span style={styles.locationText}>
              {name}, {sys.country}
            </span>
          </div>
          <p style={styles.dateTime}>{formatDate()}</p>

          <div style={styles.tempRow}>
            <span style={styles.temp}>{round(main.temp)}</span>
            <span style={styles.tempUnit}>{unitSymbol}</span>
          </div>

          <p style={styles.description}>{wArr[0]?.description}</p>

          <div style={styles.highLow}>
            <span style={styles.highLowItem}>
              <span>▲</span> {round(main.temp_max)}{unitSymbol}
            </span>
            <span style={styles.highLowItem}>
              <span>▼</span> {round(main.temp_min)}{unitSymbol}
            </span>
          </div>
        </div>

        {/* Right side */}
        <div style={styles.right}>
          <img
            src={iconUrl}
            alt={wArr[0]?.description}
            style={styles.weatherIcon}
          />
          <div style={styles.sunriseSunset}>
            <div style={styles.sunItem}>
              <span style={styles.sunEmoji}>🌅</span>
              <span style={styles.sunLabel}>Sunrise</span>
              <span style={styles.sunTime}>{formatTime(sys.sunrise, timezone)}</span>
            </div>
            <div
              style={{
                width: '1px',
                height: '36px',
                background: 'rgba(255,255,255,0.2)',
              }}
            />
            <div style={styles.sunItem}>
              <span style={styles.sunEmoji}>🌇</span>
              <span style={styles.sunLabel}>Sunset</span>
              <span style={styles.sunTime}>{formatTime(sys.sunset, timezone)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WeatherMain
