import { T } from '../../tokens';

const TABS = [
  { key: 'recommend', label: '추천' },
  { key: 'groupbuy',  label: '공동구매', badge: '실패없는' },
  { key: 'todaydeal', label: '오늘특가' },
  { key: 'ecoupon',   label: 'e쿠폰' },
  { key: 'movie',     label: '영화티켓', arrow: true },
];

export default function ShoppingNavBar({ active, onTab }) {
  return (
    <div style={{
      background: T.white, flexShrink: 0,
      borderBottom: `1px solid ${T.gray100}`,
      overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none',
      display: 'flex', padding: '0 4px',
    }} className="scrollbar-hide">
      {TABS.map((tab) => {
        const on = active === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onTab(tab.key)}
            style={{
              flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer',
              padding: '0 12px', paddingTop: 6, paddingBottom: 0,
              fontFamily: 'inherit',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              borderBottom: on ? `2px solid ${T.gray800}` : '2px solid transparent',
              paddingBottom: 8,
            }}
          >
            {/* 배지 */}
            {tab.badge ? (
              <span style={{
                fontSize: 9, fontWeight: 700, color: T.brand,
                lineHeight: 1.4, marginBottom: 2, whiteSpace: 'nowrap', letterSpacing: 0.2,
              }}>{tab.badge}</span>
            ) : (
              <div style={{ height: 14 }} />
            )}

            {/* 라벨 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <span style={{
                fontSize: 13, fontWeight: on ? 600 : 500,
                color: on ? T.gray800 : T.gray400,
                whiteSpace: 'nowrap', letterSpacing: -0.1,
              }}>{tab.label}</span>
              {tab.arrow && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ marginTop: 1 }}>
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke={on ? T.gray800 : T.gray400} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
