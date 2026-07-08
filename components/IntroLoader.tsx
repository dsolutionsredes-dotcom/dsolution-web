'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function IntroLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const key = 'dsolution-intro-seen';
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 1650);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F7F3EA] text-[#002147] transition-opacity duration-500">
    <div className="flex flex-col items-center text-center">
      <Image src="/ds-logo-mark-dark.png" alt="D-Solution" width={150} height={150} className="h-28 w-auto animate-[intro-fade_.7s_ease_both] object-contain" priority />
      <div className="mt-8 h-[2px] w-32 overflow-hidden rounded-full bg-[#D4AF37]/20"><span className="block h-full w-full origin-left animate-[intro-line_1.1s_ease_.15s_both] rounded-full bg-[#D4AF37]" /></div>
      <p className="mt-5 text-xs font-bold uppercase tracking-[.24em] text-[#212529]/80">Audiovisual · Marketing Digital · Desarrollo Web</p>
    </div>
    <style jsx>{`
      @keyframes intro-fade { from { opacity: 0; transform: translateY(12px) scale(.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
      @keyframes intro-line { from { transform: scaleX(0); } to { transform: scaleX(1); } }
    `}</style>
  </div>;
}
