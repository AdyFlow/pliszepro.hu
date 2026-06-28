import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Phone, Shield, Cat, Truck } from 'lucide-react';

const words = ['Egyedi', 'pliszé', 'szúnyogháló,', 'méretre', 'szabva'];

const trustChips = [
  { icon: Shield, label: 'Teljes körű garancia', comingSoon: false },
  { icon: Cat, label: 'Macskabiztos PET háló – hamarosan', comingSoon: true },
  { icon: Truck, label: 'Kiszállítjuk és beépítjük', comingSoon: false },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const scrollToQuote = () => {
    document.querySelector('#ajanlatkeres')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-20"
      >
        <img
          src="/images/terasz_fooldal.jpg"
          alt="Modern terasz pliszé szúnyoghálóval, panorámás kilátással"
          className="w-full h-[120%] object-cover"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/65 via-ink/45 to-ink/20" />

      {/* Orange decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-orange/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 left-10 w-56 h-56 bg-orange/8 rounded-full blur-[80px] animate-float [animation-delay:1.5s]" />

      {/* Content */}
      <div className="relative z-10 container-narrow w-full pt-32 pb-20">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6"
          >
            <span className="text-orange text-sm">&#9889;</span>
            <span className="text-white/90 text-sm font-medium">
              Ingyenes helyszíni felmérés &bull; Egyedi gyártás
            </span>
          </motion.div>

          {/* H1 — kinetic headline */}
          <h1 className="font-display font-bold text-[clamp(2.2rem,5vw,4rem)] leading-[1.1] tracking-tight text-white mb-6">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
          >
            Alumínium szerkezet, 17 mm-es diszkrét profil, bármilyen RAL színben.
            Közvetlenül a gyártótól hozzuk a minőséget — Önnek csak a friss levegőt kell élveznie.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <button
              onClick={scrollToQuote}
              className="btn-primary text-lg px-8 py-4 animate-pulse_glow hover:animate-none"
            >
              Kérek árajánlatot
            </button>
            <a
              href="tel:+36704224909"
              className="btn-white-outline text-lg px-8 py-4"
              onClick={() => { if (typeof (window as any).fbq === 'function') (window as any).fbq('track', 'Contact'); }}
            >
              <Phone size={18} />
              Hívjon most
            </a>
          </motion.div>

          {/* Trust chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex flex-wrap gap-3"
          >
            {trustChips.map(chip => (
              <div
                key={chip.label}
                className={`flex items-center gap-2 backdrop-blur-md border rounded-full px-4 py-2 ${
                  chip.comingSoon
                    ? 'bg-white/5 border-white/10 opacity-75'
                    : 'bg-white/10 border-white/15'
                }`}
              >
                <chip.icon size={16} className="text-orange" />
                <span className="text-white/90 text-sm font-medium">{chip.label}</span>
                {chip.comingSoon && (
                  <span className="bg-orange/20 text-orange text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    Soon
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating stat badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="hidden lg:block absolute right-12 bottom-32 bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-card animate-float"
        >
          <p className="font-display font-bold text-ink text-lg">17 mm profil</p>
          <p className="text-muted text-sm">kompakt beépítés</p>
        </motion.div>
      </div>
    </section>
  );
}
