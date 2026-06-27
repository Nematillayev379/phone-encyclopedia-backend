import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DetailSpecCategory } from '../types/phone';

interface Props {
  specs: DetailSpecCategory[];
}

const iconMap: Record<string, string> = {
  display: '📱', camera: '📷', 'main camera': '📷', 'selfie camera': '🤳',
  battery: '🔋', platform: '⚡', memory: '💾', body: '🏗️',
  sound: '🔊', comms: '📡', network: '🌐', features: '✨',
  launch: '🚀', misc: '📦', 'eu label': '🇪🇺', 'our tests': '🧪',
};

export default function SpecCard({ specs }: Props) {
  const [expanded, setExpanded] = useState<string | null>(specs[0]?.category || null);

  return (
    <div className="space-y-2">
      {specs.map((spec) => {
        const icon = iconMap[spec.category.toLowerCase()] || '📋';
        const isExpanded = expanded === spec.category;

        return (
          <div key={spec.category} className="rounded-xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <button
              onClick={() => setExpanded(isExpanded ? null : spec.category)}
              className="w-full flex items-center justify-between p-4 hover:bg-[var(--surface-2)]/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-base">{icon}</span>
                <span className="font-medium text-[var(--text)] text-[13px]" style={{ fontFamily: 'Outfit' }}>
                  {spec.category}
                </span>
                <span className="text-[10px] text-[var(--text-3)] bg-[var(--surface-2)] px-2 py-0.5 rounded-full">
                  {spec.specifications.length}
                </span>
              </div>
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[var(--text-3)] text-[11px]"
              >
                ▼
              </motion.span>
            </button>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-4 pb-4 space-y-0">
                    {spec.specifications.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-start gap-4 py-2.5"
                        style={{ borderBottom: '1px solid var(--border)' }}
                      >
                        <span className="text-[var(--text-3)] text-[12px] shrink-0 font-medium">{item.name}</span>
                        <span className="text-[var(--text)] text-[12px] text-right leading-relaxed whitespace-pre-line">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
