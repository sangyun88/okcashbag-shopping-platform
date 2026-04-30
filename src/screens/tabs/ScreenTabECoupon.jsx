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
  { id: 1, brand: 'GS25', name: '아이스 아메리카노 1+1', price: 2000, origPrice: 3500, discount: 43, expiry: '~5/31', color: '#1B5E20', emoji: '☕' },
  { id: 2, brand: '스타벅스', name: '아이스 그란데 음료 무료', price: 6900, origPrice: 8500, discount: 19, expiry: '~5/15', color: '#00704A', emoji: '🟢' },
  { id: 3, brand: 'BBQ', name: '황금올리브치킨 세트', price: 19900, origPrice: 28000, discount: 29, expiry: '~5/20', color: '#FFA000', emoji: '🍗' },
  { id: 4, brand: 'CU', name: '콤보L 1+1 교환권', price: 3500, origPrice: 5500, discount: 36, expiry: '~6/30', color: '#6A1B9A', emoji: '🍕' },
  { id: 5, brand: '올리브영', name: '1만원 할인 쿠폰', price: 3000, origPrice: 10000, discount: 70, expiry: '~5/31', color: '#2E7D32', emoji: '💄' },
  { id: 6, brand: '메가MGC', name: '아메리카노 TALL 교환권', price: 1500, origPrice: 2500, discount: 40, expiry: '~6/30', color: '#D84315', emoji: '☕' },
  { id: 7, brand: '도미노피자', name: '포테이토 L 1판', price: 15900, origPrice: 27000, discount: 41, expiry: '~5/25', color: '#1565C0', emoji: '🍕' },
  { id: 8, brand: 'CGV', name: '일반 영화 1인 관람권', price: 9000, origPrice: 14000, discount: 36, expiry: '~12/31', color: '#B71C1C', emoji: '🎬' },
];

export default function ScreenTabECoupon() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }} className="scrollbar-hide">

      {/* 헤더 배너 */}
      <div style={{ background: T.white, padding: '16px' }}>
        <div style={{
          background: 'linear-gradient(135deg,#6A1B9A,#8E24AA)',
          borderRadius: 16, padding: '18px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ color: T.white, fontSize: 19, fontWeight: 700, letterSpacing: -0.5, marginBottom: 4 }}>e쿠폰 핫딜 🔥</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 400 }}>원하는 상품을 더 저렴하게</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '8px 14px', textAlign: 'center' }}>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>최대 할인</p>
            <p style={{ fontSize: 24, fontWeight: 700, color: T.white, letterSpacing: -0.5 }}>70%</p>
          </div>
        </div>
      </div>

      {/* 카테고리 필터 — Airbnb pill style */}
      <div style={{ background: T.white, padding: '12px 16px', borderBottom: `1px solid ${T.gray100}`, marginTop: 8 }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="scrollbar-hide">
          {COUPON_CATEGORIES.map((c, i) => (
            <button key={c.key} style={{
              flexShrink: 0, padding: '5px 14px', borderRadius: 9999,
              background: i === 0 ? T.gray800 : T.white,
              border: `1px solid ${i === 0 ? T.gray800 : T.gray200}`,
              fontSize: 12, fontWeight: i === 0 ? 700 : 500,
              color: i === 0 ? T.white : T.gray500,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>{c.label}</button>
          ))}
        </div>
      </div>

      {/* 쿠폰 리스트 */}
      <div style={{ background: T.white, padding: '12px 16px 24px', marginTop: 8, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {COUPONS.map((coupon, idx) => (
          <button key={coupon.id} style={{
            background: T.white,
            borderTop: idx === 0 ? 'none' : `1px solid ${T.gray100}`,
            border: 'none', cursor: 'pointer', padding: '14px 0',
            textAlign: 'left', fontFamily: 'inherit',
            display: 'flex', gap: 12, alignItems: 'center',
          }}>
            {/* 브랜드 아이콘 */}
            <div style={{
              width: 52, height: 52, borderRadius: 12,
              background: coupon.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, fontSize: 24,
            }}>{coupon.emoji}</div>

            {/* 정보 */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 10, color: T.gray400, fontWeight: 500, marginBottom: 2 }}>{coupon.brand} · {coupon.expiry}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: T.gray800, margin: '0 0 5px', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{coupon.name}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.brand }}>{coupon.discount}%</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.gray800 }}>{coupon.price.toLocaleString()}원</span>
                <span style={{ fontSize: 12, color: T.gray300, textDecoration: 'line-through' }}>{coupon.origPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* CTA */}
            <button style={{
              background: T.brandGrad, border: 'none',
              borderRadius: 10, padding: '8px 12px', flexShrink: 0,
              fontSize: 12, fontWeight: 600, color: T.white, cursor: 'pointer',
            }}>구매</button>
          </button>
        ))}
      </div>
    </div>
  );
}
