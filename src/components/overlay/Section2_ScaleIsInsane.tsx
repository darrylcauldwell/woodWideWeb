import { AnimatedCounter } from './AnimatedCounter'

export function Section2_ScaleIsInsane() {
  return (
    <section style={sectionStyle}>
      <div style={contentStyle}>
        <h2 style={headingStyle}>The Scale is Insane</h2>

        <div style={statGrid}>
          <div style={statCard}>
            <AnimatedCounter end={200} suffix=" miles" />
            <p style={statLabel}>of fungal threads per teaspoon of forest soil</p>
          </div>

          <div style={statCard}>
            <AnimatedCounter end={500} suffix="M" prefix="" />
            <p style={statLabel}>years old — mycorrhizal networks predate roots</p>
          </div>

          <div style={statCard}>
            <AnimatedCounter end={92} suffix="%" />
            <p style={statLabel}>of all plant species depend on mycorrhizal fungi</p>
          </div>

          <div style={statCard}>
            <AnimatedCounter end={75} suffix="%" />
            <p style={statLabel}>of a forest's trees connected through a single network</p>
          </div>
        </div>

        <p style={{ ...paragraphStyle, marginTop: '2rem' }}>
          If you unravelled the fungal network under a single footstep,
          it would stretch halfway across your city.
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
  maxWidth: '700px',
  textAlign: 'center',
}

const headingStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: 300,
  marginBottom: '2rem',
  letterSpacing: '-0.01em',
}

const statGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '2rem',
}

const statCard: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  borderRadius: '12px',
  padding: '1.5rem',
  border: '1px solid rgba(255,255,255,0.06)',
}

const statLabel: React.CSSProperties = {
  fontSize: '0.95rem',
  color: '#A09880',
  marginTop: '0.5rem',
  lineHeight: 1.5,
}

const paragraphStyle: React.CSSProperties = {
  fontSize: '1.15rem',
  lineHeight: 1.7,
  color: '#A09880',
}
