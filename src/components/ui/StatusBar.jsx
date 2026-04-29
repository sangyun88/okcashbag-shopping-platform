export default function StatusBar() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  return (
    <div style={{
      height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', flexShrink: 0, background: '#fff',
    }}>
      <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>{h}:{m}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="#222">
          <rect x="0" y="4" width="3" height="8" rx="1"/>
          <rect x="4.5" y="2.5" width="3" height="9.5" rx="1"/>
          <rect x="9" y="0.5" width="3" height="11.5" rx="1"/>
          <rect x="13.5" y="0" width="2.5" height="12" rx="1" opacity="0.3"/>
        </svg>
        <svg width="15" height="12" viewBox="0 0 15 12" fill="#222">
          <path d="M7.5 2.5C9.8 2.5 11.8 3.5 13.2 5L14.5 3.7C12.7 1.9 10.2 0.8 7.5 0.8C4.8 0.8 2.3 1.9 0.5 3.7L1.8 5C3.2 3.5 5.2 2.5 7.5 2.5Z" opacity="0.3"/>
          <path d="M7.5 5.5C9 5.5 10.4 6.2 11.3 7.3L12.6 6C11.3 4.6 9.5 3.8 7.5 3.8C5.5 3.8 3.7 4.6 2.4 6L3.7 7.3C4.6 6.2 6 5.5 7.5 5.5Z"/>
          <path d="M7.5 8.5C8.4 8.5 9.2 8.9 9.7 9.6L7.5 12L5.3 9.6C5.8 8.9 6.6 8.5 7.5 8.5Z"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#222" strokeOpacity="0.35"/>
          <rect x="2" y="2" width="16" height="8" rx="2" fill="#222"/>
          <path d="M23 4.5V7.5C23.8 7.2 24.5 6.5 24.5 6C24.5 5.5 23.8 4.8 23 4.5Z" fill="#222" fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}
