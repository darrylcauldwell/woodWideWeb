import { AnimatedCounter } from './AnimatedCounter'

export function Section4_MotherTrees() {
  return (
    <section style={sectionStyle}>
      <div style={contentStyle}>
        <h2 style={headingStyle}>Mother Trees</h2>

        <p style={paragraphStyle}>
          Not all trees are equal in the network. The oldest, largest trees —
          <strong style={{ color: '#FFB800' }}> mother trees </strong> —
          sit at the centre of the web, connected to hundreds of neighbours.
        </p>

        <div style={highlight}>
          <AnimatedCounter end={47} />
          <p style={statLabel}>
            other trees connected to a single mother tree in a 30×30m plot
          </p>
        </div>

        <p style={paragraphStyle}>
          Mother trees recognise their own seedlings and send them extra carbon
          through the network — up to <strong>4× more</strong> than to strangers.
          When a mother tree is dying, she dumps her remaining carbon reserves into
          the network — a final gift to the forest.
        </p>

        <p style={{ ...paragraphStyle, fontStyle: 'italic', color: '#A09880' }}>
          "A forest is not a collection of trees. It is a superorganism."
          <br />
          <span style={{ fontSize: '0.9rem' }}>— Suzanne Simard</span>
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
  maxWidth: '600px',
  textAlign: 'center',
}

const headingStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: 300,
  marginBottom: '1.5rem',
}

const paragraphStyle: React.CSSProperties = {
  fontSize: '1.15rem',
  lineHeight: 1.7,
  color: '#F5F0E8',
  marginBottom: '1.5rem',
}

const highlight: React.CSSProperties = {
  background: 'rgba(255, 184, 0, 0.06)',
  border: '1px solid rgba(255, 184, 0, 0.15)',
  borderRadius: '12px',
  padding: '2rem',
  margin: '2rem 0',
}

const statLabel: React.CSSProperties = {
  color: '#A09880',
  fontSize: '1rem',
  marginTop: '0.5rem',
}
