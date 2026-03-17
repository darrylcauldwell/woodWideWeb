import { useAppStore } from '../../stores/appStore'

export function Section5_TransitionCTA() {
  const setMode = useAppStore((s) => s.setMode)

  return (
    <section style={sectionStyle}>
      <div style={contentStyle}>
        <h2 style={headingStyle}>
          Explore the Network
        </h2>
        <p style={paragraphStyle}>
          This visualization maps a real mycorrhizal network studied by
          Beiler et al. — 67 Douglas fir trees connected by 27 fungal
          genets in a 30×30 metre forest plot.
        </p>
        <p style={paragraphStyle}>
          Click below to orbit, zoom, and click individual trees to see
          their connections.
        </p>
        <button
          onClick={() => setMode('interactive')}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 184, 0, 0.2)'
            e.currentTarget.style.borderColor = '#FFB800'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 184, 0, 0.08)'
            e.currentTarget.style.borderColor = 'rgba(255, 184, 0, 0.3)'
          }}
        >
          Enter Interactive Mode
        </button>
        <p style={{
          color: '#A09880',
          fontSize: '0.85rem',
          marginTop: '1.5rem',
        }}>
          Data: Beiler et al. (2010/2015) &middot; Visualization built with Three.js
        </p>
      </div>
    </section>
  )
}

const sectionStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
}

const contentStyle: React.CSSProperties = {
  maxWidth: '550px',
  textAlign: 'center',
}

const headingStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: 300,
  marginBottom: '1.5rem',
}

const paragraphStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  lineHeight: 1.7,
  color: '#A09880',
  marginBottom: '1rem',
}

const buttonStyle: React.CSSProperties = {
  marginTop: '1.5rem',
  padding: '1rem 2.5rem',
  fontSize: '1.1rem',
  fontFamily: "'Georgia', serif",
  color: '#FFB800',
  background: 'rgba(255, 184, 0, 0.08)',
  border: '1px solid rgba(255, 184, 0, 0.3)',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
}
