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
  scrollWrap: {
    overflowX: 'auto',
    paddingBottom: '6px',
    WebkitOverflowScrolling: 'touch',
  },
  track: {
    display: 'flex',
    gap: '10px',
    minWidth: 'max-content',
    padding: '22px 24px',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    minWidth: '72px',
    padding: '14px 10px',
    borderRadius: '16px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    transition: 'all 0.2s ease',
    cursor: 'default',
    flexShrink: 0,
  },
  itemNow: {
    background: 'rgba(144,202,249,0.25)',
    border: '1px solid rgba(144,202,249,0.4)',
    boxShadow: '0 4px 16px rgba(100,160,255,0.2)',
  },
  timeLabel: {
    fontFamily: "'Figtree', sans-serif",
    fontSize: '0.78rem',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: '0.02em',
  },
  timeLabelNow: {
    color: '#90caf9',
    fontWeight: 700,
  },
  icon: {
    width: '38px',
    height: '38px',
    filter: 'drop-shadow(0 2px 6px rgba(144,202,249,0.4))',
  },
  temp: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '1.05rem',
    fontWeight: 700,
    color: '#ffffff',
  },
  pop: {
    fontFamily: "'Figtree', sans-serif",
    fontSize: '0.72rem',
    color: '#90caf9',
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
  },
}

function formatHour(dtTxt) {
  const date = new Date(dtTxt)
  const h = date.getHours()
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}${ampm}`
}

function isNow(dtTxt) {
  const now = new Date()
  const slot = new Date(dtTxt)
  return Math.abs(now - slot) < 1.5 * 60 * 60 * 1000
}

function HourlyForecast({ forecast, unitSymbol }) {
  // Take first 16 entries (48h in 3h steps)
  const slots = forecast.list.slice(0, 16)

  return (
    <div style={styles.section}>
      <p style={styles.sectionTitle}>Hourly Forecast · 48h</p>
      <div className="glass" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={styles.scrollWrap}>
          <div style={styles.track}>
            {slots.map((slot, i) => {
              const now = isNow(slot.dt_txt)
              const pop = Math.round((slot.pop || 0) * 100)
              const icon = slot.weather[0]?.icon
              return (
                <div
                  key={slot.dt}
                  style={{
                    ...styles.item,
                    ...(now ? styles.itemNow : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (!now) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.14)'
                      e.currentTarget.style.transform = 'translateY(-3px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!now) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }
                  }}
                >
                  <span
                    style={{
                      ...styles.timeLabel,
                      ...(now ? styles.timeLabelNow : {}),
                    }}
                  >
                    {now ? 'Now' : formatHour(slot.dt_txt)}
                  </span>
                  <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={slot.weather[0]?.description}
                    style={styles.icon}
                  />
                  <span style={styles.temp}>
                    {Math.round(slot.main.temp)}{unitSymbol}
                  </span>
                  {pop > 0 && (
                    <span style={styles.pop}>
                      <span>💧</span> {pop}%
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HourlyForecast
