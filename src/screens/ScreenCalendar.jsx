import { useState } from 'react';
import { T } from '../tokens';
import { usePlatformStore } from '../store/platformStore';
import { SELLERS, UPCOMING_OPENS } from '../data/mockData';
import CountdownBadge from '../components/groupbuy/CountdownBadge';

const STATUS_COLORS = {
  active:       { bg: T.brand + '15', color: T.brand,         label: '진행 중' },
  closing_soon: { bg: '#F9731615',    color: '#F97316',        label: '마감임박' },
  upcoming:     { bg: '#3B82F615',    color: '#3B82F6',        label: '오픈예정' },
  closed:       { bg: T.gray100,      color: T.gray400,        label: '종료' },
};

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
}

export default function ScreenCalendar() {
  const { groupBuys, setScreen } = usePlatformStore();
  const [view, setView] = useState('list'); // list | timeline

  const sorted = [...groupBuys].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const allItems = [
    ...sorted.map(gb => ({ ...gb, type: 'close' })),
    ...UPCOMING_OPENS.map(u => ({ ...u, type: 'open', status: 'upcoming', deadline: u.openDate })),
  ].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }} className="scrollbar-hide">

      {/* 뷰 토글 */}
      <div style={{ background: T.white, padding: '12px 14px', borderBottom: `1px solid ${T.gray100}`, display: 'flex', gap: 8 }}>
        {[{ k: 'list', l: '타임라인' }, { k: 'status', l: '상태별' }].map(({ k, l }) => (
          <button key={k} onClick={() => setView(k)} style={{
            padding: '7px 16px', borderRadius: 9999,
            background: view === k ? T.gray800 : 'none',
            border: `1px solid ${view === k ? T.gray800 : T.gray200}`,
            color: view === k ? T.white : T.gray500,
            fontSize: 13, fontWeight: view === k ? 700 : 500, cursor: 'pointer', fontFamily: 'inherit',
          }}>{l}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.brand }} />
          <span style={{ fontSize: 11, color: T.gray400, fontWeight: 500 }}>진행 중</span>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B82F6', marginLeft: 6 }} />
          <span style={{ fontSize: 11, color: T.gray400, fontWeight: 500 }}>오픈예정</span>
        </div>
      </div>

      {/* 이번 주 요약 */}
      <div style={{ background: T.white, padding: '14px', marginBottom: 8, display: 'flex', gap: 10 }}>
        {[
          { label: '진행 중', count: groupBuys.filter(g => g.status === 'active').length, color: T.brand },
          { label: '마감임박', count: groupBuys.filter(g => g.status === 'closing_soon').length, color: '#F97316' },
          { label: '오픈 예정', count: UPCOMING_OPENS.length, color: '#3B82F6' },
        ].map(({ label, count, color }) => (
          <div key={label} style={{ flex: 1, textAlign: 'center', padding: '10px 0', background: color + '10', borderRadius: 12, border: `1px solid ${color}25` }}>
            <p style={{ fontSize: 20, fontWeight: 800, color, margin: 0, letterSpacing: -0.5 }}>{count}</p>
            <p style={{ fontSize: 11, color: T.gray500, margin: '2px 0 0', fontWeight: 500 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* 타임라인 리스트 */}
      {view === 'list' && (
        <div style={{ background: T.white, padding: '14px' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: T.gray800, marginBottom: 14, letterSpacing: -0.3 }}>전체 일정</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {allItems.map((item, idx) => {
              const st = STATUS_COLORS[item.status] || STATUS_COLORS.active;
              const seller = SELLERS.find(s => s.id === item.sellerId);
              const isOpen = item.type === 'open';
              return (
                <div key={`${item.type}-${item.id}-${idx}`} style={{ display: 'flex', gap: 12, paddingBottom: 16 }}>
                  {/* 타임라인 선 */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 20 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: isOpen ? '#3B82F6' : st.color, border: `2px solid ${isOpen ? '#3B82F6' : st.color}`, marginTop: 4, flexShrink: 0 }} />
                    {idx < allItems.length - 1 && <div style={{ flex: 1, width: 2, background: T.gray100, marginTop: 4 }} />}
                  </div>

                  {/* 카드 */}
                  <button
                    onClick={() => !isOpen && setScreen('detail', item.id)}
                    style={{
                      flex: 1, background: T.gray50, border: `1px solid ${T.gray100}`, borderRadius: 12,
                      padding: '10px 12px', cursor: isOpen ? 'default' : 'pointer', textAlign: 'left', fontFamily: 'inherit',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: st.color, background: st.bg, padding: '2px 7px', borderRadius: 9999 }}>
                          {isOpen ? '오픈 예정' : st.label}
                        </span>
                        <span style={{ fontSize: 10, color: T.gray400, marginLeft: 6 }}>
                          {isOpen ? '오픈' : '마감'} {formatDate(item.deadline)}
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: T.gray800, margin: '0 0 5px', letterSpacing: -0.2, lineHeight: 1.35 }}>
                      {item.name}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {seller && (
                        <>
                          <div style={{ width: 14, height: 14, borderRadius: '50%', background: seller.avatar, flexShrink: 0 }} />
                          <span style={{ fontSize: 11, color: T.gray500 }}>{seller.name}</span>
                        </>
                      )}
                      {!isOpen && item.current !== undefined && (
                        <>
                          <span style={{ color: T.gray200 }}>·</span>
                          <span style={{ fontSize: 11, color: T.brand, fontWeight: 600 }}>{item.current}/{item.target}명</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 상태별 뷰 */}
      {view === 'status' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['closing_soon', 'active', 'upcoming'].map(statusKey => {
            const items = statusKey === 'upcoming'
              ? UPCOMING_OPENS
              : groupBuys.filter(g => g.status === statusKey);
            const st = STATUS_COLORS[statusKey];
            if (items.length === 0) return null;
            return (
              <div key={statusKey} style={{ background: T.white, padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: st.color }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: T.gray800 }}>{st.label}</span>
                  <span style={{ fontSize: 13, color: st.color, fontWeight: 700 }}>{items.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {items.map((item, i) => {
                    const seller = SELLERS.find(s => s.id === item.sellerId);
                    const isUpcoming = statusKey === 'upcoming';
                    return (
                      <button key={i} onClick={() => !isUpcoming && setScreen('detail', item.id)} style={{
                        display: 'flex', alignItems: 'center', gap: 10, padding: '10px',
                        background: T.gray50, border: `1px solid ${T.gray100}`, borderRadius: 12,
                        cursor: isUpcoming ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left',
                      }}>
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: item.grad || seller?.avatar, flexShrink: 0 }} />
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                          <p style={{ fontSize: 12, fontWeight: 600, color: T.gray800, margin: '0 0 3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                          <p style={{ fontSize: 11, color: T.gray400, margin: 0 }}>{seller?.name} · {isUpcoming ? `오픈 ${formatDate(item.openDate)}` : formatDate(item.deadline) + ' 마감'}</p>
                        </div>
                        <CountdownBadge deadline={isUpcoming ? item.openDate : item.deadline} status={statusKey} compact />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
