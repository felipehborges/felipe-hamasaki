export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="-z-10 pointer-events-none fixed inset-0 opacity-[0.05] mix-blend-overlay"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, color-mix(in oklch, var(--text) 40%, transparent) 0px, transparent 1px, transparent 2px)'
      }}
    />
  )
}
