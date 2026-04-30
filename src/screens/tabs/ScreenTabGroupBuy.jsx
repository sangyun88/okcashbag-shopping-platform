import { useState } from 'react';
import { T } from '../../tokens';
import { usePlatformStore } from '../../store/platformStore';
import { CATEGORIES, SELLERS } from '../../data/mockData';
import GroupBuyCard from '../../components/groupbuy/GroupBuyCard';

const SORT_OPTIONS = [
  { key: 'hot',      label: '인기순' },
  { key: 'closing',  label: '마감임박' },
  { key: 'new',      label: '최신순' },
  { key: 'discount', label: '할인율순' },
];

export default function ScreenTabGroupBuy() {
  const { groupBuys, activeCategory, setCategory, setScreen, sortKey, setSortKey } = usePlatformStore();

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

  const hotSellers = SELLERS.filter(s => s.verified).slice(0, 6);

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }} className="scrollbar-hide">

      {/* 상단 배너 */}
      <div style={{ background: T.white, padding: '16px 16px 14px' }}>
        <div style={{
          background: T.brandGrad,
          borderRadius: 16, padding: '18px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', borderRadius: 9999, padding: '3px 10px', marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: T.white, letterSpacing: 0.5 }}>실패없는 공동구매</span>
            </div>
            <p style={{ color: T.white, fontSize: 19, fontWeight: 700, lineHeight: 1.3, letterSpacing: -0.5 }}>
              모일수록<br />더 싸진다
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 400, marginTop: 4 }}>목표 달성 시 최대 25% 추가 할인</p>
          </div>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34,
          }}>🤝</div>
        </div>
      </div>

      {/* 카테고리 필터 — Airbnb Category Bar 스타일 */}
      <div style={{ background: T.white, borderBottom: `1px solid ${T.gray100}`, marginTop: 8 }}>
        <div style={{ display: 'flex', overflowX: 'auto', padding: '12px 12px 10px', gap: 8, msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="scrollbar-hide">
          {CATEGORIES.map(c => {
            const on = activeCategory === c.key;
            return (
              <button key={c.key} onClick={() => setCategory(c.key)} style={{
                flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                padding: '6px 14px', borderRadius: 9999,
                border: `1px solid ${on ? T.gray800 : T.gray200}`,
                cursor: 'pointer', fontFamily: 'inherit',
                background: on ? T.gray800 : T.white,
              }}>
                <span style={{ fontSize: 16 }}>{c.icon}</span>
                <span style={{ fontSize: 11, fontWeight: on ? 700 : 500, color: on ? T.white : T.gray500 }}>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 인기 셀러 */}
      <div style={{ background: T.white, padding: '16px 0 14px', marginTop: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.gray800 }}>인기 셀러</span>
          <span style={{ fontSize: 12, color: T.gray400, fontWeight: 500, textDecoration: 'underline', cursor: 'pointer' }}>전체보기</span>
        </div>
        <div style={{ display: 'flex', gap: 16, padding: '0 16px', overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="scrollbar-hide">
          {hotSellers.map(seller => (
            <button key={seller.id} onClick={() => setScreen('seller', null, seller.id)} style={{
              flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit',
            }}>
              <div style={{
                width: 54, height: 54, borderRadius: '50%',
                background: seller.avatar,
                border: `2px solid ${T.gray100}`,
              }} />
              <span style={{ fontSize: 11, fontWeight: 500, color: T.gray700, whiteSpace: 'nowrap', maxWidth: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>{seller.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill={T.brand}>
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
                <span style={{ fontSize: 10, color: T.gray400, fontWeight: 600 }}>{seller.rating}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 공구 리스트 — Airbnb listing grid */}
      <div style={{ background: T.white, padding: '16px 16px 24px', marginTop: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: T.gray800, letterSpacing: -0.3 }}>
            진행 중인 공구 <span style={{ color: T.brand }}>{filtered.length}</span>
          </span>
          {/* 정렬 — pill 스타일 */}
          <div style={{ display: 'flex', gap: 4 }}>
            {SORT_OPTIONS.map(opt => (
              <button key={opt.key} onClick={() => setSortKey(opt.key)} style={{
                padding: '4px 9px', borderRadius: 9999,
                background: sortKey === opt.key ? T.gray800 : T.white,
                border: `1px solid ${sortKey === opt.key ? T.gray800 : T.gray200}`,
                fontSize: 11, fontWeight: sortKey === opt.key ? 700 : 500,
                color: sortKey === opt.key ? T.white : T.gray500,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>{opt.label}</button>
            ))}
          </div>
        </div>

        {/* 2-column listing grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
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
