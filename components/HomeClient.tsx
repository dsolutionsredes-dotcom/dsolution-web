'use client';

import { Camera, Code2, Megaphone, Sparkles, Bot, Palette, ArrowRight, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { motion } from '@/components/Motion';

export type SiteData = {
  site: {
    site_name?: string;
    footer_text?: string;
    seo_title?: string;
    seo_description?: string;
    primary_color?: string;
    secondary_color?: string;
    background_color?: string;
  };
  home: {
    eyebrow?: string;
    hero_image?: string;
    hero_title?: string;
    hero_subtitle?: string;
    primary_button_text?: string;
    primary_button_url?: string;
    secondary_button_text?: string;
    secondary_button_url?: string;
    trusted_logos?: string;
    hero_image_url?: string;
  };
  about: {
    eyebrow?: string;
    about_image?: string;
    title?: string;
    intro?: string;
    difference?: string;
    where_we_work?: string;
    mission?: string;
    years_experience?: number;
    projects_count?: number;
    image_url?: string;
  };
  contact: {
    email?: string;
    whatsapp?: string;
    city?: string;
    country?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    n8n_webhook_url?: string;
  };
  services: Array<{ title?: string; description?: string; icon?: string; image?: string; image_url?: string; button_text?: string; button_url?: string }>;
  portfolio: Array<{ title?: string; category?: string; description?: string; project_url?: string; image?: string; image_url?: string }>;
  blog: Array<{ title?: string; excerpt?: string; category?: string; slug?: string; featured_image?: string; image_url?: string }>;
  flex: Array<{ title?: string; subtitle?: string; content?: string; section_type?: string; is_published?: boolean }>;
};

type Props = { data: SiteData };

const iconList = [Camera, Camera, Megaphone, Palette, Code2, Bot, Sparkles];
const steps = ['Diagnóstico claro', 'Estrategia personalizada', 'Producción y desarrollo', 'Optimización continua'];

function normalizeList(value?: string) {
  return (value || '').split(',').map((v) => v.trim()).filter(Boolean);
}

function isExternal(url?: string) {
  return !!url && /^https?:\/\//.test(url);
}

function getActionUrl(url?: string, fallback = '#contacto') {
  if (!url) return fallback;
  if (url === 'chatwoot' || url === 'chat') return '#chatwoot';
  return url;
}

function ImageBox({ src, alt, className = '' }: { src?: string; alt: string; className?: string }) {
  if (src) {
    return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <div className={`h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,.35),transparent_30%),linear-gradient(135deg,#09233d,#061523)] ${className}`}>
      <div className="flex h-full items-center justify-center p-10 text-center text-white/80">
        <div>
          <img src="/logo.png" alt="D-Solution" className="mx-auto mb-5 h-20 w-20 rounded-full object-cover" />
          <p className="text-sm font-semibold uppercase tracking-[.25em] text-gold">D-Solution</p>
        </div>
      </div>
    </div>
  );
}

export default function HomeClient({ data }: Props) {
  const { site, home, about, contact } = data;
  const trustedLogos = normalizeList(home.trusted_logos);
  const primaryColor = site.primary_color || '#002147';
  const secondaryColor = site.secondary_color || '#D4AF37';
  const backgroundColor = site.background_color || '#F7F3EA';

  return (
    <main className="min-h-screen overflow-hidden text-slate-950" style={{ ['--brand' as string]: primaryColor, ['--gold' as string]: secondaryColor, backgroundColor }}>
      <Navbar />

      <section id="inicio" className="relative border-b border-slate-200/70 bg-[#002147] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(212,175,55,.17),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(255,255,255,.12),transparent_26%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 pt-32 md:grid-cols-[1.05fr_.95fr] md:px-8 md:pb-24 md:pt-36">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[.24em] text-[#D4AF37]">
              {home.eyebrow || 'Agencia digital en Barcelona'}
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[.95] tracking-tight md:text-7xl">
              {home.hero_title || 'Transformamos ideas en experiencias digitales'}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/78">
              {home.hero_subtitle || 'Desde la estrategia hasta la ejecución, hacemos crecer tu presencia digital.'}
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href={getActionUrl(home.primary_button_url)} className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#D4AF37] px-6 py-4 text-sm font-bold text-[#002147] shadow-[0_18px_40px_rgba(0,0,0,.22)] transition hover:-translate-y-1">
                {home.primary_button_text || 'Solicitar propuesta'} <ArrowRight size={17} />
              </a>
              <a href={getActionUrl(home.secondary_button_url, '#servicios')} className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/25 bg-white/5 px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-white/10">
                {home.secondary_button_text || 'Ver servicios'} <ArrowRight size={17} />
              </a>
            </div>
            <div className="mt-10 grid gap-3 text-sm text-white/72 sm:grid-cols-3">
              {['Estrategia personalizada', 'Resultados medibles', 'Acompañamiento cercano'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-[#D4AF37]" /> {item}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .75, delay: .1 }} className="relative">
            <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full border border-[#D4AF37]/40" />
            <div className="absolute -bottom-5 -left-5 h-24 w-24 rounded-full bg-[#D4AF37]" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-2 shadow-[0_35px_80px_rgba(0,0,0,.35)] backdrop-blur">
              <div className="h-[340px] overflow-hidden rounded-[1.5rem] md:h-[430px]">
                <ImageBox src={home.hero_image_url} alt="D-Solution hero" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {trustedLogos.length > 0 && (
        <div className="border-b border-slate-200/70 bg-white/75">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-5 py-5 text-sm font-semibold text-slate-500 md:justify-between md:px-8">
            <span className="text-slate-700">Confían en nosotros</span>
            {trustedLogos.map((logo) => <span key={logo}>{logo}</span>)}
          </div>
        </div>
      )}

      <section id="servicios" className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[.25em] text-[#D4AF37]">Servicios</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#002147] md:text-5xl">Soluciones creativas para impulsar tu negocio</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.services.map((s, i) => {
              const Icon = iconList[i % iconList.length];
              return (
                <motion.article key={`${s.title}-${i}`} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .45, delay: i * .04 }} whileHover={{ y: -6 }} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_12px_35px_rgba(0,33,71,.08)]">
                  {s.image_url ? (
                    <div className="mb-6 h-36 overflow-hidden rounded-2xl"><ImageBox src={s.image_url} alt={s.title || 'Servicio'} /></div>
                  ) : (
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#002147] text-[#D4AF37]"><Icon size={27} /></div>
                  )}
                  <h3 className="text-xl font-semibold text-[#002147]">{s.title}</h3>
                  <p className="mt-3 min-h-[84px] leading-7 text-slate-600">{s.description}</p>
                  <a href={getActionUrl(s.button_url, '#contacto')} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#002147] group-hover:text-[#D4AF37]">
                    {s.button_text || 'Saber más'} <ArrowRight size={15} />
                  </a>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="nosotros" className="border-y border-slate-200 bg-white/70 px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[.95fr_1.05fr]">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-[0_18px_45px_rgba(0,33,71,.10)]">
            <div className="h-[360px] overflow-hidden rounded-[1.45rem]"><ImageBox src={about.image_url} alt="Sobre D-Solution" /></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-bold uppercase tracking-[.25em] text-[#D4AF37]">{about.eyebrow || 'Sobre nosotros'}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#002147] md:text-5xl">{about.title}</h2>
            <div className="mt-6 space-y-4 leading-8 text-slate-640">
              <p>{about.intro}</p>
              <p>{about.difference}</p>
              <p>{about.where_we_work}</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#002147] p-5 text-white"><strong className="text-3xl text-[#D4AF37]">+{about.years_experience || 5}</strong><p className="mt-1 text-sm text-white/70">años de experiencia</p></div>
              <div className="rounded-2xl bg-[#002147] p-5 text-white"><strong className="text-3xl text-[#D4AF37]">+{about.projects_count || 50}</strong><p className="mt-1 text-sm text-white/70">proyectos realizados</p></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[.25em] text-[#D4AF37]">Proceso</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#002147] md:text-5xl">Una forma clara de llevar tus ideas a resultados</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div key={step} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .05 }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(0,33,71,.07)]">
                <span className="text-4xl font-semibold text-[#D4AF37]">0{i + 1}</span>
                <h3 className="mt-7 font-semibold text-[#002147]">{step}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="portafolio" className="border-y border-slate-200 bg-white/70 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[.25em] text-[#D4AF37]">Portafolio</p><h2 className="mt-3 text-3xl font-semibold text-[#002147] md:text-5xl">Proyectos que inspiran</h2></div>
            <a href="#contacto" className="font-bold text-[#002147]">Ver todos los proyectos →</a>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {(data.portfolio.length ? data.portfolio : [
              { title: 'Sitio web corporativo', category: 'Desarrollo Web', description: 'Diseño y presencia digital.' },
              { title: 'Producción audiovisual', category: 'Audiovisual', description: 'Contenido visual para marca.' },
              { title: 'Campaña digital', category: 'Marketing Digital', description: 'Estrategia y contenidos.' },
            ]).map((p, i) => (
              <motion.article key={`${p.title}-${i}`} whileHover={{ y: -5 }} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(0,33,71,.08)]">
                <div className="h-44"><ImageBox src={p.image_url} alt={p.title || 'Proyecto'} /></div>
                <div className="p-5"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#D4AF37]">{p.category}</p><h3 className="mt-2 text-lg font-semibold text-[#002147]">{p.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{p.description}</p></div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[.25em] text-[#D4AF37]">Blog</p><h2 className="mt-3 text-3xl font-semibold text-[#002147] md:text-5xl">Ideas que generan impacto</h2></div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {(data.blog.length ? data.blog : [
              { title: 'Tendencias de marketing digital', category: 'Marketing', excerpt: 'Próximamente.' },
              { title: 'Cómo un buen video multiplica resultados', category: 'Audiovisual', excerpt: 'Próximamente.' },
              { title: 'IA y automatización para negocios', category: 'IA', excerpt: 'Próximamente.' },
            ]).map((post, i) => (
              <article key={`${post.title}-${i}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(0,33,71,.07)]">
                {post.image_url && <div className="h-40"><ImageBox src={post.image_url} alt={post.title || 'Blog'} /></div>}
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[.18em] text-[#D4AF37]">{post.category}</p><h3 className="mt-3 text-xl font-semibold text-[#002147]">{post.title}</h3><p className="mt-3 leading-7 text-slate-600">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="px-5 pb-20 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] bg-[#002147] p-7 text-white shadow-[0_30px_70px_rgba(0,33,71,.22)] md:grid-cols-[.85fr_1.15fr] md:p-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.25em] text-[#D4AF37]">Contacto</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Hablemos de tu próximo proyecto</h2>
            <div className="mt-8 space-y-4 text-white/82">
              <p className="flex items-center gap-3"><Mail size={18} className="text-[#D4AF37]" /> {contact.email}</p>
              <p className="flex items-center gap-3"><Phone size={18} className="text-[#D4AF37]" /> {contact.whatsapp}</p>
              <p className="flex items-center gap-3"><MapPin size={18} className="text-[#D4AF37]" /> {[contact.city, contact.country].filter(Boolean).join(', ')}</p>
            </div>
          </div>
          <form className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2"><input className="rounded-xl border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="Nombre completo" /><input className="rounded-xl border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="Email" /></div>
            <input className="rounded-xl border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="Teléfono / WhatsApp" />
            <textarea className="h-32 rounded-xl border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="Cuéntanos sobre tu proyecto" />
            <button type="button" className="rounded-xl bg-[#D4AF37] px-6 py-4 font-bold text-[#002147] transition hover:-translate-y-1">Enviar mensaje</button>
          </form>
        </div>
      </section>

      <footer className="bg-[#002147] px-5 py-12 text-white md:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div><img src="/logo.png" alt="D-Solution" className="mb-4 h-16 w-16 rounded-full object-cover" /><h3 className="text-2xl font-semibold">{site.site_name || 'D-Solution'}</h3><p className="mt-3 max-w-sm text-white/65">{site.footer_text}</p></div>
          <div><h4 className="font-semibold text-[#D4AF37]">Navegación</h4><div className="mt-4 grid gap-2 text-sm text-white/70"><a href="#inicio">Inicio</a><a href="#servicios">Servicios</a><a href="#nosotros">Sobre Nosotros</a><a href="#blog">Blog</a><a href="#contacto">Contacto</a></div></div>
          <div><h4 className="font-semibold text-[#D4AF37]">Servicios</h4><div className="mt-4 grid gap-2 text-sm text-white/70">{data.services.slice(0,5).map((s) => <span key={s.title}>{s.title}</span>)}</div></div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-sm text-white/45">© 2026 D-Solution. Todos los derechos reservados.</div>
      </footer>
    </main>
  );
}
