import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Calculator as CalcIcon, Info } from 'lucide-react';

const BASE_PRICE_PER_M2_NET = 37000;
const CUSTOM_COLOR_SURCHARGE = 0.30;

type ColorType = 'white' | 'antracit' | 'custom_ral' | 'combo';

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
  const cleaned = input.replace(/\s+/g, '').toUpperCase().replace('RAL', '');
  return cleaned;
}

function getRalName(code: string): string | null {
  const num = parseRalCode(code);
  return RAL_NAMES[num] || null;
}

function hasColorSurcharge(color: ColorType): boolean {
  return color === 'custom_ral' || color === 'combo';
}

interface Row {
  width: string;
  height: string;
  qty: string;
  color: ColorType;
  ralCode: string;
  mesh: 'standard';
}

function formatHuf(n: number): string {
  return Math.round(n).toLocaleString('hu-HU').replace(/,/g, ' ') + ' Ft';
}

interface CalculatorResult {
  width: number;
  height: number;
  qty: number;
  m2: number;
  basePrice: number;
  surcharge: number;
  totalPrice: number;
  color: ColorType;
}

export default function CalculatorSection() {
  const [rows, setRows] = useState<Row[]>([
    { width: '', height: '', qty: '1', color: 'white', ralCode: '', mesh: 'standard' },
  ]);
  const [results, setResults] = useState<CalculatorResult[] | null>(null);

  const addRow = () => {
    setRows([...rows, { width: '', height: '', qty: '1', color: 'white', ralCode: '', mesh: 'standard' }]);
  };

  const removeRow = (i: number) => {
    if (rows.length <= 1) return;
    setRows(rows.filter((_, idx) => idx !== i));
  };

  const updateRow = (i: number, field: keyof Row, value: string) => {
    const updated = [...rows];
    updated[i] = { ...updated[i], [field]: value };
    setRows(updated);
  };

  const calculate = () => {
    const calculated: CalculatorResult[] = rows.map(row => {
      const w = parseFloat(row.width) || 0;
      const h = parseFloat(row.height) || 0;
      const q = parseInt(row.qty) || 1;
      const m2 = (w / 100) * (h / 100) * q;
      const basePrice = m2 * BASE_PRICE_PER_M2_NET;
      const surcharge = hasColorSurcharge(row.color) ? basePrice * CUSTOM_COLOR_SURCHARGE : 0;
      const totalPrice = basePrice + surcharge;
      return { width: w, height: h, qty: q, m2, basePrice, surcharge, totalPrice, color: row.color };
    });
    setResults(calculated);
    const total = calculated.reduce((s, r) => s + r.totalPrice, 0);
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'ViewContent', {
        content_name: 'Kalkulátor számítás',
        value: Math.round(total),
        currency: 'HUF',
      });
    }
  };

  const isValid = rows.every(r => parseFloat(r.width) > 0 && parseFloat(r.height) > 0);

  const scrollToQuote = () => {
    const el = document.querySelector('#ajanlatkeres');
    el?.scrollIntoView({ behavior: 'smooth' });

    const detail = {
      rows: rows.map((r, i) => ({
        width: r.width,
        height: r.height,
        qty: r.qty,
        color: r.color,
        ralCode: r.ralCode,
        mesh: r.mesh,
        estimatedPrice: results ? results[i]?.totalPrice : 0,
      })),
      totalPrice: results ? results.reduce((s, r) => s + r.totalPrice, 0) : 0,
    };
    window.dispatchEvent(new CustomEvent('prefill-quote', { detail }));
  };

  const totalM2 = results ? results.reduce((s, r) => s + r.m2, 0) : 0;
  const totalBase = results ? results.reduce((s, r) => s + r.basePrice, 0) : 0;
  const totalSurcharge = results ? results.reduce((s, r) => s + r.surcharge, 0) : 0;
  const totalPrice = results ? results.reduce((s, r) => s + r.totalPrice, 0) : 0;

  return (
    <section id="kalkulator" className="section-padding bg-warm-gradient relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange/[0.03] rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />

      <div className="container-narrow relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="section-overline">Tervezés</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-ink mb-4">
            Szúnyogháló kalkulátor
          </h2>
          <p className="text-muted max-w-lg mx-auto">
            Számolja ki becsült nettó árát pillanatok alatt.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white border border-line-warm rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-card-hover ring-1 ring-orange/5"
        >
          <div className="space-y-5">
            {rows.map((row, i) => (
              <div key={i} className="space-y-3 pb-4 border-b border-line-warm last:border-0 last:pb-0">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-end">
                  <div>
                    <label className="text-xs font-medium text-muted mb-1 block">Szélesség (cm)</label>
                    <input
                      type="number"
                      min="1"
                      value={row.width}
                      onChange={e => updateRow(i, 'width', e.target.value)}
                      className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
                      placeholder="pl. 120"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted mb-1 block">Magasság (cm)</label>
                    <input
                      type="number"
                      min="1"
                      value={row.height}
                      onChange={e => updateRow(i, 'height', e.target.value)}
                      className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
                      placeholder="pl. 220"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted mb-1 block">Darabszám</label>
                    <input
                      type="number"
                      min="1"
                      value={row.qty}
                      onChange={e => updateRow(i, 'qty', e.target.value)}
                      className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="text-xs font-medium text-muted mb-1 block">Háló</label>
                      <select
                        value={row.mesh}
                        onChange={e => updateRow(i, 'mesh', e.target.value)}
                        className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors bg-white"
                      >
                        <option value="standard">Standard üvegszálas</option>
                        <option value="pet" disabled>Macskabiztos PET (hamarosan)</option>
                      </select>
                    </div>
                    {rows.length > 1 && (
                      <button
                        onClick={() => removeRow(i)}
                        className="p-2.5 text-muted hover:text-red-500 transition-colors shrink-0"
                        aria-label="Sor törlése"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
                  <div>
                    <label className="text-xs font-medium text-muted mb-1 block">Szín</label>
                    <select
                      value={row.color}
                      onChange={e => updateRow(i, 'color', e.target.value)}
                      className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors bg-white"
                    >
                      <option value="white">Fehér — alapáras</option>
                      <option value="antracit">Antracit — alapáras</option>
                      <option value="custom_ral">Egyedi RAL szín — +30%</option>
                      <option value="combo">Színkombináció — +30%</option>
                    </select>
                  </div>
                  {hasColorSurcharge(row.color) && (
                    <div>
                      <label className="text-xs font-medium text-muted mb-1 block">RAL kód</label>
                      <input
                        type="text"
                        value={row.ralCode}
                        onChange={e => updateRow(i, 'ralCode', e.target.value)}
                        className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
                        placeholder="pl. RAL 7016"
                      />
                      {row.ralCode && getRalName(row.ralCode) && (
                        <p className="text-xs text-orange mt-1 font-medium">
                          {getRalName(row.ralCode)}
                        </p>
                      )}
                      {row.ralCode && !getRalName(row.ralCode) && parseRalCode(row.ralCode).length >= 4 && (
                        <p className="text-xs text-muted mt-1">Egyedi RAL szín</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={addRow} className="btn-secondary text-sm px-4 py-2.5">
              <Plus size={16} /> Új méret hozzáadása
            </button>
            <button
              onClick={calculate}
              disabled={!isValid}
              className="btn-primary text-sm px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              <CalcIcon size={16} /> Számítás
            </button>
          </div>

          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-line text-left">
                        <th className="pb-2 font-medium text-muted">SZ (cm)</th>
                        <th className="pb-2 font-medium text-muted">M (cm)</th>
                        <th className="pb-2 font-medium text-muted">Db</th>
                        <th className="pb-2 font-medium text-muted">m&sup2;</th>
                        <th className="pb-2 font-medium text-muted">Szín</th>
                        <th className="pb-2 font-medium text-muted text-right">Nettó ár</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r, i) => (
                        <tr key={i} className="border-b border-line/50">
                          <td className="py-2">{r.width}</td>
                          <td className="py-2">{r.height}</td>
                          <td className="py-2">{r.qty}</td>
                          <td className="py-2">{r.m2.toFixed(2)}</td>
                          <td className="py-2 text-xs">
                            {r.color === 'white' && 'Fehér'}
                            {r.color === 'antracit' && 'Antracit'}
                            {r.color === 'custom_ral' && <span className="text-orange">RAL +30%</span>}
                            {r.color === 'combo' && <span className="text-orange">Kombó +30%</span>}
                          </td>
                          <td className="py-2 text-right font-semibold text-ink">{formatHuf(r.totalPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 bg-warm-beige rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Összes terület</span>
                    <span className="font-medium text-ink">{totalM2.toFixed(2)} m&sup2;</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Nettó alapár ({formatHuf(BASE_PRICE_PER_M2_NET)}/m&sup2;)</span>
                    <span className="font-medium text-ink">{formatHuf(totalBase)}</span>
                  </div>
                  {totalSurcharge > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-orange">RAL / színkombináció felár (+30%)</span>
                      <span className="font-medium text-orange">+{formatHuf(totalSurcharge)}</span>
                    </div>
                  )}
                  <div className="border-t border-line-warm pt-2 mt-2 flex justify-between">
                    <span className="font-display font-semibold text-ink">Becsült végösszeg</span>
                    <span className="font-display font-bold text-orange text-lg">{formatHuf(totalPrice)} nettó</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 mt-4 text-xs text-muted">
                  <Info size={14} className="shrink-0 mt-0.5 text-muted/60" />
                  <p>Tájékoztató jellegű nettó becsült ár — a pontos árhoz egyedi ajánlat szükséges.</p>
                </div>

                <button onClick={scrollToQuote} className="btn-primary mt-5">
                  Pontos árajánlatot kérek
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
