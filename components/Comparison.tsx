'use client';

import { motion } from 'framer-motion';
import { COMPARISON_ROWS } from '@/lib/data';

function Cell({ value }: { value: boolean | null }) {
  if (value === true) return <span className="text-green-600 font-black text-base">✓</span>;
  if (value === false) return <span className="text-red font-black text-base">✗</span>;
  return <span className="text-amber font-black text-base">~</span>;
}

export default function Comparison() {
  return (
    <section className="py-20 bg-off-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs text-red font-black uppercase tracking-widest mb-3">Why EverAdam</div>
          <h2 className="text-3xl md:text-4xl font-black text-navy uppercase tracking-tight mb-10">
            Us vs. Everyone Else
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-navy">
                <th className="text-left px-5 py-3.5 text-white/50 font-bold text-xs uppercase tracking-wider w-1/2" />
                <th className="text-center px-5 py-3.5 text-white font-black text-xs uppercase tracking-wider">EverAdam</th>
                <th className="text-center px-5 py-3.5 text-white/50 font-bold text-xs uppercase tracking-wider">Other Agencies</th>
                <th className="text-center px-5 py-3.5 text-white/50 font-bold text-xs uppercase tracking-wider">DIY (Wix/GoDaddy)</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? 'bg-white' : 'bg-off-white'}
                  style={{ borderBottom: '1px solid #f3f4f6' }}
                >
                  <td className="px-5 py-3.5 text-navy font-semibold">{row.feature}</td>
                  <td className="px-5 py-3.5 text-center"><Cell value={row.everadam} /></td>
                  <td className="px-5 py-3.5 text-center"><Cell value={row.agency} /></td>
                  <td className="px-5 py-3.5 text-center"><Cell value={row.diy} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="text-xs text-gray-400 mt-4">~ = depends on provider and plan</p>
      </div>
    </section>
  );
}
