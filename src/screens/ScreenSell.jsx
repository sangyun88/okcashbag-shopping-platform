import { useState } from 'react';
import { T } from '../tokens';
import { usePlatformStore } from '../store/platformStore';
import { SELLERS, GROUP_BUYS } from '../data/mockData';

const STEPS = ['기본 정보', '할인 조건', '마케팅 링크'];

export default function ScreenSell() {
  const { groupBuys, setScreen } = usePlatformStore();
  const mySeller = SELLERS[0]; // mock: 제주미식단
  const myGbs = groupBuys.filter(gb => gb.sellerId === mySeller.id);

  const [mode, setMode] = useState('dashboard'); // dashboard | create
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', category: 'food', basePrice: '', target: '',
    tiers: [{ qty: '', discount: '' }],
    deadline: '', deliveryFee: '3000',
  });
  const [done, setDone] = useState(false);

  const totalCurrent = myGbs.reduce((s, g) => s + g.current, 0);
  const totalSales   = myGbs.reduce((s, g) => s + (g.current * Math.round(g.basePrice * 0.9)), 0);

  function addTier() {
    setForm(f => ({ ...f, tiers: [...f.tiers, { qty: '', discount: '' }] }));
  }
  function updateTier(i, k, v) {
    setForm(f => ({ ...f, tiers: f.tiers.map((t, idx) => idx === i ? { ...t, [k]: v } : t) }));
  }

  function handleCreate() {
    setDone(true);
    setTimeout(() => { setDone(false); setMode('dashboard'); setStep(0); }, 2000);
  }

  if (mode === 'create') {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.white, overflow: 'hidden' }}>
        {/* 스텝 */}
        <div style={{ padding: '16px 20px 0', borderBottom: `1px solid ${T.gray100}`, paddingBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                {i < STEPS.length - 1 && (
                  <div style={{ position: 'absolute', top: 12, left: '50%', width: '100%', height: 2, background: i < step ? T.brand : T.gray100, zIndex: 0 }} />
                )}
                <div style={{ width: 24, height: 24, borderRadius: '50%', zIndex: 1, background: i <= step ? T.brand : T.gray200, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {i < step
                    ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L20 7" stroke={T.white} strokeWidth="2.5" strokeLinecap="round"/></svg>
                    : <span style={{ fontSize: 11, fontWeight: 700, color: i === step ? T.white : T.gray400 }}>{i + 1}</span>
                  }
                </div>
                <span style={{ fontSize: 10, color: i === step ? T.brand : T.gray400, marginTop: 4, fontWeight: i === step ? 700 : 500 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px' }} className="scrollbar-hide">
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: T.gray800, margin: 0, letterSpacing: -0.4 }}>공구 기본 정보</h2>
              <Field label="상품명" placeholder="예: 제주 흑돼지 두루치기 세트 2kg" value={form.name} onChange={v => setForm(f => ({...f, name: v}))} />
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.gray600, display: 'block', marginBottom: 6 }}>카테고리</label>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['food','beauty','fashion','living','kids','digital'].map(c => (
                    <button key={c} onClick={() => setForm(f => ({...f, category: c}))} style={{
                      padding: '6px 12px', borderRadius: 9999, border: `1.5px solid ${form.category === c ? T.brand : T.gray200}`,
                      background: form.category === c ? T.brand + '12' : 'none',
                      color: form.category === c ? T.brand : T.gray500,
                      fontSize: 12, fontWeight: form.category === c ? 700 : 500, cursor: 'pointer', fontFamily: 'inherit',
                    }}>{{food:'푸드',beauty:'뷰티',fashion:'패션',living:'리빙',kids:'키즈',digital:'전자'}[c]}</button>
                  ))}
                </div>
              </div>
              <Field label="기본 가격 (원)" placeholder="예: 35000" value={form.basePrice} onChange={v => setForm(f => ({...f, basePrice: v}))} type="number" />
              <Field label="목표 참여자 수 (명)" placeholder="예: 100" value={form.target} onChange={v => setForm(f => ({...f, target: v}))} type="number" />
              <Field label="마감 일시" placeholder="예: 2025-12-31" value={form.deadline} onChange={v => setForm(f => ({...f, deadline: v}))} />
              <Field label="배송비 (0=무료)" placeholder="예: 3000" value={form.deliveryFee} onChange={v => setForm(f => ({...f, deliveryFee: v}))} type="number" />
            </div>
          )}

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: T.gray800, margin: 0, letterSpacing: -0.4 }}>할인 단계 설정</h2>
              <p style={{ fontSize: 13, color: T.gray400, fontWeight: 500, margin: 0 }}>참여자 수가 목표에 가까워질수록 더 많이 할인됩니다</p>
              {form.tiers.map((tier, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: T.gray500, display: 'block', marginBottom: 5 }}>목표 인원 (명)</label>
                    <input value={tier.qty} onChange={e => updateTier(i, 'qty', e.target.value)} placeholder="예: 30" type="number"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: `1.5px solid ${T.gray200}`, fontSize: 14, fontFamily: 'inherit', outline: 'none', color: T.gray800 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: T.gray500, display: 'block', marginBottom: 5 }}>할인율 (%)</label>
                    <input value={tier.discount} onChange={e => updateTier(i, 'discount', e.target.value)} placeholder="예: 10" type="number"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: `1.5px solid ${T.gray200}`, fontSize: 14, fontFamily: 'inherit', outline: 'none', color: T.gray800 }} />
                  </div>
                  {i === form.tiers.length - 1 && form.tiers.length < 4 && (
                    <button onClick={addTier} style={{ width: 36, height: 38, borderRadius: 10, background: T.gray50, border: `1.5px solid ${T.gray200}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke={T.gray600} strokeWidth="2.5" strokeLinecap="round"/></svg>
                    </button>
                  )}
                </div>
              ))}
              <div style={{ padding: '12px', background: T.brand + '08', borderRadius: 12, border: `1px solid ${T.brand}25` }}>
                <p style={{ fontSize: 12, color: T.brand, fontWeight: 600, margin: 0 }}>
                  💡 단계별 할인을 설정하면 참여자 모집에 더 효과적이에요
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: T.gray800, margin: 0, letterSpacing: -0.4 }}>공구 링크 & 미리보기</h2>
              <div style={{ background: T.gray50, borderRadius: 14, padding: '16px', border: `1px solid ${T.gray100}` }}>
                <p style={{ fontSize: 12, color: T.gray400, fontWeight: 500, margin: '0 0 8px' }}>고유 링크 (자동 발급)</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, color: T.gray700, fontFamily: 'monospace', flex: 1 }}>okgb.io/gb/{Date.now().toString(36)}</span>
                  <button style={{ padding: '6px 12px', background: T.gray800, borderRadius: 8, border: 'none', color: T.white, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>복사</button>
                </div>
              </div>
              <div style={{ background: T.gray50, borderRadius: 14, padding: '16px', border: `1px solid ${T.gray100}` }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: T.gray800, margin: '0 0 12px' }}>공구 요약 미리보기</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ width: 60, height: 60, borderRadius: 12, background: 'linear-gradient(135deg,#11998e,#38ef7d)', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: T.gray800, margin: '0 0 3px' }}>{form.name || '상품명 미입력'}</p>
                    <p style={{ fontSize: 14, fontWeight: 800, color: T.brand, margin: '0 0 3px', letterSpacing: -0.3 }}>{form.basePrice ? Number(form.basePrice).toLocaleString() + '원~' : '—'}</p>
                    <p style={{ fontSize: 11, color: T.gray400, margin: 0 }}>목표 {form.target || '—'}명 달성 시 할인</p>
                  </div>
                </div>
              </div>
              <div style={{ background: T.green + '10', borderRadius: 12, padding: '12px', border: `1px solid ${T.green}30` }}>
                <p style={{ fontSize: 12, color: T.green, fontWeight: 600, margin: 0 }}>
                  ✓ 등록 즉시 플랫폼 메인에 노출됩니다
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 버튼 */}
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${T.gray100}`, display: 'flex', gap: 10, flexShrink: 0 }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: '14px', borderRadius: 10, border: `1.5px solid ${T.gray200}`, background: 'none', color: T.gray600, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>이전</button>
          )}
          {step < STEPS.length - 1 ? (
            <button onClick={() => setStep(s => s + 1)} style={{ flex: 2, padding: '14px', borderRadius: 10, border: 'none', background: T.brand, color: T.white, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>다음 단계</button>
          ) : (
            <button onClick={handleCreate} style={{ flex: 2, padding: '14px', borderRadius: 10, border: 'none', background: T.brandGrad, color: T.white, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              {done ? '✓ 공구 등록 완료!' : '공구 개시하기'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // 대시보드
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }} className="scrollbar-hide">

      {/* 셀러 요약 */}
      <div style={{ background: T.white, padding: '16px 14px', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: mySeller.avatar }} />
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: T.gray800, margin: 0, letterSpacing: -0.3 }}>{mySeller.name}</p>
            <p style={{ fontSize: 12, color: T.gray400, margin: '2px 0 0', fontWeight: 500 }}>사업자 셀러 · 인증 완료</p>
          </div>
          <button onClick={() => setMode('create')} style={{
            marginLeft: 'auto', padding: '9px 16px', borderRadius: 9999,
            background: T.brandGrad, border: 'none', color: T.white, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}>+ 공구 등록</button>
        </div>

        {/* 스탯 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[
            { label: '진행 중', value: myGbs.filter(g => g.status === 'active').length + '개', color: T.brand },
            { label: '누적 참여자', value: totalCurrent + '명', color: T.gray800 },
            { label: '이번 달 매출', value: Math.floor(totalSales / 10000) + '만원', color: T.green },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: T.gray50, borderRadius: 12, padding: '12px 0', textAlign: 'center', border: `1px solid ${T.gray100}` }}>
              <p style={{ fontSize: 17, fontWeight: 800, color, margin: 0, letterSpacing: -0.4 }}>{value}</p>
              <p style={{ fontSize: 10, color: T.gray400, margin: '3px 0 0', fontWeight: 500 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 진행 중인 공구 */}
      <div style={{ background: T.white, padding: '14px' }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: T.gray800, marginBottom: 12, letterSpacing: -0.3 }}>내 공구 현황</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {myGbs.map(gb => {
            const pct = Math.min((gb.current / gb.target) * 100, 100);
            const currentTier = [...gb.tiers].reverse().find(t => gb.current >= t.qty);
            const disc = currentTier ? currentTier.discount : 0;
            return (
              <button key={gb.id} onClick={() => setScreen('detail', gb.id)} style={{
                display: 'flex', gap: 12, padding: '12px', background: T.gray50,
                border: `1px solid ${T.gray100}`, borderRadius: 14, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                boxShadow: T.shadowSm,
              }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: gb.grad, flexShrink: 0 }} />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: T.gray800, margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{gb.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: T.brand }}>{gb.current}/{gb.target}명</span>
                    {disc > 0 && <span style={{ fontSize: 11, color: T.green, fontWeight: 600 }}>현재 {disc}% 적용</span>}
                  </div>
                  <div style={{ height: 4, background: T.gray200, borderRadius: 9999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: T.brandGrad, borderRadius: 9999 }} />
                  </div>
                </div>
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: T.brand, margin: '0 0 4px', letterSpacing: -0.3 }}>{Math.floor(gb.current * gb.basePrice * 0.97 / 10000)}만원</p>
                  <p style={{ fontSize: 10, color: T.gray400, margin: 0 }}>예상 매출</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 정산 안내 */}
      <div style={{ background: T.white, padding: '14px', marginTop: 8, marginBottom: 8 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: T.gray800, marginBottom: 10 }}>정산 현황</p>
        <div style={{ background: T.gray50, borderRadius: 14, padding: '14px', border: `1px solid ${T.gray100}` }}>
          {[
            { label: '정산 예정', value: '128,500원', color: T.gray800 },
            { label: '정산 주기', value: '익일 정산 선택', color: T.gray500 },
            { label: '수수료', value: '3% (기본)', color: T.gray500 },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${T.gray100}` }}>
              <span style={{ fontSize: 13, color: T.gray400, fontWeight: 500 }}>{label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, value, onChange, type = 'text' }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: T.gray600, display: 'block', marginBottom: 6 }}>{label}</label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1.5px solid ${T.gray200}`, fontSize: 14, fontFamily: 'inherit', outline: 'none', color: T.gray800, background: T.white }}
      />
    </div>
  );
}
