'use client';
import { Camera, Code2, Megaphone, Sparkles, Workflow, Globe2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SectionTitle from '@/components/SectionTitle';
import { motion } from '@/components/Motion';

const services = [
  { icon: Megaphone, title: 'Marketing Digital', text: 'Estrategias de contenido, campañas y crecimiento para marcas con objetivos claros.' },
  { icon: Camera, title: 'Producción Audiovisual', text: 'Fotografía, video, reels y material visual para comunicar con impacto.' },
  { icon: Code2, title: 'Desarrollo Web', text: 'Webs modernas, rápidas y escalables preparadas para crecer con tu negocio.' },
  { icon: Workflow, title: 'Automatización n8n', text: 'Formularios, leads, WhatsApp, email y Google Sheets conectados en flujos automáticos.' },
  { icon: Sparkles, title: 'Branding Creativo', text: 'Identidad visual y comunicación para diferenciar tu marca.' },
  { icon: Globe2, title: 'Presencia Digital', text: 'Soluciones integrales para construir una marca sólida en internet.' }
];

const process = ['Escuchamos tu idea', 'Diseñamos la estrategia', 'Creamos la experiencia', 'Medimos y mejoramos'];

export default function Home() {
  return (
    <main className="overflow-hidden bg-cream text-ink">
      <Navbar />

      <section id="inicio" className="relative min-h-screen px-6 pt-36 md:px-10">
        <div className="absolute inset-0 noise opacity-60" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute bottom-20 left-0 h-96 w-96 rounded-full bg-navy/15 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 py-20 md:grid-cols-[1.1fr_.9fr]">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85 }}>
            <p className="mb-6 inline-flex rounded-full border border-gold/40 bg-white/60 px-4 py-2 text-sm font-semibold text-navy">Agencia digital en Barcelona</p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[.95] tracking-tight text-navy md:text-7xl lg:text-8xl">Transformamos ideas en experiencias digitales</h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-navy/72">Desde la estrategia hasta la ejecución, hacemos crecer tu presencia digital.</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#contacto" className="rounded-full bg-gold px-7 py-4 text-center font-bold text-navy shadow-soft transition hover:-translate-y-1">Solicitar propuesta</a>
              <a href="#servicios" className="rounded-full border border-navy/20 px-7 py-4 text-center font-bold text-navy transition hover:border-gold hover:text-gold">Ver servicios</a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .15 }} className="glass relative rounded-[2.5rem] p-6 shadow-soft">
            <div className="rounded-[2rem] bg-navy p-8 text-white">
              <div className="mb-20 flex justify-between text-sm text-white/60"><span>D-SOLUTION</span><span>2026</span></div>
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
        <SectionTitle eyebrow="Servicios" title="Soluciones para crecer" text="Combinamos creatividad, tecnología y automatización para convertir ideas en resultados." />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {services.map((s, i) => <motion.article key={s.title} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: i * .07 }} whileHover={{ y: -8 }} className="rounded-[2rem] bg-white p-7 shadow-soft"><s.icon className="mb-8 h-9 w-9 text-gold" /><h3 className="text-2xl font-semibold text-navy">{s.title}</h3><p className="mt-4 leading-7 text-navy/65">{s.text}</p></motion.article>)}
        </div>
      </section>

      <section id="nosotros" className="bg-navy px-6 py-24 text-white md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .75 }}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[.28em] text-gold">Sobre nosotros</p>
            <h2 className="text-4xl font-semibold md:text-6xl">De una idea en pareja a una agencia digital en crecimiento</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .75 }} className="space-y-6 text-lg leading-8 text-white/75">
            <p>D-Solution nació como un pequeño proyecto creado por una pareja con una visión clara: ayudar a negocios y emprendedores a destacar en el mundo digital mediante soluciones creativas, estratégicas y efectivas.</p>
            <p>No creemos en soluciones genéricas. Cada marca tiene una historia, objetivos y desafíos únicos. Por eso trabajamos de manera cercana, diseñando estrategias personalizadas que combinan creatividad, tecnología y resultados medibles.</p>
            <p><strong className="text-gold">Barcelona</strong> es nuestra base, pero trabajamos también con clientes de otras ciudades y países gracias a herramientas digitales y comunicación remota.</p>
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
        <SectionTitle eyebrow="Portafolio" title="Proyectos destacados" text="Espacio preparado para añadir casos reales en la siguiente fase desde el panel administrador." />
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {[1,2].map((i) => <motion.div key={i} whileHover={{ scale: 1.015 }} className="h-80 rounded-[2.5rem] bg-gradient-to-br from-navy to-navySoft p-8 text-white shadow-soft"><p className="text-gold">Proyecto {i}</p><h3 className="mt-36 text-3xl font-semibold">Próximamente</h3></motion.div>)}
        </div>
      </section>

      <section id="blog" className="px-6 py-24 md:px-10">
        <SectionTitle eyebrow="Blog" title="Ideas y recursos" text="El blog queda preparado para conectarse con Directus en la Fase 3." />
      </section>

      <section id="contacto" className="px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.5rem] bg-white p-8 shadow-soft md:grid-cols-2 md:p-12">
          <div><p className="mb-4 text-sm font-semibold uppercase tracking-[.28em] text-gold">Contacto</p><h2 className="text-4xl font-semibold text-navy md:text-6xl">Hablemos de tu proyecto</h2><p className="mt-6 text-lg leading-8 text-navy/70">Formulario preparado para conectar con n8n: WhatsApp, Email y Google Sheets.</p><div className="mt-8 space-y-2 text-navy/75"><p>dsolutions.redes@gmail.com</p><p>+34 624 57 18 59</p><p>Barcelona</p></div></div>
          <form className="space-y-4"><input className="w-full rounded-2xl border border-navy/10 bg-cream px-5 py-4 outline-none focus:border-gold" placeholder="Nombre" /><input className="w-full rounded-2xl border border-navy/10 bg-cream px-5 py-4 outline-none focus:border-gold" placeholder="Email" /><textarea className="h-36 w-full rounded-2xl border border-navy/10 bg-cream px-5 py-4 outline-none focus:border-gold" placeholder="Mensaje" /><button type="button" className="w-full rounded-full bg-navy px-7 py-4 font-bold text-white transition hover:bg-gold hover:text-navy">Enviar solicitud</button></form>
        </div>
      </section>

      <footer className="px-6 py-10 text-center text-sm text-navy/60">© 2026 D-Solution · Instagram · Facebook · TikTok</footer>
    </main>
  );
}
