'use client';

import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('./Hero'), { 
  ssr: false,
  loading: () => <div className="h-screen w-full bg-slate-950 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
});

export default function ClientHero() {
  return <Hero />;
}
