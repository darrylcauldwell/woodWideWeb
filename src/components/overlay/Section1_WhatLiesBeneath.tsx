export function Section1_WhatLiesBeneath() {
  return (
    <section style={sectionStyle}>
      <div style={contentStyle}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          marginBottom: '1.5rem',
          lineHeight: 1.1,
        }}>
          What Lies Beneath
        </h1>
        <p style={paragraphStyle}>
          Beneath every forest is a hidden network more complex than the internet.
          Fungal threads thinner than a human hair weave through the soil, connecting
          tree to tree in an ancient web of mutual exchange.
        </p>
        <p style={{ ...paragraphStyle, color: '#A09880' }}>
          Scientists call it the <em>mycorrhizal network</em>.<br />
          The rest of us call it the <strong>Wood Wide Web</strong>.
        </p>
      </div>
    </section>
  )
}

const sectionStyle: React.CSSProperties = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
}

const contentStyle: React.CSSProperties = {
  maxWidth: '600px',
  textAlign: 'center',
}

const paragraphStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  lineHeight: 1.7,
  color: '#F5F0E8',
  marginBottom: '1rem',
}
