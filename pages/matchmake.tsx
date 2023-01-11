export default function Matchmake() {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        height: '100vh',
        position: 'relative',
        width: '100%',
      }}>
      <div
        style={{
          left: '50%',
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%) translateX(-50%)',
          width: 'fit-content',
        }}>
        <h1>Waiting for player...</h1>
      </div>
    </div>
  );
}
