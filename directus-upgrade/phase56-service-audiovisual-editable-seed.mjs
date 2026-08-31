const DIRECTUS_URL = (process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.d-solution.org').replace(/\/$/, '');
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;
if (!DIRECTUS_TOKEN) { console.error('Falta DIRECTUS_TOKEN.'); process.exit(1); }

async function api(path, options = {}) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, { ...options, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${DIRECTUS_TOKEN}`, ...(options.headers || {}) } });
  const text = await res.text(); let json = null; try { json = text ? JSON.parse(text) : null; } catch {}
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${path} => ${res.status} ${text}`);
  return json;
}

const tools = ['OBS','vMix','MimoLive','ATEM Software Control','Blackmagic Design','DaVinci Resolve','Premiere Pro','Final Cut','After Effects','Audition','Logic Pro','FL Studio','Photoshop','Canva','CapCut'];
const equipment = {
  es: ['Cámaras DSLR / mirrorless','Cámaras de estudio con CCU','Cámaras PTZ','Switcher ATEM','Consolas Yamaha / DiGiCo','Micrófonos inalámbricos UHF','Intercom','Luces LED','Pantallas LED','Proyectores','Capturadoras HDMI / SDI','Mezcladores de video'],
  en: ['DSLR / mirrorless cameras','Studio cameras with CCU','PTZ cameras','ATEM switcher','Yamaha / DiGiCo consoles','Wireless UHF microphones','Intercom','LED lights','LED screens','Projectors','HDMI / SDI capture cards','Video mixers'],
};
const processItems = {
  es: [['Análisis y reunión','Conocemos el evento, objetivos, duración, formato y requerimientos técnicos.'],['Diseño y propuesta','Creamos la propuesta técnica, equipos, roles, guion técnico y plan de producción.'],['Montaje y pruebas','Instalamos cámaras, audio, luces, red, switcher y realizamos pruebas antes del directo.'],['Producción en vivo','Operamos y dirigimos el evento con comunicación, control técnico y máxima estabilidad.'],['Entrega final','Entregamos streaming, grabación limpia, versión con gráficos o material editado.']],
  en: [['Analysis and meeting','We understand the event, goals, duration, format and technical requirements.'],['Design and proposal','We create the technical proposal, equipment plan, roles, technical script and production plan.'],['Setup and testing','We install cameras, audio, lights, network, switcher and run tests before going live.'],['Live production','We operate and direct the event with communication, technical control and maximum stability.'],['Final delivery','We deliver streaming, clean recording, graphic version or edited material.']],
};
const content = {
  es: {
    simple: {
      'hero.eyebrow':['hero','Soluciones audiovisuales'], 'hero.title':['hero','Eventos, streaming y producción en vivo'], 'hero.text':['hero','Planificamos, configuramos y operamos sistemas audiovisuales para eventos presenciales, transmisiones multicámara, podcasts y equipos que necesitan trabajar con calidad profesional.'], 'hero.cta':['hero','Planificar mi evento'], 'hero.secondary':['hero','Ver capacidades'],
      'services.eyebrow':['services','Nuestros servicios'], 'services.title':['services','Soluciones audiovisuales completas'], 'services.text':['services','Nos enfocamos principalmente en eventos y streaming profesional, con capacidades adicionales para podcast, instalación, postproducción y capacitación técnica.'],
      'streaming.eyebrow':['streaming','Servicio destacado'], 'streaming.title':['streaming','Transmitimos tu evento a donde esté tu audiencia'], 'streaming.text':['streaming','Creamos transmisiones estables, profesionales y bien planificadas para eventos presenciales, conferencias, marcas, iglesias, agencias y creadores.'], 'streaming.cta':['streaming','Planificar mi streaming'],
      'training.eyebrow':['training','Capacitación técnica'], 'training.title':['training','Formamos a tu equipo para producir con confianza'], 'training.text':['training','Capacitamos a equipos de empresas, colegios, universidades, iglesias e instituciones para que puedan operar sus propios sistemas audiovisuales con más seguridad.'],
      'tools.eyebrow':['tools','Tecnología y software'], 'tools.title':['tools','Herramientas que dominamos'], 'tools.text':['tools','Trabajamos con herramientas profesionales para producir, transmitir, grabar, editar y entregar contenido audiovisual de calidad.'], 'equipment.title':['equipment','Equipo profesional'],
      'process.eyebrow':['process','Nuestro proceso'], 'process.title':['process','Así trabajamos en tu proyecto'],
      'projects.eyebrow':['projects','Trabajos realizados'], 'projects.title':['projects','Espacios para tus fotos reales'], 'projects.text':['projects','Aquí podrás subir imágenes reales de eventos, streaming, podcast, instalaciones y backstage técnico desde Directus.'],
      'condition.title':['condition','Condición técnica profesional'], 'condition.text':['condition','Trabajamos con equipos propios o con equipos del cliente solo cuando cumplen los requisitos mínimos para garantizar estabilidad, calidad de imagen, audio y transmisión.'],
      'final.eyebrow':['final','¿Listo para tu evento?'], 'final.title':['final','Planifiquemos tu proyecto audiovisual'], 'final.text':['final','Cuéntanos qué quieres producir y te ayudaremos a definir el sistema técnico, equipo humano, montaje y flujo de trabajo ideal.'],
      'hero.image':['hero','Imagen principal','Sube aquí la foto principal de eventos o streaming.'], 'streaming.image':['streaming','Imagen streaming','Sube aquí una foto real de realización multicámara, switcher o evento.'], 'training.image':['training','Imagen capacitación','Sube aquí una foto real de capacitación, equipo o sala.'],
    },
    trust: [['Producción profesional','De la preproducción a la entrega final'],['Eventos presenciales','Barcelona y proyectos en España'],['Transmisión estable','Full HD como base y 4K bajo requerimiento'],['Equipo técnico','Cámaras, audio, luces, switcher e intercom']],
    services: [['Streaming profesional','Transmitimos eventos multicámara a YouTube, Facebook, TikTok, Instagram, Zoom, Teams o web propia, con gráficos, audio de consola y grabación simultánea.'],['Dirección de TV y shows en vivo','Diseñamos la preproducción, guion técnico, escaleta, tiros de cámara, coordinación de operadores y dirección en vivo desde switcher e intercom.'],['Producción de podcast','Creamos setups de video podcast con cámaras, audio por canales separados, iluminación, gráficos, intro/outro y clips para redes.'],['Instalación audiovisual','Instalaciones temporales o fijas para salas, empresas, colegios, iglesias y espacios que necesitan cámaras, sonido, luces o streaming.'],['Postproducción de video','Edición básica, intermedia o avanzada, multicámara, reels, subtítulos, limpieza de audio, color básico y gráficos.'],['Capacitación técnica','Formamos equipos internos para operar cámaras, audio, iluminación, streaming y flujos básicos de producción.']],
    streamingBullets: ['Multiplataforma: YouTube, Facebook, TikTok, Instagram y web propia','Zoom, Teams y eventos cerrados','Producción multicámara con gráficos y lower thirds','Audio profesional desde consola','Grabación simultánea limpia y con gráficos','Subtítulos automáticos con IA bajo requerimiento','Base Full HD 1080p y 4K bajo cotización'],
    trainingBullets: ['Cámaras DSLR, mirrorless, estudio, PTZ y configuración','Audio profesional y consolas digitales','Iluminación, DMX, Avolites o GrandMA según proyecto','Streaming y realización en vivo','Flujos de trabajo antes, durante y después del evento','Capacitación de 1 a 3 días según necesidad'],
    projects: [['Evento corporativo','Transmisión multicámara'],['Conferencia','Streaming y operación técnica'],['Podcast profesional','Set, cámaras, audio e iluminación'],['Instalación audiovisual','Sistema preparado para operar'],['Show en vivo','Dirección y realización']],
  },
  en: {
    simple: {
      'hero.eyebrow':['hero','Audiovisual solutions'], 'hero.title':['hero','Events, streaming and live production'], 'hero.text':['hero','We plan, configure and operate audiovisual systems for in-person events, multicamera streams, podcasts and teams that need professional production quality.'], 'hero.cta':['hero','Plan my event'], 'hero.secondary':['hero','View capabilities'],
      'services.eyebrow':['services','Our services'], 'services.title':['services','Complete audiovisual solutions'], 'services.text':['services','We focus mainly on events and professional streaming, with additional capabilities for podcasts, installations, post-production and technical training.'],
      'streaming.eyebrow':['streaming','Featured service'], 'streaming.title':['streaming','We broadcast your event wherever your audience is'], 'streaming.text':['streaming','We build stable, professional and well-planned streams for in-person events, conferences, brands, churches, agencies and creators.'], 'streaming.cta':['streaming','Plan my stream'],
      'training.eyebrow':['training','Technical training'], 'training.title':['training','We train your team to produce with confidence'], 'training.text':['training','We train company, school, university, church and institution teams so they can operate their own audiovisual systems with more confidence.'],
      'tools.eyebrow':['tools','Technology and software'], 'tools.title':['tools','Tools we master'], 'tools.text':['tools','We work with professional tools to produce, broadcast, record, edit and deliver high-quality audiovisual content.'], 'equipment.title':['equipment','Professional equipment'],
      'process.eyebrow':['process','Our process'], 'process.title':['process','How we work on your project'],
      'projects.eyebrow':['projects','Selected work'], 'projects.title':['projects','Spaces for your real photos'], 'projects.text':['projects','Here you can upload real images of events, streaming, podcasts, installations and technical backstage from Directus.'],
      'condition.title':['condition','Professional technical condition'], 'condition.text':['condition','We work with our own equipment or client equipment only when it meets the minimum requirements to guarantee stability, image quality, audio and broadcasting.'],
      'final.eyebrow':['final','Ready for your event?'], 'final.title':['final','Let’s plan your audiovisual project'], 'final.text':['final','Tell us what you want to produce and we will help you define the right technical system, crew, setup and workflow.'],
      'hero.image':['hero','Main image','Upload the main event or streaming photo here.'], 'streaming.image':['streaming','Streaming image','Upload a real multicamera production, switcher or event photo here.'], 'training.image':['training','Training image','Upload a real training, team or venue photo here.'],
    },
    trust: [['Professional production','From pre-production to final delivery'],['In-person events','Barcelona and projects across Spain'],['Stable broadcasting','Full HD as standard and 4K on request'],['Technical setup','Cameras, audio, lights, switcher and intercom']],
    services: [['Professional streaming','We broadcast multicamera events to YouTube, Facebook, TikTok, Instagram, Zoom, Teams or your own website, with graphics, console audio and simultaneous recording.'],['TV direction and live shows','We design the pre-production, technical script, rundown, camera shots, operator coordination and live direction from switcher and intercom.'],['Podcast production','We create video podcast setups with cameras, separated audio channels, lighting, graphics, intro/outro and clips for social media.'],['Audiovisual installation','Temporary or fixed installations for rooms, companies, schools, churches and venues that need cameras, sound, lighting or streaming.'],['Video post-production','Basic, intermediate or advanced editing, multicamera edits, reels, subtitles, audio cleanup, basic color and graphics.'],['Technical training','We train internal teams to operate cameras, audio, lighting, streaming and basic production workflows.']],
    streamingBullets: ['Multiplatform: YouTube, Facebook, TikTok, Instagram and own website','Zoom, Teams and closed events','Multicamera production with graphics and lower thirds','Professional audio from console','Simultaneous clean and graphic recording','AI subtitles on request','Full HD 1080p as standard and 4K by quote'],
    trainingBullets: ['DSLR, mirrorless, studio, PTZ cameras and configuration','Professional audio and digital consoles','Lighting, DMX, Avolites or GrandMA depending on the project','Streaming and live direction','Workflows before, during and after the event','1 to 3 day training depending on the need'],
    projects: [['Corporate event','Multicamera broadcast'],['Conference','Streaming and technical operation'],['Professional podcast','Set, cameras, audio and lighting'],['Audiovisual installation','System ready to operate'],['Live show','Direction and realization']],
  }
};
function row(locale, section, key, text, secondary_text, sort = 0) { return { page: 'service-audiovisual', locale, section, key, text, secondary_text, sort, is_published: true }; }
function rows(locale) {
  const c = content[locale]; const r = [];
  Object.entries(c.simple).forEach(([key, v], i) => r.push(row(locale, v[0], key, v[1], v[2], i + 1)));
  c.trust.forEach(([t,d], i) => r.push(row(locale, 'trust', `trust.${i+1}`, t, d, 20+i)));
  c.services.forEach(([t,d], i) => r.push(row(locale, 'services', `services.${i+1}`, t, d, 40+i)));
  c.streamingBullets.forEach((t, i) => r.push(row(locale, 'streaming', `streaming.bullet.${i+1}`, t, undefined, 70+i)));
  c.trainingBullets.forEach((t, i) => r.push(row(locale, 'training', `training.bullet.${i+1}`, t, undefined, 90+i)));
  tools.forEach((t, i) => r.push(row(locale, 'tools', `tools.${i+1}`, t, undefined, 110+i)));
  equipment[locale].forEach((t, i) => r.push(row(locale, 'equipment', `equipment.${i+1}`, t, undefined, 130+i)));
  processItems[locale].forEach(([t,d], i) => r.push(row(locale, 'process', `process.${i+1}`, t, d, 150+i)));
  c.projects.forEach(([t,d], i) => { r.push(row(locale, 'projects', `projects.${i+1}`, t, d, 170+i)); r.push(row(locale, 'projects', `projects.${i+1}.image`, `${t} image`, locale === 'es' ? 'Sube aquí una foto real.' : 'Upload a real photo here.', 190+i)); });
  return r;
}
async function upsert(row) {
  const params = new URLSearchParams(); params.set('filter[page][_eq]', row.page); params.set('filter[locale][_eq]', row.locale); params.set('filter[key][_eq]', row.key); params.set('limit','1'); params.set('fields','id');
  const found = await api(`/items/page_elements?${params}`); const id = found?.data?.[0]?.id;
  if (id) { await api(`/items/page_elements/${id}`, { method:'PATCH', body:JSON.stringify(row) }); console.log(`Actualizado: ${row.locale} · ${row.key}`); }
  else { await api('/items/page_elements', { method:'POST', body:JSON.stringify(row) }); console.log(`Creado: ${row.locale} · ${row.key}`); }
}
const all = [...rows('es'), ...rows('en')]; for (const item of all) await upsert(item);
console.log(`Listo: ${all.length} elementos de Soluciones Audiovisuales preparados para Visual Editor.`);
