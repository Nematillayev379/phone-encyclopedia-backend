import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { getBrands, getLatestPhones, getTopPhones } from '../utils/api';
import type { Phone, Brand } from '../types/phone';

const PALETTE: Record<string, string> = {
  samsung: '#1428a0', apple: '#555555', xiaomi: '#ff6700', google: '#4285f4',
  oneplus: '#f5010c', huawei: '#cf0a2c', nothing: '#888888', realme: '#ffc500',
  oppo: '#1a8a1a', sony: '#333333', motorola: '#5c2d91', nokia: '#124191',
  honor: '#c6002b', vivo: '#415fff',
};

function getInitials(n: string) { return n.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase(); }

function StatCard({ value, label, delay }: { value: string | number; label: string; delay: number }) {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
    >
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [latest, setLatest] = useState<Phone[]>([]);
  const [top, setTop] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([getBrands(), getLatestPhones(), getTopPhones()])
      .then(([b, l, tp]) => {
        if (b.status === 'fulfilled') setBrands(b.value);
        if (l.status === 'fulfilled') setLatest(l.value.slice(0, 6));
        if (tp.status === 'fulfilled') setTop(tp.value.slice(0, 6));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="content-card">
        <div className="content-header">
          <div>
            <h1>{t('home.dashboard')}</h1>
          </div>
        </div>
        <div className="stats-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="stat-card">
              <div className="skeleton" style={{ height: 28, width: '50%', margin: '0 auto 8px' }} />
              <div className="skeleton" style={{ height: 10, width: '60%', margin: '0 auto' }} />
            </div>
          ))}
        </div>
        <div className="featured-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="featured-card">
              <div className="skeleton" style={{ width: 80, height: 80, borderRadius: 12 }} />
              <div className="skeleton" style={{ height: 12, width: '70%' }} />
              <div className="skeleton" style={{ height: 10, width: '40%' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const totalPhones = latest.length + top.length;

  return (
    <div className="content-card">
      <div className="content-header">
        <div>
          <h1>{t('home.dashboard')}</h1>
          <p className="subtitle">{brands.length} {t('home.brandsCount')} · {totalPhones}+ {t('home.phonesCount')}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/quiz" className="btn btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            {t('nav.quiz')}
          </Link>
          <Link to="/catalog" className="btn btn-ghost">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            {t('nav.catalog')}
          </Link>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard value={brands.length} label={t('home.brandsCount')} delay={0.1} />
        <StatCard value={`${totalPhones}+`} label={t('home.phonesCount')} delay={0.15} />
        <StatCard value={top.length} label={t('home.tabPopular')} delay={0.2} />
        <StatCard value="3" label={t('home.languages')} delay={0.25} />
      </div>

      <div className="tabs">
        <div className="tab active">{t('home.tabLatest')} <span className="tab-count">{latest.length}</span></div>
        <div className="tab">{t('home.tabPopular')} <span className="tab-count">{top.length}</span></div>
        <div className="tab">{t('home.tabBrands')} <span className="tab-count">{brands.length}</span></div>
      </div>

      <div style={{ padding: '24px 32px 8px' }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 16, fontFamily: "'DM Sans', system-ui, sans-serif", letterSpacing: '-0.01em' }}>
          {t('home.tabLatest')}
        </h3>
        <div className="featured-grid" style={{ padding: 0 }}>
          {latest.map(phone => {
            const c = PALETTE[phone.brand?.toLowerCase()] || '#22c55e';
            return (
              <Link key={phone.slug} to={`/phone/${phone.slug}`} className="featured-card">
                <div className="thumb" style={{ width: 80, height: 80, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: phone.image ? 'transparent' : c }}>
                  {phone.image ? (
                    <img src={phone.image} alt="" className="thumb" style={{ width: '100%', height: '100%' }} loading="lazy" />
                  ) : (
                    <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{getInitials(phone.brand || phone.phone_name)}</span>
                  )}
                </div>
                <div>
                  <div className="name">{phone.phone_name}</div>
                  <div className="brand">{phone.brand}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {brands.length > 0 && (
        <div style={{ padding: '24px 32px' }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 16, fontFamily: "'DM Sans', system-ui, sans-serif", letterSpacing: '-0.01em' }}>
            {t('home.tabBrands')}
          </h3>
          <div className="brand-grid" style={{ padding: 0 }}>
            {brands.slice(0, 18).map(b => (
              <Link key={b.slug} to={`/catalog?brand=${b.slug}`} className="brand-chip">
                {b.brand_name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
