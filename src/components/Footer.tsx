import { Phone, MapPin, Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Előnyök', href: '#elonyok' },
  { label: 'Hogyan működik', href: '#hogyan-mukodik' },
  { label: 'Kalkulátor', href: '#kalkulator' },
  { label: 'Inspirációk', href: '#referenciak' },
  { label: 'GYIK', href: '#gyik' },
  { label: 'Ajánlatkérés', href: '#ajanlatkeres' },
];

const counties = [
  'Vas vármegye',
  'Zala vármegye',
  'Fejér vármegye',
  'Győr-Moson-Sopron vármegye',
  'Komárom-Esztergom vármegye',
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-ink text-white pt-16 pb-6 relative overflow-hidden">
      {/* Decorative orange accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-orange" />
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-orange/[0.05] blur-3xl pointer-events-none" />

      <div className="container-narrow relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src="/images/pliszepro-logo.png"
                alt="PlisszéPro logó"
                className="h-36 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Egyedi plisszé szúnyogháló gyártás és beépítés — közvetlenül a gyártótól.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-orange">Kapcsolat</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-orange mt-0.5 shrink-0" />
                <span>Feltoronyi utca 9, Jánossomorja, 9241</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-orange shrink-0" />
                <a href="tel:+36704224909" className="hover:text-orange transition-colors">06 70 422 4909</a>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-orange shrink-0" />
                <span>Hétfő–Péntek: 8:00–18:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-orange shrink-0" />
                <a href="mailto:info@pliszepro.hu" className="hover:text-orange transition-colors">info@pliszepro.hu</a>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-orange">Gyors linkek</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-white/70 hover:text-orange transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service area */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-orange">Szolgáltatási terület</h4>
            <ul className="space-y-2">
              {counties.map(c => (
                <li key={c} className="text-sm text-white/70">{c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} PlisszéPro — Minden jog fenntartva.
          </p>
          <div className="flex gap-4 text-xs text-white/50">
            <a href="#" className="hover:text-orange transition-colors">ÁSZF</a>
            <a href="/dokumentumok/adatkezelesi-tajekoztato.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors">Adatvédelem</a>
            <Link to="/impresszum" className="hover:text-orange transition-colors">Impresszum</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
