'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Alishan45' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ali-shan-542246235/' },
    { name: 'Kaggle', url: 'https://www.kaggle.com/alishan456' },
    { name: 'CV', url: 'https://cv24.oneapp.dev/' },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="py-24 bg-slate-950 relative overflow-hidden text-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative h-[450px] w-full rounded-2xl overflow-hidden ring-1 ring-white/10 bg-slate-900">
              <Image
                src="/images/profile.jpg"
                alt="Ali Shan - Expert Data Scientist and AI Engineer"
                title="Ali Shan - Artificial Intelligence Engineer"
                fill
                priority
                quality={90}
                className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-in-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            </div>
          </motion.div>

          <div className="flex flex-col justify-center">
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 mb-4">
              <span className="w-12 h-[2px] bg-cyan-500"></span>
              <span className="text-cyan-400 font-medium tracking-wider uppercase text-sm">Discover</span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Me</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-slate-300 mb-8 text-lg leading-relaxed font-light">
              I am an AI Engineer with over 2 years of experience spanning Machine Learning, Deep Learning, Computer Vision, NLP, and Full-Stack Development. I specialize in architecting and deploying robust AI systems across cloud and edge environments, with meaningful contributions to healthcare, security, and open-source initiatives.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-white rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:border-cyan-500/50 flex items-center gap-2 group"
                >
                  <span className="group-hover:text-cyan-400 transition-colors">{link.name}</span>
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
