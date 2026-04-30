import { T } from '../../tokens';

const DEALS = [
  { id: 1, name: '나이키 에어맥스 270', brand: 'NIKE', price: 89000, origPrice: 149000, discount: 40, color: 'linear-gradient(135deg,#1a1a2e,#16213e)', emoji: '👟', badge: 'D-1', badgeColor: T.brand },
  { id: 2, name: '다이슨 슈퍼소닉 헤어드라이어', brand: 'Dyson', price: 299000, origPrice: 499000, discount: 40, color: 'linear-gradient(135deg,#c94b4b,#4b134f)', emoji: '💨', badge: 'D-2', badgeColor: '#9C27B0' },
  { id: 3, name: '에어팟 프로 2세대', brand: 'Apple', price: 219000, origPrice: 359000, discount: 39, color: 'linear-gradient(135deg,#2c3e50,#3498db)', emoji: '🎧', badge: 'HOT', badgeColor: '#FF6B00' },
  { id: 4, name: '삼성 갤럭시 버즈3 프로', brand: 'Samsung', price: 149000, origPrice: 259000, discount: 43, color: 'linear-gradient(135deg,#134e5e,#71b280)', emoji: '🎵', badge: 'D-3', badgeColor: T.green },
  { id: 5, name: '르쿠르제 무쇠냄비 22cm', brand: 'Le Creuset', price: 189000, origPrice: 359000, discount: 47, color: 'linear-gradient(135deg,#e52d27,#b31217)', emoji: '🍲', badge: 'D-1', badgeColor: T.brand },
  { id: 6, name: '발뮤다 더 토스터 프로', brand: 'Balmuda', price: 279000, origPrice: 399000, discount: 30, color: 'linear-gradient(135deg,#373b44,#4286f4)', emoji: '🍞', badge: 'D-2', badgeColor: '#3B82F6' },
];

const TIMER_LABEL = '18:42:07';

export default function ScreenTabTodayDeal() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }} className="scrollbar-hide">

      {/* 헤더 배너 */}
      <div style={{ background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)', padding: '18px 16px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,90,95,0.2)', borderRadius: 9999, padding: '3px 10px', marginBottom: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.brand }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: T.brand, letterSpacing: 0.5 }}>LIVE DEAL</span>
            </div>
            <p style={{ color: T.white, fontSize: 18, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.3 }}>오늘 하루만!</p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: 500 }}>최대 50% 특가 한정수량</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 500, marginBottom: 4 }}>종료까지</p>
            <div style={{ background: T.brand, borderRadius: 8, padding: '6px 12px' }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: T.white, letterSpacing: 2, fontVariantNumeric: 'tabular-nums' }}>{TIMER_LABEL}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 딜 그리드 */}
      <div style={{ padding: '12px 12px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {DEALS.map(deal => (
            <button key={deal.id} style={{
              background: T.white, borderRadius: 14, border: 'none', cursor: 'pointer',
              boxShadow: T.shadowSm, overflow: 'hidden', textAlign: 'left', padding: 0, fontFamily: 'inherit',
            }}>
              {/* 이미지 영역 */}
              <div style={{ background: deal.color, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <span style={{ fontSize: 44 }}>{deal.emoji}</span>
                <div style={{
                  position: 'absolute', top: 8, right: 8,
                  background: deal.badgeColor, borderRadius: 6, padding: '3px 7px',
                }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: T.white }}>{deal.badge}</span>
                </div>
              </div>
              {/* 정보 */}
              <div style={{ padding: '10px 10px 12px' }}>
                <p style={{ fontSize: 10, color: T.gray400, fontWeight: 600, marginBottom: 2, letterSpacing: 0.3 }}>{deal.brand}</p>
                <p style={{ fontSize: 12, fontWeight: 600, color: T.gray800, lineHeight: 1.4, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{deal.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: T.brand }}>{deal.discount}%</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.gray900 }}>{deal.price.toLocaleString()}원</span>
                </div>
                <p style={{ fontSize: 11, color: T.gray400, fontWeight: 400, textDecoration: 'line-through', marginTop: 1 }}>{deal.origPrice.toLocaleString()}원</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
