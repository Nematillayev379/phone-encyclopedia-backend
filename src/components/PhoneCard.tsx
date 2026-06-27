import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Phone } from '../types/phone';

interface Props {
  phone: Phone;
  index?: number;
}



const brandGradients: Record<string, string> = {
  samsung: 'from-blue-600 to-indigo-700',
  apple: 'from-gray-600 to-gray-800',
  xiaomi: 'from-orange-500 to-red-600',
  google: 'from-blue-500 to-green-500',
  oneplus: 'from-red-600 to-red-800',
  huawei: 'from-red-500 to-pink-600',
  nothing: 'from-gray-700 to-gray-900',
  realme: 'from-yellow-500 to-orange-500',
  default: 'from-[var(--c-gradient-1)] to-[var(--c-gradient-2)]',
};

function getBrandColor(brand: string): string {
  const key = brand.toLowerCase();
  return brandGradients[key] || brandGradients.default;
}

function getInitials(name: string): string {
  const words = name.split(' ').filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

export default function PhoneCard({ phone, index = 0 }: Props) {
  const brand = phone.brand || phone.phone_name.split(' ')[0];
  const gradient = getBrandColor(brand);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link to={`/phone/${phone.slug}`} className="block">
        <div className="phone-card glass rounded-xl p-4 h-full">
          {/* Image area */}
          <div className="relative mb-4">
            <div className={`w-full h-44 rounded-lg bg-gradient-to-br ${gradient} opacity-10 absolute inset-0`} />
            <div className="relative flex items-center justify-center h-44">
              {phone.image ? (
                <img
                  src={phone.image}
                  alt={phone.phone_name}
                  className="max-h-40 max-w-[80%] object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.fallback-logo')) {
                      const div = document.createElement('div');
                      div.className = 'fallback-logo w-20 h-20 rounded-2xl bg-gradient-to-br ' + gradient + ' flex items-center justify-center text-white text-2xl font-bold';
                      div.textContent = getInitials(brand);
                      parent.appendChild(div);
                    }
                  }}
                />
              ) : (
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                  {getInitials(brand)}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-[14px] text-[var(--c-text)] line-clamp-2 leading-snug mb-1" style={{ fontFamily: 'Space Grotesk' }}>
              {phone.phone_name}
            </h3>
            <p className="text-[12px] text-[var(--c-text-muted)] mb-3">{brand}</p>

            {/* Quick specs from description if available */}
            {phone.description && (
              <p className="text-[11px] text-[var(--c-text-muted)] line-clamp-2 leading-relaxed">
                {phone.description}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
