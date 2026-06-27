import { motion } from 'framer-motion';
import { Waves, Cable, Footprints, DoorOpen } from 'lucide-react';

const steps = [
  {
    icon: Waves,
    title: 'Harmonikszerű működés',
    desc: 'A háló plisszírozott, harmonikszerűen nyílik és záródik — bárhol megállítható, nem csapódik vissza.',
  },
  {
    icon: Cable,
    title: 'Kevlár feszítőzsinór',
    desc: 'Erős kevlár szálak tartják feszesen a hálót, így nem hasasodik meg.',
  },
  {
    icon: Footprints,
    title: 'Akadálymentes alsó sín',
    desc: 'Alacsony megvezető sín, kényelmes, akadálymentes átjárással.',
  },
  {
    icon: DoorOpen,
    title: 'Ajtóra és ablakra is',
    desc: 'Nagy teraszajtókra és ablakokra egyaránt, nagy nyílásokra is alkalmas.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function HowItWorks() {
  return (
    <section id="hogyan-mukodik" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 plisse-pattern-diagonal pointer-events-none" />

      <div className="container-narrow relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="section-overline">Technológia</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-ink mb-4">
            Hogyan működik a plisszé?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="bg-warm-beige border border-line-warm rounded-2xl p-6 hover:border-orange/20 hover:shadow-card-warm transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-tint-strong flex items-center justify-center mb-4 shadow-glow-sm">
                  <step.icon size={20} className="text-orange" />
                </div>
                <h3 className="font-display font-semibold text-base text-ink mb-2">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-card-hover ring-1 ring-orange/10 relative"
          >
            <img
              src="/images/cat-plisze-jpg.png"
              alt="Macskabiztos plisszé szúnyogháló – hamarosan elérhető"
              className="w-full h-full object-cover aspect-[4/3]"
              loading="lazy"
            />
            <div className="absolute bottom-4 right-4 bg-ink/80 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-orange/30">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
              PET háló – hamarosan
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted text-sm mb-4">Nem biztos a méretben? Segítünk a pontos felmérésben.</p>
          <a
            href="#ajanlatkeres"
            onClick={e => { e.preventDefault(); document.querySelector('#ajanlatkeres')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary text-sm px-6 py-2.5 inline-flex"
          >
            Felmérést és beépítést kérek
          </a>
        </motion.div>
      </div>
    </section>
  );
}
