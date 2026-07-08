'use client';

import { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';

type Locale = 'es' | 'en';
type Contact = { email?: string; whatsapp?: string; city?: string; country?: string; n8n_webhook_url?: string };
const defaults: Required<Omit<Contact, 'n8n_webhook_url'>> = { email: 'dsolutions.redes@gmail.com', whatsapp: '+34 624 57 18 59', city: 'Barcelona', country: 'España' };

export default function ContactSection({ locale, contact = {}, source = 'd-solution.org' }: { locale: Locale; contact?: Contact; source?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const values = { ...defaults, ...contact };
  const email = values.email || defaults.email;
  const whatsapp = values.whatsapp || defaults.whatsapp;
  const city = values.city || defaults.city;
  const country = values.country || defaults.country;
  const copy = locale === 'en' ? {
    eyebrow: 'Contact', title: 'Let’s talk about your next project', name: 'Full name', email: 'Email', phone: 'Phone / WhatsApp', company: 'Company / Project', msg: 'Tell us about your project', sending: 'Sending...', submit: 'Send message', validation: 'Please complete name, email and message.', success: 'Thank you for writing to us. We have received your message and will contact you soon.', error: 'We could not send your message. Please try again or write to us on WhatsApp.', wa: 'Hello, I would like more information about your services.'
  } : {
    eyebrow: 'Contacto', title: 'Hablemos de tu próximo proyecto', name: 'Nombre completo', email: 'Email', phone: 'Teléfono / WhatsApp', company: 'Empresa / Proyecto', msg: 'Cuéntanos sobre tu proyecto', sending: 'Enviando...', submit: 'Enviar mensaje', validation: 'Completa nombre, email y mensaje.', success: 'Gracias por escribirnos. Hemos recibido tu mensaje y te contactaremos pronto.', error: 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.', wa: 'Hola, quiero información sobre sus servicios.'
  };
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget; const fd = new FormData(form);
    const payload = { name: String(fd.get('name') || '').trim(), email: String(fd.get('email') || '').trim(), phone: String(fd.get('phone') || '').trim(), company: String(fd.get('company') || '').trim(), message: String(fd.get('message') || '').trim(), source, page: window.location.href };
    if (!payload.name || !payload.email || !payload.message) { setStatus('error'); setMessage(copy.validation); return; }
    try {
      setStatus('sending'); setMessage(copy.sending);
      const webhook = values.n8n_webhook_url || process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL || 'https://n8n.d-solution.org/webhook/dsolution-contact';
      const response = await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error('webhook');
      setStatus('success'); setMessage(copy.success); form.reset();
    } catch { setStatus('error'); setMessage(copy.error); }
  }
  const phone = whatsapp.replace(/[^0-9]/g, '');
  return <section id="contacto" className="px-5 pb-20 md:px-8"><div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] bg-[#002147] p-7 text-white shadow-[0_30px_70px_rgba(0,33,71,.22)] md:grid-cols-[.85fr_1.15fr] md:p-10">
    <div><p className="text-xs font-bold uppercase tracking-[.25em] text-[#D4AF37]">{copy.eyebrow}</p><h2 className="mt-3 text-3xl font-semibold md:text-5xl">{copy.title}</h2>
      <div className="mt-8 space-y-4 text-white/82"><a href={`mailto:${email}`} className="flex items-center gap-3 transition hover:text-white"><Mail size={20} className="text-[#D4AF37]"/><span>{email}</span></a><a href={`https://wa.me/${phone}?text=${encodeURIComponent(copy.wa)}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-white"><img src="/whatsapp-glyph.png" alt="WhatsApp" className="h-5 w-5 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(76%) sepia(58%) saturate(547%) hue-rotate(357deg) brightness(90%) contrast(92%)' }}/><span>{whatsapp}</span></a><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${city}, ${country}`)}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-white"><MapPin size={20} className="text-[#D4AF37]"/><span>{city}, {country}</span></a></div>
    </div>
    <form onSubmit={submit} className="grid gap-4"><div className="grid gap-4 md:grid-cols-2"><input name="name" required className="rounded-xl border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder={copy.name}/><input name="email" type="email" required className="rounded-xl border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder={copy.email}/></div><div className="grid gap-4 md:grid-cols-2"><input name="phone" className="rounded-xl border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder={copy.phone}/><input name="company" className="rounded-xl border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder={copy.company}/></div><textarea name="message" required className="h-32 rounded-xl border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder={copy.msg}/><button disabled={status === 'sending'} className="rounded-xl bg-[#D4AF37] px-6 py-4 font-bold text-[#002147] transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60">{status === 'sending' ? copy.sending : copy.submit}</button>{message && <p className={`text-sm font-semibold ${status === 'success' ? 'text-emerald-300' : status === 'error' ? 'text-red-200' : 'text-white/75'}`}>{message}</p>}</form>
  </div></section>;
}
