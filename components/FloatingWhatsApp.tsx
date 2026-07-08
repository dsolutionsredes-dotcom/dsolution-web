'use client';
const DEFAULT_PHONE = '+34 624 57 18 59';
export default function FloatingWhatsApp() {
  const cleanPhone = DEFAULT_PHONE.replace(/[^0-9]/g, '');
  return <a href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hola, quiero información sobre sus servicios.')}`} target="_blank" rel="noreferrer" aria-label="Abrir WhatsApp" className="fixed bottom-[6.6rem] right-6 z-[70] inline-flex h-16 w-16 items-center justify-center rounded-full transition hover:-translate-y-1 hover:scale-105 hover:shadow-[0_18px_38px_rgba(0,33,71,.28)] md:right-6"><img src="/whatsapp-icon.png" alt="WhatsApp" className="h-16 w-16 object-contain drop-shadow-[0_14px_28px_rgba(0,33,71,.18)]"/></a>;
}
