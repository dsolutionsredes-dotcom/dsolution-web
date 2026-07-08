@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: light; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: #F7F3EA;
  color: #101828;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
::selection { background: #D4AF37; color: #002147; }
a { text-decoration: none; }
* { box-sizing: border-box; }

.tools-marquee {
  position: relative;
  overflow: hidden;
  width: 100%;
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}
.tools-track {
  display: flex;
  width: max-content;
  gap: 1rem;
  will-change: transform;
}
.tools-left { animation: tools-left 34s linear infinite; }
.tools-right { animation: tools-right 38s linear infinite; }
.tool-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: max-content;
  border: 1px solid rgba(255,255,255,.10);
  border-radius: 999px;
  background: rgba(255,255,255,.045);
  padding: .78rem 1.25rem;
  color: rgba(255,255,255,.72);
  font-size: .86rem;
  font-weight: 700;
  letter-spacing: .02em;
}
@keyframes tools-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes tools-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }

.woot-widget-bubble {
  right: 24px !important;
  bottom: 24px !important;
  width: 64px !important;
  height: 64px !important;
  box-shadow: 0 18px 38px rgba(0,33,71,.25) !important;
}
.woot-widget-holder {
  right: 24px !important;
  bottom: 100px !important;
}

@media (prefers-reduced-motion: reduce) {
  .tools-left, .tools-right { animation: none; }
}
