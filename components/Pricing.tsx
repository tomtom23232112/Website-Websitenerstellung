'use client';

import { motion } from 'framer-motion';
import { SLOTS_OPEN } from '@/lib/data';

interface PricingProps {
  onCTAClick: () => void;
}

const INCLUDED = [
  'Custom designed website (yours to keep)',
  'Professional launch & setup',
  'Mobile-optimized & SEO-ready',
  'Up to 2 content updates per month',
  'Security monitoring & SSL included',
  'Priority email support',
];

export default function Pricing({ onCTAClick }: PricingProps) {
  return (
    <section id="pricing" className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs text-red font-black uppercase tracking-widest mb-3">Simple Pricing</div>
          <h2 className="text-3xl md:text-4xl font-black text-navy uppercase tracking-tight mb-12">
            One Flat Fee. Pay Only If You Love It.
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Price card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 border-2 border-navy p-8"
          >
            <div className="flex items-end gap-2 mb-2">
              <span className="text-5xl font-black text-navy">$600</span>
              <span className="text-lg text-gray-500 font-semibold mb-1.5">flat</span>
            </div>
            <div className="text-sm text-gray-500 mb-6">One-time fee. Everything included. No monthly surprises.</div>

            <div className="space-y-3 mb-8">
              {INCLUDED.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-green-600 font-black mt-px">✓</span>
                  <span className="text-sm text-navy font-semibold">{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onCTAClick}
              className="w-full bg-red text-white text-sm font-black uppercase tracking-wider py-4 hover:bg-red-dark transition-colors cursor-pointer"
            >
              Get My Free Mockup First →
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">$0 upfront — you only pay after you see it and approve it</p>
          </motion.div>

          {/* Scarcity + lock */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-64 space-y-4"
          >
            <div className="bg-red-light border border-red/30 p-6">
              <div className="text-xs text-red font-black uppercase tracking-widest mb-2">This Week Only</div>
              <div className="text-4xl font-black text-red mb-1">{SLOTS_OPEN}</div>
              <div className="text-sm text-navy font-semibold">Free mockup slots remaining</div>
              <p className="text-xs text-gray-500 mt-2">
                We cap slots each week to guarantee 48h delivery. Once they&apos;re gone, you&apos;re on the waitlist.
              </p>
            </div>

            <div className="bg-off-white border border-gray-200 p-6">
              <div className="text-xs text-navy font-black uppercase tracking-widest mb-2">72h Price Lock</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Request your mockup now and lock in your rate for 72 hours — even if prices change.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
