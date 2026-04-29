import { T } from '../tokens';
import { usePlatformStore } from '../store/platformStore';
import { GROUP_BUYS } from '../data/mockData';

export default function ScreenMy() {
  const { myJoins, myPoints } = usePlatformStore();

  const STATUS_COLORS = {
    '결제완료': T.brand,
    '배송중':   '#3B82F6',
    '배송완료': T.green,
    '방금':     T.brand,
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }} className="scrollbar-hide">

      {/* 프로필 */}
      <div style={{ background: T.white, padding: '20px 16px 16px', borderBottom: `1px solid ${T.gray100}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#667eea,#764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: T.white }}>K</div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 700, color: T.gray800, margin: 0, letterSpacing: -0.3 }}>김공구 님</p>
            <p style={{ fontSize: 12, color: T.gray400, margin: '3px 0 0', fontWeight: 500 }}>sangyun88@gmail.com</p>
          </div>
        </div>
        {/* 포인트 */}
        <div style={{ background: T.brand + '08', borderRadius: 14, padding: '14px 16px', border: `1px solid ${T.brand}20`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 11, color: T.brand, fontWeight: 700, margin: '0 0 3px', letterSpacing: 0.3 }}>OK캐쉬백 포인트</p>
            <p style={{ fontSize: 22, fontWeight: 800, color: T.brand, margin: 0, letterSpacing: -0.5 }}>{myPoints.toLocaleString()}<span style={{ fontSize: 14, fontWeight: 600 }}>P</span></p>
          </div>
          <button style={{ padding: '8px 16px', background: T.brand, borderRadius: 9999, border: 'none', color: T.white, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>포인트 사용</button>
        </div>
      </div>

      {/* 주문 내역 */}
      <div style={{ background: T.white, padding: '14px', marginTop: 8 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: T.gray800, marginBottom: 12, letterSpacing: -0.3 }}>참여한 공구</p>
        {myJoins.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {myJoins.map((join, i) => {
              const gb = GROUP_BUYS.find(g => g.id === join.groupBuyId);
              if (!gb) return null;
              const statusColor = STATUS_COLORS[join.status] || T.gray500;
              return (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '12px', background: T.gray50, borderRadius: 14, border: `1px solid ${T.gray100}` }}>
                  <div style={{ width: 50, height: 50, borderRadius: 12, background: gb.grad, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: T.gray800, margin: '0 0 3px', lineHeight: 1.35 }}>{gb.name}</p>
                    <p style={{ fontSize: 11, color: T.gray400, margin: '0 0 6px', fontWeight: 500 }}>{join.qty}개 · {join.orderedAt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: statusColor, background: statusColor + '15', padding: '2px 8px', borderRadius: 9999 }}>{join.status}</span>
                      {join.trackingNo && <span style={{ fontSize: 11, color: T.gray400, fontFamily: 'monospace' }}>{join.trackingNo}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{ fontSize: 13, color: T.gray400, textAlign: 'center', padding: '20px 0', fontWeight: 500 }}>참여한 공구가 없어요</p>
        )}
      </div>

      {/* 메뉴 */}
      <div style={{ background: T.white, padding: '14px', marginTop: 8, marginBottom: 8 }}>
        {['주문 배송 조회', '찜 목록', '리뷰 관리', '셀러 신청', '포인트 내역', '고객센터'].map(menu => (
          <div key={menu} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: `1px solid ${T.gray50}` }}>
            <span style={{ fontSize: 14, color: T.gray700, fontWeight: 500 }}>{menu}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke={T.gray300} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
