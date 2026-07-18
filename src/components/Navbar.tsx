'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-950/90 backdrop-blur-xl shadow-xl border-b border-cyan-500/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-white hover:opacity-80 transition-opacity">
            <img src="/images/projects/logo.png" alt="AS Logo" className="h-10 w-10" />
          </Link>

          <div className="flex space-x-8">
            <Link href="#about" className="text-slate-100 hover:text-cyan-200 transition-colors">
              About
            </Link>
            <Link href="#projects" className="text-slate-100 hover:text-cyan-200 transition-colors">
              Projects
            </Link>
            <Link href="#reviews" className="text-slate-100 hover:text-cyan-200 transition-colors">
              Reviews
            </Link>
            <Link href="#contact" className="text-slate-100 hover:text-cyan-200 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
