'use client';

import { motion } from 'framer-motion';
import { MOCKUP_EXAMPLES } from '@/lib/data';

function MockupCard({ industry, city, headline, cta, accent }: (typeof MOCKUP_EXAMPLES)[0]) {
  return (
    <div className="rounded-sm overflow-hidden border border-gray-200 shadow-lg">
      {/* Browser chrome */}
      <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: accent }}>
        <span className="w-2 h-2 rounded-full bg-red inline-block" />
        <span className="w-2 h-2 rounded-full bg-amber inline-block" />
        <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
        <div className="flex-1 bg-white/15 rounded h-3 ml-2" />
      </div>
      {/* Content */}
      <div className="bg-white p-5">
        <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: accent }}>
          {industry} · {city}
        </div>
        <div className="h-14 bg-gray-100 rounded-sm mb-4 flex items-center justify-center">
          <span className="text-xs text-gray-400 font-semibold">Business Photo</span>
        </div>
        <div className="text-sm font-black text-navy uppercase leading-tight mb-2">{headline}</div>
        <div className="h-3 w-2/3 bg-gray-200 rounded-sm mb-4" />
        <div
          className="text-xs font-black text-white uppercase px-4 py-2.5 inline-block"
          style={{ background: accent }}
        >
          {cta}
        </div>
      </div>
      {/* FTC */}
      <div className="bg-red-light border-t border-red/20 px-4 py-2 text-center">
        <span className="text-xs text-red font-black tracking-wider uppercase">
          Concept — Not a Real Site
        </span>
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
            Every mockup is custom-built for your trade, your city, and your brand.
            These are concept designs — yours will be tailored to you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {MOCKUP_EXAMPLES.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <MockupCard {...ex} />
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center">
          All designs shown are illustrative concepts only and are not representations of live client sites.
          Results shown are for demonstration purposes.
        </p>
      </div>
    </section>
  );
}
