import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { searchPhones } from '../utils/api';
import type { Phone } from '../types/phone';

interface Q {
  id: string;
  title: { uz: string; ru: string; en: string };
  opts: { label: { uz: string; ru: string; en: string }; value: string }[];
}

const Qs: Q[] = [
  { id: 'budget', title: { uz: 'Byudjetingiz?', ru: 'Бюджет?', en: 'Budget?' }, opts: [
    { label: { uz: '$100 gacha', ru: 'До $100', en: 'Under $100' }, value: 'under100' },
    { label: { uz: '$100–300', ru: '$100–300', en: '$100–300' }, value: '100to300' },
    { label: { uz: '$300–600', ru: '$300–600', en: '$300–600' }, value: '300to600' },
    { label: { uz: '$600–1000', ru: '$600–1000', en: '$600–1000' }, value: '600to1000' },
    { label: { uz: '$1000+', ru: '$1000+', en: '$1000+' }, value: '1000plus' },
  ]},
  { id: 'brand', title: { uz: 'Brend?', ru: 'Бренд?', en: 'Brand?' }, opts: [
    { label: { uz: 'Samsung', ru: 'Samsung', en: 'Samsung' }, value: 'samsung' },
    { label: { uz: 'Apple', ru: 'Apple', en: 'Apple' }, value: 'apple' },
    { label: { uz: 'Xiaomi', ru: 'Xiaomi', en: 'Xiaomi' }, value: 'xiaomi' },
    { label: { uz: 'Google', ru: 'Google', en: 'Google' }, value: 'google' },
    { label: { uz: 'OnePlus', ru: 'OnePlus', en: 'OnePlus' }, value: 'oneplus' },
    { label: { uz: 'Ahamiyatsiz', ru: 'Не важно', en: 'No preference' }, value: 'any' },
  ]},
  { id: 'usecase', title: { uz: 'Maqsad?', ru: 'Цель?', en: 'Use case?' }, opts: [
    { label: { uz: 'Kundalik', ru: 'Ежедневно', en: 'Daily' }, value: 'daily' },
    { label: { uz: 'Kamera', ru: 'Камера', en: 'Camera' }, value: 'camera' },
    { label: { uz: "O'yinlar", ru: 'Игры', en: 'Gaming' }, value: 'gaming' },
    { label: { uz: 'Ish', ru: 'Работа', en: 'Work' }, value: 'work' },
  ]},
  { id: 'camera', title: { uz: 'Kamera ahamiyati?', ru: 'Важность камеры?', en: 'Camera importance?' }, opts: [
    { label: { uz: 'Eng yaxshisi kerak', ru: 'Нужна лучшая', en: 'Must have best' }, value: 'critical' },
    { label: { uz: "O'rtacha", ru: 'Средне', en: 'Moderate' }, value: 'moderate' },
    { label: { uz: 'Ahamiyatsiz', ru: 'Не важно', en: 'Not important' }, value: 'low' },
  ]},
  { id: 'battery', title: { uz: 'Batareya?', ru: 'Батарея?', en: 'Battery?' }, opts: [
    { label: { uz: '2 kun kerak', ru: 'Нужно 2 дня', en: 'Need 2 days' }, value: 'critical' },
    { label: { uz: '1 kun yetadi', ru: '1 дня хватит', en: '1 day is fine' }, value: 'moderate' },
    { label: { uz: 'Ahamiyatsiz', ru: 'Не важно', en: 'Not important' }, value: 'low' },
  ]},
  { id: 'screen', title: { uz: "Ekran o'lchami?", ru: 'Размер экрана?', en: 'Screen size?' }, opts: [
    { label: { uz: 'Kichik (6" gacha)', ru: 'Маленький (до 6")', en: 'Small (under 6")' }, value: 'small' },
    { label: { uz: "O'rtacha (6–6.5\")", ru: 'Средний (6–6.5")', en: 'Medium (6–6.5")' }, value: 'medium' },
    { label: { uz: 'Katta (6.5"+)', ru: 'Большой (6.5"+)', en: 'Large (6.5"+)' }, value: 'large' },
  ]},
  { id: 'os', title: { uz: 'Operatsion tizim?', ru: 'ОС?', en: 'OS?' }, opts: [
    { label: { uz: 'Android', ru: 'Android', en: 'Android' }, value: 'android' },
    { label: { uz: 'iOS', ru: 'iOS', en: 'iOS' }, value: 'ios' },
    { label: { uz: 'Ahamiyatsiz', ru: 'Не важно', en: 'No preference' }, value: 'any' },
  ]},
  { id: 'perf', title: { uz: 'Tezlik?', ru: 'Скорость?', en: 'Performance?' }, opts: [
    { label: { uz: 'Flagman', ru: 'Флагман', en: 'Flagship' }, value: 'flagship' },
    { label: { uz: "O'rtacha", ru: 'Средний', en: 'Mid-range' }, value: 'mid' },
    { label: { uz: 'Asosiy', ru: 'Базовый', en: 'Basic' }, value: 'basic' },
  ]},
  { id: 'storage', title: { uz: 'Xotira?', ru: 'Память?', en: 'Storage?' }, opts: [
    { label: { uz: '128GB', ru: '128GB', en: '128GB' }, value: '128' },
    { label: { uz: '256GB', ru: '256GB', en: '256GB' }, value: '256' },
    { label: { uz: '512GB+', ru: '512GB+', en: '512GB+' }, value: '512' },
  ]},
  { id: 'water', title: { uz: "Suv o'tkazmaslik?", ru: 'Водозащита?', en: 'Water resistance?' }, opts: [
    { label: { uz: 'Shart', ru: 'Обязательно', en: 'Must have' }, value: 'must' },
    { label: { uz: 'Yaxshi', ru: 'Хорошо бы', en: 'Nice to have' }, value: 'nice' },
    { label: { uz: 'Ahamiyatsiz', ru: 'Не важно', en: 'Not important' }, value: 'no' },
  ]},
  { id: '5g', title: { uz: '5G?', ru: '5G?', en: '5G?' }, opts: [
    { label: { uz: 'Shart', ru: 'Обязательно', en: 'Must have' }, value: 'must' },
    { label: { uz: 'Yaxshi', ru: 'Хорошо бы', en: 'Nice to have' }, value: 'nice' },
    { label: { uz: 'Ahamiyatsiz', ru: 'Не важно', en: 'Not important' }, value: 'no' },
  ]},
  { id: 'refresh', title: { uz: "Ekran yangilanishi?", ru: 'Частота экрана?', en: 'Refresh rate?' }, opts: [
    { label: { uz: '120Hz+', ru: '120Hz+', en: '120Hz+' }, value: 'high' },
    { label: { uz: '60Hz yetadi', ru: '60Hz хватит', en: '60Hz is fine' }, value: 'standard' },
    { label: { uz: 'Ahamiyatsiz', ru: 'Не важно', en: 'Not important' }, value: 'any' },
  ]},
  { id: 'design', title: { uz: 'Dizayn?', ru: 'Дизайн?', en: 'Design?' }, opts: [
    { label: { uz: 'Zamonaviy', ru: 'Современный', en: 'Modern' }, value: 'modern' },
    { label: { uz: 'Klassik', ru: 'Классический', en: 'Classic' }, value: 'classic' },
    { label: { uz: 'Hashamatli', ru: 'Премиальный', en: 'Premium' }, value: 'premium' },
  ]},
  { id: 'weight', title: { uz: "Og'irlik?", ru: 'Вес?', en: 'Weight?' }, opts: [
    { label: { uz: 'Yengil', ru: 'Лёгкий', en: 'Light' }, value: 'light' },
    { label: { uz: "O'rtacha", ru: 'Средний', en: 'Medium' }, value: 'medium' },
    { label: { uz: "Farqi yo'q", ru: 'Не важно', en: 'Any' }, value: 'any' },
  ]},
  { id: 'color', title: { uz: 'Rang?', ru: 'Цвет?', en: 'Color?' }, opts: [
    { label: { uz: 'Qora', ru: 'Чёрный', en: 'Black' }, value: 'dark' },
    { label: { uz: 'Oq', ru: 'Белый', en: 'White' }, value: 'light' },
    { label: { uz: 'Rangli', ru: 'Цветной', en: 'Colorful' }, value: 'colorful' },
    { label: { uz: "Farqi yo'q", ru: 'Не важно', en: 'Any' }, value: 'any' },
  ]},
];

