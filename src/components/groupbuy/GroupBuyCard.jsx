import { T } from '../../tokens';
import { usePlatformStore } from '../../store/platformStore';
import { SELLERS } from '../../data/mockData';
import ProgressBar from './ProgressBar';
import CountdownBadge from './CountdownBadge';

export default function GroupBuyCard({ gb }) {
  const { setScreen, toggleWishlist, wishlist } = usePlatformStore();
  const seller = SELLERS.find(s => s.id === gb.sellerId);
  const wished = wishlist.includes(gb.id);

  const currentTier = [...gb.tiers].reverse().find(t => gb.current >= t.qty);
  const discountPct = currentTier ? currentTier.discount : 0;
  const currentPrice = Math.round(gb.basePrice * (1 - discountPct / 100));
  const pct = Math.min((gb.current / gb.target) * 100, 100);

  return (
    <button
      onClick={() => setScreen('detail', gb.id)}
      style={{
        background: T.white, border: `1px solid ${T.gray100}`, borderRadius: 16,
        overflow: 'hidden', padding: 0, cursor: 'pointer', textAlign: 'left',
        boxShadow: T.shadowMd, display: 'flex', flexDirection: 'column',
        width: '100%',
      }}
    >
      {/* 썸네일 */}
      <div style={{ position: 'relative', height: 160, background: gb.grad, flexShrink: 0 }}>
        {/* 찜 버튼 */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(gb.id); }}
          style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={wished ? T.brand : 'none'}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={wished ? T.brand : 'rgba(255,255,255,0.9)'} strokeWidth="2"/>
          </svg>
        </button>

        {/* 상태 뱃지 */}
        <div style={{ position: 'absolute', top: 8, left: 8 }}>
          <CountdownBadge deadline={gb.deadline} status={gb.status} compact />
        </div>

        {/* 할인율 */}
        {discountPct > 0 && (
          <div style={{ position: 'absolute', bottom: 8, left: 8, background: T.brand, borderRadius: 9999, padding: '3px 8px' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.white }}>{discountPct}% 할인 중</span>
          </div>
        )}

        {gb.isPreorder && (
          <div style={{ position: 'absolute', bottom: 8, right: 8, background: '#7C3AED', borderRadius: 9999, padding: '3px 8px' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: T.white }}>예약판매</span>
          </div>
        )}

        {/* 프로그레스 오버레이 바 */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'rgba(255,255,255,0.85)', transition: 'width 0.5s ease' }} />
        </div>
      </div>

      {/* 내용 */}
      <div style={{ padding: '10px 12px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {/* 셀러 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: seller.avatar, flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: T.gray500, fontWeight: 500 }}>{seller.name}</span>
          {seller.verified && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill={T.brand}>
              <path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z" stroke={T.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M9 12L11 14L15 10" stroke={T.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        {/* 상품명 */}
        <p style={{ fontSize: 13, fontWeight: 600, color: T.gray800, margin: 0, lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', letterSpacing: -0.2 }}>{gb.name}</p>

        {/* 가격 */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: discountPct > 0 ? T.brand : T.gray800, letterSpacing: -0.4 }}>
            {currentPrice.toLocaleString()}원
          </span>
          {discountPct > 0 && (
            <span style={{ fontSize: 12, color: T.gray300, textDecoration: 'line-through' }}>
              {gb.basePrice.toLocaleString()}원
            </span>
          )}
        </div>

        {/* 진행률 */}
        <ProgressBar current={gb.current} target={gb.target} tiers={gb.tiers} compact />
      </div>
    </button>
  );
}
