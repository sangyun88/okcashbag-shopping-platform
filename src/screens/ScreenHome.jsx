import { useState } from 'react';
import { T } from '../tokens';
import { usePlatformStore } from '../store/platformStore';
import { CATEGORIES, SELLERS } from '../data/mockData';
import GroupBuyCard from '../components/groupbuy/GroupBuyCard';

const SORT_OPTIONS = [
  { key: 'hot',      label: '인기순' },
  { key: 'closing',  label: '마감임박' },
  { key: 'new',      label: '최신순' },
  { key: 'discount', label: '할인율순' },
];

const BANNERS = [
  { grad: 'linear-gradient(135deg,#E61E4D 0%,#D70466 100%)', tag: '이번 주 HOT', title: '모일수록 더 싸지는\n공동구매', sub: '목표 달성 시 최대 25% 추가 할인', cta: '지금 참여하기' },
  { grad: 'linear-gradient(135deg,#0f0c29 0%,#302b63 100%)', tag: '셀러 오픈', title: '나만의 공구 상품\n지금 바로 등록', sub: '간편 등록 후 즉시 판매 시작', cta: '셀러 시작하기', action: 'sell' },
  { grad: 'linear-gradient(135deg,#11998e 0%,#38ef7d 100%)', tag: 'NEW 셀러', title: '신규 입점 셀러\n특별 혜택', sub: '첫 공구 수수료 0%, 포인트 2배', cta: '혜택 확인하기' },
];

export default function ScreenHome() {
  const { groupBuys, activeCategory, setCategory, setScreen, sortKey, setSortKey } = usePlatformStore();
  const [bannerIdx, setBannerIdx] = useState(0);

  const filtered = groupBuys
    .filter(gb => activeCategory === 'all' || gb.category === activeCategory)
    .sort((a, b) => {
      if (sortKey === 'hot')      return b.current - a.current;
      if (sortKey === 'closing')  return new Date(a.deadline) - new Date(b.deadline);
      if (sortKey === 'new')      return b.id - a.id;
      if (sortKey === 'discount') {
        const da = [...a.tiers].reverse().find(t => a.current >= t.qty)?.discount || 0;
        const db = [...b.tiers].reverse().find(t => b.current >= t.qty)?.discount || 0;
        return db - da;
      }
      return 0;
    });

  const hotSellers = SELLERS.filter(s => s.verified).slice(0, 5);

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }} className="scrollbar-hide">

      {/* 배너 */}
      <div style={{ position: 'relative', background: BANNERS[bannerIdx].grad, flexShrink: 0 }}>
        <div style={{ padding: '20px 20px 28px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', borderRadius: 9999, padding: '3px 10px', marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.white, letterSpacing: 0.5 }}>{BANNERS[bannerIdx].tag}</span>
          </div>
          <p style={{ color: T.white, fontSize: 22, fontWeight: 800, lineHeight: 1.3, whiteSpace: 'pre-line', marginBottom: 6, letterSpacing: -0.5 }}>{BANNERS[bannerIdx].title}</p>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: 500, marginBottom: 16 }}>{BANNERS[bannerIdx].sub}</p>
          <button
            onClick={() => BANNERS[bannerIdx].action && setScreen(BANNERS[bannerIdx].action)}
            style={{ background: T.white, color: T.gray800, border: 'none', borderRadius: 9999, padding: '9px 22px', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: T.shadowMd }}
          >{BANNERS[bannerIdx].cta}</button>
        </div>
        {/* 닷 인디케이터 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 5, paddingBottom: 12 }}>
          {BANNERS.map((_, i) => (
            <button key={i} onClick={() => setBannerIdx(i)} style={{ width: i === bannerIdx ? 18 : 6, height: 6, borderRadius: 3, background: i === bannerIdx ? T.white : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.2s' }} />
          ))}
        </div>
      </div>

      {/* 카테고리 */}
      <div style={{ background: T.white, borderBottom: `1px solid ${T.gray100}` }}>
        <div style={{ display: 'flex', overflowX: 'auto', padding: '12px 12px 10px', gap: 8, msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="scrollbar-hide">
          {CATEGORIES.map(c => {
            const on = activeCategory === c.key;
            return (
              <button key={c.key} onClick={() => setCategory(c.key)} style={{
                flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                padding: '8px 12px', borderRadius: 12, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                background: on ? T.brand + '10' : T.gray50,
                border: `1px solid ${on ? T.brand + '40' : T.gray100}`,
              }}>
                <span style={{ fontSize: 18 }}>{c.icon}</span>
                <span style={{ fontSize: 11, fontWeight: on ? 700 : 500, color: on ? T.brand : T.gray500 }}>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 인기 셀러 */}
      <div style={{ background: T.white, marginBottom: 8, padding: '14px 0 10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 14px', marginBottom: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.gray800 }}>인기 셀러</span>
          <span style={{ fontSize: 12, color: T.gray400, fontWeight: 500, textDecoration: 'underline', cursor: 'pointer' }}>전체보기</span>
        </div>
        <div style={{ display: 'flex', gap: 14, padding: '0 14px', overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="scrollbar-hide">
          {hotSellers.map(seller => (
            <button key={seller.id} onClick={() => setScreen('seller', null, seller.id)} style={{
              flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit',
            }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: seller.avatar, border: `2px solid ${T.gray100}` }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: T.gray700, whiteSpace: 'nowrap', maxWidth: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>{seller.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill={T.gold}><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
                <span style={{ fontSize: 10, color: T.gray500, fontWeight: 600 }}>{seller.rating}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 공구 리스트 */}
      <div style={{ background: T.white, padding: '14px 14px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: T.gray800, letterSpacing: -0.3 }}>
            진행 중인 공구 <span style={{ color: T.brand }}>{filtered.length}</span>
          </span>
          {/* 정렬 */}
          <div style={{ display: 'flex', gap: 4 }}>
            {SORT_OPTIONS.map(opt => (
              <button key={opt.key} onClick={() => setSortKey(opt.key)} style={{
                padding: '4px 8px', borderRadius: 9999,
                background: sortKey === opt.key ? T.gray800 : 'none',
                border: `1px solid ${sortKey === opt.key ? T.gray800 : T.gray200}`,
                fontSize: 11, fontWeight: sortKey === opt.key ? 700 : 500,
                color: sortKey === opt.key ? T.white : T.gray500,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>{opt.label}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {filtered.map(gb => <GroupBuyCard key={gb.id} gb={gb} />)}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ fontSize: 14, color: T.gray400 }}>해당 카테고리의 공구가 없어요</p>
          </div>
        )}
      </div>
    </div>
  );
}
