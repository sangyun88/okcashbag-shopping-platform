import { useState, useEffect, useRef } from 'react';
import { T } from '../../tokens';
import { usePlatformStore } from '../../store/platformStore';

const BANNERS = [
  {
    grad: 'linear-gradient(160deg, #3d1f7a 0%, #5b2d9e 40%, #7c3aed 100%)',
    cardGrad: 'linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)',
    tag: '영화티켓',
    title: '영화 할인,\n따로 찾지 마세요',
    cta: '영화 예매하기',
    cardLabel: '영화할인권',
    cardSub: 'OK CASHBAG',
  },
  {
    grad: 'linear-gradient(160deg, #1a1a2e 0%, #E61E4D 100%)',
    cardGrad: 'linear-gradient(135deg, #E61E4D 0%, #D70466 100%)',
    tag: '공동구매',
    title: '모일수록 더 싸지는\n실패없는 공구',
    cta: '공동구매 보기',
    action: 'groupbuy',
    cardLabel: '공구 LIVE',
    cardSub: '지금 참여하면 할인',
  },
  {
    grad: 'linear-gradient(160deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    cardGrad: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    tag: '오늘특가',
    title: '오늘 하루만!\n특별 할인',
    cta: '특가 보러가기',
    action: 'todaydeal',
    cardLabel: 'TODAY',
    cardSub: '한정수량 특가',
  },
];

const QUICK_LINKS = [
  { icon: '🍦', label: '오늘은 베라데이', color: '#FF6B9D' },
  { icon: '🛍️', label: '오늘 마감 공구', color: '#E61E4D' },
  { icon: '📍', label: '여기서 사면', color: '#7C3AED' },
  { icon: '🎬', label: '영화 4천원 할인', color: '#1D4ED8' },
  { icon: '💰', label: '가격대별 모음', color: '#059669' },
  { icon: '🎁', label: '선물하기', color: '#D97706' },
];

const DEAL_ITEMS = [
  {
    id: 1, name: '스타벅스 아메리카노 T',
    brand: '스타벅스', price: '4,500원', origPrice: '4,900원', disc: '8%',
    grad: 'linear-gradient(135deg,#1a1a2e,#0f3460)',
    timer: true,
  },
  {
    id: 2, name: '치킨 + 사이드 세트',
    brand: '교촌치킨', price: '19,900원', origPrice: '23,000원', disc: '13%',
    grad: 'linear-gradient(135deg,#c0392b,#e74c3c)',
    timer: false, hot: true,
  },
  {
    id: 3, name: '올리브영 수분크림',
    brand: '올리브영', price: '15,900원', origPrice: '21,000원', disc: '24%',
    grad: 'linear-gradient(135deg,#f857a6,#ff5858)',
    timer: false,
  },
  {
    id: 4, name: '파리바게뜨 케이크',
    brand: '파리바게뜨', price: '18,000원', origPrice: '22,000원', disc: '18%',
    grad: 'linear-gradient(135deg,#f9d423,#f83600)',
    timer: false,
  },
];

