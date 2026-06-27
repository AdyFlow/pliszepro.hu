import { Ruler, Shield, Cat, Palette, Wrench, Award, MapPin, Truck } from 'lucide-react';

const items = [
  { icon: Ruler, text: 'Egyedi méretre gyártva' },
  { icon: Wrench, text: '100% alumínium szerkezet' },
  { icon: Shield, text: '17 mm-es profil' },
  { icon: Palette, text: 'Bármilyen RAL szín' },
  { icon: Cat, text: 'Macskabiztos PET háló – hamarosan' },
  { icon: MapPin, text: 'Ingyenes felmérés' },
  { icon: Award, text: 'Teljes körű garancia' },
  { icon: Truck, text: 'Kiszállítás és beépítés' },
];

export default function TrustStrip() {
  const doubled = [...items, ...items];

  return (
    <div className="relative bg-warm-beige border-y border-line-warm overflow-hidden py-4">
      <div
        className="flex gap-8 animate-marquee hover:[animation-play-state:paused] w-max"
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <item.icon size={16} className="text-orange" />
            <span className="text-sm font-medium text-muted whitespace-nowrap">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
