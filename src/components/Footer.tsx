import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          <div className="md:col-span-2">
            <span className="text-[20px] font-bold tracking-tight" style={{ fontFamily: 'Space Grotesk', color: 'var(--text)' }}>
              phone<span style={{ color: 'var(--accent)' }}>.</span>dia
            </span>
            <p className="text-[13px] leading-[1.7] mt-4 max-w-sm" style={{ color: 'var(--text-3)' }}>
              {t('home.description')}. Real-time data from GSMArena.
            </p>
          </div>
          <div>
            <div className="text-[11px] font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--text-3)', fontFamily: 'Space Grotesk' }}>Navigate</div>
            <div className="flex flex-col gap-3">
              {[
                { to: '/', label: t('nav.home') },
                { to: '/catalog', label: t('nav.catalog') },
                { to: '/compare', label: t('nav.compare') },
                { to: '/quiz', label: t('nav.quiz') },
              ].map(l => (
                <Link key={l.to} to={l.to} className="text-[13px] no-underline transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--text-2)' }}>{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--text-3)', fontFamily: 'Space Grotesk' }}>Data</div>
            <a href="https://www.gsmarena.com" target="_blank" rel="noopener noreferrer" className="text-[13px] no-underline transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--text-2)' }}>GSMArena.com</a>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-[11px]" style={{ color: 'var(--text-3)' }}>2026 phone.dia</p>
          <p className="text-[11px]" style={{ color: 'var(--text-3)' }}>React + Vite</p>
        </div>
      </div>
    </footer>
  );
}
