const styles = {
  card: {
    padding: '28px 32px',
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    background: 'rgba(255, 80, 80, 0.12)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    border: '1px solid rgba(255, 100, 100, 0.25)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(200, 40, 40, 0.1)',
  },
  icon: {
    fontSize: '2rem',
    lineHeight: 1,
    flexShrink: 0,
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  title: {
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 700,
    fontSize: '1rem',
    color: '#ffcdd2',
    letterSpacing: '0.01em',
  },
  message: {
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 400,
    fontSize: '0.88rem',
    color: 'rgba(255, 180, 180, 0.8)',
    textTransform: 'capitalize',
  },
}

function ErrorCard({ message }) {
  return (
    <div style={styles.card}>
      <span style={styles.icon}>⚠️</span>
      <div style={styles.text}>
        <span style={styles.title}>Something went wrong</span>
        <span style={styles.message}>{message}</span>
      </div>
    </div>
  )
}

export default ErrorCard
