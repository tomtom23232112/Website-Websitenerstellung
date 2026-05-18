import { PHONE } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-navy py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
          <div>
            <div className="text-white font-black text-base tracking-widest uppercase mb-2">EverAdam</div>
            <div className="text-white/50 text-sm">{PHONE}</div>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="/privacy/" className="text-white/40 text-xs hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="/terms/" className="text-white/40 text-xs hover:text-white/70 transition-colors">Terms of Service</a>
            <a href="#faq" className="text-white/40 text-xs hover:text-white/70 transition-colors">FAQ</a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 space-y-3">
          <p className="text-white/30 text-xs leading-relaxed">
            &copy; {new Date().getFullYear()} EverAdam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
