import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Előnyök', href: '#elonyok' },
  { label: 'Hogyan működik', href: '#hogyan-mukodik' },
  { label: 'Színek', href: '#szinek' },
  { label: 'Kalkulátor', href: '#kalkulator' },
  { label: 'Inspirációk', href: '#referenciak' },
  { label: 'Kapcsolat', href: '#kapcsolat' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-nav py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-narrow flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="shrink-0" aria-label="PlisszéPro főoldal" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              src="/images/pliszepro-logo.png"
              alt="PlisszéPro logó"
              className="h-20 md:h-24 w-auto object-contain"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative text-sm font-medium transition-colors group ${
                  scrolled ? 'text-ink hover:text-ink' : 'text-white hover:text-white'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* CTA pill — always visible */}
          <div className="hidden md:flex items-center gap-3 bg-orange rounded-full pl-4 pr-2 py-1.5 shadow-glow/30">
            <a
              href="tel:+36704224909"
              className="flex items-center gap-1.5 text-white text-sm font-medium whitespace-nowrap"
            >
              <Phone size={14} />
              06 70 422 4909
            </a>
            <button
              onClick={() => scrollTo('#ajanlatkeres')}
              className="bg-white text-orange font-display font-semibold text-sm px-4 py-2 rounded-full hover:bg-cream transition-colors"
            >
              Ajánlatkérés
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 transition-colors ${scrolled ? 'text-ink' : 'text-white'}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Menü megnyitása"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-5">
              <img
                src="/images/pliszepro-logo.png"
                alt="PlisszéPro logó"
                className="h-20 w-auto object-contain"
              />
              <button onClick={() => setMobileOpen(false)} aria-label="Menü bezárása">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-6 mt-12">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-lg font-display font-semibold text-ink"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
            <div className="mt-auto p-6 flex flex-col gap-3">
              <a href="tel:+36704224909" className="btn-secondary justify-center">
                <Phone size={16} /> 06 70 422 4909
              </a>
              <button onClick={() => scrollTo('#ajanlatkeres')} className="btn-primary justify-center">
                Ajánlatkérés
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
