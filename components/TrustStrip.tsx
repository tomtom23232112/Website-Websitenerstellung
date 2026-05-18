import { TRUST_STATS } from '@/lib/data';

export default function TrustStrip() {
  return (
    <section className="bg-navy py-5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap justify-around items-center gap-6">
          {TRUST_STATS.map((stat, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-white/50 font-bold uppercase tracking-widest mt-0.5">{stat.label}</div>
              </div>
              {i < TRUST_STATS.length - 1 && (
                <div className="hidden sm:block w-px h-8 bg-white/15" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
