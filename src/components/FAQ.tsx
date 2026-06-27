import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Milyen színben kérhető a plisszé szúnyogháló?',
    a: 'Alapszínünk a fehér (RAL 9016), amelyet ügyfeleink kb. 80%-a választ. Felár ellenében bármilyen RAL színben legyártjuk, így tökéletesen illeszkedik a nyílászáróihoz.',
  },
  {
    q: 'Macskabiztos kivitel is van?',
    a: 'Hamarosan! Dolgozunk az erősebb, sűrűbben szőtt PET hálós opción, amely jobban ellenáll a kisállatok terhelésének. Ez az opció hamarosan elérhető lesz kínálatunkban.',
  },
  {
    q: 'Mekkora méretig gyártható?',
    a: 'A plisszé rendszer nagy nyílásokra, akár nagy teraszajtókra is alkalmas. A pontos maximális méretet a helyszíni felmérés során egyeztetjük.',
  },
  {
    q: 'Milyen vastag a profil?',
    a: 'Modern, mindössze 17 mm-es alumínium profilt használunk, amely diszkrét, helytakarékos és kompakt beépítést tesz lehetővé.',
  },
  {
    q: 'Mennyi a gyártási idő?',
    a: 'Az átlagos gyártási idő általában 5–10 munkanap. A pontos határidőt az ajánlatban rögzítjük.',
  },
  {
    q: 'Ingyenes a felmérés?',
    a: 'Igen, a helyszíni felmérés díjmentes a szolgáltatási területünkön.',
  },
  {
    q: 'Milyen garanciát vállalnak?',
    a: 'Teljes körű garanciát biztosítunk az alumínium szerkezetre és a hálóra egyaránt, a jogszabályi előírásoknak megfelelően.',
  },
  {
    q: 'Hol vállalnak munkát?',
    a: 'Szombathely és Vas vármegye, Zala vármegye, Székesfehérvár és Fejér vármegye, Győr-Moson-Sopron, valamint Komárom-Esztergom vármegye területén.',
  },
];

function FaqItem({ faq, index, open, setOpen }: { faq: typeof faqs[0]; index: number; open: number | null; setOpen: (i: number | null) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        open === index ? 'border-orange/30 bg-white shadow-card-warm' : 'border-line-warm bg-white hover:border-orange/20'
      }`}
    >
      <button
        onClick={() => setOpen(open === index ? null : index)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open === index}
      >
        <span className="font-display font-semibold text-ink text-sm md:text-base">{faq.q}</span>
        <motion.span
          animate={{ rotate: open === index ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} className={`shrink-0 transition-colors duration-200 ${open === index ? 'text-orange' : 'text-muted'}`} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open === index && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-5">
              <div className="w-8 h-0.5 bg-orange/40 rounded-full mb-3" />
              <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const leftColumn = faqs.slice(0, 4);
  const rightColumn = faqs.slice(4);

  return (
    <section id="gyik" className="section-padding bg-warm-gradient-subtle scroll-mt-24 relative overflow-hidden">
      <div className="absolute inset-0 plisse-pattern-diagonal opacity-40 pointer-events-none" />

      <div className="container-narrow relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="section-overline">Információ</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-ink mb-4">
            Gyakori kérdések
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div className="space-y-3">
            {leftColumn.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} open={open} setOpen={setOpen} />
            ))}
          </div>
          <div className="space-y-3">
            {rightColumn.map((faq, i) => (
              <FaqItem key={i + 4} faq={faq} index={i + 4} open={open} setOpen={setOpen} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
