import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, ArrowLeft, ArrowRight, CheckCircle2, Info, FileText, Package, ShieldCheck } from 'lucide-react';

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
  '9016': 'Feh\u00e9r',
  '7016': 'Antracit sz\u00fcrke',
  '9005': 'Fekete',
  '8019': 'S\u00f6t\u00e9tbarna',
  '3020': 'Piros',
  '5015': '\u00c9gk\u00e9k',
  '6005': 'Mohaz\u00f6ld',
  '1015': 'Elef\u00e1ntcsont',
  '7035': 'Vil\u00e1gossz\u00fcrke',
  '7024': 'Grafitsz\u00fcrke',
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
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitError, setSubmitError] = useState('');
  const formLoadTime = useRef(Date.now());
  const mathChallenge = useMemo(() => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    return { a, b, answer: a + b };
  }, []);

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
            ? `Kalkul\u00e1torb\u00f3l: ${detail.rows.map((r: { width: string; height: string; qty: string }) => `${r.width}x${r.height} cm, ${r.qty} db`).join('; ')} \u2014 Becs\u00fclt nett\u00f3 \u00e1r: ${Math.round(detail.totalPrice).toLocaleString('hu-HU')} Ft`
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
  const isMathCorrect = securityAnswer.trim() === String(mathChallenge.answer);
  const canAdvanceStep3 = form.name.trim().length > 0 && form.phone.trim().length > 0 && form.email.trim().length > 0 && form.gdpr && isMathCorrect;

  const handleSubmit = async () => {
    setSubmitError('');

    if (honeypot) return;

    const elapsed = Date.now() - formLoadTime.current;
    if (elapsed < 3000) {
      setSubmitError('K\u00e9rj\u00fck, ellen\u0151rizze az adatokat, majd pr\u00f3b\u00e1lja \u00fajra.');
      return;
    }

    if (!isMathCorrect) {
      setSubmitError('K\u00e9rj\u00fck, adja meg a helyes v\u00e1laszt a biztons\u00e1gi ellen\u0151rz\u00e9shez.');
      return;
    }

    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Lead', {
        content_name: form.installOption === 'survey' ? 'Felm\u00e9r\u00e9s + be\u00e9p\u00edt\u00e9s' : 'Csak term\u00e9k',
        content_category: 'Aj\u00e1nlatk\u00e9r\u00e9s',
      });
      if (form.installOption === 'survey') {
        (window as any).fbq('track', 'Schedule');
      }
    }

    try {
      await fetch('https://services.leadconnectorhq.com/hooks/WVILUafkMwFTamabZKQl/webhook-trigger/5cdacb00-ce78-44dd-8c02-c791fd4c5eb6', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kiszallitas: form.installOption === 'survey' ? 'Felm\u00e9r\u00e9s + be\u00e9p\u00edt\u00e9s' : 'Csak term\u00e9k',
          szelesseg_cm: form.width,
          magassag_cm: form.height,
          darabszam: form.qty,
          szin: form.color === 'white' ? 'Feh\u00e9r' : form.color === 'antracit' ? 'Antracit' : form.color === 'custom_ral' ? 'Egyedi RAL' : 'Sz\u00ednkombin\u00e1ci\u00f3',
          ral_kod: form.ralCode,
          halo_tipus: form.mesh,
          telepules: form.city,
          kivant_idopont: form.preferredDate,
          uzenet: form.message,
          nev: form.name,
          telefon: form.phone,
          email: form.email,
          becsult_ar_netto: form.estimatedPrice,
        }),
      });
    } catch (_) {
      // Submission UI proceeds regardless of webhook delivery
    }

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
              K\u00f6sz\u00f6nj\u00fck!
            </h3>
            <p className="text-muted text-lg">
              Hamarosan felvessz\u00fck \u00d6nnel a kapcsolatot.
            </p>
            <p className="text-muted mt-4">
              Ink\u00e1bb telefon\u00e1lna? <a href="tel:+36704224909" className="text-orange font-semibold hover:underline">06 70 422 4909</a>
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
          <p className="section-overline">Kapcsolatfelv\u00e9tel</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-ink mb-4">
            K\u00e9rjen aj\u00e1nlatot
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
                  {s === 1 ? 'Hogyan k\u00e9ri?' : s === 2 ? 'R\u00e9szletek' : 'Kapcsolat'}
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
                  <p className="text-center text-muted mb-8 font-medium">Hogyan szeretn\u00e9 k\u00e9rni?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => selectInstall('self')}
                      className={`border-2 rounded-2xl p-6 text-left transition-all hover:border-orange hover:shadow-card-hover ${
                        form.installOption === 'self' ? 'border-orange bg-orange-tint' : 'border-line bg-white'
                      }`}
                    >
                      <Package size={28} className="text-orange mb-3" />
                      <h4 className="font-display font-semibold text-lg text-ink mb-1">Csak term\u00e9ket k\u00e9rek</h4>
                      <p className="text-sm text-muted">A plisz\u00e9 sz\u00fanyogh\u00e1l\u00f3t m\u00e9retre gy\u00e1rtva k\u00e9rheti, a be\u00e9p\u00edt\u00e9st saj\u00e1t maga v\u00e9gzi.</p>
                    </button>
                    <button
                      onClick={() => selectInstall('survey')}
                      className={`border-2 rounded-2xl p-6 text-left transition-all hover:border-orange hover:shadow-card-hover ${
                        form.installOption === 'survey' ? 'border-orange bg-orange-tint' : 'border-line bg-white'
                      }`}
                    >
                      <Truck size={28} className="text-orange mb-3" />
                      <h4 className="font-display font-semibold text-lg text-ink mb-1">Felm\u00e9r\u00e9st \u00e9s be\u00e9p\u00edt\u00e9st is k\u00e9rek</h4>
                      <p className="text-sm text-muted">Helysz\u00edni felm\u00e9r\u00e9ssel \u00e9s szakszer\u0171 be\u00e9p\u00edt\u00e9ssel k\u00e9sz\u00edt\u00fcnk aj\u00e1nlatot.</p>
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
                        Saj\u00e1t be\u00e9p\u00edt\u00e9s eset\u00e9n a m\u00e9ret visszaszab\u00e1sa k\u00fcl\u00f6n d\u00edj ellen\u00e9ben k\u00e9rhet\u0151. Csak sz\u00e1ll\u00edt\u00e1s eset\u00e9n a be\u00e9p\u00edt\u00e9sre \u00e9s a helysz\u00edni m\u00e9retpontoss\u00e1gra nem tudunk garanci\u00e1t v\u00e1llalni.
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
                        Sz\u00e9less\u00e9g (cm) {form.installOption === 'survey' && <span className="text-muted/60">\u2014 opcion\u00e1lis</span>}
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
                        Magass\u00e1g (cm) {form.installOption === 'survey' && <span className="text-muted/60">\u2014 opcion\u00e1lis</span>}
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
                      <label className="text-xs font-medium text-muted mb-1 block">Darabsz\u00e1m</label>
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
                      <label className="text-xs font-medium text-muted mb-1 block">Sz\u00edn</label>
                      <select
                        value={form.color}
                        onChange={e => update('color', e.target.value)}
                        className="w-full border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors bg-white"
                      >
                        <option value="white">Feh\u00e9r \u2014 alap\u00e1ras</option>
                        <option value="antracit">Antracit \u2014 alap\u00e1ras</option>
                        <option value="custom_ral">Egyedi RAL sz\u00edn \u2014 +30%</option>
                        <option value="combo">Sz\u00ednkombin\u00e1ci\u00f3 \u2014 +30%</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted mb-1 block">H\u00e1l\u00f3 t\u00edpus</label>
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
                      <label className="text-xs font-medium text-muted mb-1 block">RAL k\u00f3d</label>
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
                        <p className="text-xs text-muted mt-1">Egyedi RAL sz\u00edn</p>
                      )}
                      <p className="text-xs text-muted/70 mt-1">Egyedi RAL sz\u00edn vagy sz\u00ednkombin\u00e1ci\u00f3 eset\u00e9n 30% fel\u00e1r ker\u00fcl felsz\u00e1m\u00edt\u00e1sra.</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-muted mb-1 block">Telep\u00fcl\u00e9s *</label>
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
                        <label className="text-xs font-medium text-muted mb-1 block">K\u00edv\u00e1nt id\u0151pont</label>
                        <input
                          type="text"
                          value={form.preferredDate}
                          onChange={e => update('preferredDate', e.target.value)}
                          className="w-full border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors"
                          placeholder="pl. j\u00f6v\u0151 h\u00e9tf\u0151 d\u00e9lel\u0151tt"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted mb-1 block">\u00dczenet (opcion\u00e1lis)</label>
                    <textarea
                      value={form.message}
                      onChange={e => update('message', e.target.value)}
                      rows={3}
                      className="w-full border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors resize-none"
                      placeholder="Egy\u00e9b megjegyz\u00e9s..."
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
                      Tov\u00e1bb <ArrowRight size={16} />
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
                    <label className="text-xs font-medium text-muted mb-1 block">N\u00e9v *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      className="w-full border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors"
                      placeholder="Teljes n\u00e9v"
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
                      Hozz\u00e1j\u00e1rulok az adataim kezel\u00e9s\u00e9hez.
                    </span>
                  </label>

                  {/* 50% deposit note */}
                  <div className="flex items-start gap-2.5 bg-warm-beige rounded-xl px-4 py-3 mt-2">
                    <FileText size={14} className="text-orange/70 shrink-0 mt-0.5" />
                    <p className="text-xs text-muted leading-relaxed">
                      Megrendel\u00e9s eset\u00e9n a gy\u00e1rt\u00e1s ind\u00edt\u00e1s\u00e1hoz 50% d\u00edjbek\u00e9r\u0151 sz\u00fcks\u00e9ges.
                    </p>
                  </div>

                  {/* Custom bot protection - math challenge */}
                  <div className="mt-4 rounded-xl border border-line bg-sand/20 px-4 py-3.5 space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-orange/70" />
                      <span className="text-xs font-medium text-ink/70">Biztons\u00e1gi ellen\u0151rz\u00e9s</span>
                    </div>
                    <p className="text-sm text-muted">
                      Mennyi {mathChallenge.a} + {mathChallenge.b}?
                    </p>
                    <input
                      type="number"
                      value={securityAnswer}
                      onChange={e => { setSecurityAnswer(e.target.value); setSubmitError(''); }}
                      className="w-24 border border-line rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange transition-colors"
                      placeholder="?"
                    />
                    {securityAnswer && !isMathCorrect && (
                      <p className="text-xs text-orange">
                        K\u00e9rj\u00fck, adja meg a helyes v\u00e1laszt a biztons\u00e1gi ellen\u0151rz\u00e9shez.
                      </p>
                    )}
                  </div>

                  {/* Honeypot - hidden from real users */}
                  <div className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
                    <label htmlFor="website_url">Website</label>
                    <input
                      type="text"
                      id="website_url"
                      name="website_url"
                      value={honeypot}
                      onChange={e => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {submitError && (
                    <p className="text-xs text-orange font-medium">{submitError}</p>
                  )}

                  <div className="flex justify-between pt-4">
                    <button onClick={goBack} className="btn-secondary text-sm px-5 py-2.5">
                      <ArrowLeft size={16} /> Vissza
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!canAdvanceStep3}
                      className="btn-primary text-sm px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      K\u00fcld\u00e9s
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-center text-sm text-muted mt-6">
            Ink\u00e1bb telefon\u00e1lna? <a href="tel:+36704224909" className="text-orange font-semibold hover:underline">06 70 422 4909</a>
          </p>
        </div>
      </div>
    </section>
  );
}