function Countdown() {
  const [secs, setSecs] = useState(88 * 60 + 88);
  useEffect(() => {
    const id = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return <span style={{ fontFamily: 'monospace', fontWeight: 800, letterSpacing: 1 }}>{pad(h)}:{pad(m)}:{pad(s)}</span>;
}

export default function ScreenTabRecommend() {
  const [bannerIdx, setBannerIdx] = useState(0);
  const { setActiveTab, setScreen } = usePlatformStore();
  const b = BANNERS[bannerIdx];

  function handleBannerCta() {
    if (b.action) setActiveTab(b.action);
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }} className="scrollbar-hide">

      {/* 배너 */}
      <div style={{ background: b.grad, position: 'relative', overflow: 'hidden' }}>
        <div style={{ padding: '28px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* 카드 시각화 */}
          <div style={{
            width: 200, height: 120, borderRadius: 16,
            background: b.cardGrad,
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            padding: '14px 18px', marginBottom: 24, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', margin: 0, fontWeight: 600, letterSpacing: 1 }}>{b.cardSub}</p>
                <p style={{ fontSize: 16, fontWeight: 800, color: T.white, margin: '3px 0 0', letterSpacing: -0.3 }}>{b.cardLabel}</p>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 900, color: T.white }}>OK</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>●●●● ●●●● ●●●● 0000</span>
            </div>
            {/* 장식 원 */}
            <div style={{ position: 'absolute', right: -20, bottom: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ position: 'absolute', right: 10, bottom: -30, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          </div>

          {/* 텍스트 */}
          <p style={{ color: T.white, fontSize: 24, fontWeight: 800, lineHeight: 1.25, whiteSpace: 'pre-line', textAlign: 'center', marginBottom: 8, letterSpacing: -0.6 }}>{b.title}</p>

          {/* CTA 버튼 */}
          <button onClick={handleBannerCta} style={{
            background: T.gray900, color: T.white, border: 'none', borderRadius: 9999,
            padding: '12px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            letterSpacing: -0.2, marginTop: 4,
          }}>{b.cta}</button>
        </div>

        {/* 닷 인디케이터 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 5, paddingBottom: 14 }}>
          {BANNERS.map((_, i) => (
            <button key={i} onClick={() => setBannerIdx(i)} style={{
              width: i === bannerIdx ? 16 : 6, height: 6, borderRadius: 3,
              background: i === bannerIdx ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
              border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.2s',
            }} />
          ))}
        </div>
      </div>

      {/* 퀵링크 칩 */}
      <div style={{ background: T.white, borderBottom: `1px solid ${T.gray100}` }}>
        <div style={{
          display: 'flex', gap: 8, padding: '12px 14px',
          overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none',
        }} className="scrollbar-hide">
          {QUICK_LINKS.map((link) => (
            <button key={link.label} style={{
              flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6,
              background: T.white, border: `1px solid ${T.gray100}`,
              borderRadius: 9999, padding: '7px 12px',
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: T.shadowSm,
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                background: link.color + '18',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
              }}>{link.icon}</div>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.gray700, whiteSpace: 'nowrap' }}>{link.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 할인공구 + 상품 카드 */}
      <div style={{ background: T.white, marginTop: 8, padding: '14px 14px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ background: T.brand, borderRadius: 6, padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.white }}>할인공구</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.gray800 }}>
              <Countdown />
            </span>
          </div>
          <button onClick={() => setActiveTab('groupbuy')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
            <span style={{ fontSize: 12, color: T.gray400, fontWeight: 500, textDecoration: 'underline' }}>전체보기</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke={T.gray400} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* 2열 그리드 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {DEAL_ITEMS.map((item) => (
            <button key={item.id} style={{
              background: T.white, border: `1px solid ${T.gray100}`, borderRadius: 14,
              overflow: 'hidden', padding: 0, textAlign: 'left', cursor: 'pointer',
              boxShadow: T.shadowMd,
            }}>
              {/* 이미지 영역 */}
              <div style={{ height: 110, background: item.grad, position: 'relative' }}>
                {/* 할인율 */}
                <div style={{ position: 'absolute', top: 8, left: 8, background: T.brand, borderRadius: 9999, padding: '2px 7px' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: T.white }}>{item.disc} OFF</span>
                </div>
                {item.hot && (
                  <div style={{ position: 'absolute', top: 8, right: 8, background: '#F97316', borderRadius: 9999, padding: '2px 7px' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: T.white }}>HOT</span>
                  </div>
                )}
              </div>

              {/* 내용 */}
              <div style={{ padding: '9px 10px 11px' }}>
                <p style={{ fontSize: 10, color: T.gray400, fontWeight: 500, margin: 0 }}>{item.brand}</p>
                <p style={{ fontSize: 12, fontWeight: 600, color: T.gray800, margin: '2px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', letterSpacing: -0.2 }}>{item.name}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: T.brand, letterSpacing: -0.3 }}>{item.price}</span>
                  <span style={{ fontSize: 11, color: T.gray300, textDecoration: 'line-through' }}>{item.origPrice}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* 15초 구경하고 적립 배너 */}
        <button
          onClick={() => setScreen('shorts')}
          style={{
            width: '100%', marginTop: 10, marginBottom: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.85), rgba(30,20,60,0.9))',
            borderRadius: 12, border: 'none', cursor: 'pointer',
            padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontFamily: 'inherit',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: T.brand, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 900, color: T.white }}>P</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.white, letterSpacing: -0.2 }}>15초 구경하고 적립</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 9999, padding: '4px 10px' }}>
            <span style={{ fontSize: 12, color: T.white, fontWeight: 600 }}>바로가기</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke={T.white} strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
        </button>
      </div>

      {/* 추가 추천 섹션 */}
      <div style={{ background: T.white, marginTop: 8, padding: '14px 14px 24px' }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: T.gray800, marginBottom: 12, letterSpacing: -0.3 }}>이번 주 인기 브랜드</p>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="scrollbar-hide">
          {[
            { name: '스타벅스', grad: 'linear-gradient(135deg,#1a1a2e,#0f3460)', emoji: '☕' },
            { name: '올리브영', grad: 'linear-gradient(135deg,#f857a6,#ff5858)', emoji: '💄' },
            { name: '교촌치킨', grad: 'linear-gradient(135deg,#c0392b,#e74c3c)', emoji: '🍗' },
            { name: '배스킨라빈스', grad: 'linear-gradient(135deg,#a8edea,#fed6e3)', emoji: '🍦' },
            { name: 'CGV', grad: 'linear-gradient(135deg,#3d1f7a,#7c3aed)', emoji: '🎬' },
          ].map((brand) => (
            <button key={brand.name} style={{
              flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16, background: brand.grad,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                boxShadow: T.shadowMd,
              }}>{brand.emoji}</div>
              <span style={{ fontSize: 11, fontWeight: 600, color: T.gray700 }}>{brand.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
