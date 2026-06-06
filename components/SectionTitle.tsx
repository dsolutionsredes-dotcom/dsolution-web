'use client';
import { motion } from './Motion';

export default function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .7 }} className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[.28em] text-gold">{eyebrow}</p>
      <h2 className="text-4xl font-semibold tracking-tight text-navy md:text-6xl">{title}</h2>
      {text && <p className="mt-5 text-lg leading-8 text-navy/70">{text}</p>}
    </motion.div>
  );
}
