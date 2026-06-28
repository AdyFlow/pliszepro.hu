import { Phone, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingElements() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToQuote = () => {
    document.querySelector('#ajanlatkeres')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60]">
        <div
          className="h-full bg-gradient-orange transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Desktop floating call button */}
      <a
        href="tel:+36704224909"
        className="hidden md:flex fixed bottom-8 right-8 z-50 w-14 h-14 bg-orange rounded-full items-center justify-center shadow-glow hover:bg-orange-deep hover:scale-110 transition-all"
        aria-label="Hívás"
        onClick={() => { if (typeof (window as any).fbq === 'function') (window as any).fbq('track', 'Contact'); }}
      >
        <Phone size={22} className="text-white" />
      </a>

      {/* Mobile sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-line px-4 py-3 flex gap-3">
        <a
          href="tel:+36704224909"
          className="flex-1 flex items-center justify-center gap-2 bg-ink text-white font-display font-semibold text-sm py-3 rounded-xl"
          onClick={() => { if (typeof (window as any).fbq === 'function') (window as any).fbq('track', 'Contact'); }}
        >
          <Phone size={16} /> Hívás
        </a>
        <button
          onClick={scrollToQuote}
          className="flex-1 flex items-center justify-center gap-2 bg-orange text-white font-display font-semibold text-sm py-3 rounded-xl"
        >
          <FileText size={16} /> Ajánlatkérés
        </button>
      </div>
    </>
  );
}
