import { T } from '../tokens';
import { usePlatformStore } from '../store/platformStore';
import GroupBuyCard from '../components/groupbuy/GroupBuyCard';

export default function ScreenWishlist() {
  const { wishlist, groupBuys } = usePlatformStore();
  const wished = groupBuys.filter(gb => wishlist.includes(gb.id));

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }} className="scrollbar-hide">
      <div style={{ background: T.white, padding: '16px 14px 20px' }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: T.gray800, marginBottom: 14, letterSpacing: -0.3 }}>
          찜한 공구 <span style={{ color: T.brand }}>{wished.length}</span>
        </p>
        {wished.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {wished.map(gb => <GroupBuyCard key={gb.id} gb={gb} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🤍</div>
            <p style={{ fontSize: 15, fontWeight: 600, color: T.gray700, margin: 0 }}>찜한 공구가 없어요</p>
            <p style={{ fontSize: 13, color: T.gray400, marginTop: 6, fontWeight: 500 }}>마음에 드는 공구를 찜해보세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
