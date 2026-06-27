import { motion } from 'framer-motion';
import { User, Wrench, Award } from 'lucide-react';

const cards = [
  {
    icon: User,
    title: 'Ki áll a PlisszéPro mögött?',
    text: 'Kari vagyok, a PlisszéPro alapítója. Célom, hogy ügyfeleim valóban minőségi, méretre gyártott plisszé szúnyoghálót kapjanak, amely nemcsak praktikus, hanem esztétikailag is tökéletesen illeszkedik az otthonukhoz.',
  },
  {
    icon: Wrench,
    title: 'Hogyan dolgozom?',
    text: 'Minden munkát személyes odafigyeléssel végzek: helyszíni felméréssel indulunk, ezután egyedi méretre készül a plisszé, majd pontos és tiszta beépítéssel zárul a folyamat. Fontos számomra a precizitás, a korrektség és a megbízható kivitelezés.',
  },
  {
    icon: Award,
    title: 'Miért választanak engem?',
    text: 'Ügyfeleim azért keresnek, mert nem tömegmegoldást szeretnének, hanem tartós, igényes és pontosan illeszkedő plisszé szúnyoghálót. A személyes kapcsolat, az egyedi gyártás és a precíz kivitelezés a PlisszéPro alapja.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function AboutMe() {
  return (
    <section id="rolam" className="section-padding bg-warm-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 border border-orange/10 rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-5 w-20 h-20 border border-orange/5 rounded-full pointer-events-none" />

      <div className="container-narrow relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="section-overline">Bemutatkozás</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-ink mb-4">
            Rólam
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Ismerje meg, ki áll a PlisszéPro mögött, és miért fontos számomra a minőségi, egyedi kivitelezés.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left — portrait image + quote card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-card aspect-[3/4] bg-line ring-1 ring-orange/10">
              <img
                src="/images/image copy.png"
                alt="Kari, a PlisszéPro alapítója"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>

            {/* Floating quote card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-4 sm:right-4 lg:-right-6 max-w-[280px] bg-white border border-orange/10 rounded-2xl p-5 shadow-card-hover"
            >
              <div className="w-10 h-1 bg-gradient-orange rounded-full mb-3" />
              <p className="text-ink text-sm leading-relaxed italic mb-3">
                &ldquo;Precíz, tiszta és megbízható munkára törekszem — minden plisszé egyedi méretre készül.&rdquo;
              </p>
              <p className="text-muted text-xs font-semibold">
                — Kari, PlisszéPro
              </p>
            </motion.div>
          </motion.div>

          {/* Right — 3 info cards */}
          <div className="flex flex-col gap-5 pt-4 lg:pt-0">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white border border-line-warm rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:border-orange/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-tint-strong flex items-center justify-center mb-4">
                  <card.icon size={20} className="text-orange" />
                </div>
                <h3 className="font-display font-semibold text-lg text-ink mb-2">
                  {card.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 bg-white border border-line-warm rounded-2xl p-6 md:p-8 text-center shadow-card"
        >
          <p className="text-ink text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-5">
            Nem sablonmegoldást keres? Nézzük meg, milyen plisszé illik az Ön nyílászárójára.
          </p>
          <a
            href="#ajanlatkeres"
            onClick={e => { e.preventDefault(); document.querySelector('#ajanlatkeres')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary text-sm px-6 py-2.5 inline-flex"
          >
            Egyeztessünk felmérést
          </a>
        </motion.div>
      </div>
    </section>
  );
}
