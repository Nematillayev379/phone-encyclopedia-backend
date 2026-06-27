import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

export default function Compare() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [phones, setPhones] = useState<PhoneDetail[]>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Phone[]>([]);
  const [searching, setSearching] = useState(false);
  const [loadingPhone, setLoadingPhone] = useState(false);
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

  return (
    <div className="content-card">
      <div className="content-header">
        <div>
          <h1>{t('nav.compare')}</h1>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{MAX} {t('compare.maxPhones')}</p>
        </div>
        {phones.length < MAX && (
          <form onSubmit={search} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div className="search-bar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder={t('search.placeholder')} />
              {searching && <div style={{ width: 12, height: 12, border: '1.5px solid #22c55e', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />}
            </div>
          </form>
        )}
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {results.slice(0, 5).map(phone => {
            const c = PALETTE[phone.brand?.toLowerCase()] || '#22c55e';
            return (
              <button key={phone.slug} onClick={() => add(phone)} disabled={loadingPhone} className="phone-row" style={{ cursor: 'pointer', border: 'none', background: 'none', width: '100%', fontFamily: 'inherit', color: 'inherit' }}>
                <div className="phone-name-cell">
                  <div className="phone-thumb" style={{ background: c, width: 32, height: 32, fontSize: 9 }}>{getInitials(phone.brand || phone.phone_name)}</div>
                  <div className="phone-name" style={{ fontSize: 12 }}>{phone.phone_name}</div>
                </div>
                <div />
                <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 500 }}>+ {t('compare.add')}</div>
              </button>
            );
          })}
        </div>
      )}

      {/* Selected Phones */}
      {phones.length > 0 && (
        <div style={{ display: 'flex', gap: 8, padding: '12px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap' }}>
          {phones.map((p, i) => {
            const c = PALETTE[p.brand?.toLowerCase()] || '#22c55e';
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="phone-thumb" style={{ background: c, width: 22, height: 22, borderRadius: 6, fontSize: 8 }}>{getInitials(p.brand || p.phone_name)}</div>
                <span style={{ fontSize: 11, fontWeight: 500 }}>{p.phone_name}</span>
                <button onClick={() => remove(i)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 11, fontFamily: 'inherit', padding: 0 }}>x</button>
              </div>
            );
          })}
        </div>
      )}

      {/* Comparison Table */}
      {phones.length === 0 ? (
        <div className="empty-state">
          <div className="icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg></div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{t('compare.emptyDesc')}</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="compare-table">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <th style={{ width: 140, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('compare.spec')}</th>
                {phones.map((p, i) => {
                  const c = PALETTE[p.brand?.toLowerCase()] || '#22c55e';
                  return (
                    <th key={i} style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                        <div className="phone-thumb" style={{ background: c, width: 32, height: 32 }}>{getInitials(p.brand || p.phone_name)}</div>
                        <span style={{ fontSize: 11, fontWeight: 500, color: '#fff' }}>{p.phone_name}</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {phones[0]?.quickSpec && (
                <>
                  <tr className="cat-row"><td colSpan={phones.length + 1}>{t('compare.overview')}</td></tr>
                  {Array.from({ length: Math.max(...phones.map(p => p.quickSpec?.length || 0)) }).map((_, qi) => (
                    <tr key={`qs-${qi}`}>
                      <td style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>{translateSpec(phones[0]?.quickSpec?.[qi]?.name || '', lang)}</td>
                      {phones.map((p, pi) => <td key={pi} style={{ textAlign: 'center', fontWeight: 500, color: '#fff' }}>{p.quickSpec?.[qi]?.value || '—'}</td>)}
                    </tr>
                  ))}
                </>
              )}
              {categories.map(cat => (
                <>
                  <tr className="cat-row" key={`cat-${cat}`}><td colSpan={phones.length + 1}>{translateSpec(cat, lang)}</td></tr>
                  {Array.from({ length: Math.max(...phones.map(p => p.detailSpec?.find(s => s.category === cat)?.specifications.length || 0)) }).map((_, ii) => (
                    <tr key={`${cat}-${ii}`}>
                      <td style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>{translateSpec(phones[0]?.detailSpec?.find(s => s.category === cat)?.specifications[ii]?.name || '', lang)}</td>
                      {phones.map((p, pi) => <td key={pi}>{p.detailSpec?.find(s => s.category === cat)?.specifications[ii]?.value || '—'}</td>)}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
