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

  if (status === 'upcoming') {
    const d = getRemaining(deadline);
    return (
      <div style={{
        background: T.blue + '15', borderRadius: 9999, padding: compact ? '2px 8px' : '4px 10px',
        display: 'inline-flex', alignItems: 'center', gap: 4,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.blue }} />
        <span style={{ fontSize: compact ? 11 : 12, fontWeight: 700, color: T.blue }}>
          {d ? `D-${d.days} 오픈 예정` : '오픈 예정'}
        </span>
      </div>
    );
  }

  if (!rem) {
    return (
      <div style={{ background: T.gray100, borderRadius: 9999, padding: '2px 8px', display: 'inline-flex', alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.gray400 }}>마감</span>
      </div>
    );
  }

  const urgent = rem.days === 0;
  const closing = status === 'closing_soon' || rem.days <= 1;
  const color = urgent ? T.statusRed : closing ? T.statusOrange : T.gray600;
  const bg    = urgent ? T.statusRed + '12' : closing ? T.statusOrange + '12' : T.gray50;

  const label = rem.days > 0
    ? `D-${rem.days}`
    : `${rem.hours}시간 ${rem.mins}분`;

  return (
    <div style={{
      background: bg, borderRadius: 9999, padding: compact ? '2px 8px' : '4px 10px',
      display: 'inline-flex', alignItems: 'center', gap: 4,
    }}>
      {urgent && <div className="animate-pulse-slow" style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />}
      <span style={{ fontSize: compact ? 11 : 12, fontWeight: 700, color }}>
        {closing && rem.days > 0 ? `마감임박 D-${rem.days}` : label}
      </span>
    </div>
  );
}
