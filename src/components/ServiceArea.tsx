import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const areas = [
  'Vas vármegye (Szombathely)',
  'Zala vármegye',
  'Fejér vármegye (Székesfehérvár)',
  'Győr-Moson-Sopron vármegye',
  'Komárom-Esztergom vármegye',
];

export default function ServiceArea() {
  return (
    <section className="section-padding bg-warm-gradient relative overflow-hidden">
      {/* Decorative corner blob */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-orange/[0.04] rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="container-narrow relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="section-overline">Lefedettség</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-ink mb-4">
            Hol dolgozunk?
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Szombathely, Zala, Székesfehérvár és a környező vármegyék területén dolgozunk — kiszállítással.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {areas.map((area, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-white border border-line-warm rounded-full px-5 py-3 shadow-card-warm hover:border-orange/30 hover:shadow-card-hover transition-all duration-300"
            >
              <MapPin size={16} className="text-orange" />
              <span className="text-sm font-medium text-ink">{area}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
