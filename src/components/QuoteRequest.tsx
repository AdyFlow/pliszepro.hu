import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, ArrowLeft, ArrowRight, CheckCircle2, Info, FileText, Package } from 'lucide-react';

type InstallOption = 'self' | 'survey' | null;
type ColorType = 'white' | 'antracit' | 'custom_ral' | 'combo';

interface FormData {
  installOption: InstallOption;
  width: string;
  height: string;
  qty: string;
  color: ColorType;
  ralCode: string;
  mesh: string;
  city: string;
  preferredDate: string;
  message: string;
  name: string;
  phone: string;
  email: string;
  gdpr: boolean;
  estimatedPrice: number;
}

const initialForm: FormData = {
  installOption: null,
  width: '',
  height: '',
  qty: '1',
  color: 'white',
  ralCode: '',
  mesh: 'Standard',
  city: '',
  preferredDate: '',
  message: '',
  name: '',
  phone: '',
  email: '',
  gdpr: false,
  estimatedPrice: 0,
};

const RAL_NAMES: Record<string, string> = {
  '9016': 'Fehér',
  '7016': 'Antracit szürke',
  '9005': 'Fekete',
  '8019': 'Sötétbarna',
  '3020': 'Piros',
  '5015': 'Égkék',
  '6005': 'Mohazöld',
  '1015': 'Elefántcsont',
  '7035': 'Világosszürke',
  '7024': 'Grafitszürke',
};

function parseRalCode(input: string): string {
  return input.replace(/\s+/g, '').toUpperCase().replace('RAL', '');
}

function getRalName(code: string): string | null {
  const num = parseRalCode(code);
  return RAL_NAMES[num] || null;
}

function hasColorSurcharge(color: ColorType): boolean {
  return color === 'custom_ral' || color === 'combo';
}

