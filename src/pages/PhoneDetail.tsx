import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { getPhoneDetail } from '../utils/api';
import { translateSpec } from '../utils/specTranslations';
import type { PhoneDetail as PD } from '../types/phone';

const PALETTE: Record<string, string> = {
  samsung: '#1428a0', apple: '#555555', xiaomi: '#ff6700', google: '#4285f4',
  oneplus: '#f5010c', huawei: '#cf0a2c', nothing: '#888888', realme: '#ffc500',
  oppo: '#1a8a1a', sony: '#333333', motorola: '#5c2d91', nokia: '#124191',
  honor: '#c6002b', vivo: '#415fff',
};
function getInitials(n: string) { return n.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase(); }

export default function PhoneDetail() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const [phone, setPhone] = useState<PD | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getPhoneDetail(slug).then(setPhone).catch(() => setError('not found')).finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="content-card">
        <div style={{ padding: 32 }}>
          <div className="skeleton" style={{ height: 24, width: 240, marginBottom: 24 }} />
          <div className="skeleton" style={{ height: 240, borderRadius: 16, marginBottom: 24 }} />
          <div className="skeleton" style={{ height: 14, width: '60%', marginBottom: 8 }} />
          <div className="skeleton" style={{ height: 14, width: '40%' }} />
        </div>
      </div>
    );
  }

  if (error || !phone) {
    return (
      <div className="content-card">
        <div className="empty-state">
          <div className="icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
          <p>{error || 'Phone not found'}</p>
          <Link to="/catalog" className="btn btn-ghost" style={{ marginTop: 16, textDecoration: 'none' }}>{t('common.back')}</Link>
        </div>
      </div>
    );
  }

  const brand = phone.brand || phone.phone_name.split(' ')[0];
  const c = PALETTE[brand.toLowerCase()] || '#22c55e';
  const lang = i18n.language;

  return (
    <motion.div className="content-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="content-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/catalog" className="btn btn-ghost btn-sm" style={{ textDecoration: 'none' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </Link>
          <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: phone.image ? 'rgba(255,255,255,0.04)' : c, border: phone.image ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
            {phone.image ? (
              <img src={phone.image} alt="" style={{ width: '85%', height: '85%', objectFit: 'contain' }} onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none'; }} />
            ) : <span className="initials-fallback">{getInitials(brand)}</span>}
          </div>
          <div>
            <h1 style={{ fontSize: 20 }}>{phone.phone_name}</h1>
            <p className="subtitle" style={{ marginTop: 2 }}>{brand}</p>
          </div>
        </div>
      </div>

      {phone.quickSpec?.length > 0 && (
        <div style={{ display: 'flex', gap: 10, padding: '20px 32px', borderBottom: '1px solid rgba(255,255,255,0.04)', flexWrap: 'wrap' }}>
          {phone.quickSpec.map((spec, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              style={{ padding: '8px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 2 }}>{spec.name}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{spec.value}</div>
            </motion.div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <Link to="/compare" className="btn btn-sm btn-ghost" style={{ textDecoration: 'none' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
          {t('compare.title')}
        </Link>
      </div>

      {phone.detailSpec?.length > 0 && (
        <div>
          {phone.detailSpec.map((section, si) => (
            <motion.div key={si} className="spec-group" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: si * 0.05 }}>
              <div className="spec-group-header">
                {translateSpec(section.category, lang)}
              </div>
              {section.specifications.map((item, ii) => (
                <div key={ii} className="spec-line">
                  <span className="spec-label">{translateSpec(item.name, lang)}</span>
                  <span className="spec-value">{item.value}</span>
                </div>
              ))}
            </motion.div>
          ))}
          <div style={{ height: 24 }} />
        </div>
      )}
    </motion.div>
  );
}
