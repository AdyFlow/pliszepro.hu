import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';

const contactCards = [
  {
    icon: Phone,
    label: 'TELEFON',
    value: '06 70 422 4909',
    href: 'tel:+36704224909',
  },
  {
    icon: MapPin,
    label: 'CÍM',
    value: 'Feltoronyi utca 9, Jánossomorja, 9241',
    href: undefined,
  },
  {
    icon: Clock,
    label: 'NYITVATARTÁS',
    value: 'Hétfő–Péntek: 8:00–18:00',
    href: undefined,
  },
  {
    icon: Mail,
    label: 'E-MAIL',
    value: 'info@pliszepro.hu',
    href: 'mailto:info@pliszepro.hu',
  },
];

export default function Contact() {
  return (
    <section id="kapcsolat" className="section-padding bg-white scroll-mt-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange/[0.03] rounded-full translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="container-narrow relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="section-overline">Elérhetőség</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-ink mb-4">
            Kapcsolat
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Keressen minket bizalommal helyszíni felmérés vagy egyedi ajánlatkérés miatt.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-warm-beige border border-line-warm rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:border-orange/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-tint-strong flex items-center justify-center mb-3 shadow-glow-sm">
                  <card.icon size={20} className="text-orange" />
                </div>
                <p className="text-muted text-xs font-semibold uppercase tracking-wider mb-1">
                  {card.label}
                </p>
                {card.href ? (
                  <a
                    href={card.href}
                    className="font-display font-semibold text-ink text-sm hover:text-orange transition-colors"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="font-display font-semibold text-ink text-sm">
                    {card.value}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-card-hover border border-line-warm min-h-[320px] ring-1 ring-orange/5"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2682.5!2d17.1366!3d47.7861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c1c8b5f6b9a2b%3A0x0!2sFeltoronyi+utca+9%2C+J%C3%A1nossomorja+9241!5e0!3m2!1shu!2shu!4v1700000000000!5m2!1shu!2shu"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PlisszéPro telephely - Feltoronyi utca 9, Jánossomorja"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
