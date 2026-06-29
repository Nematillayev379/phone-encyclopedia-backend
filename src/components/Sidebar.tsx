import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Sidebar() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const langs = [
    { code: 'uz', label: 'UZ' },
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
  ];

  const nav = [
    { to: '/', label: t('nav.home'), icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { to: '/catalog', label: t('nav.catalog'), icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
    { to: '/compare', label: t('nav.compare'), icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { to: '/quiz', label: t('nav.quiz'), icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  ];

  return (
    <>
      <button className="mobile-menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      {open && <div className="mobile-overlay" onClick={() => setOpen(false)} />}
      <aside className={`sidebar ${open ? 'mobile-open' : ''}`}>
        <Link to="/" className="sidebar-logo" onClick={() => setOpen(false)}>
          <div className="logo-icon" style={{ boxShadow: '0 4px 20px rgba(34,197,94,0.4)' }}>P</div>
          <span>Phone Encyclopedia</span>
        </Link>

        <div className="nav-section">
          <div className="nav-label">{t('nav.main')}</div>
          {nav.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {({ isActive }) => (
                <>
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={n.icon} />
                  </svg>
                  {n.label}
                  {isActive && (
                    <motion.div layoutId="activeIndicator"
                      style={{
                        position: 'absolute', left: 0, top: '50%',
                        width: 3, height: 20, borderRadius: '0 4px 4px 0',
                        background: '#22c55e', transform: 'translateY(-50%)' as any,
                        boxShadow: '0 0 12px rgba(34,197,94,0.4)',
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="nav-section" style={{ marginTop: 'auto' }}>
          <div className="nav-label">{t('nav.language')}</div>
          <div className="lang-switch">
            {langs.map(l => (
              <button
                key={l.code}
                className={`lang-btn ${i18n.language === l.code ? 'active' : ''}`}
                onClick={() => i18n.changeLanguage(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
