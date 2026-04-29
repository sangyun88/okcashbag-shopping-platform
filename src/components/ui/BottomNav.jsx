import { T } from '../../tokens';
import { usePlatformStore } from '../../store/platformStore';

const TABS = [
  {
    key: 'home', label: '홈',
    icon: (on) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z" stroke={on ? T.brand : T.gray400} strokeWidth="2" strokeLinejoin="round" fill={on ? T.brand + '15' : 'none'}/></svg>,
  },
  {
    key: 'calendar', label: '캘린더',
    icon: (on) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke={on ? T.brand : T.gray400} strokeWidth="2" fill={on ? T.brand + '15' : 'none'}/><path d="M16 2V6M8 2V6M3 10H21" stroke={on ? T.brand : T.gray400} strokeWidth="2" strokeLinecap="round"/></svg>,
  },
  {
    key: 'wishlist', label: '찜',
    icon: (on) => <svg width="22" height="22" viewBox="0 0 24 24" fill={on ? T.brand : 'none'}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={on ? T.brand : T.gray400} strokeWidth="2"/></svg>,
  },
  {
    key: 'sell', label: '판매',
    icon: (on) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke={on ? T.brand : T.gray400} strokeWidth="2" fill={on ? T.brand + '15' : 'none'}/><path d="M12 8V16M8 12H16" stroke={on ? T.brand : T.gray400} strokeWidth="2.5" strokeLinecap="round"/></svg>,
  },
  {
    key: 'my', label: 'MY',
    icon: (on) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={on ? T.brand : T.gray400} strokeWidth="2" fill={on ? T.brand + '15' : 'none'}/><path d="M4 20C4 16.686 7.582 14 12 14C16.418 14 20 16.686 20 20" stroke={on ? T.brand : T.gray400} strokeWidth="2" strokeLinecap="round"/></svg>,
  },
];

export default function BottomNav() {
  const { screen, setScreen } = usePlatformStore();
  const active = ['home', 'calendar', 'wishlist', 'sell', 'my'].includes(screen) ? screen : 'home';

  return (
    <div style={{
      height: 56, background: T.white, borderTop: `1px solid ${T.gray100}`,
      display: 'flex', alignItems: 'center', flexShrink: 0,
    }}>
      {TABS.map(({ key, label, icon }) => {
        const on = active === key;
        return (
          <button key={key} onClick={() => setScreen(key)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 2, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0',
          }}>
            {icon(on)}
            <span style={{ fontSize: 10, fontWeight: on ? 700 : 500, color: on ? T.brand : T.gray400 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