function getRec(ans: Record<string, string[]>) {
  const b = ans.budget?.[0] || '';
  const br = ans.brand?.[0] || '';
  const map: Record<string, Record<string, string>> = {
    samsung: { under100: 'Samsung Galaxy A16', '100to300': 'Samsung Galaxy A56', '300to600': 'Samsung Galaxy S25', '600to1000': 'Samsung Galaxy S25+', '1000plus': 'Samsung Galaxy S25 Ultra' },
    apple: { under100: 'iPhone SE', '100to300': 'iPhone 15', '300to600': 'iPhone 16', '600to1000': 'iPhone 16 Pro', '1000plus': 'iPhone 16 Pro Max' },
    xiaomi: { under100: 'Xiaomi Redmi 14C', '100to300': 'Xiaomi Redmi Note 14 Pro', '300to600': 'Xiaomi 15', '600to1000': 'Xiaomi 15 Pro', '1000plus': 'Xiaomi 15 Ultra' },
    google: { under100: 'Pixel 8a', '100to300': 'Pixel 8a', '300to600': 'Pixel 9', '600to1000': 'Pixel 9 Pro', '1000plus': 'Pixel 9 Pro XL' },
    oneplus: { under100: 'OnePlus Nord N35', '100to300': 'OnePlus Nord 4', '300to600': 'OnePlus 13R', '600to1000': 'OnePlus 13', '1000plus': 'OnePlus 13' },
  };
  if (br !== 'any' && map[br]) return map[br][b] || `${br} phone`;
  const def: Record<string, string> = { under100: 'Samsung Galaxy A16', '100to300': 'Samsung Galaxy A56', '300to600': 'Samsung Galaxy S25', '600to1000': 'Samsung Galaxy S25+', '1000plus': 'Samsung Galaxy S25 Ultra' };
  return def[b] || 'Samsung Galaxy S25';
}

