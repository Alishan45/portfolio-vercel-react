'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 top-0 sm:top-4`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 md:h-20 transition-all duration-300 px-6 rounded-full ${
          isScrolled 
            ? 'bg-slate-900/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-cyan-500/20' 
            : 'bg-transparent'
        }`}>
          <Link href="/" className="text-2xl font-bold text-white hover:opacity-80 transition-transform hover:scale-105 relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden shadow-lg shadow-cyan-500/20" title="Ali Shan - Home">
            <Image src="/images/projects/logo.jpg" alt="Ali Shan - Official Logo | Data Scientist and AI/ML Engineer" title="Ali Shan - AI Engineer Logo" fill priority quality={90} className="object-cover" />
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-6 md:gap-8">
            <Link href="#about" className="text-sm font-medium text-slate-200 hover:text-cyan-400 transition-colors">
              About
            </Link>
            <Link href="#projects" className="text-sm font-medium text-slate-200 hover:text-cyan-400 transition-colors">
              Projects
            </Link>
            <Link href="#reviews" className="text-sm font-medium text-slate-200 hover:text-cyan-400 transition-colors hidden sm:block">
              Reviews
            </Link>
            <Link href="#contact" className="text-sm font-medium text-slate-200 hover:text-cyan-400 transition-colors hidden sm:block">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
