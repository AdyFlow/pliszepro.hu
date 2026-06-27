import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'pliszepro_intro_seen';
const LAMELLA_COUNT = 9;

export default function CinematicIntro() {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !sessionStorage.getItem(STORAGE_KEY);
  });
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter');
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!show) return;

    document.body.style.overflow = 'hidden';

    const exitDelay = prefersReduced ? 500 : 1700;
    const removeDelay = prefersReduced ? 800 : 2050;

    timerRef.current = setTimeout(() => setPhase('exit'), exitDelay);

    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = '';
      sessionStorage.setItem(STORAGE_KEY, 'true');
    }, removeDelay);

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(removeTimer);
      document.body.style.overflow = '';
    };
  }, [show, prefersReduced]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {phase === 'enter' && (
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Light gradient background */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #fffbf7 40%, #fff3e6 70%, #fed7aa 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />

          {/* Soft orange glow at bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/3"
            style={{
              background: 'radial-gradient(ellipse at center bottom, rgba(249,115,22,0.15) 0%, transparent 70%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          />

          {/* Plissé lamella effect - descending from top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 md:gap-3">
            {Array.from({ length: LAMELLA_COUNT }).map((_, i) => (
              <motion.div
                key={i}
                className="w-4 sm:w-5 md:w-7 rounded-b-sm origin-top"
                style={{
                  background: `linear-gradient(180deg, #f97316 0%, #fb923c ${60 + i * 4}%, #fdba74 100%)`,
                  boxShadow: '0 8px 24px rgba(249, 115, 22, 0.2)',
                }}
                initial={prefersReduced ? { scaleY: 1, opacity: 0.8 } : { scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.85 }}
                transition={{
                  delay: prefersReduced ? 0 : 0.25 + i * 0.04,
                  duration: prefersReduced ? 0.1 : 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="w-full h-16 sm:h-20 md:h-28" />
              </motion.div>
            ))}
          </div>

          {/* Subtle center glow */}
          <motion.div
            className="absolute w-80 h-80 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 60%)',
            }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.3, opacity: 1 }}
            transition={{ delay: prefersReduced ? 0 : 0.4, duration: 0.8, ease: 'easeOut' }}
          />

          {/* Logo */}
          <motion.img
            src="/images/pliszepro-logo.png"
            alt="PlisszéPro logó"
            className="relative w-52 sm:w-64 md:w-80 h-auto object-contain drop-shadow-sm"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.88 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={{
              delay: prefersReduced ? 0.1 : 0.55,
              duration: prefersReduced ? 0.2 : 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Bottom decorative line */}
          <motion.div
            className="absolute bottom-12 sm:bottom-16 h-px w-24 sm:w-36 md:w-44"
            style={{
              background: 'linear-gradient(90deg, transparent, #f97316, transparent)',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.5 }}
            transition={{ delay: prefersReduced ? 0.1 : 0.9, duration: 0.5, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
