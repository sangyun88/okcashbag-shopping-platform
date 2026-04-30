import { useState, useEffect } from 'react';
import { T } from '../../tokens';

const QUICK_LINKS = [
  { label: '공동구매', emoji: '🤝' },
  { label: '오늘특가', emoji: '⚡' },
  { label: 'e쿠폰', emoji: '🎫' },
  { label: '영화티켓', emoji: '🎬' },
  { label: '식품', emoji: '🥗' },
  { label: '뷰티', emoji: '💄' },
];

const DEALS = [
  { id: 1, label: '뷰티', name: '더후 천기단\n화현 에센스', price: '54,000원', orig: '89,000원', off: '39%', color: 'linear-gradient(140deg,#2c1654,#6a3c87)', emoji: '✨' },
  { id: 2, label: '식품', name: '곰곰 한우\n국거리 세트', price: '38,900원', orig: '59,000원', off: '34%', color: 'linear-gradient(140deg,#7b2d00,#c04a00)', emoji: '🥩' },
  { id: 3, label: '가전', name: '다이슨 V15\n무선청소기', price: '549,000원', orig: '899,000원', off: '39%', color: 'linear-gradient(140deg,#1a1a2e,#16213e)', emoji: '💨' },
  { id: 4, label: '패션', name: '나이키 에어포스1\n로우 화이트', price: '89,000원', orig: '139,000원', off: '36%', color: 'linear-gradient(140deg,#1e3c72,#2a5298)', emoji: '👟' },
];

const BRANDS = [
  { name: '나이키', emoji: '👟', color: '#F5F5F5' },
  { name: '올리브영', emoji: '🌿', color: '#E8F5E9' },
  { name: '스타벅스', emoji: '☕', color: '#E8F5E9' },
  { name: 'CGV', emoji: '🎬', color: '#FFF3E0' },
  { name: 'LG생활', emoji: '🧴', color: '#E3F2FD' },
  { name: '농심', emoji: '🍜', color: '#FCE4EC' },
];

