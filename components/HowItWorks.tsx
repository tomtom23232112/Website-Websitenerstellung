'use client';

import { motion } from 'framer-motion';
import { HOW_IT_WORKS } from '@/lib/data';

interface HowItWorksProps {
  onCTAClick: () => void;
}

export default function HowItWorks({ onCTAClick }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs text-red font-black uppercase tracking-widest mb-3">The Process</div>
          <h2 className="text-3xl md:text-4xl font-black text-navy uppercase tracking-tight mb-12">
            How It Works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {HOW_IT_WORKS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="text-5xl font-black text-gray-100 mb-3 leading-none">{step.step}</div>
              <h3 className="text-base font-black text-navy uppercase tracking-tight mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Guarantee block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-off-white border-l-4 border-navy px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <div className="text-xs text-navy font-black uppercase tracking-widest mb-1">Our Guarantee</div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-lg">
              If you don&apos;t love the mockup, you walk away — zero dollars owed, zero awkward conversations.
              We take the risk so you don&apos;t have to.
            </p>
          </div>
          <button
            onClick={onCTAClick}
            className="shrink-0 bg-red text-white text-xs font-black uppercase tracking-wider px-7 py-4 hover:bg-red-dark transition-colors cursor-pointer"
          >
            Get My Free Mockup →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
