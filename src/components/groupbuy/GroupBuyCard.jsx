import { T } from '../../tokens';
import { usePlatformStore } from '../../store/platformStore';
import { SELLERS } from '../../data/mockData';
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
        background: T.white, border: 'none', borderRadius: 0,
        padding: 0, cursor: 'pointer', textAlign: 'left',
        display: 'flex', flexDirection: 'column', width: '100%',
      }}
    >
      {/* 썸네일 — Airbnb listing tile: border-radius 14px */}
      <div style={{ position: 'relative', paddingBottom: '66%', width: '100%' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: gb.grad, borderRadius: 14, overflow: 'hidden',
        }}>
          {/* 진행률 오버레이 바 */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(0,0,0,0.15)' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: T.white, opacity: 0.9, transition: 'width 0.5s ease' }} />
          </div>

          {/* 찜 버튼 — Airbnb: 28×28, rgba(0,0,0,0.28), circle, top-right */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(gb.id); }}
            style={{
              position: 'absolute', top: 8, right: 8,
              width: 28, height: 28, borderRadius: '50%',
              background: 'rgba(0,0,0,0.28)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={wished ? T.brand : 'none'}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                stroke={wished ? T.brand : T.white} strokeWidth="2"/>
            </svg>
          </button>

          {/* 상태 칩 — Airbnb Superhost chip: white bg, pill, top-left */}
          <div style={{ position: 'absolute', top: 8, left: 8 }}>
            <CountdownBadge deadline={gb.deadline} status={gb.status} compact />
          </div>

          {/* 할인율 칩 */}
          {discountPct > 0 && (
            <div style={{
              position: 'absolute', bottom: 10, left: 8,
              background: T.brand, borderRadius: 9999, padding: '2px 7px',
            }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: T.white, letterSpacing: 0.2 }}>{discountPct}% 할인</span>
            </div>
          )}
        </div>
      </div>

      {/* 텍스트 — Airbnb listing info */}
      <div style={{ paddingTop: 8 }}>
        {/* 셀러 / 부제목: 12px, #717171 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: seller.avatar, flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: T.gray400, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{seller.name}</span>
          {seller.verified && (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z" stroke={T.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12L11 14L15 10" stroke={T.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        {/* 상품명: 13px, #222, font-weight 600 */}
        <p style={{
          fontSize: 13, fontWeight: 600, color: T.gray800, margin: '0 0 3px',
          lineHeight: 1.4, display: '-webkit-box',
          WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{gb.name}</p>

        {/* 참여 현황: 12px, #717171 */}
        <p style={{ fontSize: 12, color: T.gray400, margin: '0 0 4px', fontWeight: 400 }}>
          {gb.current.toLocaleString()}명 참여 중
        </p>

        {/* 가격: 13px, font-weight 700 — Airbnb style */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {discountPct > 0 && (
            <span style={{ fontSize: 13, fontWeight: 700, color: T.brand }}>{discountPct}%</span>
          )}
          <span style={{ fontSize: 13, fontWeight: 700, color: T.gray800 }}>
            {currentPrice.toLocaleString()}원
          </span>
          {discountPct > 0 && (
            <span style={{ fontSize: 12, color: T.gray300, fontWeight: 400, textDecoration: 'line-through' }}>
              {gb.basePrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* 별점: 12px, brand star */}
        {gb.rating && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 3 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill={T.brand}>
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
            <span style={{ fontSize: 12, fontWeight: 600, color: T.gray800 }}>{gb.rating}</span>
            <span style={{ fontSize: 12, color: T.gray400, fontWeight: 400 }}>({gb.reviewCount})</span>
          </div>
        )}
      </div>
    </button>
  );
}
