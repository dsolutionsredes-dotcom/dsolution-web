'use client';

import { useEffect, useMemo, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion } from '@/components/Motion';

export type PromoData = {
  title?: string;
  subtitle?: string;
  content?: string | unknown;
  link_text?: string;
  link_url?: string;
  button_text?: string;
  button_url?: string;
  image_url?: string;
};

function normalizeContent(value: unknown) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value);
  } catch {
    return '';
  }
}

function isValidLink(value?: string) {
  return !!value && (value.startsWith('http') || value.startsWith('/') || value.startsWith('#'));
}

export default function PromoPopup({ promo }: { promo?: PromoData }) {
  const [visible, setVisible] = useState(false);
  const content = useMemo(() => normalizeContent(promo?.content), [promo?.content]);

  useEffect(() => {
    if (!promo?.title) return;
    const dismissed = sessionStorage.getItem('dsolution_promo_dismissed');
    if (dismissed === promo.title) return;
    const timer = window.setTimeout(() => setVisible(true), 900);
    return () => window.clearTimeout(timer);
  }, [promo?.title]);

  if (!promo?.title || !visible) return null;

  const link = promo.link_url || promo.button_url || (isValidLink(content) ? content : undefined);
  const text = promo.link_text || promo.button_text || 'Ver promoción';

  const close = () => {
    sessionStorage.setItem('dsolution_promo_dismissed', promo.title || 'promo');
    setVisible(false);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6">
      <button
        aria-label="Cerrar promoción"
        onClick={close}
        className="absolute inset-0 bg-[#002147]/72 backdrop-blur-[6px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="relative z-[91] grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] border border-[#D4AF37]/30 bg-white shadow-[0_40px_110px_rgba(0,33,71,.38)] md:grid-cols-[.92fr_1.08fr]"
      >
        <button
          onClick={close}
          className="absolute right-4 top-4 z-10 rounded-full border border-slate-200 bg-white/95 p-2 text-slate-500 shadow-sm transition hover:text-[#002147]"
          aria-label="Cerrar promoción"
        >
          <X size={18} />
        </button>

        <div className="relative min-h-[260px] bg-[#F7F3EA] md:min-h-[470px]">
          {promo.image_url ? (
            <img
              src={promo.image_url}
              alt={promo.title}
              className="h-full w-full object-contain p-4 md:p-6"
            />
          ) : (
            <div className="flex h-full min-h-[260px] items-center justify-center bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,.35),transparent_34%),linear-gradient(135deg,#09233d,#061523)] p-8 text-center text-white/80 md:min-h-[470px]">
              <div>
                <img src="/logo.png" alt="D-Solution" className="mx-auto mb-5 h-20 w-20 rounded-full object-cover" />
                <p className="text-sm font-semibold uppercase tracking-[.25em] text-[#D4AF37]">D-Solution</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center p-6 md:p-10">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-[#D4AF37]">Promoción</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#002147] md:text-4xl">{promo.title}</h3>
          {promo.subtitle && <p className="mt-4 leading-7 text-slate-600">{promo.subtitle}</p>}
          {content && !isValidLink(content) && <p className="mt-3 text-sm leading-6 text-slate-500">{content}</p>}
          <div className="mt-7 flex flex-wrap gap-3">
            {link && (
              <a
                href={link}
                target={link.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#002147] transition hover:-translate-y-0.5"
              >
                {text} <ArrowRight size={16} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
