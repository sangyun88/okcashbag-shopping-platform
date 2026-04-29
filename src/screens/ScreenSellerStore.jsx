import { T } from '../tokens';
import { usePlatformStore } from '../store/platformStore';
import { SELLERS } from '../data/mockData';
import GroupBuyCard from '../components/groupbuy/GroupBuyCard';

function fmtNum(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + '만';
  if (n >= 1000)  return (n / 1000).toFixed(1) + 'k';
  return String(n);
}

export default function ScreenSellerStore() {
  const { selectedSellerId, groupBuys, goBack } = usePlatformStore();
  const seller = SELLERS.find(s => s.id === selectedSellerId) || SELLERS[0];
  const sellerGbs = groupBuys.filter(gb => gb.sellerId === seller.id);
  const active = sellerGbs.filter(gb => gb.status !== 'closed');
  const closed = sellerGbs.filter(gb => gb.status === 'closed');

  const totalSales   = sellerGbs.reduce((sum, gb) => sum + gb.current, 0);
  const avgRating    = seller.rating;
  const totalReviews = sellerGbs.reduce((sum, gb) => sum + gb.reviewCount, 0);

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }} className="scrollbar-hide">

      {/* 셀러 헤더 */}
      <div style={{ background: T.white, paddingBottom: 16, borderBottom: `1px solid ${T.gray100}` }}>
        {/* 커버 그라디언트 */}
        <div style={{ height: 100, background: seller.avatar, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.3) 100%)' }} />
        </div>

        {/* 아바타 + 정보 */}
        <div style={{ padding: '0 16px', marginTop: -28 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', background: seller.avatar,
              border: '3px solid #fff', flexShrink: 0, boxShadow: T.shadowMd,
            }} />
            <button style={{
              padding: '8px 20px', borderRadius: 9999, border: `1.5px solid ${T.brand}`,
              background: 'none', color: T.brand, fontSize: 13, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>팔로우</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: T.gray800, letterSpacing: -0.4 }}>{seller.name}</span>
            {seller.verified && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z" stroke={T.brand} strokeWidth="2" strokeLinecap="round"/>
                <path d="M9 12L11 14L15 10" stroke={T.brand} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </div>
          <p style={{ fontSize: 13, color: T.gray500, marginBottom: 12, fontWeight: 500 }}>{seller.bio}</p>

          {/* 스탯 */}
          <div style={{ display: 'flex', gap: 0, background: T.gray50, borderRadius: 12, overflow: 'hidden', border: `1px solid ${T.gray100}` }}>
            {[
              { label: '팔로워', value: fmtNum(seller.followers) },
              { label: '누적 판매', value: fmtNum(totalSales) + '건' },
              { label: '평균 평점', value: avgRating },
              { label: '리뷰', value: totalReviews + '개' },
            ].map(({ label, value }, i) => (
              <div key={label} style={{
                flex: 1, textAlign: 'center', padding: '10px 0',
                borderRight: i < 3 ? `1px solid ${T.gray100}` : 'none',
              }}>
                <p style={{ fontSize: 15, fontWeight: 800, color: T.gray800, margin: 0, letterSpacing: -0.4 }}>{value}</p>
                <p style={{ fontSize: 10, color: T.gray400, margin: '2px 0 0', fontWeight: 500 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 진행 중인 공구 */}
      <div style={{ background: T.white, padding: '16px 14px', marginTop: 8 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: T.gray800, marginBottom: 12, letterSpacing: -0.3 }}>
          진행 중인 공구 <span style={{ color: T.brand }}>{active.length}</span>
        </p>
        {active.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {active.map(gb => <GroupBuyCard key={gb.id} gb={gb} />)}
          </div>
        ) : (
          <p style={{ fontSize: 13, color: T.gray400, textAlign: 'center', padding: '20px 0' }}>진행 중인 공구가 없어요</p>
        )}
      </div>

      {/* 마케팅 링크 */}
      <div style={{ background: T.white, padding: '16px 14px', marginTop: 8 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: T.gray800, marginBottom: 10 }}>이 셀러 공유하기</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: T.gray50, borderRadius: 12, padding: '12px', border: `1px solid ${T.gray100}` }}>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <p style={{ fontSize: 11, color: T.gray400, margin: '0 0 2px' }}>셀러 페이지 링크</p>
            <p style={{ fontSize: 12, color: T.gray600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>okgb.io/@{seller.name}</p>
          </div>
          <button style={{ padding: '7px 14px', background: T.gray800, borderRadius: 8, border: 'none', color: T.white, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>복사</button>
        </div>
      </div>
    </div>
  );
}
