import { T } from '../../tokens';
import { usePlatformStore } from '../../store/platformStore';

export default function TopAppBar({ title, onBack, transparent = false, actions }) {
  const myPoints = usePlatformStore(s => s.myPoints);
  const bg = transparent ? 'transparent' : T.white;

  return (
    <div style={{
      height: 48, background: bg, flexShrink: 0,
      display: 'flex', alignItems: 'center', padding: '0 4px',
      borderBottom: transparent ? 'none' : `1px solid ${T.gray100}`,
      position: 'relative', zIndex: 10,
    }}>
      {onBack ? (
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 10px', color: transparent ? T.white : T.gray800 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      ) : (
        <div style={{ paddingLeft: 14, display: 'flex', alignItems: 'center', gap: 3 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: T.brand, letterSpacing: -0.5 }}>OK</span>
          <span style={{ fontSize: 18, fontWeight: 800, color: T.gray800, letterSpacing: -0.5 }}>공구</span>
        </div>
      )}

      {title && (
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: transparent ? T.white : T.gray800, letterSpacing: -0.2 }}>{title}</span>
        </div>
      )}

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 2, paddingRight: 6 }}>
        {actions}
        {!onBack && (
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke={T.gray700} strokeWidth="2"/>
              <path d="M21 21L16.65 16.65" stroke={T.gray700} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
        {!onBack && (
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, position: 'relative' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 8C18 6.4 17.4 4.9 16.2 3.8C15.1 2.6 13.6 2 12 2C10.4 2 8.9 2.6 7.8 3.8C6.6 4.9 6 6.4 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke={T.gray700} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21C13.55 21.3 13.3 21.55 13 21.73C12.7 21.91 12.35 22 12 22C11.65 22 11.3 21.91 11 21.73C10.7 21.55 10.45 21.3 10.27 21" stroke={T.gray700} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, background: T.brand, borderRadius: '50%', border: '1.5px solid #fff' }} />
          </button>
        )}
      </div>
    </div>
  );
}
