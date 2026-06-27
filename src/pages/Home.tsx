import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getBrands, searchPhones } from '../utils/api';
import type { Phone, Brand } from '../types/phone';

const PALETTE: Record<string, string> = {
  samsung: '#1428a0', apple: '#555555', xiaomi: '#ff6700', google: '#4285f4',
  oneplus: '#f5010c', huawei: '#cf0a2c', nothing: '#888888', realme: '#ffc500',
  oppo: '#1a8a1a', sony: '#333333', motorola: '#5c2d91', nokia: '#124191',
  honor: '#c6002b', vivo: '#415fff',
};

function getInitials(n: string) { return n.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase(); }

export default function Home() {
  const { t } = useTranslation();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([getBrands(), searchPhones('Samsung')])
      .then(([b, p]) => {
        if (b.status === 'fulfilled') setBrands(b.value);
        if (p.status === 'fulfilled') setPhones(p.value.slice(0, 20));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="content-card">
      <div className="content-header">
        <div>
          <h1>{t('home.dashboard')}</h1>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{brands.length} {t('home.brandsCount')} · {phones.length}{t('home.phonesCount')}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/quiz" className="btn-green" style={{ textDecoration: 'none' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            {t('nav.quiz')}
          </Link>
          <Link to="/catalog" className="btn-ghost" style={{ textDecoration: 'none' }}>
            {t('nav.catalog')}
          </Link>
        </div>
      </div>

      <div className="tabs">
        <div className="tab active">{t('home.tabAll')} <span className="tab-count">{phones.length}</span></div>
        <div className="tab">{t('home.tabBrands')} <span className="tab-count">{brands.length}</span></div>
      </div>

      <div style={{ padding: '0' }}>
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ padding: '14px 28px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: 14, alignItems: 'center' }}>
              <div className="skeleton" style={{ width: 40, height: 40, borderRadius: 10 }} />
              <div style={{ flex: 1 }}>
                <div className="skeleton" style={{ height: 12, width: '40%', marginBottom: 6 }} />
                <div className="skeleton" style={{ height: 10, width: '25%' }} />
              </div>
            </div>
          ))
        ) : phones.length === 0 ? (
          <div className="empty-state">
            <div className="icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{t('home.noResults')}</p>
          </div>
        ) : (
          phones.map(phone => {
            const c = PALETTE[phone.brand?.toLowerCase()] || '#22c55e';
            return (
              <Link key={phone.slug} to={`/phone/${phone.slug}`} className="phone-row">
                <div className="phone-name-cell">
                  <div className={`phone-thumb ${phone.image ? 'has-img' : ''}`} style={phone.image ? {} : { background: c }}>
                    {phone.image ? (
                      <img src={phone.image} alt="" loading="lazy" onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none'; t.parentElement?.classList.remove('has-img'); t.parentElement!.style.background = c; }} />
                    ) : <span className="initials-fallback">{getInitials(phone.brand || phone.phone_name)}</span>}
                  </div>
                  <div>
                    <div className="phone-name">{phone.phone_name} <span className="dot" /></div>
                  </div>
                </div>
                <div className="phone-meta">{phone.brand}</div>
                <div className="phone-actions">{t('home.viewDetails')} &rarr;</div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
