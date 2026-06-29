import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { searchPhones, getPhoneDetail } from '../utils/api';
import { translateSpec } from '../utils/specTranslations';
import type { Phone, PhoneDetail } from '../types/phone';

const PALETTE: Record<string, string> = {
  samsung: '#1428a0', apple: '#555555', xiaomi: '#ff6700', google: '#4285f4',
  oneplus: '#f5010c', huawei: '#cf0a2c', nothing: '#888888', realme: '#ffc500',
  oppo: '#1a8a1a', sony: '#333333', motorola: '#5c2d91', nokia: '#124191',
  honor: '#c6002b', vivo: '#415fff',
};
function getInitials(n: string) { return n.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase(); }

function extractNum(v: string): number | null {
  const m = v.replace(/,/g, '').match(/[\d.]+/);
  return m ? parseFloat(m[0]) : null;
}

function findWinners(vals: string[], specName: string): number[] {
  const nums = vals.map(v => extractNum(v));
  if (nums.some(n => n === null)) return [];
  const lowerBetter = ['weight', 'thickness', 'price', 'sar', 'depth', 'sim'];
  const isLower = lowerBetter.some(k => specName.toLowerCase().includes(k));
  const best = isLower ? Math.min(...nums as number[]) : Math.max(...nums as number[]);
  return nums.map((n, i) => n === best ? i : -1).filter(i => i >= 0);
}

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  show: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.02 } })
};

