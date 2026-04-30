import { useState } from 'react';
import { T } from '../tokens';
import { usePlatformStore } from '../store/platformStore';
import { SELLERS } from '../data/mockData';
import ProgressBar from '../components/groupbuy/ProgressBar';
import CountdownBadge from '../components/groupbuy/CountdownBadge';

function fmtNum(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + '만';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return String(n);
}

export default function ScreenGroupBuyDetail() {
  const { selectedId, groupBuys, toggleWishlist, wishlist, joinGroupBuy, setScreen, goBack } = usePlatformStore();
  const gb = groupBuys.find(g => g.id === selectedId);
  const seller = gb ? SELLERS.find(s => s.id === gb.sellerId) : null;
  const [qty, setQty] = useState(1);
  const [joined, setJoined] = useState(false);
  const [tab, setTab] = useState('info');

  if (!gb) return null;

  const wished = wishlist.includes(gb.id);
  const currentTier = [...gb.tiers].reverse().find(t => gb.current >= t.qty);
  const discountPct = currentTier ? currentTier.discount : 0;
  const currentPrice = Math.round(gb.basePrice * (1 - discountPct / 100));
  const totalPrice = currentPrice * qty;

  const REVIEWS = [
    { nick: '구매자***', rating: 5, text: '퀄리티 대박이에요! 공구가로 이 퀄리티면 무조건 재구매!', time: '3일 전' },
    { nick: '절약러***', rating: 4, text: '배송도 빠르고 제품 상태 완벽해요. 셀러분 친절하심', time: '1주 전' },
    { nick: '공구마니아***', rating: 5, text: '목표 달성해서 추가 할인까지 받았어요 ㅎㅎ 감사합니다', time: '2주 전' },
  ];

  function handleJoin() {
    joinGroupBuy(gb.id);
    setJoined(true);
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', background: T.white }} className="scrollbar-hide">

        {/* 히어로 이미지 */}
        <div style={{ height: 260, background: gb.grad, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 12, left: 12 }}>
            <CountdownBadge deadline={gb.deadline} status={gb.status} />
          </div>
          {/* 찜 버튼 — Airbnb: 28×28, rgba overlay, circle */}
          <button
            onClick={() => toggleWishlist(gb.id)}
            style={{
              position: 'absolute', top: 12, right: 12,
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(0,0,0,0.28)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={wished ? T.brand : 'none'}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                stroke={wished ? T.brand : T.white} strokeWidth="2"/>
            </svg>
          </button>
          {/* 공유 버튼 */}
          <button style={{
            position: 'absolute', top: 12, right: 58,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(0,0,0,0.28)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="18" cy="5" r="3" stroke={T.white} strokeWidth="2"/>
              <circle cx="6" cy="12" r="3" stroke={T.white} strokeWidth="2"/>
              <circle cx="18" cy="19" r="3" stroke={T.white} strokeWidth="2"/>
              <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke={T.white} strokeWidth="2"/>
            </svg>
          </button>
          {gb.isPreorder && (
            <div style={{ position: 'absolute', bottom: 12, left: 12, background: '#7C3AED', borderRadius: 9999, padding: '4px 10px' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.white }}>예약판매 · 목표 달성 시 생산</span>
            </div>
          )}
        </div>

        {/* 상품 헤더 */}
        <div style={{ padding: '18px 16px 0', borderBottom: `1px solid ${T.gray100}` }}>
          {/* 셀러 칩 */}
          <button onClick={() => setScreen('seller', null, seller.id)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: T.gray50, border: `1px solid ${T.gray200}`,
            borderRadius: 9999, padding: '6px 12px 6px 8px',
            cursor: 'pointer', fontFamily: 'inherit', marginBottom: 12,
          }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: seller.avatar, flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: T.gray800 }}>{seller.name}</span>
            {seller.verified && (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z" stroke={T.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12L11 14L15 10" stroke={T.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke={T.gray400} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* 상품명 — Display: 24px/700 */}
          <p style={{ fontSize: 21, fontWeight: 700, color: T.gray800, margin: '0 0 8px', lineHeight: 1.3, letterSpacing: -0.5 }}>{gb.name}</p>

          {/* 별점 + 배송비 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill={T.brand}>
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
              </svg>
              <span style={{ fontSize: 13, fontWeight: 600, color: T.gray800 }}>{gb.rating || '—'}</span>
              <span style={{ fontSize: 12, color: T.gray400 }}>({gb.reviewCount}개 리뷰)</span>
            </div>
            <span style={{ color: T.gray200 }}>·</span>
            <span style={{ fontSize: 12, color: gb.deliveryFee === 0 ? T.green : T.gray400, fontWeight: gb.deliveryFee === 0 ? 600 : 400 }}>
              {gb.deliveryFee === 0 ? '무료배송' : `배송비 ${gb.deliveryFee.toLocaleString()}원`}
            </span>
          </div>

          {/* 가격 — Heading 1: 21px/700 */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
            {discountPct > 0 && (
              <span style={{ fontSize: 15, fontWeight: 700, color: T.brand }}>{discountPct}%</span>
            )}
            <span style={{ fontSize: 24, fontWeight: 700, color: T.gray800, letterSpacing: -0.5 }}>
              {currentPrice.toLocaleString()}원
            </span>
            {discountPct > 0 && (
              <span style={{ fontSize: 14, color: T.gray300, textDecoration: 'line-through' }}>{gb.basePrice.toLocaleString()}원</span>
            )}
          </div>

          {/* 태그 */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {gb.tags.map(tag => (
              <span key={tag} style={{
                fontSize: 12, color: T.gray500, fontWeight: 400,
                background: T.gray50, border: `1px solid ${T.gray200}`,
                borderRadius: 9999, padding: '3px 10px',
              }}>#{tag}</span>
            ))}
          </div>
        </div>

        {/* 공구 진행률 — Summary Card 스타일 */}
        <div style={{ margin: '16px 16px 0', background: T.white, border: `1px solid ${T.gray200}`, borderRadius: 16, padding: '16px' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: T.gray800, marginBottom: 12, letterSpacing: -0.2 }}>공구 진행 현황</p>
          <ProgressBar current={gb.current} target={gb.target} tiers={gb.tiers} />
        </div>

        {/* 탭 */}
        <div style={{ display: 'flex', marginTop: 16, borderBottom: `1px solid ${T.gray100}`, background: T.white, position: 'sticky', top: 0, zIndex: 5 }}>
          {[{ k: 'info', l: '상품정보' }, { k: 'reviews', l: `리뷰 ${gb.reviewCount}` }, { k: 'shipping', l: '배송·교환' }].map(({ k, l }) => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, background: 'none', border: 'none', cursor: 'pointer',
              padding: '12px 0', fontFamily: 'inherit',
              fontSize: 13, fontWeight: tab === k ? 700 : 500,
              color: tab === k ? T.gray800 : T.gray400,
              borderBottom: tab === k ? `2px solid ${T.gray800}` : '2px solid transparent',
            }}>{l}</button>
          ))}
        </div>

        {/* 탭 콘텐츠 */}
        <div style={{ padding: '16px 16px 32px' }}>
          {tab === 'info' && (
            <div>
              <div style={{ height: 160, background: T.gray50, borderRadius: 14, border: `1px solid ${T.gray100}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 13, color: T.gray300 }}>상품 상세 이미지</span>
              </div>
              <p style={{ fontSize: 14, color: T.gray500, lineHeight: 1.7, marginBottom: 14 }}>{gb.desc}</p>
              {/* 상품 스펙 — Terms Box 스타일 */}
              <div style={{ background: T.gray50, borderRadius: 10, padding: '14px' }}>
                {[
                  ['최소 주문수량', `${gb.minOrder}개`],
                  ['최대 주문수량', `1인 ${gb.maxOrder}개`],
                  ['배송비', gb.deliveryFee === 0 ? '무료' : `${gb.deliveryFee.toLocaleString()}원`],
                ].map(([k, v], i, arr) => (
                  <div key={k} style={{
                    display: 'flex', justifyContent: 'space-between',
                    fontSize: 13, padding: '8px 0',
                    borderBottom: i < arr.length - 1 ? `1px solid ${T.gray100}` : 'none',
                  }}>
                    <span style={{ color: T.gray400, fontWeight: 400 }}>{k}</span>
                    <span style={{ fontWeight: 600, color: T.gray800 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'reviews' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {REVIEWS.map((r, i) => (
                <div key={i} style={{ background: T.gray50, borderRadius: 14, padding: '14px', border: `1px solid ${T.gray100}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: T.gray800 }}>{r.nick}</span>
                    <span style={{ fontSize: 12, color: T.gray400 }}>{r.time}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 6 }}>
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= r.rating ? T.brand : T.gray200}>
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                      </svg>
                    ))}
                  </div>
                  <p style={{ fontSize: 13, color: T.gray700, margin: 0, lineHeight: 1.55 }}>{r.text}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'shipping' && (
            <div style={{ background: T.gray50, borderRadius: 10, padding: '4px 14px' }}>
              {[
                ['배송방법', '택배 배송 (CJ대한통운)'],
                ['배송기간', '결제 완료 후 2~3 영업일'],
                ['교환/반품', '수령 후 7일 이내'],
                ['반품 배송비', '왕복 6,000원 (고객 부담)'],
              ].map(([k, v], i, arr) => (
                <div key={k} style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: 13, padding: '12px 0',
                  borderBottom: i < arr.length - 1 ? `1px solid ${T.gray100}` : 'none',
                }}>
                  <span style={{ color: T.gray400, fontWeight: 400 }}>{k}</span>
                  <span style={{ color: T.gray700, fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 하단 CTA — Airbnb Booking Panel 스타일 */}
      {!joined ? (
        <div style={{
          background: T.white, borderTop: `1px solid ${T.gray100}`,
          padding: '14px 16px 16px', flexShrink: 0,
        }}>
          {/* 수량 + 총 가격 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => setQty(q => Math.max(gb.minOrder, q - 1))} style={{
                width: 32, height: 32, borderRadius: '50%',
                border: `1px solid ${T.gray200}`, background: T.white,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12H19" stroke={T.gray800} strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
              <span style={{ fontSize: 15, fontWeight: 600, color: T.gray800, minWidth: 20, textAlign: 'center' }}>{qty}</span>
              <button onClick={() => setQty(q => Math.min(gb.maxOrder, q + 1))} style={{
                width: 32, height: 32, borderRadius: '50%',
                border: `1px solid ${T.gray200}`, background: T.white,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke={T.gray800} strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div style={{ textAlign: 'right' }}>
              {discountPct > 0 && (
                <p style={{ fontSize: 11, color: T.gray300, textDecoration: 'line-through', margin: 0 }}>{(gb.basePrice * qty).toLocaleString()}원</p>
              )}
              <p style={{ fontSize: 17, fontWeight: 700, color: T.gray800, margin: 0, letterSpacing: -0.4 }}>{totalPrice.toLocaleString()}원</p>
            </div>
          </div>

          {/* Reserve Button — gradient, border-radius 10px */}
          <button onClick={handleJoin} style={{
            width: '100%', padding: '15px', borderRadius: 10, border: 'none',
            background: T.brandGrad, color: T.white,
            fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            letterSpacing: -0.1,
          }}>공구 참여하기</button>

          <p style={{ fontSize: 12, color: T.gray400, textAlign: 'center', marginTop: 8, fontWeight: 400 }}>
            OK캐쉬백 <span style={{ fontWeight: 600, color: T.brand }}>{Math.floor(totalPrice * 0.01).toLocaleString()}P</span> 적립 예정
          </p>
        </div>
      ) : (
        <div style={{ background: '#008A05', padding: '16px', textAlign: 'center', flexShrink: 0 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: T.white, margin: 0 }}>✓ 공구 참여 완료!</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', margin: '4px 0 0', fontWeight: 400 }}>목표 달성 시 추가 할인이 자동 적용돼요</p>
        </div>
      )}
    </div>
  );
}
