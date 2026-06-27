import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
        <div style={{ padding: 28 }}>
          <div className="skeleton" style={{ height: 20, width: 200, marginBottom: 20 }} />
          <div className="skeleton" style={{ height: 200, borderRadius: 16 }} />
        </div>
      </div>
    );
  }

  if (error || !phone) {
    return (
      <div className="content-card">
        <div className="empty-state">
          <div className="icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>{error || 'Phone not found'}</p>
          <Link to="/catalog" className="btn-ghost" style={{ textDecoration: 'none' }}>{t('common.back')}</Link>
        </div>
      </div>
    );
  }

  const brand = phone.brand || phone.phone_name.split(' ')[0];
  const c = PALETTE[brand.toLowerCase()] || '#22c55e';
  const lang = i18n.language;

  return (
    <div className="content-card">
      {/* Header */}
      <div className="content-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/catalog" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: 12 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </Link>
          <div className={`phone-thumb ${phone.image ? 'has-img' : ''}`} style={phone.image ? { background: c, width: 36, height: 36 } : { background: c, width: 36, height: 36 }}>
            {phone.image ? <img src={phone.image} alt="" onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none'; t.parentElement?.classList.remove('has-img'); }} /> : <span className="initials-fallback">{getInitials(brand)}</span>}
          </div>
          <div>
            <h1 style={{ fontSize: 18 }}>{phone.phone_name}</h1>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{brand}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {phone.url && (
            <a href={phone.url} target="_blank" rel="noopener noreferrer" className="btn-green" style={{ textDecoration: 'none' }}>
              GSMArena <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </a>
          )}
        </div>
      </div>

      {/* Quick Specs */}
      {phone.quickSpec?.length > 0 && (
        <div style={{ display: 'flex', gap: 8, padding: '16px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap' }}>
          {phone.quickSpec.map((spec, i) => (
            <div key={i} style={{ padding: '6px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', fontSize: 12 }}>
              <span style={{ color: 'rgba(255,255,255,0.35)' }}>{spec.name}</span>{' '}
              <span style={{ color: '#fff', fontWeight: 500 }}>{spec.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Specs */}
      {phone.detailSpec?.length > 0 && (
        <div>
          {phone.detailSpec.map((section, si) => (
            <div key={si} className="spec-group">
              <div className="spec-group-header">
                <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)' }}>
                  {String(si + 1).padStart(2, '0')}
                </span>
                {translateSpec(section.category, lang)}
              </div>
              {section.specifications.map((item, ii) => (
                <div key={ii} className="spec-line">
                  <span className="spec-label">{translateSpec(item.name, lang)}</span>
                  <span className="spec-value">{item.value}</span>
                </div>
              ))}
            </div>
          ))}
          <div style={{ height: 20 }} />
        </div>
      )}
    </div>
  );
}
