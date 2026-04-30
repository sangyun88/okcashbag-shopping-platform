import { T } from '../../tokens';

const DEALS = [
  { id: 1, name: '나이키 에어맥스 270', brand: 'NIKE', price: 89000, origPrice: 149000, discount: 40, color: 'linear-gradient(135deg,#1a1a2e,#16213e)', emoji: '👟', urgent: true },
  { id: 2, name: '다이슨 슈퍼소닉 헤어드라이어', brand: 'Dyson', price: 299000, origPrice: 499000, discount: 40, color: 'linear-gradient(135deg,#c94b4b,#4b134f)', emoji: '💨', urgent: false },
  { id: 3, name: '에어팟 프로 2세대', brand: 'Apple', price: 219000, origPrice: 359000, discount: 39, color: 'linear-gradient(135deg,#2c3e50,#3498db)', emoji: '🎧', urgent: true },
  { id: 4, name: '삼성 갤럭시 버즈3 프로', brand: 'Samsung', price: 149000, origPrice: 259000, discount: 43, color: 'linear-gradient(135deg,#134e5e,#71b280)', emoji: '🎵', urgent: false },
  { id: 5, name: '르쿠르제 무쇠냄비 22cm', brand: 'Le Creuset', price: 189000, origPrice: 359000, discount: 47, color: 'linear-gradient(135deg,#e52d27,#b31217)', emoji: '🍲', urgent: false },
  { id: 6, name: '발뮤다 더 토스터 프로', brand: 'Balmuda', price: 279000, origPrice: 399000, discount: 30, color: 'linear-gradient(135deg,#373b44,#4286f4)', emoji: '🍞', urgent: false },
];

export default function ScreenTabTodayDeal() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }} className="scrollbar-hide">

      {/* 헤더 — 깔끔한 흰 배경 섹션 */}
      <div style={{ background: T.white, padding: '16px' }}>
        <div style={{
          background: 'linear-gradient(135deg,#1a1a2e,#16213e)',
          borderRadius: 16, padding: '18px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,90,95,0.25)', borderRadius: 9999, padding: '3px 10px', marginBottom: 8 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: T.brand }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: T.brand, letterSpacing: 0.3 }}>LIVE DEAL</span>
            </div>
            <p style={{ color: T.white, fontSize: 19, fontWeight: 700, lineHeight: 1.3, letterSpacing: -0.5, marginBottom: 2 }}>오늘 하루만!</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 400 }}>한정수량 최대 50% 특가</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 500, marginBottom: 4 }}>종료까지</p>
            <div style={{ background: T.brand, borderRadius: 10, padding: '6px 10px' }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: T.white, letterSpacing: 1, fontVariantNumeric: 'tabular-nums' }}>18:42:07</span>
            </div>
          </div>
        </div>
      </div>

      {/* 딜 그리드 — Airbnb listing tile style */}
      <div style={{ background: T.white, padding: '16px', marginTop: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: T.gray800, letterSpacing: -0.3 }}>오늘의 특가</span>
          <span style={{ fontSize: 12, color: T.gray400 }}>전체보기</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {DEALS.map(deal => (
            <button key={deal.id} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 0, textAlign: 'left', fontFamily: 'inherit',
            }}>
              {/* 이미지 영역 — border-radius 14px */}
              <div style={{
                background: deal.color, borderRadius: 14,
                paddingBottom: '70%', position: 'relative', marginBottom: 8,
              }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 44 }}>{deal.emoji}</span>
                </div>
                {/* Superhost-style chip */}
                {deal.urgent && (
                  <div style={{
                    position: 'absolute', top: 8, left: 8,
                    background: T.white, borderRadius: 9999,
                    padding: '2px 7px', boxShadow: '0 1px 3px rgba(0,0,0,0.14)',
                  }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: T.statusRed }}>마감임박</span>
                  </div>
                )}
                {/* 찜 버튼 */}
                <div style={{
                  position: 'absolute', top: 8, right: 8,
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.28)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={T.white} strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              {/* 텍스트 */}
              <p style={{ fontSize: 12, color: T.gray400, fontWeight: 500, margin: '0 0 2px' }}>{deal.brand}</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: T.gray800, margin: '0 0 4px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{deal.name}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.brand }}>{deal.discount}%</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.gray800 }}>{deal.price.toLocaleString()}원</span>
              </div>
              <span style={{ fontSize: 12, color: T.gray300, textDecoration: 'line-through', fontWeight: 400 }}>{deal.origPrice.toLocaleString()}원</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: 16 }} />
    </div>
  );
}
