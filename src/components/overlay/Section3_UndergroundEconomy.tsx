export function Section3_UndergroundEconomy() {
  return (
    <section style={sectionStyle}>
      <div style={contentStyle}>
        <h2 style={headingStyle}>The Underground Economy</h2>

        <div style={flowDiagram}>
          <div style={flowItem}>
            <div style={{ ...nutrientDot, background: '#F5A623' }} />
            <div>
              <strong style={{ color: '#F5A623' }}>Carbon</strong>
              <p style={flowDesc}>Trees photosynthesise sugar and send it underground — paying the fungi for their services.</p>
            </div>
          </div>

          <div style={flowItem}>
            <div style={{ ...nutrientDot, background: '#9B59F0' }} />
            <div>
              <strong style={{ color: '#9B59F0' }}>Phosphorus</strong>
              <p style={flowDesc}>Fungi mine phosphorus from rock and dead matter — a nutrient trees can't access alone.</p>
            </div>
          </div>

          <div style={flowItem}>
            <div style={{ ...nutrientDot, background: '#4ADE80' }} />
            <div>
              <strong style={{ color: '#4ADE80' }}>Nitrogen</strong>
              <p style={flowDesc}>Decomposed organic matter, unlocked by fungal enzymes and delivered directly to roots.</p>
            </div>
          </div>

          <div style={flowItem}>
            <div style={{ ...nutrientDot, background: '#00D4FF' }} />
            <div>
              <strong style={{ color: '#00D4FF' }}>Water</strong>
              <p style={flowDesc}>Fungal hyphae extend the tree's reach by 100-1000x, tapping water far beyond root range.</p>
            </div>
          </div>
        </div>

        <p style={{ color: '#A09880', marginTop: '2rem', fontSize: '1.1rem', lineHeight: 1.7 }}>
          This isn't charity — it's trade. Trees that receive more phosphorus
          send more carbon to that fungal partner. The fungi are optimising
          their portfolio.
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
  maxWidth: '650px',
}

const headingStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: 300,
  marginBottom: '2rem',
  textAlign: 'center',
}

const flowDiagram: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
}

const flowItem: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1rem',
  background: 'rgba(255,255,255,0.02)',
  padding: '1.2rem',
  borderRadius: '10px',
  border: '1px solid rgba(255,255,255,0.05)',
}

const nutrientDot: React.CSSProperties = {
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  marginTop: '4px',
  flexShrink: 0,
}

const flowDesc: React.CSSProperties = {
  color: '#A09880',
  fontSize: '0.95rem',
  marginTop: '0.3rem',
  lineHeight: 1.6,
}
