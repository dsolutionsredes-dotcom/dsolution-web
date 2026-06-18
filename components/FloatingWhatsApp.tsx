'use client';
const DEFAULT_PHONE = '+34 624 57 18 59';
export default function FloatingWhatsApp() {
  const cleanPhone = DEFAULT_PHONE.replace(/[^0-9]/g, '');
  return <a href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hola, quiero información sobre sus servicios.')}`} target="_blank" rel="noreferrer" aria-label="Abrir WhatsApp" className="fixed bottom-[6.1rem] right-6 z-[70] inline-flex h-16 w-16 items-center justify-center transition hover:-translate-y-1 hover:scale-105 md:bottom-[6.35rem] md:right-7"><img src="/whatsapp-icon.png" alt="WhatsApp" className="h-16 w-16 object-contain drop-shadow-[0_16px_30px_rgba(0,33,71,.24)]"/></a>;
}
