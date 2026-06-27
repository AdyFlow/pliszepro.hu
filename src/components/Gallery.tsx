import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const images = [
  { src: '/images/inspiracio-1.jpg', alt: 'Plisszé szúnyogháló inspiráció modern otthonban' },
  { src: '/images/plisze-szunyog.jpg', alt: 'Plisszé szúnyogháló inspiráció' },
  { src: '/images/inspiracio-3.jpg', alt: 'Plisszé szúnyogháló teraszajtóra' },
  { src: '/images/inspiracio-4.jpg', alt: 'Modern árnyékolástechnikai inspiráció' },
  { src: '/images/inspiracio-5.jpg', alt: 'Diszkrét plisszé szúnyogháló enteriőrben' },
  { src: '/images/inspiracio-6..jpg', alt: 'Alumínium keretes plisszé szúnyogháló példa' },
  { src: '/images/inspiracio-7..jpg', alt: 'Plisszé szúnyogháló családi házhoz' },
  { src: '/images/inspiracio-8.jpg', alt: 'Egyedi méretre készülő plisszé szúnyogháló inspiráció' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="referenciak" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 plisse-pattern opacity-30 pointer-events-none" />

      <div className="container-narrow relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="section-overline">Galéria</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-ink mb-4">
            Inspirációk
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Ízelítő abból, milyen otthonokba illik tökéletesen a plisszé szúnyogháló.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setLightbox(i)}
              className={`overflow-hidden rounded-2xl shadow-card ${
                i === 0 ? 'sm:row-span-2' : ''
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500 ${
                  i === 0 ? 'aspect-[3/4] sm:aspect-auto sm:h-full' : 'aspect-square'
                }`}
                loading="lazy"
              />
            </motion.button>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-ink/90 flex items-center justify-center p-4"
              onClick={() => setLightbox(null)}
            >
              <button
                className="absolute top-6 right-6 text-white hover:text-orange transition-colors"
                onClick={() => setLightbox(null)}
                aria-label="Bezárás"
              >
                <X size={28} />
              </button>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={images[lightbox].src}
                alt={images[lightbox].alt}
                className="max-w-full max-h-[85vh] rounded-xl object-contain"
                onClick={e => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-muted text-sm mb-4">Látott hasonló megoldást, amit el tudna képzelni otthonában?</p>
          <a
            href="#ajanlatkeres"
            onClick={e => { e.preventDefault(); document.querySelector('#ajanlatkeres')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary text-sm px-6 py-2.5 inline-flex"
          >
            Megnézzük, milyen megoldás fér el nálam
          </a>
        </motion.div>
      </div>
    </section>
  );
}
