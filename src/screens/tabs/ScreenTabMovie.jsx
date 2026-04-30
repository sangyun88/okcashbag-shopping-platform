import { T } from '../../tokens';

const MOVIES = [
  { id: 1, title: '어벤져스: 둠스데이', genre: '액션·SF', rating: '12세', score: 9.2, price: 10000, origPrice: 14000, discount: 29, color: 'linear-gradient(160deg,#0f0c29,#302b63)', emoji: '🦸', hot: true },
  { id: 2, title: '극한직업 2', genre: '코미디', rating: '15세', score: 9.5, price: 9000, origPrice: 14000, discount: 36, color: 'linear-gradient(160deg,#f7971e,#ffd200)', emoji: '🍗', hot: false },
  { id: 3, title: '범죄도시 5', genre: '액션·범죄', rating: '청불', score: 9.3, price: 10000, origPrice: 14000, discount: 29, color: 'linear-gradient(160deg,#200122,#6f0000)', emoji: '👊', hot: true },
  { id: 4, title: '인터스텔라 재개봉', genre: 'SF·드라마', rating: '12세', score: 9.8, price: 8000, origPrice: 14000, discount: 43, color: 'linear-gradient(160deg,#000428,#004e92)', emoji: '🌌', hot: false },
  { id: 5, title: '파친코 더 무비', genre: '드라마', rating: '12세', score: 8.9, price: 9000, origPrice: 14000, discount: 36, color: 'linear-gradient(160deg,#e96443,#904e95)', emoji: '🌸', hot: false },
];

const THEATERS = ['CGV', '롯데시네마', '메가박스'];

export default function ScreenTabMovie() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }} className="scrollbar-hide">

      {/* 헤더 배너 */}
      <div style={{ background: T.white, padding: '16px' }}>
        <div style={{
          background: 'linear-gradient(135deg,#0f0c29,#302b63)',
          borderRadius: 16, padding: '18px 20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(255,90,95,0.25)', borderRadius: 9999, padding: '3px 10px', marginBottom: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: T.brand, letterSpacing: 0.3 }}>최대 4천원 할인</span>
              </div>
              <p style={{ color: T.white, fontSize: 19, fontWeight: 700, letterSpacing: -0.5, marginBottom: 2 }}>영화티켓 특가</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 400 }}>OK캐쉬백 포인트로 더 저렴하게</p>
            </div>
            <span style={{ fontSize: 36 }}>🎬</span>
          </div>

          {/* 극장 선택 — Airbnb pill 버튼 */}
          <div style={{ display: 'flex', gap: 6 }}>
            {THEATERS.map((t, i) => (
              <button key={t} style={{
                flex: 1, padding: '7px 0', borderRadius: 9999,
                background: i === 0 ? T.white : 'rgba(255,255,255,0.12)',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 12, fontWeight: i === 0 ? 700 : 500,
                color: i === 0 ? T.gray900 : 'rgba(255,255,255,0.7)',
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* 영화 리스트 */}
      <div style={{ background: T.white, padding: '16px', marginTop: 8, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: T.gray800, letterSpacing: -0.3 }}>현재 상영 중</span>
          <span style={{ fontSize: 12, color: T.gray400 }}>전체보기</span>
        </div>

        {MOVIES.map((movie, idx) => (
          <button key={movie.id} style={{
            background: T.white,
            borderTop: idx === 0 ? 'none' : `1px solid ${T.gray100}`,
            border: 'none', cursor: 'pointer', padding: '14px 0',
            textAlign: 'left', fontFamily: 'inherit',
            display: 'flex', gap: 14, alignItems: 'center',
          }}>
            {/* 포스터 — border-radius 10px */}
            <div style={{
              width: 60, height: 80, borderRadius: 10,
              background: movie.color, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              <span style={{ fontSize: 28 }}>{movie.emoji}</span>
              <div style={{
                position: 'absolute', bottom: 4, left: 0, right: 0,
                textAlign: 'center',
              }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{idx + 1}위</span>
              </div>
              {movie.hot && (
                <div style={{
                  position: 'absolute', top: 4, right: 4,
                  background: T.brand, borderRadius: 4, padding: '1px 4px',
                }}>
                  <span style={{ fontSize: 8, fontWeight: 700, color: T.white }}>HOT</span>
                </div>
              )}
            </div>

            {/* 영화 정보 */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: T.gray800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{movie.title}</p>
                <div style={{ background: T.gray100, borderRadius: 5, padding: '2px 5px', flexShrink: 0 }}>
                  <span style={{ fontSize: 9, fontWeight: 600, color: T.gray500 }}>{movie.rating}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: T.gray400 }}>{movie.genre}</span>
                <span style={{ color: T.gray200, fontSize: 10 }}>·</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill={T.brand}>
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                  <span style={{ fontSize: 12, fontWeight: 600, color: T.gray800 }}>{movie.score}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.brand }}>{movie.discount}%</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.gray800 }}>{movie.price.toLocaleString()}원</span>
                <span style={{ fontSize: 12, color: T.gray300, textDecoration: 'line-through' }}>{movie.origPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* CTA 버튼 */}
            <button style={{
              background: T.brandGrad, border: 'none',
              borderRadius: 10, padding: '8px 12px', flexShrink: 0,
              fontSize: 12, fontWeight: 600, color: T.white, cursor: 'pointer',
            }}>구매</button>
          </button>
        ))}
      </div>

      <div style={{ height: 16 }} />
    </div>
  );
}
