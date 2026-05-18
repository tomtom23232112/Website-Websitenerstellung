'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CRM_ENDPOINT } from '@/lib/data';

function getUtm(): Record<string, string> {
  try { return JSON.parse(sessionStorage.getItem('ea-utm') || '{}'); } catch { return {}; }
}

export default function ExitPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [fired, setFired] = useState(false);

  const trigger = useCallback(() => {
    if (fired) return;
    const dismissed = sessionStorage.getItem('ea-exit-dismissed');
    if (dismissed) return;
    setFired(true);
    setOpen(true);
  }, [fired]);

  useEffect(() => {
    // Desktop: mouse leaves window top
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) trigger();
    };
    document.addEventListener('mouseleave', onMouseLeave);

    // Mobile: 45 second fallback
    const t = setTimeout(trigger, 45000);

    return () => {
      document.removeEventListener('mouseleave', onMouseLeave);
      clearTimeout(t);
    };
  }, [trigger]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  function dismiss() {
    sessionStorage.setItem('ea-exit-dismissed', '1');
    setOpen(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubmitting(true);
    try {
      await fetch(CRM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'everadam-website-exit-popup',
          page: window.location.href,
          ...getUtm(),
        }),
      });
    } catch { /* silent */ }
    setDone(true);
    setSubmitting(false);
    setTimeout(dismiss, 2500);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,.65)' }}
          onClick={(e) => e.target === e.currentTarget && dismiss()}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.22 }}
            className="bg-white w-full max-w-md overflow-hidden relative"
          >
            {/* Red top stripe */}
            <div className="bg-red px-7 py-4 flex items-center justify-between">
              <span className="text-white font-black text-sm uppercase tracking-widest">Wait — Don&apos;t Leave Yet</span>
              <button onClick={dismiss} className="text-white/60 hover:text-white text-xl leading-none cursor-pointer">&times;</button>
            </div>

            <div className="px-7 py-6">
              {done ? (
                <div className="text-center py-4">
                  <div className="text-3xl mb-3">✅</div>
                  <p className="text-base font-black text-navy uppercase">Spot Reserved!</p>
                  <p className="text-sm text-gray-500 mt-2">Check your inbox — we&apos;ll be in touch within 24h.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-3 bg-red-light border border-red/20 p-4 mb-5">
                    <span className="text-red text-xl">⚡</span>
                    <div>
                      <div className="text-sm font-black text-navy uppercase tracking-tight mb-1">72-Hour Price Lock</div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Leave your email and we&apos;ll hold your slot + lock in your rate for the next 72 hours — even if prices go up.
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-4">
                    Every week you wait = more jobs going to competitors with better websites.
                    This takes 10 seconds.
                  </p>

                  <form onSubmit={submit} className="flex flex-col gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="border-2 border-gray-200 px-4 py-3 text-sm text-navy font-semibold focus:border-navy outline-none"
                    />
                    <button
                      type="submit"
                      disabled={submitting || !email.includes('@')}
                      className="bg-red text-white text-sm font-black uppercase tracking-wider py-4 disabled:opacity-50 cursor-pointer hover:bg-red-dark transition-colors"
                    >
                      {submitting ? 'Locking in…' : 'Lock In My Slot →'}
                    </button>
                  </form>

                  <button
                    onClick={dismiss}
                    className="w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-3 cursor-pointer transition-colors"
                  >
                    No thanks, I&apos;ll lose jobs to competitors instead
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
