import { T } from '../../tokens';

export default function ProgressBar({ current, target, tiers = [], compact = false }) {
  const pct = Math.min((current / target) * 100, 100);

  const currentTier = [...tiers].reverse().find(t => current >= t.qty);
  const nextTier = tiers.find(t => current < t.qty);
  const currentDiscount = currentTier ? currentTier.discount : 0;

  if (compact) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: T.gray700 }}>
            <span style={{ color: T.brand, fontWeight: 700 }}>{current.toLocaleString()}명</span> 참여 중
          </span>
          {currentDiscount > 0 && (
            <span style={{ fontSize: 11, fontWeight: 700, color: T.green }}>현재 {currentDiscount}% 할인 적용</span>
          )}
        </div>
        <div style={{ height: 6, background: T.gray100, borderRadius: 9999, overflow: 'hidden', position: 'relative' }}>
          <div className="progress-bar-fill" style={{
            height: '100%', width: `${pct}%`,
            background: pct >= 80 ? T.brandGrad : `linear-gradient(to right, ${T.brand}, ${T.brandDark})`,
            borderRadius: 9999, transition: 'width 0.5s ease',
          }} />
        </div>
        {nextTier && (
          <p style={{ fontSize: 10, color: T.gray400, marginTop: 3, fontWeight: 500 }}>
            목표 {target}명 달성 시 {nextTier.discount}% 할인 → 앞으로 {nextTier.qty - current}명
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <div>
          <span style={{ fontSize: 22, fontWeight: 800, color: T.brand }}>{current.toLocaleString()}</span>
          <span style={{ fontSize: 14, color: T.gray400, fontWeight: 500 }}>/{target.toLocaleString()}명</span>
        </div>
        {currentDiscount > 0 ? (
          <span style={{ fontSize: 13, fontWeight: 700, color: T.green, background: T.green + '15', padding: '2px 8px', borderRadius: 9999 }}>
            현재 {currentDiscount}% 적용 중
          </span>
        ) : (
          <span style={{ fontSize: 13, fontWeight: 600, color: T.gray400 }}>목표 {target}명</span>
        )}
      </div>

      {/* 메인 바 */}
      <div style={{ height: 10, background: T.gray100, borderRadius: 9999, overflow: 'visible', position: 'relative', marginBottom: 8 }}>
        <div className="progress-bar-fill" style={{
          height: '100%', width: `${pct}%`,
          background: T.brandGrad,
          borderRadius: 9999, position: 'relative', transition: 'width 0.5s ease',
        }}>
          {pct > 5 && (
            <div style={{
              position: 'absolute', right: 0, top: '50%', transform: 'translate(50%, -50%)',
              width: 16, height: 16, borderRadius: '50%', background: T.brand,
              border: '2.5px solid #fff', boxShadow: T.shadowSm,
            }} />
          )}
        </div>

        {/* 단계 마커 */}
        {tiers.map((tier) => {
          const x = (tier.qty / target) * 100;
          if (x > 100) return null;
          const reached = current >= tier.qty;
          return (
            <div key={tier.qty} style={{ position: 'absolute', left: `${x}%`, top: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
              <div style={{
                width: 14, height: 14, borderRadius: '50%',
                background: reached ? T.brand : T.gray200,
                border: `2px solid ${reached ? T.brand : T.gray300}`,
                boxShadow: reached ? `0 0 0 3px ${T.brand}20` : 'none',
              }} />
            </div>
          );
        })}
      </div>

      {/* 단계 라벨 */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {tiers.map((tier) => {
          const reached = current >= tier.qty;
          return (
            <div key={tier.qty} style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: reached ? T.brand + '12' : T.gray50,
              border: `1px solid ${reached ? T.brand + '40' : T.gray100}`,
              borderRadius: 9999, padding: '3px 10px',
            }}>
              {reached && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12L10 17L20 7" stroke={T.brand} strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              )}
              <span style={{ fontSize: 11, fontWeight: 600, color: reached ? T.brand : T.gray500 }}>
                {tier.label} → {tier.discount}% 할인
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
