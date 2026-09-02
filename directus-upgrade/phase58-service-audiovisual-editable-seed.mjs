const DIRECTUS_URL = (process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.d-solution.org').replace(/\/$/, '');
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;
if (!DIRECTUS_TOKEN) { console.error('Falta DIRECTUS_TOKEN.'); process.exit(1); }

async function api(path, options = {}) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, { ...options, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${DIRECTUS_TOKEN}`, ...(options.headers || {}) } });
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch {}
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${path} => ${res.status} ${text}`);
  return json;
}

const data = {
  es: {
    rows: [
      ['hero','hero.eyebrow','Servicio principal'], ['hero','hero.title','Soluciones audiovisuales'], ['hero','hero.kicker','Eventos, streaming y producción en vivo'], ['hero','hero.text','Planificamos y operamos sistemas audiovisuales para eventos presenciales, transmisiones multicámara, podcasts y equipos que necesitan calidad profesional.'], ['hero','hero.cta','Planificar mi evento'], ['hero','hero.secondary','Ver capacidades'], ['hero','hero.image','Foto principal','Sube aquí una foto real de evento, streaming o backstage técnico.'],
      ['services','services.eyebrow','Nuestros servicios'], ['services','services.title','Soluciones audiovisuales completas'],
      ['streaming','streaming.eyebrow','Streaming profesional'], ['streaming','streaming.title','Transmitimos tu evento a donde esté tu audiencia'], ['streaming','streaming.cta','Planificar mi streaming'], ['streaming','streaming.image','Foto de streaming','Sube una foto real de switcher, multicámara, evento o transmisión.'],
      ['training','training.eyebrow','Capacitación técnica'], ['training','training.title','Formamos a tu equipo para producir con confianza'], ['training','training.image','Foto de capacitación','Sube una foto real de capacitación, setup técnico o sala.'], ['training','training.box.title','Para empresas, colegios, universidades, iglesias y equipos internos.'], ['training','training.box.text','Capacitaciones de 1 a 3 días según necesidad.'],
      ['tools','tools.eyebrow','Tecnología y software'], ['tools','tools.title','Herramientas que dominamos'], ['equipment','equipment.title','Equipo profesional'],
      ['process','process.eyebrow','Nuestro proceso'], ['process','process.title','Así trabajamos en tu proyecto'],
      ['projects','projects.eyebrow','Trabajos realizados'], ['projects','projects.title','Algunos de nuestros proyectos'],
    ],
    trust: [['Producción profesional','De la preproducción a la entrega final'], ['Eventos presenciales','Barcelona y proyectos en España'], ['Transmisión estable','Full HD como base y 4K bajo requerimiento'], ['Equipo técnico','Cámaras, audio, luces, switcher e intercom']],
    services: [['Streaming profesional','Eventos multicámara con gráficos, audio profesional y grabación simultánea.'], ['Dirección de TV y shows en vivo','Preproducción, guion técnico, escaleta, switcher e intercom.'], ['Producción de podcast','Video podcast, audio por canales, iluminación, gráficos y clips.'], ['Instalación audiovisual','Sistemas temporales o fijos para salas, empresas e instituciones.'], ['Postproducción de video','Edición multicámara, reels, subtítulos, audio, color y gráficos.'], ['Capacitación técnica','Formación para operar cámaras, audio, luces y streaming.']],
    streamingBullets: ['YouTube, Facebook, TikTok, Instagram y web propia', 'Zoom, Teams y eventos cerrados', 'Producción multicámara con gráficos y lower thirds', 'Audio profesional desde consola', 'Grabación limpia y versión con gráficos', 'Subtítulos automáticos con IA bajo requerimiento', 'Full HD 1080p y 4K bajo cotización'],
    trainingBullets: ['Cámaras DSLR, mirrorless, estudio, PTZ y configuración', 'Audio profesional y consolas digitales', 'Iluminación y control DMX', 'Streaming y realización en vivo', 'Flujos de trabajo y operación de eventos', 'Capacitación personalizada en tu sala o estudio'],
    equipment: ['Cámaras DSLR / Mirrorless', 'Cámaras de estudio con CCU', 'Cámaras PTZ', 'Switcher ATEM', 'Consolas Yamaha / DiGiCo', 'Micrófonos inalámbricos UHF', 'Luces LED y control DMX', 'Proyectores', 'Intercom', 'Luces LED y control DMX', 'Capturadoras HDMI / SDI', 'Mezcladores de video'],
    process: [['Análisis y reunión','Conocemos tu evento, objetivos y requerimientos técnicos.'], ['Diseño y propuesta','Creamos la propuesta técnica, equipo y plan de producción.'], ['Montaje y pruebas','Instalamos, configuramos y realizamos pruebas técnicas.'], ['Producción en vivo','Operamos y dirigimos tu evento con máxima calidad.'], ['Entrega final','Entregamos streaming, grabación y material final editado.']],
    projects: [['Evento corporativo','Transmisión multicámara'], ['Conferencia internacional','Streaming en 4 plataformas'], ['Podcast profesional','Producción de video podcast'], ['Instalación audiovisual','Sistema audiovisual completo'], ['Show en vivo','Dirección y realización']],
  },
  en: {
    rows: [
      ['hero','hero.eyebrow','Core service'], ['hero','hero.title','Audiovisual solutions'], ['hero','hero.kicker','Events, streaming and live production'], ['hero','hero.text','We plan and operate audiovisual systems for in-person events, multicamera streaming, podcasts and teams that need professional quality.'], ['hero','hero.cta','Plan my event'], ['hero','hero.secondary','View capabilities'], ['hero','hero.image','Main photo','Upload a real event, streaming or technical backstage photo here.'],
      ['services','services.eyebrow','Our services'], ['services','services.title','Complete audiovisual solutions'],
      ['streaming','streaming.eyebrow','Professional streaming'], ['streaming','streaming.title','We broadcast your event wherever your audience is'], ['streaming','streaming.cta','Plan my stream'], ['streaming','streaming.image','Streaming photo','Upload a real switcher, multicamera, event or broadcast photo.'],
      ['training','training.eyebrow','Technical training'], ['training','training.title','We train your team to produce with confidence'], ['training','training.image','Training photo','Upload a real training, setup or room photo.'], ['training','training.box.title','For companies, schools, universities, churches and internal teams.'], ['training','training.box.text','1 to 3 day trainings depending on the need.'],
      ['tools','tools.eyebrow','Technology and software'], ['tools','tools.title','Tools we master'], ['equipment','equipment.title','Professional equipment'],
      ['process','process.eyebrow','Our process'], ['process','process.title','How we work on your project'],
      ['projects','projects.eyebrow','Selected work'], ['projects','projects.title','Some of our projects'],
    ],
    trust: [['Professional production','From pre-production to final delivery'], ['In-person events','Barcelona and projects across Spain'], ['Stable broadcasting','Full HD as standard and 4K on request'], ['Technical setup','Cameras, audio, lights, switcher and intercom']],
    services: [['Professional streaming','Multicamera events with graphics, professional audio and recording.'], ['TV direction and live shows','Pre-production, technical script, rundown, switcher and intercom.'], ['Podcast production','Video podcast, separated audio, lighting, graphics and clips.'], ['Audiovisual installation','Temporary or fixed systems for venues, companies and institutions.'], ['Video post-production','Multicamera editing, reels, subtitles, audio, color and graphics.'], ['Technical training','Training to operate cameras, audio, lighting and streaming.']],
    streamingBullets: ['YouTube, Facebook, TikTok, Instagram and own website', 'Zoom, Teams and closed events', 'Multicamera production with graphics and lower thirds', 'Professional audio from console', 'Clean recording and graphic version', 'AI subtitles on request', 'Full HD 1080p and 4K by quote'],
    trainingBullets: ['DSLR, mirrorless, studio, PTZ cameras and setup', 'Professional audio and digital consoles', 'Lighting and DMX control', 'Streaming and live direction', 'Event workflows and operation', 'Custom training in your room or studio'],
    equipment: ['DSLR / Mirrorless cameras', 'Studio cameras with CCU', 'PTZ cameras', 'ATEM switcher', 'Yamaha / DiGiCo consoles', 'Wireless UHF microphones', 'LED lights and DMX control', 'Projectors', 'Intercom', 'LED lights and DMX control', 'HDMI / SDI capture cards', 'Video mixers'],
    process: [['Analysis and meeting','We understand your event, goals and technical needs.'], ['Design and proposal','We create the technical proposal, equipment and production plan.'], ['Setup and testing','We install, configure and run technical tests.'], ['Live production','We operate and direct your event with maximum quality.'], ['Final delivery','We deliver streaming, recording and final edited material.']],
    projects: [['Corporate event','Multicamera broadcast'], ['International conference','Streaming on 4 platforms'], ['Professional podcast','Video podcast production'], ['Audiovisual installation','Complete audiovisual system'], ['Live show','Direction and realization']],
  }
};
const tools = ['OBS', 'vMix', 'MimoLive', 'ATEM Software Control', 'Blackmagic Design', 'DaVinci Resolve', 'Premiere Pro', 'Final Cut Pro', 'After Effects', 'Audition', 'Logic Pro', 'FL Studio', 'Photoshop', 'Canva', 'CapCut'];
function makeRows(locale) {
  const c = data[locale]; const rows = [];
  c.rows.forEach((r, i) => rows.push({ page:'service-audiovisual', locale, section:r[0], key:r[1], text:r[2], secondary_text:r[3], sort:i, is_published:true }));
  c.trust.forEach((r, i)=>rows.push({page:'service-audiovisual',locale,section:'trust',key:`trust.${i+1}`,text:r[0],secondary_text:r[1],sort:30+i,is_published:true}));
  c.services.forEach((r, i)=>rows.push({page:'service-audiovisual',locale,section:'services',key:`services.${i+1}`,text:r[0],secondary_text:r[1],sort:50+i,is_published:true}));
  c.streamingBullets.forEach((t, i)=>rows.push({page:'service-audiovisual',locale,section:'streaming',key:`streaming.bullet.${i+1}`,text:t,sort:70+i,is_published:true}));
  c.trainingBullets.forEach((t, i)=>rows.push({page:'service-audiovisual',locale,section:'training',key:`training.bullet.${i+1}`,text:t,sort:90+i,is_published:true}));
  tools.forEach((t, i)=>rows.push({page:'service-audiovisual',locale,section:'tools',key:`tools.${i+1}`,text:t,sort:110+i,is_published:true}));
  c.equipment.forEach((t, i)=>rows.push({page:'service-audiovisual',locale,section:'equipment',key:`equipment.${i+1}`,text:t,sort:130+i,is_published:true}));
  c.process.forEach((r, i)=>rows.push({page:'service-audiovisual',locale,section:'process',key:`process.${i+1}`,text:r[0],secondary_text:r[1],sort:150+i,is_published:true}));
  c.projects.forEach((r, i)=>{ rows.push({page:'service-audiovisual',locale,section:'projects',key:`projects.${i+1}`,text:r[0],secondary_text:r[1],sort:170+i,is_published:true}); rows.push({page:'service-audiovisual',locale,section:'projects',key:`projects.${i+1}.image`,text:`${r[0]} image`,secondary_text:'Upload a real project photo here.',sort:190+i,is_published:true}); });
  return rows;
}
async function upsert(row) {
  const params = new URLSearchParams(); params.set('filter[page][_eq]', row.page); params.set('filter[locale][_eq]', row.locale); params.set('filter[key][_eq]', row.key); params.set('limit','1'); params.set('fields','id');
  const found = await api(`/items/page_elements?${params}`); const id = found?.data?.[0]?.id;
  if (id) await api(`/items/page_elements/${id}`, { method:'PATCH', body: JSON.stringify(row) });
  else await api('/items/page_elements', { method:'POST', body: JSON.stringify(row) });
  console.log(`${id ? 'Actualizado' : 'Creado'}: ${row.locale} · ${row.key}`);
}
const all = [...makeRows('es'), ...makeRows('en')];
for (const row of all) await upsert(row);
console.log(`Listo: ${all.length} elementos para Soluciones Audiovisuales.`);
