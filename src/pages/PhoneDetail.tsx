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

function specProgress(name: string, value: string): number {
  const num = parseFloat(value.replace(/[^0-9.]/g, ''));
  if (isNaN(num)) return 0;
  const ranges: Record<string, { min: number; max: number }> = {
    'display': { min: 4, max: 7.5 },
    'ram': { min: 1, max: 24 },
    'storage': { min: 8, max: 1024 },
    'camera': { min: 2, max: 200 },
    'battery': { min: 1500, max: 7000 },
    'weight': { min: 100, max: 350 },
    'chipset': { min: 0, max: 1 },
    'price': { min: 50, max: 2000 },
  };
  for (const [key, range] of Object.entries(ranges)) {
    if (name.toLowerCase().includes(key)) {
      const pct = ((num - range.min) / (range.max - range.min)) * 100;
      return Math.min(100, Math.max(0, Math.round(pct)));
    }
  }
  if (num > 0) {
    const pct = (num / 1000) * 100;
    return Math.min(100, Math.round(pct));
  }
  return 0;
}

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

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('scroll-progress-fill');
      if (!el) return;
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      el.style.width = scrolled + '%';
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <>
      <motion.div className="scroll-progress" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 3, zIndex: 1000, background: 'rgba(255,255,255,0.08)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="scroll-progress-fill" id="scroll-progress-fill" style={{ height: '100%', width: '0%', background: c, transition: 'width 0.1s linear', borderRadius: '0 2px 2px 0' }} />
      </motion.div>
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
              <h1 className="text-gradient" style={{ fontSize: 20, background: `linear-gradient(135deg, ${c}, #fff)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{phone.phone_name}</h1>
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
                <div className="spec-group-header" style={{ borderLeft: `3px solid ${c}` }}>
                  {translateSpec(section.category, lang)}
                </div>
                {section.specifications.map((item, ii) => (
                  <div key={ii} className="spec-line">
                    <span className="spec-label">{translateSpec(item.name, lang)}</span>
                    <span className="spec-value">{item.value}</span>
                    {specProgress(item.name, item.value) > 0 && (
                      <div className="spec-progress" style={{ marginTop: 4, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', width: '100%' }}>
                        <div className="spec-progress-fill" style={{ width: `${specProgress(item.name, item.value)}%`, height: '100%', background: c, borderRadius: 2, transition: 'width 0.3s ease' }} />
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            ))}
            <div style={{ height: 24 }} />
          </div>
        )}
      </motion.div>
    </>
  );
}
