'use client';

import { Camera, Code2, Megaphone, Sparkles, Workflow, Globe2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SectionTitle from '@/components/SectionTitle';
import { motion } from '@/components/Motion';

export type SiteData = {
  site: { site_name?: string; footer_text?: string; seo_title?: string; seo_description?: string };
  home: { eyebrow?: string; hero_title?: string; hero_subtitle?: string; primary_button_text?: string; primary_button_url?: string; secondary_button_text?: string; secondary_button_url?: string; trusted_logos?: string };
  about: { eyebrow?: string; title?: string; intro?: string; difference?: string; where_we_work?: string; mission?: string; years_experience?: number; projects_count?: number };
  contact: { email?: string; whatsapp?: string; city?: string; country?: string; instagram?: string; facebook?: string; tiktok?: string; n8n_webhook_url?: string };
  services: Array<{ title?: string; description?: string; icon?: string }>;
  portfolio: Array<{ title?: string; category?: string; description?: string; project_url?: string }>;
  blog: Array<{ title?: string; excerpt?: string; category?: string; slug?: string }>;
  flex: Array<{ title?: string; subtitle?: string; content?: string; section_type?: string }>;
};

type Props = { data: SiteData };

const iconList = [Megaphone, Camera, Code2, Workflow, Sparkles, Globe2];
const process = ['Escuchamos tu idea', 'Diseñamos la estrategia', 'Creamos la experiencia', 'Medimos y mejoramos'];

function normalizeLogos(value?: string) {
  return (value || '').split(',').map((v) => v.trim()).filter(Boolean);
}

export default function HomeClient({ data }: Props) {
  const { site, home, about, contact } = data;
  const trustedLogos = normalizeLogos(home.trusted_logos);

  return (
    <main className="overflow-hidden bg-cream text-ink">
      <Navbar />

      <section id="inicio" className="relative min-h-screen px-6 pt-36 md:px-10">
        <div className="absolute inset-0 noise opacity-60" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute bottom-20 left-0 h-96 w-96 rounded-full bg-navy/15 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 py-20 md:grid-cols-[1.1fr_.9fr]">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85 }}>
            <p className="mb-6 inline-flex rounded-full border border-gold/40 bg-white/60 px-4 py-2 text-sm font-semibold text-navy">{home.eyebrow}</p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[.95] tracking-tight text-navy md:text-7xl lg:text-8xl">{home.hero_title}</h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-navy/72">{home.hero_subtitle}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href={home.primary_button_url || '#contacto'} className="rounded-full bg-gold px-7 py-4 text-center font-bold text-navy shadow-soft transition hover:-translate-y-1">{home.primary_button_text || 'Solicitar propuesta'}</a>
              <a href={home.secondary_button_url || '#servicios'} className="rounded-full border border-navy/20 px-7 py-4 text-center font-bold text-navy transition hover:border-gold hover:text-gold">{home.secondary_button_text || 'Ver servicios'}</a>
            </div>
            {trustedLogos.length > 0 && <div className="mt-10 flex flex-wrap gap-6 text-sm font-semibold text-navy/45">{trustedLogos.map((logo) => <span key={logo}>{logo}</span>)}</div>}
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .15 }} className="glass relative rounded-[2.5rem] p-6 shadow-soft">
            <div className="rounded-[2rem] bg-navy p-8 text-white">
              <div className="mb-20 flex justify-between text-sm text-white/60"><span>{site.site_name || 'D-SOLUTION'}</span><span>2026</span></div>
              <div className="space-y-5">
                <div className="h-20 rounded-3xl bg-gold/90" />
                <div className="ml-auto h-20 w-4/5 rounded-3xl bg-white/10" />
                <div className="h-20 w-3/5 rounded-3xl bg-white/10" />
              </div>
              <p className="mt-16 text-2xl font-semibold">Marketing · Audiovisual · Web</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="servicios" className="px-6 py-24 md:px-10">
        <SectionTitle eyebrow="Servicios" title="Servicios que impulsan tu marca" text="Combinamos creatividad, tecnología y automatización para convertir ideas en resultados." />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {data.services.map((s, i) => {
            const Icon = iconList[i % iconList.length];
            return <motion.article key={`${s.title}-${i}`} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: i * .07 }} whileHover={{ y: -8 }} className="rounded-[2rem] bg-white p-7 shadow-soft"><Icon className="mb-8 h-9 w-9 text-gold" /><h3 className="text-2xl font-semibold text-navy">{s.title}</h3><p className="mt-4 leading-7 text-navy/65">{s.description}</p></motion.article>;
          })}
        </div>
      </section>

      <section id="nosotros" className="bg-navy px-6 py-24 text-white md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .75 }}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[.28em] text-gold">{about.eyebrow || 'Sobre nosotros'}</p>
            <h2 className="text-4xl font-semibold md:text-6xl">{about.title}</h2>
            <div className="mt-8 flex gap-8 text-gold"><strong>+{about.years_experience || 5} años</strong><strong>+{about.projects_count || 50} proyectos</strong></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .75 }} className="space-y-6 text-lg leading-8 text-white/75">
            <p>{about.intro}</p>
            <p>{about.difference}</p>
            <p>{about.where_we_work}</p>
            {about.mission && <p><strong className="text-gold">Nuestra misión:</strong> {about.mission}</p>}
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10">
        <SectionTitle eyebrow="Proceso" title="Cómo trabajamos" />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
          {process.map((p, i) => <motion.div key={p} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*.08 }} className="rounded-[2rem] border border-navy/10 bg-white/70 p-7"><span className="text-5xl font-semibold text-gold">0{i+1}</span><h3 className="mt-8 text-xl font-semibold text-navy">{p}</h3></motion.div>)}
        </div>
      </section>

      <section id="portafolio" className="px-6 py-24 md:px-10">
        <SectionTitle eyebrow="Portafolio" title="Proyectos destacados" text="Añade proyectos desde Directus y aparecerán aquí." />
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {(data.portfolio.length ? data.portfolio : [{ title: 'Próximamente', category: 'Proyecto' }, { title: 'Próximamente', category: 'Proyecto' }]).map((p, i) => <motion.div key={`${p.title}-${i}`} whileHover={{ scale: 1.015 }} className="h-80 rounded-[2.5rem] bg-gradient-to-br from-navy to-navySoft p-8 text-white shadow-soft"><p className="text-gold">{p.category}</p><h3 className="mt-36 text-3xl font-semibold">{p.title}</h3></motion.div>)}
        </div>
      </section>

      <section id="blog" className="px-6 py-24 md:px-10">
        <SectionTitle eyebrow="Blog" title="Ideas y recursos" text="Añade artículos desde Directus." />
        {data.blog.length > 0 && <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">{data.blog.map((post, i) => <article key={`${post.title}-${i}`} className="rounded-[2rem] bg-white p-7 shadow-soft"><p className="text-sm text-gold">{post.category}</p><h3 className="mt-3 text-2xl font-semibold text-navy">{post.title}</h3><p className="mt-4 text-navy/65">{post.excerpt}</p></article>)}</div>}
      </section>

      <section id="contacto" className="px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.5rem] bg-white p-8 shadow-soft md:grid-cols-2 md:p-12">
          <div><p className="mb-4 text-sm font-semibold uppercase tracking-[.28em] text-gold">Contacto</p><h2 className="text-4xl font-semibold text-navy md:text-6xl">Hablemos de tu proyecto</h2><p className="mt-6 text-lg leading-8 text-navy/70">Formulario preparado para conectar con n8n: WhatsApp, Email y Google Sheets.</p><div className="mt-8 space-y-2 text-navy/75"><p>{contact.email}</p><p>{contact.whatsapp}</p><p>{[contact.city, contact.country].filter(Boolean).join(', ')}</p></div></div>
          <form className="space-y-4"><input className="w-full rounded-2xl border border-navy/10 bg-cream px-5 py-4 outline-none focus:border-gold" placeholder="Nombre" /><input className="w-full rounded-2xl border border-navy/10 bg-cream px-5 py-4 outline-none focus:border-gold" placeholder="Email" /><textarea className="h-36 w-full rounded-2xl border border-navy/10 bg-cream px-5 py-4 outline-none focus:border-gold" placeholder="Mensaje" /><button type="button" className="w-full rounded-full bg-navy px-7 py-4 font-bold text-white transition hover:bg-gold hover:text-navy">Enviar solicitud</button></form>
        </div>
      </section>

      <footer className="px-6 py-10 text-center text-sm text-navy/60">© 2026 {site.site_name || 'D-Solution'} · {site.footer_text}</footer>
    </main>
  );
}
