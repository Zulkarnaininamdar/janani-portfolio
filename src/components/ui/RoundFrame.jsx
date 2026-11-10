export default function RoundFrame({ src, alt, size = 200 }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <div style={{
        position: 'absolute', inset: -12,
        borderRadius: '50%', border: '1px solid var(--gold)', opacity: 0.35,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', inset: -6,
        borderRadius: '50%', border: '2px solid var(--gold)', opacity: 0.7,
        pointerEvents: 'none'
      }} />
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%', height: '100%',
          borderRadius: '50%',
          objectFit: 'cover'
        }}
      />
    </div>
  )
}
