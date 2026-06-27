import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '[STAT_UGYFEL]', suffix: '+', label: 'elégedett ügyfél' },
  { value: '[STAT_M2]', suffix: '', label: 'm² legyártott háló' },
  { value: '[STAT_VARMEGYE]', suffix: '', label: 'vármegye lefedettség' },
  { value: '[STAT_EV]', suffix: '+', label: 'év tapasztalat' },
];

function AnimatedCounter({ target, suffix }: { target: string; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const numericTarget = parseInt(target.replace(/[^0-9]/g, '')) || 500;

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * numericTarget);
      setCount(start);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, numericTarget]);

  const isPlaceholder = target.startsWith('[');

  return (
    <span ref={ref} className="font-display font-bold text-5xl md:text-6xl text-gradient-orange">
      {isPlaceholder ? target : count.toLocaleString('hu-HU')}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-muted text-sm mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