function QuizResult({ answers, onRetry }: { answers: Record<string, string[]>; onRetry: () => void }) {
  const { t } = useTranslation();
  const rec = getRec(answers);
  const [found, setFound] = useState<Phone | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const duration = 2000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors: ['#22c55e', '#4ade80', '#16a34a'] });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors: ['#22c55e', '#4ade80', '#16a34a'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  useEffect(() => {
    searchPhones(rec)
      .then(results => {
        const match = results.find(p => p.phone_name.toLowerCase().includes(rec.toLowerCase().split(' ').slice(-1)[0])) || results[0];
        setFound(match || null);
      })
      .catch(() => setFound(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div className="content-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
      <div className="content-header">
        <motion.h1 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>{t('quiz.result.title')}</motion.h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onRetry} className="btn btn-ghost">{t('quiz.result.tryAgain')}</button>
          <Link to="/catalog" className="btn btn-primary" style={{ textDecoration: 'none' }}>{t('nav.catalog')}</Link>
        </div>
      </div>
      <motion.div className="empty-state" style={{ paddingTop: 60, paddingBottom: 60 }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <motion.div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
        </motion.div>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('quiz.result.recommended')}</p>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 24, fontFamily: "'DM Sans', system-ui, sans-serif", letterSpacing: '-0.03em' }}>{rec}</h2>
        {loading ? (
          <div className="skeleton" style={{ width: 180, height: 42, borderRadius: 12, margin: '0 auto' }} />
        ) : found ? (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to={`/phone/${found.slug}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
              {t('quiz.result.viewDetails')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </motion.div>
        ) : (
          <Link to="/catalog" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            {t('nav.catalog')}
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function QuizWizard() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'uz' | 'ru' | 'en';
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const total = Qs.length;
  const progress = ((step + 1) / total) * 100;

  const toggle = (val: string) => setAnswers(prev => ({ ...prev, [Qs[step].id]: [val] }));
  const canNext = (answers[Qs[step]?.id] || []).length > 0;

  if (step >= total) {
    return <QuizResult answers={answers} onRetry={() => { setStep(0); setAnswers({}); }} />;
  }

  const q = Qs[step];
  return (
    <motion.div className="content-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="content-header">
        <div>
          <h1>{t('nav.quiz')}</h1>
          <p className="subtitle">{step + 1} of {total}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 80, height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#22c55e', fontFamily: "'JetBrains Mono', monospace" }}>{Math.round(progress)}%</span>
        </div>
      </div>

      <div style={{ padding: '40px 32px' }}>
        <p style={{ fontSize: 11, color: '#22c55e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
          {t('quiz.step')} {String(step + 1).padStart(2, '0')}
        </p>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 32, fontFamily: "'DM Sans', system-ui, sans-serif", letterSpacing: '-0.03em' }}>{q.title[lang]}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {q.opts.map((opt, oi) => {
                const picked = (answers[q.id] || []).includes(opt.value);
                return (
                  <motion.button key={opt.value} onClick={() => toggle(opt.value)}
                    className={`quiz-option ${picked ? 'selected' : ''}`}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: oi * 0.05 }}>
                    <div className="quiz-radio" />
                    <span style={{ fontSize: 15, fontWeight: 500, color: picked ? '#fff' : 'rgba(255,255,255,0.7)' }}>{opt.label[lang]}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 32px 32px' }}>
        <button onClick={() => setStep(s => s - 1)} disabled={step === 0} className="btn btn-ghost" style={{ opacity: step === 0 ? 0.3 : 1, cursor: step === 0 ? 'not-allowed' : 'pointer' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {t('quiz.prev')}
        </button>
        <button onClick={() => setStep(s => s + 1)} disabled={!canNext} className="btn btn-primary" style={{ opacity: canNext ? 1 : 0.3, cursor: canNext ? 'pointer' : 'not-allowed' }}>
          {step === total - 1 ? t('quiz.finish') : t('quiz.next')}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </motion.div>
  );
}
