'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { INDUSTRIES, WEBSITE_STATUSES, CRM_ENDPOINT } from '@/lib/data';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

function getUtm(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem('ea-utm') || '{}');
  } catch {
    return {};
  }
}

function buildPayload(data: {
  name: string;
  email: string;
  url: string;
  industry: string;
  area: string;
  status: string;
}) {
  return {
    name: data.name,
    email: data.email,
    current_url: data.url || 'none',
    industry: data.industry,
    service_area: data.area,
    website_status: data.status,
    source: 'everadam-website-free-mockup',
    page: typeof window !== 'undefined' ? window.location.href : '',
    ...getUtm(),
  };
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const TOTAL_STEPS = 4;

export default function Modal({ open, onClose }: ModalProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [industry, setIndustry] = useState('');
  const [area, setArea] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const areaRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const emailValid = email.includes('@') && email.includes('.');
  const canSubmit = name.trim().length > 1 && emailValid;

  useEffect(() => {
    if (open) {
      setStep(1); setDirection(1);
      setIndustry(''); setArea(''); setStatus('');
      setName(''); setEmail(''); setUrl('');
      setSubmitting(false); setDone(false);
    }
  }, [open]);

  useEffect(() => {
    if (step === 2) setTimeout(() => areaRef.current?.focus(), 350);
    if (step === 4) setTimeout(() => nameRef.current?.focus(), 350);
  }, [step]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter') {
        if (step === 2 && area.trim().length >= 2) goTo(3);
        if (step === 4 && canSubmit && !submitting) submit();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [step, area, canSubmit, submitting, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  function goTo(next: number) {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  }

  async function submit() {
    setSubmitting(true);
    try {
      await fetch(CRM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload({ name, email, url, industry, area, status })),
      });
    } catch { /* silent */ }
    setDone(true);
    setSubmitting(false);
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, y: d > 0 ? 40 : -40 }),
    center: { opacity: 1, y: 0 },
    exit: (d: number) => ({ opacity: 0, y: d > 0 ? -40 : 40 }),
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col" style={{ background: '#fff' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <span className="text-navy font-black text-sm tracking-widest uppercase">EverAdam</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 text-2xl leading-none cursor-pointer transition-colors"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-gray-100">
        <div
          className="h-full bg-red transition-all duration-500"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait" custom={direction}>
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-5xl mb-6">✅</div>
                <h2 className="text-3xl font-black text-navy uppercase tracking-tight mb-3">
                  You&apos;re on the list!
                </h2>
                <p className="text-gray-500 leading-relaxed mb-8">
                  Your custom mockup will be in your inbox within 48 hours.
                </p>
                <button
                  onClick={onClose}
                  className="bg-navy text-white text-xs font-black uppercase tracking-widest px-8 py-4 cursor-pointer hover:bg-navy/90 transition-colors"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Step 1 — Industry */}
                {step === 1 && (
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Question 1 of 4</p>
                    <h2 className="text-2xl md:text-3xl font-black text-navy uppercase tracking-tight mb-8">
                      What&apos;s your trade?
                    </h2>
                    <div className="space-y-2.5">
                      {INDUSTRIES.map((ind, i) => (
                        <button
                          key={ind.value}
                          onClick={() => { setIndustry(ind.value); goTo(2); }}
                          className="w-full flex items-center gap-4 px-5 py-3.5 border-2 text-sm font-semibold transition-all cursor-pointer group"
                          style={{
                            borderColor: industry === ind.value ? '#1e3a5f' : '#e5e7eb',
                            background: industry === ind.value ? '#1e3a5f' : '#fff',
                            color: industry === ind.value ? '#fff' : '#1e3a5f',
                          }}
                        >
                          <span
                            className="w-6 h-6 flex items-center justify-center border text-xs font-black shrink-0 transition-colors"
                            style={{
                              borderColor: industry === ind.value ? 'rgba(255,255,255,0.4)' : '#d1d5db',
                              color: industry === ind.value ? '#fff' : '#9ca3af',
                            }}
                          >
                            {LETTERS[i]}
                          </span>
                          {ind.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2 — Service Area */}
                {step === 2 && (
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Question 2 of 4</p>
                    <h2 className="text-2xl md:text-3xl font-black text-navy uppercase tracking-tight mb-3">
                      Where do you work?
                    </h2>
                    <p className="text-gray-500 text-sm mb-8">City & state or zip — we build for your exact market.</p>
                    <input
                      ref={areaRef}
                      type="text"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="e.g. Dallas, TX or 75001"
                      className="w-full border-b-2 border-gray-300 focus:border-navy outline-none py-3 text-lg text-navy font-semibold bg-transparent placeholder-gray-300 transition-colors mb-8"
                    />
                    <div className="flex items-center gap-4">
                      <button
                        disabled={area.trim().length < 2}
                        onClick={() => goTo(3)}
                        className="bg-red text-white text-sm font-black uppercase tracking-wider px-7 py-3.5 disabled:opacity-40 cursor-pointer hover:bg-red/90 transition-colors"
                      >
                        OK →
                      </button>
                      <span className="text-xs text-gray-400">press <kbd className="font-bold">Enter ↵</kbd></span>
                    </div>
                  </div>
                )}

                {/* Step 3 — Website Status */}
                {step === 3 && (
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Question 3 of 4</p>
                    <h2 className="text-2xl md:text-3xl font-black text-navy uppercase tracking-tight mb-3">
                      Current website situation?
                    </h2>
                    <p className="text-gray-500 text-sm mb-8">Honest answer helps us build the right mockup.</p>
                    <div className="space-y-2.5">
                      {WEBSITE_STATUSES.map((ws, i) => (
                        <button
                          key={ws.value}
                          onClick={() => { setStatus(ws.value); goTo(4); }}
                          className="w-full flex items-center gap-4 px-5 py-3.5 border-2 text-sm font-semibold transition-all cursor-pointer"
                          style={{
                            borderColor: status === ws.value ? '#1e3a5f' : '#e5e7eb',
                            background: status === ws.value ? '#1e3a5f' : '#fff',
                            color: status === ws.value ? '#fff' : '#1e3a5f',
                          }}
                        >
                          <span
                            className="w-6 h-6 flex items-center justify-center border text-xs font-black shrink-0 transition-colors"
                            style={{
                              borderColor: status === ws.value ? 'rgba(255,255,255,0.4)' : '#d1d5db',
                              color: status === ws.value ? '#fff' : '#9ca3af',
                            }}
                          >
                            {LETTERS[i]}
                          </span>
                          {ws.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4 — Contact */}
                {step === 4 && (
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Last step</p>
                    <h2 className="text-2xl md:text-3xl font-black text-navy uppercase tracking-tight mb-3">
                      Where do we send the mockup?
                    </h2>
                    <p className="text-gray-500 text-sm mb-8">Two fields. Mockup delivered within 48 hours.</p>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Your Name *</label>
                        <input
                          ref={nameRef}
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jane Doe"
                          className="w-full border-b-2 border-gray-300 focus:border-navy outline-none py-3 text-lg text-navy font-semibold bg-transparent placeholder-gray-300 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address *</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full border-b-2 border-gray-300 focus:border-navy outline-none py-3 text-lg text-navy font-semibold bg-transparent placeholder-gray-300 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Current Website <span className="text-gray-300 font-normal normal-case tracking-normal">optional</span></label>
                        <input
                          type="text"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="yourbusiness.com"
                          className="w-full border-b-2 border-gray-300 focus:border-navy outline-none py-3 text-lg text-navy font-semibold bg-transparent placeholder-gray-300 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="mt-8 flex items-center gap-4">
                      <button
                        disabled={!canSubmit || submitting}
                        onClick={submit}
                        className="bg-red text-white text-sm font-black uppercase tracking-wider px-7 py-3.5 disabled:opacity-40 cursor-pointer hover:bg-red/90 transition-colors"
                      >
                        {submitting ? 'Sending…' : 'Get My Free Mockup →'}
                      </button>
                      <span className="text-xs text-gray-400">press <kbd className="font-bold">Enter ↵</kbd></span>
                    </div>
                    <p className="text-xs text-gray-400 mt-4">No spam. No hard sell. Mockup delivered in 48h.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom nav */}
      {!done && (
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={() => step > 1 ? goTo(step - 1) : onClose()}
            className="text-xs text-gray-400 hover:text-navy transition-colors cursor-pointer font-semibold"
          >
            ← {step > 1 ? 'Back' : 'Cancel'}
          </button>
          <span className="text-xs text-gray-300 font-semibold">{step} / {TOTAL_STEPS}</span>
        </div>
      )}
    </div>
  );
}
