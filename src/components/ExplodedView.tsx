import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { PhoneDetail } from '../types/phone';

interface Props {
  phone: PhoneDetail;
}

interface PhonePart {
  id: string;
  labelUz: string;
  labelRu: string;
  labelEn: string;
  icon: string;
  color: string;
  yOffset: number;
  specCategory: string;
}

const phoneParts: PhonePart[] = [
  { id: 'display', labelUz: 'Ekran', labelRu: 'Экран', labelEn: 'Display', icon: '📱', color: '#58a6ff', yOffset: -180, specCategory: 'Display' },
  { id: 'camera', labelUz: 'Kamera', labelRu: 'Камера', labelEn: 'Camera', icon: '📷', color: '#f78166', yOffset: -120, specCategory: 'Main Camera' },
  { id: 'battery', labelUz: 'Batareya', labelRu: 'Батарея', labelEn: 'Battery', icon: '🔋', color: '#3fb950', yOffset: -60, specCategory: 'Battery' },
  { id: 'platform', labelUz: 'Protsessor', labelRu: 'Процессор', labelEn: 'Platform', icon: '⚡', color: '#bc8cff', yOffset: 0, specCategory: 'Platform' },
  { id: 'memory', labelUz: 'Xotira', labelRu: 'Память', labelEn: 'Memory', icon: '💾', color: '#d29922', yOffset: 60, specCategory: 'Memory' },
  { id: 'body', labelUz: 'Korpus', labelRu: 'Корпус', labelEn: 'Body', icon: '🏗️', color: '#79c0ff', yOffset: 120, specCategory: 'Body' },
  { id: 'sound', labelUz: 'Ovoz', labelRu: 'Звук', labelEn: 'Sound', icon: '🔊', color: '#ff7b72', yOffset: 180, specCategory: 'Sound' },
];

function getSpecForCategory(phone: PhoneDetail, category: string): string {
  const spec = phone.detailSpec?.find(
    (s) => s.category.toLowerCase() === category.toLowerCase()
  );
  if (!spec) return '—';
  return spec.specifications.map((s) => `${s.name}: ${s.value}`).join('\n');
}

function getQuickSpec(phone: PhoneDetail, name: string): string {
  const spec = phone.quickSpec?.find(
    (s) => s.name.toLowerCase().includes(name.toLowerCase())
  );
  return spec?.value || '—';
}

export default function ExplodedView({ phone }: Props) {
  const { i18n } = useTranslation();
  const [activePart, setActivePart] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const getLabel = (part: PhonePart) => {
    if (i18n.language === 'ru') return part.labelRu;
    if (i18n.language === 'en') return part.labelEn;
    return part.labelUz;
  };

  return (
    <div className="rounded-2xl p-6 h-[500px] flex flex-col" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      {/* Toggle button */}
      <div className="flex justify-center mb-4 shrink-0">
        <button
          onClick={() => { setIsExpanded(!isExpanded); setActivePart(null); }}
          className={`px-4 py-2 rounded-xl text-[12px] font-semibold transition-all border ${
            isExpanded
              ? 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20'
              : 'bg-[var(--surface-2)] text-[var(--text-3)] border-[var(--border)] hover:text-[var(--text)]'
          }`}
        >
          {isExpanded ? '📋 Specs View' : '🔧 Exploded View'}
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-center gap-6 min-h-0">
        {/* Parts visual */}
        <div className="relative flex-1 flex items-center justify-center h-full">
          <div className="relative w-56">
            {phoneParts.map((part, i) => (
              <motion.div
                key={part.id}
                initial={{ y: 0 }}
                animate={{
                  y: isExpanded ? part.yOffset : 0,
                  scale: activePart === part.id ? 1.05 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: isExpanded ? i * 0.06 : 0,
                }}
                onMouseEnter={() => setActivePart(part.id)}
                onMouseLeave={() => setActivePart(null)}
                onClick={() => setActivePart(activePart === part.id ? null : part.id)}
                className="absolute left-1/2 -translate-x-1/2 w-52 cursor-pointer z-10"
                style={{ top: `${i * 60}px` }}
              >
                <div
                  className="rounded-xl border p-2.5 flex items-center gap-2.5 transition-all duration-200"
                  style={{
                    borderColor: activePart === part.id ? part.color : 'var(--border)',
                    background: activePart === part.id ? `${part.color}10` : 'var(--surface)',
                  }}
                >
                  <span className="text-lg">{part.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold text-[var(--text)]" style={{ fontFamily: 'Outfit' }}>
                      {getLabel(part)}
                    </div>
                    <div className="text-[10px] text-[var(--text-3)] truncate">
                      {getQuickSpec(phone, part.specCategory.toLowerCase())}
                    </div>
                  </div>
                  <div className="text-[10px] text-[var(--text-3)]">
                    {activePart === part.id ? '▾' : '▸'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Details panel */}
        <div className="flex-1 w-full lg:max-w-sm min-h-0 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activePart ? (
              <motion.div
                key={activePart}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl p-4"
                style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
              >
                <h3 className="text-[13px] font-bold text-[var(--text)] mb-3 flex items-center gap-2" style={{ fontFamily: 'Outfit' }}>
                  <span>{phoneParts.find((p) => p.id === activePart)?.icon}</span>
                  {getLabel(phoneParts.find((p) => p.id === activePart)!)}
                </h3>
                <div className="space-y-0">
                  {getSpecForCategory(
                    phone,
                    phoneParts.find((p) => p.id === activePart)?.specCategory || ''
                  )
                    .split('\n')
                    .map((line, i) => {
                      const [name, ...valueParts] = line.split(':');
                      const value = valueParts.join(':').trim();
                      return (
                        <div key={i} className="flex justify-between items-start gap-3 py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                          <span className="text-[10px] text-[var(--text-3)] shrink-0 font-medium uppercase tracking-wider">{name?.trim()}</span>
                          <span className="text-[11px] text-[var(--text)] text-right leading-relaxed">{value || '—'}</span>
                        </div>
                      );
                    })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl p-6 text-center"
                style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
              >
                <div className="text-3xl mb-3">👆</div>
                <p className="text-[11px] text-[var(--text-3)]">
                  {i18n.language === 'uz'
                    ? 'Qismni bosib, batafsil ma\'lumot oling'
                    : i18n.language === 'ru'
                    ? 'Нажмите на часть для подробностей'
                    : 'Click a part for details'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
