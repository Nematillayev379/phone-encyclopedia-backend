import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './data/i18n';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import PhoneDetail from './pages/PhoneDetail';
import Compare from './pages/Compare';
import Quiz from './pages/Quiz';

const WALLPAPERS = [
  '/tech1.jpg',
  '/tech2.jpg',
  '/tech3.jpg',
  '/tech4.jpg',
  '/tech5.jpg',
  '/tech6.jpg',
];

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: 'easeIn' } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/phone/:slug" element={<PhoneDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const idxRef = useRef(0);

  useEffect(() => {
    const bg = document.querySelector('.app-bg') as HTMLElement;
    if (!bg) return;

    const transition = () => {
      idxRef.current = (idxRef.current + 1) % WALLPAPERS.length;
      const nextUrl = `url('${WALLPAPERS[idxRef.current]}')`;

      // Fade out
      bg.style.transition = 'opacity 0.4s ease';
      bg.style.opacity = '0';

      setTimeout(() => {
        // Swap image while hidden
        bg.style.backgroundImage = nextUrl;
        // Fade in
        bg.style.transition = 'opacity 0.6s ease';
        bg.style.opacity = '1';
      }, 450);
    };

    const interval = setInterval(transition, 35000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <div className="app-layout">
        <div className="app-bg" />
        <div className="ambient-glow" />
        <Sidebar />
        <main className="main-content">
          <AnimatedRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}
