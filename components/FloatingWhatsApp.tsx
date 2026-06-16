'use client';

const DEFAULT_PHONE = '+34 624 57 18 59';
const DEFAULT_MESSAGE = 'Hola, quiero información sobre sus servicios.';

function getWhatsappHref(phone = DEFAULT_PHONE, message = DEFAULT_MESSAGE) {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export default function FloatingWhatsApp() {
  return (
    <a
      href={getWhatsappHref()}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir WhatsApp"
      className="fixed bottom-28 right-6 z-[70] inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#00C853] shadow-[0_18px_40px_rgba(0,33,71,.22)] ring-4 ring-white/85 transition hover:-translate-y-1 hover:scale-105 hover:shadow-[0_24px_45px_rgba(0,33,71,.32)] md:bottom-28 md:right-7"
    >
      <img src="/whatsapp-icon.png" alt="WhatsApp" className="h-10 w-10 object-contain" />
    </a>
  );
}
