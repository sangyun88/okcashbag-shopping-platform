import { T } from '../../tokens';
import { usePlatformStore } from '../../store/platformStore';

const TABS = [
  {
    key: 'earn', label: '적립',
    icon: (on) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke={on ? T.gray900 : T.gray400} strokeWidth="2" strokeLinecap="round"/>
        <path d="M17 2L22 7L17 12" stroke={on ? T.gray900 : T.gray400} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 7V13L15 15" stroke={on ? T.gray900 : T.gray400} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: 'use', label: '사용',
    icon: (on) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z" stroke={on ? T.gray900 : T.gray400} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke={on ? T.gray900 : T.gray400} strokeWidth="2"/>
        <path d="M16 10C16 12.21 14.21 14 12 14C9.79 14 8 12.21 8 10" stroke={on ? T.gray900 : T.gray400} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: 'home', label: '홈',
    icon: (on) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z" stroke={on ? T.gray900 : T.gray400} strokeWidth="2" strokeLinejoin="round" fill={on ? T.gray900 + '10' : 'none'}/>
      </svg>
    ),
  },
  {
    key: 'shopping', label: '쇼핑',
    icon: (on) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z" stroke={on ? T.gray900 : T.gray400} strokeWidth="2" strokeLinejoin="round" fill={on ? T.gray900 + '10' : 'none'}/>
        <path d="M3 6H21" stroke={on ? T.gray900 : T.gray400} strokeWidth="2"/>
        <path d="M16 10C16 12.21 14.21 14 12 14C9.79 14 8 12.21 8 10" stroke={on ? T.gray900 : T.gray400} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: 'menu', label: '메뉴',
    icon: (on) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke={on ? T.gray900 : T.gray400} strokeWidth="2"/>
        <rect x="13" y="3" width="8" height="8" rx="1.5" stroke={on ? T.gray900 : T.gray400} strokeWidth="2"/>
        <rect x="3" y="13" width="8" height="8" rx="1.5" stroke={on ? T.gray900 : T.gray400} strokeWidth="2"/>
        <rect x="13" y="13" width="8" height="8" rx="1.5" stroke={on ? T.gray900 : T.gray400} strokeWidth="2"/>
      </svg>
    ),
  },
];

export default function BottomNav() {
  const { screen, setScreen } = usePlatformStore();
  const active = ['home', 'shopping', 'earn', 'use', 'menu'].includes(screen)
    ? screen : 'shopping';

  return (
    <div style={{
      height: 56, background: T.white, borderTop: `1px solid ${T.gray100}`,
      display: 'flex', alignItems: 'center', flexShrink: 0,
    }}>
      {TABS.map(({ key, label, icon }) => {
        const on = active === key;
        return (
          <button key={key}
            onClick={() => setScreen(key === 'shopping' ? 'shopping' : key)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0' }}>
            {icon(on)}
            <span style={{ fontSize: 10, fontWeight: on ? 700 : 400, color: on ? T.gray900 : T.gray400 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
