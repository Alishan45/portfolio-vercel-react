'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-slate-950 text-slate-100 overflow-hidden border-t border-cyan-900/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Ali Shan</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              AI Engineer & Full Stack Developer specializing in ML/DL, computer vision, and building exceptional digital experiences.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 text-slate-200">Quick Links</h3>
            <ul className="space-y-3">
              {['About', 'Projects', 'Reviews', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="text-slate-400 hover:text-cyan-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 text-slate-200">Connect</h3>
            <div className="flex flex-col space-y-3">
              {[
                { name: 'GitHub', url: 'https://github.com/Alishan45' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ali-shan-542246235/' },
                { name: 'Kaggle', url: 'https://www.kaggle.com/alishan456' }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 text-sm transition-colors flex items-center gap-2 group"
                >
                  <svg className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} Ali Shan. All rights reserved.
          </p>
          <div className="text-sm text-slate-500">
            Designed with <span className="text-cyan-500">♥</span> & built with Next.js
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
