import { useAppStore } from '../../stores/appStore'
import { NutrientToggles } from './NutrientToggles'
import { SpeedSlider } from './SpeedSlider'

export function InteractiveHUD() {
  const mode = useAppStore((s) => s.mode)
  const setMode = useAppStore((s) => s.setMode)

  if (mode !== 'interactive') return null

  return (
    <div style={hudStyle}>
      <div style={panelStyle}>
        <h3 style={{
          fontSize: '0.9rem',
          fontWeight: 600,
          marginBottom: '1rem',
          color: '#F5F0E8',
        }}>
          Controls
        </h3>

        <NutrientToggles />

        <div style={{ marginTop: '1rem' }}>
          <SpeedSlider />
        </div>

        <div style={{ marginTop: '1.2rem', fontSize: '0.75rem', color: '#A09880' }}>
          <p>Drag to orbit</p>
          <p>Scroll to zoom</p>
          <p>Click a tree for details</p>
        </div>

        <button
          onClick={() => {
            setMode('narrative')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          style={backButton}
        >
          Back to Story
        </button>
      </div>
    </div>
  )
}

const hudStyle: React.CSSProperties = {
  position: 'fixed',
  left: '1.5rem',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
}

const panelStyle: React.CSSProperties = {
  background: 'rgba(20, 18, 14, 0.85)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '12px',
  padding: '1.25rem',
  width: '200px',
  color: '#F5F0E8',
  fontFamily: "'Georgia', serif",
}

const backButton: React.CSSProperties = {
  marginTop: '1rem',
  width: '100%',
  padding: '0.5rem',
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '6px',
  color: '#A09880',
  fontSize: '0.8rem',
  cursor: 'pointer',
  fontFamily: "'Georgia', serif",
  transition: 'all 0.2s ease',
}
