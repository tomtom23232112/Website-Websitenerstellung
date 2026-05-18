'use client';

import { useState, useEffect } from 'react';

interface HeaderProps {
  onCTAClick: () => void;
}

export default function Header({ onCTAClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className="fixed left-0 right-0 z-50 bg-white transition-all duration-300"
      style={{ top: '32px', boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,.1)' : '0 1px 0 #e5e7eb' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-navy font-black text-base tracking-widest uppercase">
          EverAdam
        </span>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-gray-500 font-semibold hover:text-navy transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="text-sm text-gray-500 font-semibold hover:text-navy transition-colors">
            Pricing
          </a>
          <a href="#faq" className="text-sm text-gray-500 font-semibold hover:text-navy transition-colors">
            FAQ
          </a>
        </nav>

        <button
          onClick={onCTAClick}
          className="bg-red text-white text-xs font-black uppercase tracking-wider px-5 py-3 hover:bg-red-dark transition-colors cursor-pointer"
        >
          Free Mockup →
        </button>
      </div>
    </header>
  );
}
