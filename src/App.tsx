import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useRef } from 'react';
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

function keepalive() {
  fetch('/api/brands').catch(() => {});
}

export default function App() {
  const idxRef = useRef(0);

  useEffect(() => {
    const bg = document.querySelector('.app-bg') as HTMLElement;
    const bgNext = document.querySelector('.app-bg-next') as HTMLElement;
    if (!bg || !bgNext) return;

    const interval = setInterval(() => {
      idxRef.current = (idxRef.current + 1) % WALLPAPERS.length;
      const nextUrl = `url('${WALLPAPERS[idxRef.current]}')`;
      bgNext.style.backgroundImage = nextUrl;
      bgNext.style.opacity = '1';
      setTimeout(() => {
        bg.style.backgroundImage = nextUrl;
        bgNext.style.opacity = '0';
      }, 800);
    }, 35000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    keepalive();
    const id = setInterval(keepalive, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <BrowserRouter>
      <div className="app-layout">
        <div className="app-bg" />
        <div className="app-bg-next" />
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/phone/:slug" element={<PhoneDetail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
