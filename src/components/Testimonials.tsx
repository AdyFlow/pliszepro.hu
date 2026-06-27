import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'Két nagy teraszajtóra kértünk plisszé szúnyoghálót. A felmérés pontos volt, a beépítés gyors és tiszta. A macskánk azóta is próbálkozik, de a háló bírja! Csak ajánlani tudom.',
    name: 'Kovács Anita',
    city: 'Szombathely',
    rating: 5,
  },
  {
    quote: 'Fehér, 17 mm-es profilt választottunk, szinte észre sem venni a nyílászárón. Végre úgy szellőztetünk, hogy nem jönnek be a szúnyogok. Korrekt ár, korrekt csapat.',
    name: 'Tóth Gábor',
    city: 'Székesfehérvár',
    rating: 5,
  },
  {
    quote: 'Egyedi méretre gyártották, a régi redőny mellé is tökéletesen passzolt. A garancia szerkezetre és hálóra is megnyugtató. 5 csillag!',
    name: 'Nagy Eszter',
    city: 'Zalaegerszeg',
    rating: 5,
  },
  {
    quote: 'Gyors árajánlat, korrekt kommunikáció, határidőre kész lett. Pontosan azt kaptuk, amit ígértek.',
    name: 'Horváth Péter',
    city: 'Győr',
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [paused, next]);

  return (
    <section id="velemenyek" className="section-padding bg-cream">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-ink mb-4">
            Amit ügyfeleink mondanak
          </h2>
        </motion.div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {[0, 1].map(offset => {
                  const idx = (current + offset) % testimonials.length;
                  const t = testimonials[idx];
                  return (
                    <div key={idx} className="bg-white border border-line rounded-2xl p-6 shadow-card">
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} size={18} className="fill-orange text-orange" />
                        ))}
                      </div>
                      <p className="text-ink leading-relaxed mb-5 text-sm md:text-base">"{t.quote}"</p>
                      <div>
                        <p className="font-display font-semibold text-ink text-sm">{t.name}</p>
                        <p className="text-muted text-xs">{t.city}</p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-line bg-white flex items-center justify-center hover:border-orange transition-colors"
              aria-label="Előző vélemény"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === current ? 'bg-orange' : 'bg-line'
                  }`}
                  aria-label={`${i + 1}. vélemény`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-line bg-white flex items-center justify-center hover:border-orange transition-colors"
              aria-label="Következő vélemény"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
