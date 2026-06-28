import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBrands, getPhonesByBrand, searchPhones } from '../utils/api';
import type { Phone, Brand } from '../types/phone';

const PALETTE: Record<string, string> = {
  samsung: '#1428a0', apple: '#555555', xiaomi: '#ff6700', google: '#4285f4',
  oneplus: '#f5010c', huawei: '#cf0a2c', nothing: '#888888', realme: '#ffc500',
  oppo: '#1a8a1a', sony: '#333333', motorola: '#5c2d91', nokia: '#124191',
  honor: '#c6002b', vivo: '#415fff',
};
function getInitials(n: string) { return n.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase(); }

export default function Catalog() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [brand, setBrand] = useState(searchParams.get('brand') || '');
  const [view, setView] = useState<'list' | 'grid'>('list');

  useEffect(() => { getBrands().then(setBrands).catch(() => {}); }, []);

  useEffect(() => {
    setLoading(true);
    const req = brand ? getPhonesByBrand(brand) : query ? searchPhones(query) : searchPhones('Samsung');
    req.then(setPhones).catch(() => {}).finally(() => setLoading(false));
  }, [brand, query]);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) { setBrand(''); setSearchParams({ q: query.trim() }); }
  };

  const pickBrand = (slug: string) => {
    const next = slug === brand ? '' : slug;
    setBrand(next);
    setQuery('');
    setSearchParams(next ? { brand: next } : {});
  };

  return (
    <div className="content-card">
      <div className="content-header">
        <div>
          <h1>{t('nav.catalog')}</h1>
          <p className="subtitle">{phones.length} {t('home.phonesCount')} · {brands.length} {t('home.brandsCount')}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 3 }}>
            <button onClick={() => setView('list')} className="btn btn-sm btn-ghost" style={{ background: view === 'list' ? 'rgba(255,255,255,0.08)' : 'transparent', border: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </button>
            <button onClick={() => setView('grid')} className="btn btn-sm btn-ghost" style={{ background: view === 'grid' ? 'rgba(255,255,255,0.08)' : 'transparent', border: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            </button>
          </div>
          <form onSubmit={search}>
            <div className="search-bar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder={t('search.placeholder')} />
            </div>
          </form>
        </div>
      </div>

      <div style={{ padding: '12px 32px', display: 'flex', gap: 6, overflowX: 'auto', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <button onClick={() => pickBrand('')} className={`filter-chip ${!brand ? 'active' : ''}`}>{t('home.tabAll')}</button>
        {brands.map(b => (
          <button key={b.slug} onClick={() => pickBrand(b.slug)} className={`filter-chip ${brand === b.slug ? 'active' : ''}`}>{b.brand_name}</button>
        ))}
      </div>

      <div>
        {loading ? (
          view === 'list' ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ padding: '14px 32px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', gap: 14, alignItems: 'center' }}>
                <div className="skeleton" style={{ width: 52, height: 52, borderRadius: 14 }} />
                <div style={{ flex: 1 }}><div className="skeleton" style={{ height: 12, width: '40%', marginBottom: 6 }} /><div className="skeleton" style={{ height: 10, width: '25%' }} /></div>
              </div>
            ))
          ) : (
            <div className="featured-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="featured-card">
                  <div className="skeleton" style={{ width: 80, height: 80, borderRadius: 12 }} />
                  <div className="skeleton" style={{ height: 12, width: '70%' }} />
                  <div className="skeleton" style={{ height: 10, width: '40%' }} />
                </div>
              ))}
            </div>
          )
        ) : phones.length === 0 ? (
          <div className="empty-state">
            <div className="icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
            <p>{t('home.noResults')}</p>
          </div>
        ) : view === 'list' ? (
          phones.map((phone, idx) => {
            const c = PALETTE[phone.brand?.toLowerCase()] || '#22c55e';
            return (
              <motion.div key={phone.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}>
                <Link to={`/phone/${phone.slug}`} className="phone-row">
                  <div className="phone-name-cell">
                    <div className={`phone-thumb ${phone.image ? 'has-img' : ''}`} style={phone.image ? {} : { background: c }}>
                      {phone.image ? (
                        <img src={phone.image} alt="" loading="lazy" onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none'; t.parentElement?.classList.remove('has-img'); t.parentElement!.style.background = c; }} />
                      ) : <span className="initials-fallback">{getInitials(phone.brand || phone.phone_name)}</span>}
                    </div>
                    <div className="phone-name">{phone.phone_name}</div>
                  </div>
                  <div className="phone-meta">{phone.brand}</div>
                  <div className="phone-actions">{t('home.viewDetails')} &rarr;</div>
                </Link>
              </motion.div>
            );
          })
        ) : (
          <div className="featured-grid">
            {phones.map(phone => {
              const c = PALETTE[phone.brand?.toLowerCase()] || '#22c55e';
              return (
                <Link key={phone.slug} to={`/phone/${phone.slug}`} className="featured-card">
                  <div className="thumb" style={{ width: 80, height: 80, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: phone.image ? 'transparent' : c }}>
                    {phone.image ? <img src={phone.image} alt="" className="thumb" style={{ width: '100%', height: '100%' }} loading="lazy" /> : <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{getInitials(phone.brand || phone.phone_name)}</span>}
                  </div>
                  <div className="name">{phone.phone_name}</div>
                  <div className="brand">{phone.brand}</div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