export default function QuoteRequest() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.rows && detail.rows.length > 0) {
        const firstRow = detail.rows[0];
        setForm(f => ({
          ...f,
          width: firstRow.width || '',
          height: firstRow.height || '',
          qty: firstRow.qty || '1',
          color: firstRow.color || 'white',
          ralCode: firstRow.ralCode || '',
          mesh: firstRow.mesh === 'standard' ? 'Standard' : 'Standard',
          estimatedPrice: detail.totalPrice || 0,
          message: detail.rows.length > 1
            ? `Kalkulátorból: ${detail.rows.map((r: { width: string; height: string; qty: string }) => `${r.width}x${r.height} cm, ${r.qty} db`).join('; ')} — Becsült nettó ár: ${Math.round(detail.totalPrice).toLocaleString('hu-HU')} Ft`
            : '',
        }));
      }
    };
    window.addEventListener('prefill-quote', handler);
    return () => window.removeEventListener('prefill-quote', handler);
  }, []);

  const update = (field: keyof FormData, value: string | boolean | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const selectInstall = (option: InstallOption) => {
    setForm(prev => ({ ...prev, installOption: option }));
    goNext();
  };

  const goNext = () => {
    setDirection(1);
    setStep(s => Math.min(s + 1, 3));
  };
  const goBack = () => {
    setDirection(-1);
    setStep(s => Math.max(s - 1, 1));
  };

  const canAdvanceStep2 = form.city.trim().length > 0;
  const canAdvanceStep3 = form.name.trim().length > 0 && form.phone.trim().length > 0 && form.email.trim().length > 0 && form.gdpr;

  const handleSubmit = async () => {
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Lead', {
        content_name: form.installOption === 'survey' ? 'Felmérés + beépítés' : 'Csak termék',
        content_category: 'Ajánlatkérés',
      });
      if (form.installOption === 'survey') {
        (window as any).fbq('track', 'Schedule');
      }
    }
    await new Promise(resolve => setTimeout(resolve, 1200));
    setSubmitted(true);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  if (submitted) {
    return (
      <section id="ajanlatkeres" className="section-padding bg-white">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center py-16"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-600" />
            </div>
            <h3 className="font-display font-bold text-2xl text-ink mb-3">
              Köszönjük!
            </h3>
            <p className="text-muted text-lg">
              Hamarosan felvesszük Önnel a kapcsolatot.
            </p>
            <p className="text-muted mt-4">
              Inkább telefonálna? <a href="tel:+36704224909" className="text-orange font-semibold hover:underline">06 70 422 4909</a>
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="ajanlatkeres" className="section-padding bg-warm-gradient-subtle relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange/[0.03] rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

      <div className="container-narrow relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="section-overline">Kapcsolatfelvétel</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-ink mb-4">
            Kérjen ajánlatot
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  step >= s ? 'bg-orange text-white shadow-glow-sm' : 'bg-line text-muted'
                }`}>
                  {s}
                </div>
                <span className={`hidden sm:inline text-xs font-medium ${step >= s ? 'text-ink' : 'text-muted'}`}>
                  {s === 1 ? 'Hogyan kéri?' : s === 2 ? 'Részletek' : 'Kapcsolat'}
                </span>
                {s < 3 && <div className={`w-8 h-0.5 transition-colors duration-300 ${step > s ? 'bg-orange' : 'bg-line'}`} />}
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="bg-white border border-line-warm rounded-2xl p-6 md:p-8 min-h-[400px] relative overflow-hidden shadow-card-warm ring-1 ring-orange/5">
            <AnimatePresence custom={direction} mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-center text-muted mb-8 font-medium">Hogyan szeretné kérni?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => selectInstall('self')}
                      className={`border-2 rounded-2xl p-6 text-left transition-all hover:border-orange hover:shadow-card-hover ${
                        form.installOption === 'self' ? 'border-orange bg-orange-tint' : 'border-line bg-white'
                      }`}
                    >
                      <Package size={28} className="text-orange mb-3" />
                      <h4 className="font-display font-semibold text-lg text-ink mb-1">Csak terméket kérek</h4>
                      <p className="text-sm text-muted">A pliszé szúnyoghálót méretre gyártva kérheti, a beépítést saját maga végzi.</p>
                    </button>
                    <button
                      onClick={() => selectInstall('survey')}
                      className={`border-2 rounded-2xl p-6 text-left transition-all hover:border-orange hover:shadow-card-hover ${
                        form.installOption === 'survey' ? 'border-orange bg-orange-tint' : 'border-line bg-white'
                      }`}
                    >
                      <Truck size={28} className="text-orange mb-3" />
                      <h4 className="font-display font-semibold text-lg text-ink mb-1">Felmérést és beépítést is kérek</h4>
                      <p className="text-sm text-muted">Helyszíni felméréssel és szakszerű beépítéssel készítünk ajánlatot.</p>
                    </button>
                  </div>

                  {form.installOption === 'self' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-5 flex items-start gap-3 bg-orange-tint border-l-4 border-orange/40 rounded-r-xl px-4 py-3"
                    >
                      <Info size={16} className="text-orange shrink-0 mt-0.5" />
                      <p className="text-xs text-muted leading-relaxed">
                        Saját beépítés esetén a méret visszaszabása külön díj ellenében kérhető. Csak szállítás esetén a beépítésre és a helyszíni méretpontosságra nem tudunk garanciát vállalni.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-medium text-muted mb-1 block">
                        Szélesség (cm) {form.installOption === 'survey' && <span className="text-muted/60">— opcionális</span>}
                      </label>
                      <input
                        type="number"
                        value={form.width}
                        onChange={e => update('width', e.target.value)}
                        className="w-full border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors"
                        placeholder="pl. 120"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted mb-1 block">
                        Magasság (cm) {form.installOption === 'survey' && <span className="text-muted/60">— opcionális</span>}
                      </label>
                      <input
                        type="number"
                        value={form.height}
                        onChange={e => update('height', e.target.value)}
                        className="w-full border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors"
                        placeholder="pl. 220"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted mb-1 block">Darabszám</label>
                      <input
                        type="number"
                        min="1"
                        value={form.qty}
                        onChange={e => update('qty', e.target.value)}
                        className="w-full border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors"
                        placeholder="1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-muted mb-1 block">Szín</label>
                      <select
                        value={form.color}
                        onChange={e => update('color', e.target.value)}
                        className="w-full border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors bg-white"
                      >
                        <option value="white">Fehér — alapáras</option>
                        <option value="antracit">Antracit — alapáras</option>
                        <option value="custom_ral">Egyedi RAL szín — +30%</option>
                        <option value="combo">Színkombináció — +30%</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted mb-1 block">Háló típus</label>
                      <select
                        value={form.mesh}
                        onChange={e => update('mesh', e.target.value)}
                        className="w-full border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors bg-white"
                      >
                        <option>Standard</option>
                        <option disabled>Macskabiztos PET (hamarosan)</option>
                      </select>
                    </div>
                  </div>

                  {hasColorSurcharge(form.color) && (
                    <div>
                      <label className="text-xs font-medium text-muted mb-1 block">RAL kód</label>
                      <input
                        type="text"
                        value={form.ralCode}
                        onChange={e => update('ralCode', e.target.value)}
                        className="w-full border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors"
                        placeholder="pl. RAL 7016"
                      />
                      {form.ralCode && getRalName(form.ralCode) && (
                        <p className="text-xs text-orange mt-1 font-medium">{getRalName(form.ralCode)}</p>
                      )}
                      {form.ralCode && !getRalName(form.ralCode) && parseRalCode(form.ralCode).length >= 4 && (
                        <p className="text-xs text-muted mt-1">Egyedi RAL szín</p>
                      )}
                      <p className="text-xs text-muted/70 mt-1">Egyedi RAL szín vagy színkombináció esetén 30% felár kerül felszámításra.</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-muted mb-1 block">Település *</label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={e => update('city', e.target.value)}
                        className="w-full border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors"
                        placeholder="pl. Szombathely"
                        required
                      />
                    </div>
                    {form.installOption === 'survey' && (
                      <div>
                        <label className="text-xs font-medium text-muted mb-1 block">Kívánt időpont</label>
                        <input
                          type="text"
                          value={form.preferredDate}
                          onChange={e => update('preferredDate', e.target.value)}
                          className="w-full border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors"
                          placeholder="pl. jövő hétfő délelőtt"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted mb-1 block">Üzenet (opcionális)</label>
                    <textarea
                      value={form.message}
                      onChange={e => update('message', e.target.value)}
                      rows={3}
                      className="w-full border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors resize-none"
                      placeholder="Egyéb megjegyzés..."
                    />
                  </div>

                  <div className="flex justify-between pt-2">
                    <button onClick={goBack} className="btn-secondary text-sm px-5 py-2.5">
                      <ArrowLeft size={16} /> Vissza
                    </button>
                    <button
                      onClick={goNext}
                      disabled={!canAdvanceStep2}
                      className="btn-primary text-sm px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Tovább <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-xs font-medium text-muted mb-1 block">Név *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      className="w-full border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors"
                      placeholder="Teljes név"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-muted mb-1 block">Telefon *</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => update('phone', e.target.value)}
                        className="w-full border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors"
                        placeholder="+36 70 123 4567"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted mb-1 block">E-mail *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => update('email', e.target.value)}
                        className="w-full border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors"
                        placeholder="nev@email.hu"
                        required
                      />
                    </div>
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={form.gdpr}
                      onChange={e => update('gdpr', e.target.checked)}
                      className="mt-0.5 w-5 h-5 rounded border-line text-orange focus:ring-orange"
                    />
                    <span className="text-sm text-muted">
                      Hozzájárulok az adataim kezeléséhez.
                    </span>
                  </label>

                  {/* 50% deposit note */}
                  <div className="flex items-start gap-2.5 bg-warm-beige rounded-xl px-4 py-3 mt-2">
                    <FileText size={14} className="text-orange/70 shrink-0 mt-0.5" />
                    <p className="text-xs text-muted leading-relaxed">
                      Megrendelés esetén a gyártás indításához 50% díjbekérő szükséges.
                    </p>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button onClick={goBack} className="btn-secondary text-sm px-5 py-2.5">
                      <ArrowLeft size={16} /> Vissza
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!canAdvanceStep3}
                      className="btn-primary text-sm px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Küldés
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-center text-sm text-muted mt-6">
            Inkább telefonálna? <a href="tel:+36704224909" className="text-orange font-semibold hover:underline">06 70 422 4909</a>
          </p>
        </div>
      </div>
    </section>
  );
}
