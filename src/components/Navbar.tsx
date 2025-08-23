'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar = () => {
  const { theme, setTheme, isDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    // Cycle through themes: light -> dark -> system -> light
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getThemeIcon = () => {
    if (theme === 'system') {
      return <ComputerDesktopIcon className="h-6 w-6 text-blue-500" />;
    }
    return isDark ? (
      <SunIcon className="h-6 w-6 text-yellow-500" />
    ) : (
      <MoonIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
    );
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:opacity-80 transition-opacity">
                      <img src="/images/projects/logo.png" alt="AS Logo" className="h-8 w-8" />
                    </Link>
          
          <div className="flex space-x-8">
            <Link href="#about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              About
            </Link>
            <Link href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Projects
            </Link>
            <Link href="#reviews" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Reviews
            </Link>
            <Link href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Contact
            </Link>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title={`Current theme: ${theme}. Click to cycle through themes.`}
          >
            {mounted ? getThemeIcon() : <MoonIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
