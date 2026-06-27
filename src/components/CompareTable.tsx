import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { PhoneDetail } from '../types/phone';

interface Props {
  phones: PhoneDetail[];
  onRemove: (index: number) => void;
}

const BRAND_COLORS: Record<string, string[]> = {
  samsung: ['#1428a0', '#4a6cf7'],
  apple: ['#333333', '#666666'],
  xiaomi: ['#ff6700', '#ff9a56'],
  google: ['#4285f4', '#34a853'],
  oneplus: ['#f5010c', '#ff4444'],
};

function getBrandColor(brand: string): string[] {
  return BRAND_COLORS[brand.toLowerCase()] || ['#6c5ce7', '#a29bfe'];
}

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
}

export default function CompareTable({ phones, onRemove }: Props) {
  const { t } = useTranslation();

  if (phones.length === 0) {
    return (
      <div className="rounded-2xl p-12 text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="text-5xl mb-4">📊</div>
        <h3 className="text-lg font-bold text-[var(--text)] mb-2" style={{ fontFamily: 'Outfit' }}>
          {t('compare.empty')}
        </h3>
        <p className="text-sm text-[var(--text-3)]">Search and add phones above</p>
      </div>
    );
  }

  const allCategories = Array.from(
    new Set(phones.flatMap((p) => p.detailSpec?.map((s) => s.category) || []))
  );

  const getSpecValue = (phone: PhoneDetail, category: string, specName: string): string => {
    const cat = phone.detailSpec?.find((c) => c.category === category);
    const spec = cat?.specifications.find((s) => s.name === specName);
    return spec?.value || '—';
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th className="text-left p-4 text-[var(--text-3)] font-medium text-[11px] uppercase tracking-wider w-40" style={{ background: 'var(--surface)' }}>
                {t('phone.specifications')}
              </th>
              {phones.map((phone, i) => {
                const brand = phone.brand || phone.phone_name.split(' ')[0];
                const [c1, c2] = getBrandColor(brand);
                return (
                  <th key={i} className="p-4 text-center min-w-[180px]" style={{ background: 'var(--surface)' }}>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative"
                    >
                      <button
                        onClick={() => onRemove(i)}
                        className="absolute top-0 right-0 text-[var(--text-3)] hover:text-red-400 text-[11px] w-5 h-5 rounded-lg bg-[var(--surface-2)] flex items-center justify-center"
                      >
                        ✕
                      </button>
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2 text-white text-[12px] font-bold" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}>
                        {getInitials(brand)}
                      </div>
                      <h4 className="text-[13px] font-semibold text-[var(--text)] truncate" style={{ fontFamily: 'Outfit' }}>
                        {phone.phone_name}
                      </h4>
                      <p className="text-[11px] text-[var(--text-3)]">{brand}</p>
                    </motion.div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {allCategories.map((category) => (
              <tbody key={category}>
                <tr>
                  <td
                    colSpan={phones.length + 1}
                    className="px-4 py-2.5 text-[var(--accent)] font-semibold text-[11px] uppercase tracking-wider"
                    style={{ background: 'var(--surface-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
                  >
                    {category}
                  </td>
                </tr>
                {getUniqueSpecNames(phones, category).map((specName) => (
                  <tr key={specName} className="hover:bg-[var(--surface)]/50 transition-colors" style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="p-3 text-[var(--text-3)] text-[12px] font-medium">{specName}</td>
                    {phones.map((phone, i) => {
                      const value = getSpecValue(phone, category, specName);
                      return (
                        <td key={i} className="p-3 text-center text-[12px] text-[var(--text)]">
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getUniqueSpecNames(phones: PhoneDetail[], category: string): string[] {
  const names = new Set<string>();
  phones.forEach((phone) => {
    const cat = phone.detailSpec?.find((c) => c.category === category);
    cat?.specifications.forEach((s) => names.add(s.name));
  });
  return Array.from(names);
}
