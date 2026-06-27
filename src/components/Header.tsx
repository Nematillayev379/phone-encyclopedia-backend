import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LANGS = [
  { code: 'uz', label: 'O\'Z' },
  { code: 'ru', label: 'РУ' },
  { code: 'en', label: 'EN' },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/catalog', label: t('nav.catalog') },
    { to: '/compare', label: t('nav.compare') },
    { to: '/quiz', label: t('nav.quiz') },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 no-underline shrink-0">
          <span className="text-[22px] font-bold tracking-tight" style={{ fontFamily: 'Space Grotesk', color: 'var(--text)' }}>
            phone<span style={{ color: 'var(--accent)' }}>.</span>dia
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="no-underline"
            >
              <span
                className="px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-300"
                style={{
                  color: location.pathname === link.to ? 'var(--accent)' : 'var(--text-2)',
                  background: location.pathname === link.to ? 'rgba(200,182,255,0.06)' : 'transparent',
                }}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-[var(--border)] overflow-hidden">
            {LANGS.map(lang => (
              <button
                key={lang.code}
                onClick={() => i18n.changeLanguage(lang.code)}
                className="px-3 py-1.5 text-[11px] font-semibold tracking-wider transition-all duration-300"
                style={{
                  background: i18n.language === lang.code ? 'var(--text)' : 'transparent',
                  color: i18n.language === lang.code ? 'var(--bg)' : 'var(--text-3)',
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-[5px]">
              <span className="block w-5 h-[1.5px] rounded-full transition-all duration-300" style={{
                background: 'var(--text)',
                transform: mobileOpen ? 'rotate(45deg) translateY(3.5px)' : 'none',
              }} />
              <span className="block w-5 h-[1.5px] rounded-full transition-all duration-300" style={{
                background: 'var(--text)',
                opacity: mobileOpen ? 0 : 1,
              }} />
              <span className="block w-5 h-[1.5px] rounded-full transition-all duration-300" style={{
                background: 'var(--text)',
                transform: mobileOpen ? 'rotate(-45deg) translateY(-3.5px)' : 'none',
              }} />
            </div>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 pb-6" style={{ background: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(20px)' }}>
          <nav className="flex flex-col gap-1">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="no-underline"
              >
                <span
                  className="block py-3 text-[15px] font-medium transition-colors"
                  style={{
                    color: location.pathname === link.to ? 'var(--accent)' : 'var(--text-2)',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
