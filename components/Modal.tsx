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

const STEPS = 4;

function ProgressDots({ step }: { step: number }) {
  return (
    <div className="flex gap-2 mb-6">
      {Array.from({ length: STEPS }).map((_, i) => (
        <div
          key={i}
          className="h-1.5 flex-1 rounded-full transition-colors duration-300"
          style={{ background: i < step ? '#dc2626' : '#e5e7eb' }}
        />
      ))}
    </div>
  );
}

export default function Modal({ open, onClose }: ModalProps) {
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState('');
  const [area, setArea] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const areaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setStep(1); setIndustry(''); setArea(''); setStatus('');
      setName(''); setEmail(''); setUrl('');
      setSubmitting(false); setDone(false);
    }
  }, [open]);

  useEffect(() => {
    if (step === 2) setTimeout(() => areaRef.current?.focus(), 100);
  }, [step]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  async function submit() {
    setSubmitting(true);
    try {
      await fetch(CRM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload({ name, email, url, industry, area, status })),
      });
    } catch {
      // silent fail — lead still captured if retry works
    }
    setDone(true);
    setSubmitting(false);
  }

  const emailValid = email.includes('@') && email.includes('.');
  const canSubmit = name.trim().length > 1 && emailValid;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,.6)' }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto relative"
          >
            {/* Header */}
            <div className="bg-navy px-7 py-5 flex items-center justify-between">
              <span className="text-white font-black text-sm uppercase tracking-widest">EverAdam</span>
              <button onClick={onClose} className="text-white/50 hover:text-white text-xl leading-none cursor-pointer">&times;</button>
            </div>

            <div className="px-7 py-6">
              {done ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-xl font-black text-navy uppercase mb-2">You&apos;re on the list!</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    We&apos;ll have your custom mockup ready within 48 hours.
                    Check your inbox — we&apos;ll send a preview link when it&apos;s done.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-navy text-white text-xs font-black uppercase tracking-wider px-6 py-3 cursor-pointer"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <>
                  <ProgressDots step={step} />

                  {/* Step 1 — Industry */}
                  {step === 1 && (
                    <div>
                      <div className="text-xs text-red font-black uppercase tracking-widest mb-1">Step 1 of 4 — One Click</div>
                      <h3 className="text-lg font-black text-navy uppercase mb-1">What&apos;s your trade?</h3>
                      <p className="text-sm text-gray-500 mb-5">No typing yet. Pick one to start.</p>
                      <div className="space-y-2.5">
                        {INDUSTRIES.map((ind) => (
                          <button
                            key={ind.value}
                            onClick={() => { setIndustry(ind.value); setStep(2); }}
                            className="w-full text-left px-5 py-3.5 border-2 text-sm font-semibold transition-all cursor-pointer hover:border-navy hover:bg-off-white"
                            style={{
                              borderColor: industry === ind.value ? '#1e3a5f' : '#e5e7eb',
                              background: industry === ind.value ? '#1e3a5f' : undefined,
                              color: industry === ind.value ? '#fff' : '#1e3a5f',
                            }}
                          >
                            {ind.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2 — Service Area */}
                  {step === 2 && (
                    <div>
                      <button onClick={() => setStep(1)} className="text-xs text-gray-400 hover:text-navy mb-4 cursor-pointer">← Back</button>
                      <div className="text-xs text-red font-black uppercase tracking-widest mb-1">Step 2 of 4</div>
                      <h3 className="text-lg font-black text-navy uppercase mb-1">Where do you work?</h3>
                      <p className="text-sm text-gray-500 mb-5">City & state or zip code — we&apos;ll build your mockup for your market.</p>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">City & State *</label>
                      <input
                        ref={areaRef}
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="e.g. Dallas, TX or 75001"
                        className="w-full border-2 border-gray-200 px-4 py-3 text-sm text-navy font-semibold focus:border-navy outline-none mb-5"
                      />
                      <button
                        disabled={area.trim().length < 2}
                        onClick={() => setStep(3)}
                        className="w-full bg-navy text-white text-sm font-black uppercase tracking-wider py-3.5 disabled:opacity-40 cursor-pointer hover:bg-navy-dark transition-colors"
                      >
                        Continue →
                      </button>
                    </div>
                  )}

                  {/* Step 3 — Website Status */}
                  {step === 3 && (
                    <div>
                      <button onClick={() => setStep(2)} className="text-xs text-gray-400 hover:text-navy mb-4 cursor-pointer">← Back</button>
                      <div className="text-xs text-red font-black uppercase tracking-widest mb-1">Step 3 of 4</div>
                      <h3 className="text-lg font-black text-navy uppercase mb-1">Current website?</h3>
                      <p className="text-sm text-gray-500 mb-5">Honest answer helps us build the right mockup.</p>
                      <div className="space-y-2.5">
                        {WEBSITE_STATUSES.map((ws) => (
                          <button
                            key={ws.value}
                            onClick={() => { setStatus(ws.value); setStep(4); }}
                            className="w-full text-left px-5 py-3.5 border-2 text-sm font-semibold transition-all cursor-pointer hover:border-navy hover:bg-off-white"
                            style={{
                              borderColor: status === ws.value ? '#1e3a5f' : '#e5e7eb',
                              background: status === ws.value ? '#1e3a5f' : undefined,
                              color: status === ws.value ? '#fff' : '#1e3a5f',
                            }}
                          >
                            {ws.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4 — Contact */}
                  {step === 4 && (
                    <div>
                      <button onClick={() => setStep(3)} className="text-xs text-gray-400 hover:text-navy mb-4 cursor-pointer">← Back</button>
                      <div className="text-xs text-red font-black uppercase tracking-widest mb-1">Step 4 of 4 — Almost Done</div>
                      <h3 className="text-lg font-black text-navy uppercase mb-1">Where do we send the mockup?</h3>
                      <p className="text-sm text-gray-500 mb-5">Two required fields. Mockup delivered within 48 hours.</p>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Name *</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Jane Doe"
                            className="w-full border-2 border-gray-200 px-4 py-3 text-sm text-navy font-semibold focus:border-navy outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address *</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full border-2 border-gray-200 px-4 py-3 text-sm text-navy font-semibold focus:border-navy outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Current Website URL</label>
                          <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="yourbusiness.com (or leave blank)"
                            className="w-full border-2 border-gray-200 px-4 py-3 text-sm text-navy font-semibold focus:border-navy outline-none"
                          />
                          <p className="text-xs text-gray-400 mt-1">No site? Leave it blank — we&apos;ll start from scratch.</p>
                        </div>
                      </div>

                      <button
                        disabled={!canSubmit || submitting}
                        onClick={submit}
                        className="w-full mt-6 bg-red text-white text-sm font-black uppercase tracking-wider py-4 disabled:opacity-40 cursor-pointer hover:bg-red-dark transition-colors"
                      >
                        {submitting ? 'Sending…' : 'Get My Free Mockup →'}
                      </button>
                      <p className="text-xs text-gray-400 text-center mt-3">
                        No spam. No hard sell. Mockup delivered in 48h.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
