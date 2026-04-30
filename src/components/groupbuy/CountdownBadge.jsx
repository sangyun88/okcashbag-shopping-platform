import { useState, useEffect } from 'react';
import { T } from '../../tokens';

function getRemaining(deadline) {
  const diff = new Date(deadline) - new Date();
  if (diff <= 0) return null;
  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  return { days, hours, mins, total: diff };
}

export default function CountdownBadge({ deadline, status, compact = false }) {
  const [rem, setRem] = useState(() => getRemaining(deadline));

  useEffect(() => {
    const id = setInterval(() => setRem(getRemaining(deadline)), 60000);
    return () => clearInterval(id);
  }, [deadline]);

  // Airbnb Superhost chip style: white bg, pill, small bold text
  const chipStyle = {
    background: T.white, borderRadius: 9999,
    padding: compact ? '2px 7px' : '3px 9px',
    display: 'inline-flex', alignItems: 'center', gap: 4,
    boxShadow: '0 1px 3px rgba(0,0,0,0.14)',
  };

  if (status === 'upcoming') {
    return (
      <div style={chipStyle}>
        <span style={{ fontSize: compact ? 9 : 10, fontWeight: 700, color: T.blue, letterSpacing: 0.1 }}>
          오픈 예정
        </span>
      </div>
    );
  }

  if (!rem) {
    return (
      <div style={{ ...chipStyle, background: T.gray100 }}>
        <span style={{ fontSize: 9, fontWeight: 700, color: T.gray400 }}>마감</span>
      </div>
    );
  }

  const urgent = rem.days === 0;
  const closing = status === 'closing_soon' || rem.days <= 1;
  const color = urgent ? T.statusRed : closing ? T.statusOrange : T.gray800;

  const label = rem.days > 0
    ? `D-${rem.days}`
    : `${rem.hours}h ${rem.mins}m`;

  return (
    <div style={chipStyle}>
      {urgent && (
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: T.statusRed }} />
      )}
      <span style={{ fontSize: compact ? 9 : 10, fontWeight: 700, color, letterSpacing: 0.1 }}>
        {label}
      </span>
    </div>
  );
}
