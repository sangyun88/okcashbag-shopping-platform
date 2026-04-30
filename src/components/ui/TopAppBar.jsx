import { T } from '../../tokens';

export default function TopAppBar({ title, onBack }) {
  if (onBack) {
    return (
      <div style={{
        height: 52, background: T.white, flexShrink: 0,
        display: 'flex', alignItems: 'center', padding: '0 6px',
        borderBottom: `1px solid ${T.gray100}`,
        position: 'relative',
      }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '8px 10px', borderRadius: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke={T.gray800} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

  return (
    <div style={{
      height: 52, background: T.white, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 16px',
      borderBottom: `1px solid ${T.gray100}`,
    }}>
      {/* 로고 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
          <path d="M16 2C9.37 2 4 7.37 4 14c0 5.27 3.27 9.79 7.93 11.63L16 30l4.07-4.37C24.73 23.79 28 19.27 28 14 28 7.37 22.63 2 16 2z" fill={T.brand}/>
          <path d="M16 8c-1.66 0-3 1.34-3 3 0 2.5 3 6 3 6s3-3.5 3-6c0-1.66-1.34-3-3-3z" fill="white"/>
        </svg>
        <span style={{ fontSize: 19, fontWeight: 800, color: T.gray800, letterSpacing: -0.5 }}>쇼핑</span>
      </div>

      {/* MY 버튼 — Airbnb User Menu 스타일 */}
      <button style={{
        display: 'flex', alignItems: 'center', gap: 8,
        border: `1px solid ${T.gray200}`, borderRadius: 9999,
        padding: '5px 8px 5px 12px',
        background: T.white, cursor: 'pointer',
        boxShadow: T.shadowSm,
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16M4 12h16M4 18h16" stroke={T.gray800} strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: T.gray500,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: T.white }}>MY</span>
        </div>
      </button>
    </div>
  );
}
