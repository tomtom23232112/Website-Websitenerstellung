'use client';

import { useState, useEffect } from 'react';
import { PHONE, SLOTS_OPEN } from '@/lib/data';

interface StickyBarProps {
  onCTAClick: () => void;
}

export default function StickyBar({ onCTAClick }: StickyBarProps) {
  const [topVisible, setTopVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 300);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* Top scarcity bar */}
      {topVisible && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-navy text-white text-xs font-bold flex items-center justify-center gap-4 px-4 py-2">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse inline-block" />
            Only {SLOTS_OPEN} free mockup slots left this week — closes Friday
          </span>
          <button
            onClick={onCTAClick}
            className="bg-red text-white text-xs font-black px-3 py-1 hover:bg-red-dark transition-colors cursor-pointer hidden sm:inline-block"
          >
            Claim Slot →
          </button>
          <button
            onClick={() => setTopVisible(false)}
            className="absolute right-3 text-white/40 hover:text-white text-base leading-none cursor-pointer"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}

      {/* Mobile sticky bottom CTA bar — visible after scrolling past hero */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300"
        style={{ transform: scrolled ? 'translateY(0)' : 'translateY(100%)' }}
      >
        <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-3 shadow-2xl">
          <a
            href={`tel:${PHONE.replace(/\s/g, '')}`}
            className="flex-1 border-2 border-navy text-navy text-xs font-black uppercase tracking-wider py-3 text-center"
          >
            📞 Call Now
          </a>
          <button
            onClick={onCTAClick}
            className="flex-1 bg-red text-white text-xs font-black uppercase tracking-wider py-3 cursor-pointer"
          >
            Free Mockup →
          </button>
        </div>
      </div>
    </>
  );
}
