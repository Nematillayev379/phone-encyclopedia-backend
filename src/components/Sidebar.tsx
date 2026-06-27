import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const LANGS = [
  { code: 'uz', label: 'O\'Z' },
  { code: 'ru', label: 'РУ' },
  { code: 'en', label: 'EN' },
];

export default function Sidebar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = [
    { to: '/', label: t('nav.home'), icon: <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { to: '/catalog', label: t('nav.catalog'), icon: <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
    { to: '/compare', label: t('nav.compare'), icon: <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg> },
    { to: '/quiz', label: t('nav.quiz'), icon: <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
  ];

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <button className="mobile-menu-btn" onClick={() => setMobileOpen(o => !o)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          {mobileOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
        </svg>
      </button>
      {mobileOpen && <div className="mobile-overlay" onClick={closeMobile} />}
      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <Link to="/" className="sidebar-logo" onClick={closeMobile}>
          <span className="dot" />
          phone<span style={{ color: '#22c55e' }}>.</span>dia
        </Link>

        <div className="nav-section">
          <div className="nav-label">{t('navigation')}</div>
          {nav.map(item => (
            <Link key={item.to} to={item.to} onClick={closeMobile} className={`nav-item ${location.pathname === item.to ? 'active' : ''}`}>
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <div className="nav-section">
          <div className="nav-label">{t('language')}</div>
          <div className="lang-switch" style={{ marginLeft: 12 }}>
            {LANGS.map(lang => (
              <button key={lang.code} onClick={() => i18n.changeLanguage(lang.code)} className={`lang-btn ${i18n.language === lang.code ? 'active' : ''}`}>
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: '12px', marginTop: 8, borderRadius: 10, background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.12)' }}>
          <div style={{ fontSize: 11, fontWeight: 500, color: '#22c55e', marginBottom: 4 }}>{t('dataSource')}</div>
          <a href="https://www.gsmarena.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
            GSMArena.com
          </a>
        </div>
      </aside>
    </>
  );
}
