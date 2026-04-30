import { T } from '../../tokens';

const COUPON_CATEGORIES = [
  { key: 'all', label: '전체' },
  { key: 'food', label: '음식' },
  { key: 'cafe', label: '카페' },
  { key: 'beauty', label: '뷰티' },
  { key: 'convenience', label: '편의점' },
  { key: 'culture', label: '문화' },
];

const COUPONS = [
  { id: 1, brand: 'GS25', name: '아이스 아메리카노 1+1', price: 2000, origPrice: 3500, discount: 43, expiry: '~5/31', color: '#1B5E20', emoji: '☕', category: 'convenience' },
  { id: 2, brand: '스타벅스', name: '아이스 그란데 음료 무료', price: 6900, origPrice: 8500, discount: 19, expiry: '~5/15', color: '#00704A', emoji: '🟢', category: 'cafe' },
  { id: 3, brand: 'BBQ', name: '황금올리브치킨 세트', price: 19900, origPrice: 28000, discount: 29, expiry: '~5/20', color: '#FFA000', emoji: '🍗', category: 'food' },
  { id: 4, brand: 'CU', name: '콤보L 1+1 교환권', price: 3500, origPrice: 5500, discount: 36, expiry: '~6/30', color: '#6A1B9A', emoji: '🍕', category: 'convenience' },
  { id: 5, brand: '올리브영', name: '1만원 할인 쿠폰', price: 3000, origPrice: 10000, discount: 70, expiry: '~5/31', color: '#2E7D32', emoji: '💄', category: 'beauty' },
  { id: 6, brand: '메가MGC', name: '아메리카노 TALL 교환권', price: 1500, origPrice: 2500, discount: 40, expiry: '~6/30', color: '#D84315', emoji: '☕', category: 'cafe' },
  { id: 7, brand: '도미노피자', name: '포테이토 L 1판', price: 15900, origPrice: 27000, discount: 41, expiry: '~5/25', color: '#1565C0', emoji: '🍕', category: 'food' },
  { id: 8, brand: 'CGV', name: '일반 영화 1인 관람권', price: 9000, origPrice: 14000, discount: 36, expiry: '~12/31', color: '#B71C1C', emoji: '🎬', category: 'culture' },
];

export default function ScreenTabECoupon() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }} className="scrollbar-hide">

      {/* 상단 배너 */}
      <div style={{ background: 'linear-gradient(135deg,#6A1B9A,#8E24AA)', padding: '16px 16px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: T.white, fontSize: 17, fontWeight: 800, letterSpacing: -0.5, marginBottom: 3 }}>e쿠폰 핫딜 🔥</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>원하는 상품을 더 저렴하게</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '8px 12px', textAlign: 'center' }}>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>최대 할인</p>
            <p style={{ fontSize: 22, fontWeight: 900, color: T.white }}>70%</p>
          </div>
        </div>
      </div>

      {/* 카테고리 */}
      <div style={{ background: T.white, borderBottom: `1px solid ${T.gray100}`, padding: '10px 12px' }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="scrollbar-hide">
          {COUPON_CATEGORIES.map(c => (
            <button key={c.key} style={{
              flexShrink: 0, padding: '5px 14px', borderRadius: 9999,
              background: c.key === 'all' ? T.gray900 : T.gray50,
              border: `1px solid ${c.key === 'all' ? T.gray900 : T.gray200}`,
              fontSize: 12, fontWeight: c.key === 'all' ? 700 : 500,
              color: c.key === 'all' ? T.white : T.gray600,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>{c.label}</button>
          ))}
        </div>
      </div>

      {/* 쿠폰 리스트 */}
      <div style={{ padding: '10px 12px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {COUPONS.map(coupon => (
          <button key={coupon.id} style={{
            background: T.white, borderRadius: 14, border: 'none', cursor: 'pointer',
            boxShadow: T.shadowSm, padding: 0, textAlign: 'left', fontFamily: 'inherit',
            display: 'flex', overflow: 'hidden',
          }}>
            {/* 브랜드 색 사이드 */}
            <div style={{ width: 72, background: coupon.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 32 }}>{coupon.emoji}</span>
            </div>
            {/* 구분선 (점선) */}
            <div style={{ width: 1, background: `repeating-linear-gradient(to bottom, transparent, transparent 4px, ${T.gray100} 4px, ${T.gray100} 8px)` }} />
            {/* 내용 */}
            <div style={{ flex: 1, padding: '12px 12px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 10, color: T.gray400, fontWeight: 600, marginBottom: 2 }}>{coupon.brand} · 유효기간 {coupon.expiry}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: T.gray800, lineHeight: 1.4, marginBottom: 6 }}>{coupon.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: T.brand }}>{coupon.discount}%↓</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: T.gray900 }}>{coupon.price.toLocaleString()}원</span>
                    <span style={{ fontSize: 11, color: T.gray400, textDecoration: 'line-through' }}>{coupon.origPrice.toLocaleString()}</span>
                  </div>
                </div>
                <div style={{ background: T.gray900, borderRadius: 8, padding: '6px 10px', marginLeft: 8, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.white }}>구매</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