function Countdown() {
  const [time, setTime] = useState({ h: 5, m: 30, s: 0 });
  useEffect(() => {
    const id = setInterval(() => {
      setTime(t => {
        let { h, m, s } = t;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 5, m: 59, s: 59 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = n => String(n).padStart(2, '0');
  return <span>{pad(time.h)}:{pad(time.m)}:{pad(time.s)}</span>;
}

export default function ScreenTabRecommend() {
  const [bannerIdx, setBannerIdx] = useState(0);

  const BANNERS = [
    {
      grad: 'linear-gradient(135deg, #E61E4D, #D70466)',
      tag: 'OK캐쉬백 PICK',
      title: '지금 모이면\n더 저렴해져요',
      sub: '공동구매 목표 달성 시 최대 25% 추가 할인',
    },
    {
      grad: 'linear-gradient(135deg, #1a1a2e, #302b63)',
      tag: '오늘 하루만',
      title: '특가 딜\n한정수량 특별가',
      sub: '매일 오전 10시 업데이트',
    },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }} className="scrollbar-hide">

      {/* 히어로 배너 */}
      <div style={{ background: T.white, padding: '16px 16px 8px' }}>
        <div style={{
          background: BANNERS[bannerIdx].grad,
          borderRadius: 16, padding: '20px 20px 18px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', right: 20, bottom: -30, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', borderRadius: 9999, padding: '3px 10px', marginBottom: 10 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: T.white, letterSpacing: 0.5 }}>{BANNERS[bannerIdx].tag}</span>
            </div>
            <p style={{ color: T.white, fontSize: 22, fontWeight: 700, lineHeight: 1.3, whiteSpace: 'pre-line', marginBottom: 6, letterSpacing: -0.5 }}>
              {BANNERS[bannerIdx].title}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 400, marginBottom: 16, lineHeight: 1.5 }}>
              {BANNERS[bannerIdx].sub}
            </p>
            <button style={{
              background: T.white, color: T.gray800, border: 'none',
              borderRadius: 10, padding: '9px 18px',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              boxShadow: T.shadowSm,
            }}>지금 확인하기</button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 10 }}>
          {BANNERS.map((_, i) => (
            <button key={i} onClick={() => setBannerIdx(i)} style={{
              width: i === bannerIdx ? 16 : 5, height: 5, borderRadius: 9999,
              background: i === bannerIdx ? T.gray800 : T.gray200,
              border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.2s',
            }} />
          ))}
        </div>
      </div>

      {/* 빠른 메뉴 */}
      <div style={{ background: T.white, padding: '16px 16px 18px', marginTop: 8 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: T.gray800, marginBottom: 14, letterSpacing: -0.3 }}>빠른 메뉴</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {QUICK_LINKS.map(({ label, emoji }) => (
            <button key={label} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 0, fontFamily: 'inherit',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: T.gray50, border: `1px solid ${T.gray100}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>{emoji}</div>
              <span style={{ fontSize: 11, fontWeight: 500, color: T.gray600, whiteSpace: 'nowrap' }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 핫딜 섹션 */}
      <div style={{ background: T.white, padding: '16px', marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: T.gray800, letterSpacing: -0.3 }}>지금 핫딜</p>
            <div style={{
              background: T.brand, borderRadius: 9999, padding: '3px 10px',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: T.white }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: T.white, fontVariantNumeric: 'tabular-nums' }}>
                <Countdown />
              </span>
            </div>
          </div>
          <span style={{ fontSize: 12, color: T.gray400, fontWeight: 500 }}>전체보기</span>
        </div>

        {/* 딜 그리드 — Airbnb Listing Tile */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {DEALS.map(deal => (
            <button key={deal.id} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 0, textAlign: 'left', fontFamily: 'inherit',
            }}>
              <div style={{
                background: deal.color, borderRadius: 14,
                paddingBottom: '70%', position: 'relative', marginBottom: 8,
              }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 42 }}>{deal.emoji}</span>
                </div>
                <div style={{
                  position: 'absolute', top: 8, left: 8,
                  background: T.white, borderRadius: 9999,
                  padding: '2px 7px', boxShadow: '0 1px 3px rgba(0,0,0,0.14)',
                }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: T.gray800 }}>{deal.label}</span>
                </div>
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
              <p style={{ fontSize: 12, color: T.gray400, fontWeight: 500, margin: '0 0 2px' }}>핫딜</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: T.gray800, margin: '0 0 3px', lineHeight: 1.4, whiteSpace: 'pre-line', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{deal.name}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.brand }}>{deal.off}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.gray800 }}>{deal.price}</span>
              </div>
              <span style={{ fontSize: 12, color: T.gray300, textDecoration: 'line-through', fontWeight: 400 }}>{deal.orig}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 15초 숏츠 배너 */}
      <div style={{ margin: '8px 16px', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{
          background: T.gray800, padding: '18px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 700, letterSpacing: 0.5, marginBottom: 4 }}>SHORTS</p>
            <p style={{ color: T.white, fontSize: 16, fontWeight: 700, lineHeight: 1.35, letterSpacing: -0.3 }}>
              15초 구경하고<br />포인트 적립
            </p>
            <button style={{
              marginTop: 10, background: T.brand, border: 'none',
              borderRadius: 9999, padding: '6px 14px',
              fontSize: 12, fontWeight: 600, color: T.white, cursor: 'pointer',
            }}>지금 보기</button>
          </div>
          <div style={{
            width: 70, height: 70, borderRadius: 14,
            background: 'rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34,
          }}>▶</div>
        </div>
      </div>

      {/* 인기 브랜드 */}
      <div style={{ background: T.white, padding: '16px 0 20px', marginTop: 8 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: T.gray800, padding: '0 16px', marginBottom: 12, letterSpacing: -0.3 }}>인기 브랜드</p>
        <div style={{ display: 'flex', gap: 10, padding: '0 16px', overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="scrollbar-hide">
          {BRANDS.map(b => (
            <button key={b.name} style={{
              flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: b.color, border: `1px solid ${T.gray100}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
              }}>{b.emoji}</div>
              <span style={{ fontSize: 11, fontWeight: 500, color: T.gray600, whiteSpace: 'nowrap' }}>{b.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: 16 }} />
    </div>
  );
}
