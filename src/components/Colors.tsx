import { motion } from 'framer-motion';

const colors = [
  { name: 'Fehér RAL 9016', hex: '#FFFFFF', badge: 'Alap', border: true },
  { name: 'Antracit RAL 7016', hex: '#383E42', badge: null, border: false },
  { name: 'Sötétbarna RAL 8019', hex: '#3B2D26', badge: null, border: false },
  { name: 'Fekete RAL 9005', hex: '#0A0A0A', badge: null, border: false },
  { name: 'Egyedi RAL', hex: 'linear-gradient(135deg,#FF8A3D 0%,#4CAF50 50%,#2196F3 100%)', badge: null, border: false },
];

export default function Colors() {
  return (
    <section id="szinek" className="section-padding bg-warm-gradient-subtle relative overflow-hidden">
      <div className="absolute inset-0 plisse-pattern opacity-40 pointer-events-none" />

      <div className="container-narrow relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="section-overline">Dizájn</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-ink mb-4">
            Színes, ahogy Ön szeretné
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Az esetek mintegy 80%-ában fehér színt választanak ügyfeleink. Igény szerint a teljes RAL
            színskála elérhető (felár ellenében), így a háló tökéletesen illeszkedik a homlokzathoz.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {colors.map((color, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.08 }}
              className="flex flex-col items-center gap-3 cursor-default group"
            >
              <div
                className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl shadow-card transition-all duration-300 group-hover:shadow-card-hover group-hover:ring-2 group-hover:ring-orange/30 ${
                  color.border ? 'border-2 border-line-warm' : ''
                }`}
                style={{
                  background: color.hex.startsWith('linear') ? color.hex : color.hex,
                }}
              />
              <div className="text-center">
                <p className="text-sm font-medium text-ink">{color.name}</p>
                {color.badge && (
                  <span className="inline-block mt-1 text-xs bg-orange-tint-strong text-orange font-semibold px-2.5 py-0.5 rounded-full">
                    {color.badge}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-muted text-sm mb-4">Egyedi RAL színben gondolkodik?</p>
          <a
            href="#ajanlatkeres"
            onClick={e => { e.preventDefault(); document.querySelector('#ajanlatkeres')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary text-sm px-6 py-2.5 inline-flex"
          >
            RAL színnel kérek ajánlatot
          </a>
        </motion.div>
      </div>
    </section>
  );
}
