import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type HoverState = 'none' | 'left' | 'right';

export default function BeforeAfter() {
  const [hoverState, setHoverState] = useState<HoverState>('none');
  const [tapState, setTapState] = useState<HoverState>('none');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  const activeState = hoverState !== 'none' ? hoverState : tapState;

  const leftFlex = activeState === 'left' ? 4 : activeState === 'right' ? 1 : 1;
  const rightFlex = activeState === 'right' ? 4 : activeState === 'left' ? 1 : 1;

  const handleTap = (side: 'left' | 'right') => {
    setTapState(prev => (prev === side ? 'none' : side));
  };

  return (
    <section ref={sectionRef} className="section-padding bg-warm-gradient relative overflow-hidden">
      {/* Subtle decorative accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent" />

      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="section-overline">Eredmény</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-ink mb-4">
            Lássa a különbséget
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-card-hover ring-1 ring-orange/10"
          onMouseLeave={() => setHoverState('none')}
        >
          <div className="flex w-full aspect-[16/9]">
            {/* Left / Before side */}
            <div
              className="relative overflow-hidden cursor-pointer"
              style={{
                flex: leftFlex,
                transition: 'flex 500ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={() => setHoverState('left')}
              onClick={() => handleTap('left')}
            >
              <img
                src="/images/elotte-plisze-jpg.png"
                alt="Plisszé szúnyogháló beépítés előtt"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                style={{
                  filter: activeState === 'right' ? 'brightness(0.7)' : 'brightness(1)',
                }}
                loading="lazy"
              />
              <div
                className="absolute top-4 left-4 bg-ink/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full z-10 transition-opacity duration-300"
                style={{ opacity: activeState === 'right' ? 0.6 : 1 }}
              >
                Előtte
              </div>
            </div>

            {/* Center divider */}
            <div className="relative z-20 flex items-center justify-center w-0">
              <div className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-lg" />
              <div className="relative w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 10L3 10M3 10L5 8M3 10L5 12" stroke="#FF6A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 10L17 10M17 10L15 8M17 10L15 12" stroke="#FF6A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Right / After side */}
            <div
              className="relative overflow-hidden cursor-pointer"
              style={{
                flex: rightFlex,
                transition: 'flex 500ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={() => setHoverState('right')}
              onClick={() => handleTap('right')}
            >
              <img
                src="/images/utana-plisze-jpg.png"
                alt="Plisszé szúnyogháló beépítés után alumínium kerettel"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                style={{
                  filter: activeState === 'left' ? 'brightness(0.7)' : 'brightness(1)',
                }}
                loading="lazy"
              />
              <div
                className="absolute top-4 right-4 bg-orange/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full z-10 transition-opacity duration-300"
                style={{ opacity: activeState === 'left' ? 0.6 : 1 }}
              >
                Utána
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <p className="text-muted text-sm mb-4">Ugyanezt szeretné otthonában is?</p>
          <a
            href="#ajanlatkeres"
            onClick={e => { e.preventDefault(); document.querySelector('#ajanlatkeres')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary text-sm px-6 py-2.5 inline-flex"
          >
            Kérek ajánlatot a saját méretemre
          </a>
        </motion.div>
      </div>
    </section>
  );
}