export default function Compare() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [phones, setPhones] = useState<PhoneDetail[]>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Phone[]>([]);
  const [searching, setSearching] = useState(false);
  const [loadingPhone, setLoadingPhone] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [hoveredResult, setHoveredResult] = useState<string | null>(null);
  const MAX = 4;

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    try { const r = await searchPhones(query.trim()); setResults(r.filter(r => !phones.find(p => p.phone_name === r.phone_name))); } catch {} finally { setSearching(false); }
  };

  const add = async (phone: Phone) => {
    if (phones.length >= MAX) return;
    setLoadingPhone(true);
    try { const d = await getPhoneDetail(phone.slug); if (d) { setPhones(p => [...p, d]); setResults([]); setQuery(''); } } catch {} finally { setLoadingPhone(false); }
  };

  const remove = (i: number) => setPhones(p => p.filter((_, idx) => idx !== i));
  const categories = Array.from(new Set(phones.flatMap(p => p.detailSpec?.map(s => s.category) || [])));

  // We'll compute during render using a special function
  const computeWins = () => {
    const wins = phones.map(() => 0);
    const total = phones.map(() => 0);
    const processRow = (vals: string[], specName: string) => {
      const w = findWinners(vals, specName);
      if (w.length > 0) {
        phones.forEach((_, i) => total[i]++);
        w.forEach(i => wins[i]++);
      }
    };
    // quickSpec
    if (phones[0]?.quickSpec) {
      for (let qi = 0; qi < Math.max(...phones.map(p => p.quickSpec?.length || 0)); qi++) {
        const vals = phones.map(p => p.quickSpec?.[qi]?.value || '—');
        processRow(vals, phones[0]?.quickSpec?.[qi]?.name || '');
      }
    }
    // detailSpec
    for (const cat of categories) {
      for (let ii = 0; ii < Math.max(...phones.map(p => p.detailSpec?.find(s => s.category === cat)?.specifications.length || 0)); ii++) {
        const vals = phones.map(p => p.detailSpec?.find(s => s.category === cat)?.specifications[ii]?.value || '—');
        processRow(vals, phones[0]?.detailSpec?.find(s => s.category === cat)?.specifications[ii]?.name || '');
      }
    }
    return { wins, total };
  };

  const { wins: winCountsArr, total: totalComparableArr } = phones.length > 1 ? computeWins() : { wins: [] as number[], total: [] as number[] };
  const maxWins = Math.max(...winCountsArr, 0);
  const winnerIdx = winCountsArr.indexOf(maxWins);
  const isDraw = winCountsArr.filter(w => w === maxWins).length > 1;

  return (
    <motion.div className="content-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="content-header">
        <div>
          <h1 className="text-gradient">{t('nav.compare')}</h1>
          <p className="subtitle">{MAX} {t('compare.maxPhones')}</p>
        </div>
        {phones.length < MAX && (
          <form onSubmit={search} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div className="search-bar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder={t('search.placeholder')} />
              {searching && <div style={{ width: 14, height: 14, border: '2px solid #22c55e', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />}
            </div>
          </form>
        )}
      </div>

      {results.length > 0 && (
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', maxHeight: 320, overflowY: 'auto' }}>
          {results.map(phone => {
            const c = PALETTE[phone.brand?.toLowerCase()] || '#22c55e';
            return (
              <button key={phone.slug} onClick={() => add(phone)} disabled={loadingPhone}
                className={`phone-row${hoveredResult === phone.slug ? ' glow-sm' : ''}`} style={{ cursor: 'pointer', border: 'none', background: 'none', width: '100%', fontFamily: 'inherit', color: 'inherit' }}
                onMouseEnter={() => setHoveredResult(phone.slug)}
                onMouseLeave={() => setHoveredResult(null)}>
                <div className="phone-name-cell" style={{ gap: 12 }}>
                  <div className="phone-thumb" style={{ background: c, width: 36, height: 36, borderRadius: 10 }}>{getInitials(phone.brand || phone.phone_name)}</div>
                  <span className="phone-name" style={{ fontSize: 12 }}>{phone.phone_name}</span>
                </div>
                <div />
                <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 500, whiteSpace: 'nowrap' }}>+ {t('compare.add')}</div>
              </button>
            );
          })}
        </div>
      )}

      {phones.length > 0 && (
        <div style={{ display: 'flex', gap: 10, padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.04)', flexWrap: 'wrap' }}>
          {phones.map((p, i) => {
            const c = PALETTE[p.brand?.toLowerCase()] || '#22c55e';
            return (
              <motion.div key={i} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff' }}>{getInitials(p.brand || p.phone_name)}</div>
                <span style={{ fontSize: 12, fontWeight: 500 }}>{p.phone_name}</span>
                <button onClick={() => remove(i)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', padding: '0 4px' }}>x</button>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* WINNER BANNER */}
      {phones.length > 1 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          style={{ padding: '20px 32px', borderBottom: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
          {isDraw ? (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
              {winCountsArr.map((cnt, i) => cnt === maxWins && (
                <div key={i}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{phones[i].phone_name}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#22c55e' }}>{cnt} / {totalComparableArr[i]} {t('compare.wins')}</div>
                  <div className="spec-progress" style={{ width: 120, margin: '8px auto 0' }}>
                    <div className="spec-progress-fill" style={{ width: `${((cnt / (totalComparableArr[i] || 1)) * 100)}%` }} />
                  </div>
                </div>
              ))}
              <div style={{ width: '100%', fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: 6 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {t('compare.draw')}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div className="glow" style={{ width: 44, height: 44, borderRadius: 14, background: PALETTE[phones[winnerIdx]?.brand?.toLowerCase()] || '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>
                {getInitials(phones[winnerIdx]?.brand || phones[winnerIdx]?.phone_name)}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{t('compare.winner')}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#22c55e', fontFamily: "'DM Sans', system-ui, sans-serif" }}>{phones[winnerIdx]?.phone_name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                  {winCountsArr[winnerIdx]} / {totalComparableArr[winnerIdx]} {t('compare.wins')}
                  <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.15)' }}>·</span>
                  {((winCountsArr[winnerIdx] / (totalComparableArr[winnerIdx] || 1)) * 100).toFixed(0)}%
                </div>
                <div className="spec-progress" style={{ width: 120, margin: '8px auto 0' }}>
                  <div className="spec-progress-fill" style={{ width: `${((winCountsArr[winnerIdx] / (totalComparableArr[winnerIdx] || 1)) * 100)}%` }} />
                </div>
              </div>
              <div style={{ marginLeft: 16 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {phones.length === 0 ? (
        <div className="empty-state">
          <div className="icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg></div>
          <p>{t('compare.emptyDesc')}</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="compare-table">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <th style={{ width: 150, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('compare.spec')}</th>
                {phones.map((p, i) => {
                  const c = PALETTE[p.brand?.toLowerCase()] || '#22c55e';
                  const isWinner = !isDraw && i === winnerIdx;
                  return (
                    <th key={i} style={{ textAlign: 'center', minWidth: 140 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{getInitials(p.brand || p.phone_name)}</div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: isWinner ? '#22c55e' : '#fff' }}>{p.phone_name}</span>
                        {isWinner && <span style={{ fontSize: 9, color: '#22c55e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('compare.winner')}</span>}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <motion.tbody initial="hidden" animate="show">
              {phones[0]?.quickSpec && (
                <>
                  <tr className="cat-row"><td colSpan={phones.length + 1}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#22c55e" style={{ marginRight: 8, verticalAlign: 'middle' }}><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
                    {t('compare.overview')}
                  </td></tr>
                  {Array.from({ length: Math.max(...phones.map(p => p.quickSpec?.length || 0)) }).map((_, qi) => {
                    const vals = phones.map(p => p.quickSpec?.[qi]?.value || '—');
                    const winners = findWinners(vals, phones[0]?.quickSpec?.[qi]?.name || '');
                    return (
                      <motion.tr key={`qs-${qi}`} variants={rowVariants} custom={qi}
                        style={{ background: hoveredRow === `qs-${qi}` ? 'rgba(255,255,255,0.02)' : 'transparent' }}
                        onMouseEnter={() => setHoveredRow(`qs-${qi}`)}
                        onMouseLeave={() => setHoveredRow(null)}>
                        <td style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 500, fontSize: 11 }}>{translateSpec(phones[0]?.quickSpec?.[qi]?.name || '', lang)}</td>
                        {phones.map((p, pi) => {
                          const isWin = winners.includes(pi);
                          return (
                            <td key={pi} style={{ textAlign: 'center', fontWeight: 600, color: isWin ? '#22c55e' : '#fff', background: isWin ? 'rgba(34,197,94,0.06)' : 'transparent' }}>
                              {isWin && <span style={{ marginRight: 4, fontSize: 10 }}>🏆</span>}
                              {p.quickSpec?.[qi]?.value || '—'}
                            </td>
                          );
                        })}
                      </motion.tr>
                    );
                  })}
                </>
              )}
              {categories.flatMap(cat => [
                <tr key={`cat-${cat}`} className="cat-row">
                  <td colSpan={phones.length + 1}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#22c55e" style={{ marginRight: 8, verticalAlign: 'middle' }}><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
                    {translateSpec(cat, lang)}
                  </td>
                </tr>,
                ...Array.from({ length: Math.max(...phones.map(p => p.detailSpec?.find(s => s.category === cat)?.specifications.length || 0)) }).map((_, ii) => {
                  const vals = phones.map(p => p.detailSpec?.find(s => s.category === cat)?.specifications[ii]?.value || '—');
                  const winners = findWinners(vals, phones[0]?.detailSpec?.find(s => s.category === cat)?.specifications[ii]?.name || '');
                  return (
                    <motion.tr key={`${cat}-${ii}`} variants={rowVariants} custom={ii}
                      style={{ background: hoveredRow === `${cat}-${ii}` ? 'rgba(255,255,255,0.02)' : 'transparent' }}
                      onMouseEnter={() => setHoveredRow(`${cat}-${ii}`)}
                      onMouseLeave={() => setHoveredRow(null)}>
                      <td style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 500, fontSize: 11 }}>{translateSpec(phones[0]?.detailSpec?.find(s => s.category === cat)?.specifications[ii]?.name || '', lang)}</td>
                      {phones.map((p, pi) => {
                        const isWin = winners.includes(pi);
                        return (
                          <td key={pi} style={{ color: isWin ? '#22c55e' : 'rgba(255,255,255,0.65)', fontWeight: isWin ? 600 : 400, background: isWin ? 'rgba(34,197,94,0.04)' : 'transparent' }}>
                            {isWin && <span style={{ marginRight: 3, fontSize: 9 }}>🏆</span>}
                            {p.detailSpec?.find(s => s.category === cat)?.specifications[ii]?.value || '—'}
                          </td>
                        );
                      })}
                    </motion.tr>
                  );
                }),
              ])}
            </motion.tbody>
          </table>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </motion.div>
  );
}
