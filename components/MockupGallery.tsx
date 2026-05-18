'use client';

import { motion } from 'framer-motion';

const MOCKUPS = [
  {
    industry: 'HVAC',
    city: 'Dallas, TX',
    company: 'ProTemp HVAC',
    tagline: 'Dallas\'s #1 Rated Heating & Cooling',
    headline: 'Fast AC Repair & Installation in Dallas',
    sub: 'Same-day service · Licensed & Insured · 24/7 Emergency',
    cta: 'Request Free Estimate',
    services: ['AC Repair', 'Heating', 'Installation', 'Maintenance'],
    navBg: '#1e3a5f',
    heroBg: 'linear-gradient(135deg, #1e3a5f 0%, #2a4f7c 100%)',
    ctaBg: '#dc2626',
    badge: '★★★★★  4.9 · 312 Reviews',
  },
  {
    industry: 'Plumbing',
    city: 'Houston, TX',
    company: 'FlowRight Plumbing',
    tagline: 'Houston\'s Emergency Plumbing Experts',
    headline: '24/7 Emergency Plumbing in Houston',
    sub: 'We arrive in 60 min · No overtime charges · BBB Accredited',
    cta: 'Call Now — Fast Response',
    services: ['Leak Repair', 'Drain Cleaning', 'Water Heaters', 'Repiping'],
    navBg: '#0369a1',
    heroBg: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)',
    ctaBg: '#f59e0b',
    badge: '★★★★★  4.8 · 189 Reviews',
  },
  {
    industry: 'Roofing',
    city: 'Phoenix, AZ',
    company: 'Desert Peak Roofing',
    tagline: 'Phoenix\'s Trusted Roofing Contractor',
    headline: 'Storm Damage? We Fix It Fast',
    sub: 'Free inspections · Insurance claims handled · GAF Certified',
    cta: 'Get Free Roof Inspection',
    services: ['Roof Repair', 'Replacement', 'Storm Damage', 'Gutters'],
    navBg: '#374151',
    heroBg: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
    ctaBg: '#16a34a',
    badge: '★★★★★  4.9 · 241 Reviews',
  },
];

function MockupCard({ company, tagline, headline, sub, cta, services, navBg, heroBg, ctaBg, badge, industry, city }: typeof MOCKUPS[0]) {
  return (
    <div className="rounded-sm overflow-hidden border border-gray-200 shadow-xl">
      {/* Browser chrome */}
      <div className="px-3 py-2 flex items-center gap-1.5" style={{ background: navBg }}>
        <span className="w-2 h-2 rounded-full bg-red/70 inline-block" />
        <span className="w-2 h-2 rounded-full bg-amber/70 inline-block" />
        <span className="w-2 h-2 rounded-full bg-green-400/70 inline-block" />
        <div className="flex-1 bg-white/10 rounded h-3 ml-2 flex items-center px-2">
          <span className="text-white/40 text-xs" style={{ fontSize: '7px' }}>🔒 {company.toLowerCase().replace(/\s/g, '')}.com</span>
        </div>
      </div>

      {/* Nav bar */}
      <div className="flex items-center justify-between px-4 py-2" style={{ background: navBg }}>
        <span className="text-white font-black text-xs uppercase tracking-wider">{company}</span>
        <div className="flex items-center gap-3">
          <span className="text-white/50 text-xs hidden sm:block">Services</span>
          <span className="text-white/50 text-xs hidden sm:block">About</span>
          <span className="text-white text-xs font-bold px-2.5 py-1" style={{ background: ctaBg }}>Free Quote</span>
        </div>
      </div>

      {/* Hero section */}
      <div className="px-5 py-6" style={{ background: heroBg }}>
        <div className="text-xs font-bold mb-2" style={{ color: ctaBg === '#f59e0b' ? '#fcd34d' : '#fca5a5', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {badge}
        </div>
        <h3 className="font-black text-white text-sm leading-tight mb-2 uppercase" style={{ fontSize: '15px', letterSpacing: '-0.01em' }}>
          {headline}
        </h3>
        <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>{sub}</p>
        <div
          className="inline-block text-white text-xs font-black uppercase px-4 py-2.5"
          style={{ background: ctaBg, letterSpacing: '0.04em', fontSize: '10px' }}
        >
          {cta} →
        </div>
      </div>

      {/* Services strip */}
      <div className="bg-white px-4 py-3 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <span key={s} className="text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-sm" style={{ fontSize: '9px' }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Industry/city label */}
      <div className="bg-gray-50 border-t border-gray-100 px-4 py-2 flex items-center justify-between">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider" style={{ fontSize: '9px' }}>{industry}</span>
        <span className="text-xs text-gray-400" style={{ fontSize: '9px' }}>{city}</span>
      </div>
    </div>
  );
}

export default function MockupGallery() {
  return (
    <section className="py-20 bg-off-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs text-red font-black uppercase tracking-widest mb-3">Examples</div>
          <h2 className="text-3xl md:text-4xl font-black text-navy uppercase tracking-tight mb-3">
            This Is What We Build
          </h2>
          <p className="text-sm text-gray-500 mb-10 max-w-lg">
            Every site is custom-built for your trade, your city, and your brand.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCKUPS.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <MockupCard {...m} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
