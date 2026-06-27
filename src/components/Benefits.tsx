import { motion } from 'framer-motion';
import { Ruler, Wrench, Minimize2, Palette, Cat, Award, MapPin, Truck } from 'lucide-react';

const features = [
  {
    icon: Ruler,
    title: 'Egyedi méretre gyártva',
    desc: 'Minden háló a nyílászárója pontos méretére készül, milliméter pontosan.',
  },
  {
    icon: Wrench,
    title: 'Alumínium szerkezet',
    desc: 'Strapabíró, időjárásálló extrudált alumínium keret, hosszú élettartammal.',
  },
  {
    icon: Minimize2,
    title: '17 mm-es diszkrét profil',
    desc: 'Modern, helytakarékos profil, amely szinte eltűnik a nyílászárón.',
  },
  {
    icon: Palette,
    title: 'Bármilyen RAL szín',
    desc: 'Alapszínünk a fehér (RAL 9016); felár ellenében bármilyen RAL színben.',
  },
  {
    icon: Cat,
    title: 'Macskabiztos PET háló – hamarosan',
    desc: 'Dolgozunk rajta, hogy a macskabiztos PET háló opció is hamarosan rendelhető legyen.',
    comingSoon: true,
  },
  {
    icon: Award,
    title: 'Teljes körű garancia',
    desc: 'Garancia a szerkezetre és a hálóra egyaránt.',
  },
  {
    icon: MapPin,
    title: 'Ingyenes helyszíni felmérés',
    desc: 'Szakémberünk pontosan felméri a helyszínt — díjmentesen.',
  },
  {
    icon: Truck,
    title: 'Kiszállítás és beépítés',
    desc: 'Szállítást és professzionális beépítést is vállalunk.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Benefits() {
  return (
    <section id="elonyok" className="section-padding bg-warm-gradient-subtle relative overflow-hidden">
      {/* Decorative plisse pattern */}
      <div className="absolute inset-0 plisse-pattern opacity-50 pointer-events-none" />
      {/* Corner decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange/[0.04] rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="container-narrow relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="section-overline">
            Specialisták
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[2.75rem] leading-tight text-ink max-w-md">
              Miért a PlisszéPro?
            </h2>
            <p className="text-muted text-base max-w-xs md:text-right leading-relaxed">
              Kizárólag egyedi plisszé szúnyoghálóra specializálódtunk.
            </p>
          </div>
          <div className="mt-6 h-px bg-gradient-to-r from-orange/20 via-line to-transparent" />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line-warm rounded-2xl overflow-hidden border border-line-warm shadow-card-warm"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`group bg-white hover:bg-orange-tint transition-colors duration-300 p-5 flex flex-col gap-4 cursor-default relative ${
                'comingSoon' in f && f.comingSoon ? 'opacity-80' : ''
              }`}
            >
              {'comingSoon' in f && f.comingSoon && (
                <span className="absolute top-3 right-3 bg-orange/10 text-orange text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-orange/20">
                  Hamarosan
                </span>
              )}
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-orange-tint group-hover:bg-orange/15 transition-colors duration-300 flex items-center justify-center flex-shrink-0 shadow-glow-sm group-hover:shadow-glow-sm">
                <f.icon size={18} className="text-orange" strokeWidth={2} />
              </div>

              {/* Text */}
              <div>
                <h3 className="font-display font-semibold text-[0.9rem] leading-snug text-ink mb-1.5">
                  {f.title}
                </h3>
                <p className="text-muted text-[0.8rem] leading-relaxed">
                  {f.desc}
                </p>
              </div>

              {/* Accent line on hover */}
              <div className="mt-auto pt-3 border-t border-line-warm">
                <div className="h-0.5 w-0 group-hover:w-8 bg-gradient-orange transition-all duration-300 rounded-full" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-muted text-sm mb-4">Szeretné pontos méretre kérni?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#ajanlatkeres"
              onClick={e => { e.preventDefault(); document.querySelector('#ajanlatkeres')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-primary text-sm px-6 py-2.5"
            >
              Kérek személyre szabott ajánlatot
            </a>
            <a
              href="#kalkulator"
              onClick={e => { e.preventDefault(); document.querySelector('#kalkulator')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-secondary text-sm px-6 py-2.5"
            >
              Megnézem a kalkulátort
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
