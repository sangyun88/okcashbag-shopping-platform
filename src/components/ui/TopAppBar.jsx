import { T } from '../../tokens';

export default function TopAppBar({ title, onBack, mode = 'shopping' }) {
  if (onBack) {
    return (
      <div style={{
        height: 48, background: T.white, flexShrink: 0,
        display: 'flex', alignItems: 'center', padding: '0 4px',
        borderBottom: `1px solid ${T.gray100}`,
        position: 'relative', zIndex: 10,
      }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 10px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke={T.gray800} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {title && (
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: T.gray800, letterSpacing: -0.2 }}>{title}</span>
          </div>
        )}
      </div>
    );
  }

  // 메인 쇼핑 앱바
  return (
    <div style={{
      height: 48, background: T.white, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 16px',
      position: 'relative', zIndex: 10,
    }}>
      <span style={{ fontSize: 20, fontWeight: 800, color: T.gray900, letterSpacing: -0.5 }}>쇼핑</span>
      <button style={{
        background: T.gray900, border: 'none', borderRadius: 6, cursor: 'pointer',
        padding: '5px 10px', display: 'flex', alignItems: 'center',
      }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: T.white, letterSpacing: 0.3 }}>MY</span>
      </button>
    </div>
  );
}
