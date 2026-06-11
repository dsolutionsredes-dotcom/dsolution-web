'use client';

import { useEffect, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion } from '@/components/Motion';

export type PromoData = {
  title?: string;
  subtitle?: string;
  content?: string;
  link_text?: string;
  link_url?: string;
  button_text?: string;
  button_url?: string;
  image_url?: string;
};

function isValidLink(value?: string) {
  return !!value && (value.startsWith('http') || value.startsWith('/') || value.startsWith('#'));
}

export default function PromoPopup({ promo }: { promo?: PromoData }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!promo?.title) return;
    const dismissed = sessionStorage.getItem('dsolution_promo_dismissed');
    if (dismissed === promo.title) return;
    const timer = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(timer);
  }, [promo?.title]);

  if (!promo?.title || !visible) return null;

  const link = promo.link_url || promo.button_url || (isValidLink(promo.content) ? promo.content : undefined);
  const text = promo.link_text || promo.button_text || 'Ver promoción';

  const close = () => {
    sessionStorage.setItem('dsolution_promo_dismissed', promo.title || 'promo');
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-5 z-[70] px-4">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-white shadow-[0_28px_80px_rgba(0,33,71,.25)]"
      >
        <div className="grid gap-0 md:grid-cols-[.75fr_1.25fr]">
          {promo.image_url && (
            <div className="hidden min-h-[190px] bg-[#002147] md:block">
              <img src={promo.image_url} alt={promo.title} className="h-full w-full object-cover" />
            </div>
          )}
          <div className="relative p-6 md:p-7">
            <button onClick={close} className="absolute right-4 top-4 rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:text-[#002147]" aria-label="Cerrar promoción">
              <X size={18} />
            </button>
            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#D4AF37]">Promoción</p>
            <h3 className="mt-2 max-w-xl text-2xl font-semibold text-[#002147]">{promo.title}</h3>
            {promo.subtitle && <p className="mt-3 max-w-xl leading-7 text-slate-600">{promo.subtitle}</p>}
            {promo.content && !isValidLink(promo.content) && <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">{promo.content}</p>}
            <div className="mt-5 flex flex-wrap gap-3">
              {link && (
                <a href={link} target={link.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#002147] transition hover:-translate-y-0.5">
                  {text} <ArrowRight size={16} />
                </a>
              )}
              <button onClick={close} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-[#002147] hover:bg-slate-50">Cerrar</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
