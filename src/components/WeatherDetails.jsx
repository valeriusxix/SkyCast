const styles = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(165px, 1fr))',
    gap: '14px',
  },
  card: {
    padding: '22px 22px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'default',
    transition: 'transform 0.22s ease, box-shadow 0.22s ease',
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
  },
  iconWrap: {
    width: '34px',
    height: '34px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    flexShrink: 0,
  },
  label: {
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 500,
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  value: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: '1.85rem',
    color: '#ffffff',
    lineHeight: 1,
    letterSpacing: '-0.01em',
  },
  subtext: {
    fontFamily: "'Figtree', sans-serif",
    fontSize: '0.78rem',
    color: 'rgba(255,255,255,0.5)',
    fontWeight: 400,
  },
  barWrap: {
    width: '100%',
    height: '4px',
    borderRadius: '99px',
    background: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: '99px',
    background: 'linear-gradient(90deg, #64b5f6, #90caf9)',
    transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)',
  },
}

function getWindDir(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dirs[Math.round(deg / 45) % 8]
}

function getVisibility(m) {
  if (m >= 10000) return 'Excellent'
  if (m >= 5000) return 'Good'
  if (m >= 2000) return 'Moderate'
  return 'Poor'
}

function getAQILabel(aqi) {
  const labels = ['', 'Good', 'Fair', 'Moderate', 'Poor', 'Very Poor']
  return labels[aqi] || '—'
}

function StatCard({ icon, iconBg, label, value, subtext, barValue }) {
  return (
    <div
      className="glass"
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow =
          '0 14px 40px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.28)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = ''
      }}
    >
      <div style={styles.topRow}>
        <div style={{ ...styles.iconWrap, background: iconBg }}>
          {icon}
        </div>
        <span style={styles.label}>{label}</span>
      </div>
      <span style={styles.value}>{value}</span>
      {subtext && <span style={styles.subtext}>{subtext}</span>}
      {typeof barValue === 'number' && (
        <div style={styles.barWrap}>
          <div style={{ ...styles.bar, width: `${barValue}%` }} />
        </div>
      )}
    </div>
  )
}

function WeatherDetails({ weather, windUnit, unitSymbol }) {
  const { main, wind, clouds, visibility, sys } = weather

  const feelsLike = Math.round(main.feels_like)
  const humidity = main.humidity
  const pressure = main.pressure
  const windSpeed = wind?.speed ?? 0
  const windDeg = wind?.deg ?? 0
  const cloudCover = clouds?.all ?? 0
  const vis = visibility ?? 10000
  const visKm = (vis / 1000).toFixed(1)

  return (
    <div style={styles.section}>
      <p style={styles.sectionTitle}>Weather Details</p>
      <div style={styles.grid}>
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
  )
}

export default WeatherDetails
