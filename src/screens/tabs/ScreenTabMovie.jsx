import { T } from '../../tokens';

const MOVIES = [
  { id: 1, title: '어벤져스: 둠스데이', genre: '액션·SF', rating: '12세', score: 9.2, price: 10000, origPrice: 14000, discount: 29, color: 'linear-gradient(160deg,#0f0c29,#302b63,#24243e)', emoji: '🦸', hot: true },
  { id: 2, title: '극한직업 2', genre: '코미디', rating: '15세', score: 9.5, price: 9000, origPrice: 14000, discount: 36, color: 'linear-gradient(160deg,#f7971e,#ffd200)', emoji: '🍗', hot: false },
  { id: 3, title: '범죄도시 5', genre: '액션·범죄', rating: '청불', score: 9.3, price: 10000, origPrice: 14000, discount: 29, color: 'linear-gradient(160deg,#200122,#6f0000)', emoji: '👊', hot: true },
  { id: 4, title: '인터스텔라 재개봉', genre: 'SF·드라마', rating: '12세', score: 9.8, price: 8000, origPrice: 14000, discount: 43, color: 'linear-gradient(160deg,#000428,#004e92)', emoji: '🌌', hot: false },
  { id: 5, title: '파친코 더 무비', genre: '드라마', rating: '12세', score: 8.9, price: 9000, origPrice: 14000, discount: 36, color: 'linear-gradient(160deg,#e96443,#904e95)', emoji: '🌸', hot: false },
];

const THEATERS = ['CGV', '롯데시네마', '메가박스'];

export default function ScreenTabMovie() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }} className="scrollbar-hide">

      {/* 헤더 */}
      <div style={{ background: 'linear-gradient(135deg,#0f0c29,#302b63)', padding: '16px 16px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,90,95,0.25)', borderRadius: 9999, padding: '3px 10px', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.brand }}>최대 4천원 할인</span>
            </div>
            <p style={{ color: T.white, fontSize: 17, fontWeight: 800, letterSpacing: -0.5, marginBottom: 2 }}>영화티켓 특가</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>OK캐쉬백 포인트로 더 저렴하게</p>
          </div>
          <span style={{ fontSize: 40 }}>🎬</span>
        </div>

        {/* 극장 선택 */}
        <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
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

      {/* 영화 리스트 */}
      <div style={{ padding: '12px 12px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {MOVIES.map((movie, idx) => (
          <button key={movie.id} style={{
            background: T.white, borderRadius: 14, border: 'none', cursor: 'pointer',
            boxShadow: T.shadowSm, overflow: 'hidden', padding: 0, textAlign: 'left', fontFamily: 'inherit',
            display: 'flex',
          }}>
            {/* 포스터 */}
            <div style={{ width: 80, background: movie.color, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0 }}>
              <span style={{ fontSize: 36 }}>{movie.emoji}</span>
              {movie.hot && (
                <div style={{ position: 'absolute', top: 6, left: 6, background: T.brand, borderRadius: 5, padding: '2px 5px' }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: T.white }}>HOT</span>
                </div>
              )}
              {/* 순위 */}
              <div style={{ position: 'absolute', bottom: 6, right: 6, background: 'rgba(0,0,0,0.5)', borderRadius: 5, padding: '2px 5px' }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: T.white }}>{idx + 1}위</span>
              </div>
            </div>

            {/* 정보 */}
            <div style={{ flex: 1, padding: '12px 12px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: T.gray800 }}>{movie.title}</p>
                <div style={{ background: T.gray100, borderRadius: 5, padding: '2px 6px', flexShrink: 0, marginLeft: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 600, color: T.gray500 }}>{movie.rating}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: T.gray400 }}>{movie.genre}</span>
                <span style={{ fontSize: 11, color: T.gray300 }}>·</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#FFC107"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
                  <span style={{ fontSize: 11, fontWeight: 600, color: T.gray600 }}>{movie.score}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: T.brand }}>{movie.discount}%</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: T.gray900 }}>{movie.price.toLocaleString()}원</span>
                  <span style={{ fontSize: 11, color: T.gray400, textDecoration: 'line-through' }}>{movie.origPrice.toLocaleString()}</span>
                </div>
                <div style={{ background: T.gray900, borderRadius: 8, padding: '6px 10px' }}>
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
