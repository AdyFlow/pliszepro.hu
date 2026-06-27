import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Phone, Mail, Globe, FileText, Hash, Landmark, Server } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const companyData = [
  { icon: Building2, label: 'CÉGNÉV', value: 'Kari Zoltán Ev.' },
  { icon: MapPin, label: 'CÍM', value: '9241 Jánossomorja, Feltoronyi utca 9.' },
  { icon: Phone, label: 'TELEFON', value: '+36 70 422 4909', href: 'tel:+36704224909' },
  { icon: Mail, label: 'E-MAIL', value: 'info@pliszepro.hu', href: 'mailto:info@pliszepro.hu' },
  { icon: Globe, label: 'INTERNET', value: 'www.pliszepro.hu', href: 'https://www.pliszepro.hu' },
  { icon: Landmark, label: 'BEJEGYZŐ HATÓSÁG', value: 'NAV' },
  { icon: Hash, label: 'ADÓSZÁM', value: '90583872-1-28' },
  { icon: FileText, label: 'KAMARA', value: 'Vármegyei Kereskedelmi és Iparkamara' },
];

const hostingData = [
  { icon: Building2, label: 'NÉV', value: 'RACKFOREST ZRT.' },
  { icon: MapPin, label: 'CÍM', value: '1132 Budapest, Victor Hugo u. 11. 5. em/B05001' },
  { icon: Phone, label: 'TELEFON', value: '+36 1 211 0044', href: 'tel:+3612110044' },
  { icon: Mail, label: 'E-MAIL', value: 'info@rackforest.com', href: 'mailto:info@rackforest.com' },
];

export default function Impresszum() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-36 md:pt-40 pb-20 bg-warm-white min-h-screen">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-orange transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Vissza a főoldalra
          </Link>

          {/* Title */}
          <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-ink mb-6">
            Impresszum
          </h1>

          {/* Download notice */}
          <div className="bg-orange-tint border border-orange/20 rounded-xl p-4 mb-10">
            <p className="text-sm text-ink">
              <span className="text-orange font-semibold">Az impresszum letöltéséhez </span>
              {/* TODO: replace # with actual PDF path when available */}
              <a href="#" className="text-orange font-semibold underline underline-offset-2 hover:text-orange-deep transition-colors">
                kattintson ide!
              </a>
            </p>
          </div>

          {/* Company info card */}
          <div className="bg-white border border-line-warm rounded-2xl overflow-hidden shadow-card mb-10">
            <div className="bg-gradient-orange px-6 py-4">
              <h2 className="font-display font-semibold text-white text-lg">Üzemeltető adatai</h2>
            </div>
            <div className="divide-y divide-line-warm">
              {companyData.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 px-6 py-4 ${i % 2 === 1 ? 'bg-warm-beige' : 'bg-white'}`}
                >
                  <div className="w-9 h-9 rounded-lg bg-orange-tint flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon size={16} className="text-orange" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0 flex-1">
                    <span className="text-xs font-semibold text-muted uppercase tracking-wider shrink-0 sm:w-40">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-semibold text-ink hover:text-orange transition-colors break-all"
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-ink">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hosting provider card */}
          <div className="bg-white border border-line-warm rounded-2xl overflow-hidden shadow-card">
            <div className="bg-ink px-6 py-4 flex items-center gap-3">
              <Server size={18} className="text-orange" />
              <h2 className="font-display font-semibold text-white text-lg">Tárhelyszolgáltató</h2>
            </div>
            <div className="divide-y divide-line-warm">
              {hostingData.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 px-6 py-4 ${i % 2 === 1 ? 'bg-warm-beige' : 'bg-white'}`}
                >
                  <div className="w-9 h-9 rounded-lg bg-orange-tint flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon size={16} className="text-orange" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0 flex-1">
                    <span className="text-xs font-semibold text-muted uppercase tracking-wider shrink-0 sm:w-40">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-semibold text-ink hover:text-orange transition-colors break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-ink">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
