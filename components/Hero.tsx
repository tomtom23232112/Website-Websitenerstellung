'use client';

import { motion } from 'framer-motion';
import { SLOTS_OPEN } from '@/lib/data';

interface HeroProps {
  onCTAClick: () => void;
}

function MockupCard() {
  return (
    <div className="w-full max-w-sm rounded-sm overflow-hidden shadow-2xl border border-gray-200">
      {/* Browser chrome */}
      <div className="bg-navy px-4 py-2.5 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-red inline-block" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber inline-block" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />
        <div className="flex-1 bg-white/10 rounded h-3.5 ml-2" />
      </div>
      {/* Site preview */}
      <div className="bg-white p-5">
        <div className="bg-navy h-8 w-24 mb-4 rounded-sm" />
        <div className="bg-gray-100 h-24 rounded-sm mb-4 flex items-center justify-center">
          <span className="text-xs text-gray-400 font-bold tracking-widest uppercase">Your Business Photo</span>
        </div>
        <div className="bg-navy h-4 w-3/4 rounded-sm mb-2" />
        <div className="bg-gray-200 h-3 w-1/2 rounded-sm mb-4" />
        <div className="bg-red h-9 w-36 rounded-sm" />
      </div>
    </div>
  );
}

export default function Hero({ onCTAClick }: HeroProps) {
  return (
    <section className="pt-36 pb-16 bg-white border-b-4 border-navy">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-16">
          {/* Left: copy */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-red-light border border-red/40 text-red text-xs font-black uppercase tracking-widest px-3 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-red inline-block animate-pulse" />
                Only {SLOTS_OPEN} Slots Open This Week
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy uppercase leading-none tracking-tight mb-6">
                Stop Losing<br />Jobs To<br />
                <span className="text-red">Competitors.</span>
              </h1>

              <p className="text-base text-gray-500 mb-8 max-w-md leading-relaxed">
                We build a <strong className="text-navy">free custom mockup</strong> for your business in 48 hours.
                You only pay if you love it — $0 upfront, no contracts.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <button
                  onClick={onCTAClick}
                  className="bg-red text-white text-sm font-black uppercase tracking-wider px-8 py-4 hover:bg-red-dark transition-colors cursor-pointer"
                >
                  Get My Free Mockup →
                </button>
                <span className="text-xs text-gray-400 font-semibold">No card &middot; No contract</span>
              </div>

              {/* 3-step mini process */}
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                {[
                  { n: '1', t: 'Tell us your trade', sub: '60 seconds' },
                  { n: '2', t: 'We build your mockup', sub: '48 hours' },
                  { n: '3', t: 'Love it or walk away', sub: '$0 risk' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-navy text-white text-xs font-black flex items-center justify-center shrink-0">{s.n}</div>
                    <div>
                      <div className="text-xs font-black text-navy leading-none">{s.t}</div>
                      <div className="text-xs text-gray-400 leading-none">{s.sub}</div>
                    </div>
                    {i < 2 && <span className="text-gray-300 mx-1 font-black">→</span>}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {['48h Delivery', '$0 Upfront', 'US-Based', 'No Contracts'].map((item) => (
                  <span key={item} className="text-xs text-navy font-bold">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: mockup card */}
          <motion.div
            className="w-full lg:w-auto flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <MockupCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
