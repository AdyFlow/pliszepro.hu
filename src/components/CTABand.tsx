import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function CTABand() {
  const scrollToQuote = () => {
    document.querySelector('#ajanlatkeres')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-orange">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/10 rounded-lg rotate-45 animate-float" />

      {/* Shine animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
        animate={{ x: ['-200%', '200%'] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
      />

      <div className="container-narrow relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            &#9889; Gyors ajánlat
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Kérjen ajánlatot most
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
            Töltse ki az űrlapot, és csapatunk hamarosan felveszi Önnel a kapcsolatot.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={scrollToQuote} className="btn-white text-base px-8 py-4">
              Ajánlatot kérek
            </button>
            <a href="tel:+36704224909" className="btn-white-outline text-base px-8 py-4">
              <Phone size={18} /> Hívjon most
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
