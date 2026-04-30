import { T } from '../../tokens';

export default function ProgressBar({ current, target, tiers = [], compact = false }) {
  const pct = Math.min((current / target) * 100, 100);
  const currentTier = [...tiers].reverse().find(t => current >= t.qty);
  const nextTier = tiers.find(t => current < t.qty);
  const currentDiscount = currentTier ? currentTier.discount : 0;

  if (compact) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <span style={{ fontSize: 12, color: T.gray400, fontWeight: 400 }}>
            <span style={{ color: T.gray800, fontWeight: 600 }}>{current.toLocaleString()}명</span> 참여
          </span>
          {currentDiscount > 0 && (
            <span style={{ fontSize: 11, fontWeight: 700, color: T.green }}>현재 {currentDiscount}% 적용</span>
          )}
        </div>
        <div style={{ height: 4, background: T.gray100, borderRadius: 9999, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${pct}%`,
            background: T.brand, borderRadius: 9999,
            transition: 'width 0.5s ease',
          }} />
        </div>
        {nextTier && (
          <p style={{ fontSize: 10, color: T.gray400, marginTop: 4, fontWeight: 400 }}>
            목표 {target}명까지 {nextTier.qty - current}명 남음 · {nextTier.discount}% 할인 예정
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* 수치 헤더 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <div>
          <span style={{ fontSize: 21, fontWeight: 700, color: T.gray800 }}>{current.toLocaleString()}</span>
          <span style={{ fontSize: 13, color: T.gray400, fontWeight: 400 }}>/{target.toLocaleString()}명</span>
        </div>
        {currentDiscount > 0 ? (
          <div style={{ background: T.green + '15', borderRadius: 9999, padding: '3px 10px' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: T.green }}>현재 {currentDiscount}% 적용 중</span>
          </div>
        ) : (
          <span style={{ fontSize: 12, fontWeight: 500, color: T.gray400 }}>목표 {target}명</span>
        )}
      </div>

      {/* 프로그레스 바 */}
      <div style={{ height: 8, background: T.gray100, borderRadius: 9999, overflow: 'visible', position: 'relative', marginBottom: 10 }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: T.brandGrad,
          borderRadius: 9999, position: 'relative',
          transition: 'width 0.5s ease',
        }}>
          {pct > 4 && (
            <div style={{
              position: 'absolute', right: 0, top: '50%', transform: 'translate(50%, -50%)',
              width: 14, height: 14, borderRadius: '50%',
              background: T.brand, border: '2px solid #fff',
              boxShadow: T.shadowSm,
            }} />
          )}
        </div>

        {/* 단계 마커 */}
        {tiers.map((tier) => {
          const x = (tier.qty / target) * 100;
          if (x > 100) return null;
          const reached = current >= tier.qty;
          return (
            <div key={tier.qty} style={{
              position: 'absolute', left: `${x}%`, top: '50%',
              transform: 'translate(-50%, -50%)', zIndex: 2,
            }}>
              <div style={{
                width: 12, height: 12, borderRadius: '50%',
                background: reached ? T.brand : T.white,
                border: `2px solid ${reached ? T.brand : T.gray200}`,
              }} />
            </div>
          );
        })}
      </div>

      {/* 단계 칩 — Airbnb pill style */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {tiers.map((tier) => {
          const reached = current >= tier.qty;
          return (
            <div key={tier.qty} style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: reached ? T.gray800 : T.gray50,
              border: `1px solid ${reached ? T.gray800 : T.gray200}`,
              borderRadius: 9999, padding: '3px 10px',
            }}>
              {reached && (
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12L10 17L20 7" stroke={T.white} strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              )}
              <span style={{ fontSize: 11, fontWeight: 600, color: reached ? T.white : T.gray500 }}>
                {tier.label} · {tier.discount}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
