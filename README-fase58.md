# Faza 58 – Ajustes visuales Soluciones Audiovisuales

Ruta: `/servicios/tecnologia-audiovisual`

Incluye los cambios pedidos:

- hero con imagen como fondo completo, no en cuadrado;
- overlay/sombra principalmente en el lado del texto;
- hero más compacto para ver título, texto, botones y beneficios al abrir la página;
- título grande: “Soluciones audiovisuales” y subtítulo amarillo: “Eventos, streaming y producción en vivo”;
- sección “Soluciones audiovisuales completas” más compacta, sin texto descriptivo y con 6 cards en una línea en desktop;
- sección streaming compacta, sin subtítulo, con imagen como fondo;
- sección capacitación compacta, sin subtítulo y con caja gris a la derecha;
- sección tecnología/software con logo + texto, sin cajas, y equipo profesional separado por línea vertical;
- proceso horizontal con círculos dorados y flechas;
- proyectos con título “Algunos de nuestros proyectos”, sin texto extra, sin iconos y sin bloque técnico;
- formulario final usando `ContactSection`, igual que Home;
- todo conectado a Directus Visual Editor mediante `page_elements`.

Después del deploy puedes ejecutar:

```bash
DIRECTUS_URL=https://admin.d-solution.org DIRECTUS_TOKEN=TOKENUL_TAU node directus-upgrade/phase58-service-audiovisual-editable-seed.mjs
```

No pegues el token en ChatGPT.
