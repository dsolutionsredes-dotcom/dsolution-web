
import Link from 'next/link';

export default function PlaceholderPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#F7F3EA_0%,#FFFFFF_100%)] px-5 py-20 md:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(0,33,71,.08)] md:p-12">
        <Link href="/" className="text-sm font-semibold text-[#D4AF37]">← Volver al inicio</Link>
        <h1 className="mt-5 text-4xl font-semibold text-[#002147]">Desarrollo web</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">Página de servicio en preparación. En la siguiente fase podremos desarrollar esta página con estructura completa, casos y CTA.</p>
        <a href="/#contacto" className="mt-8 inline-flex rounded-xl bg-[#D4AF37] px-6 py-3.5 font-bold text-[#002147]">Solicitar propuesta</a>
      </div>
    </main>
  );
}
