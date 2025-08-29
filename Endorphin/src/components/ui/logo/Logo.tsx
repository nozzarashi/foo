import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to={'/'}>
      <button
        style={{
          background: 'none',
          border: 'none',
          fontFamily: 'Montserrat, Arial, sans-serif',
          fontSize: '24px',
          fontWeight: '700',
          cursor: 'pointer',
          padding: 0,
          letterSpacing: '-1.5px',
        }}
      >
        <span style={{ color: '#9370DB', filter: 'drop-shadow(0 0 4.5px #9370DB)' }}>E</span>
        <span>ndorphine</span>
        <span style={{ color: '#FF1493' }}>.</span>
      </button>
    </Link>
  );
}
