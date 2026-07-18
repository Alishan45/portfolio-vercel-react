'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Alishan45' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ali-shan-542246235/' },
    { name: 'Kaggle', url: 'https://www.kaggle.com/alishan456' },
    { name: 'CV', url: 'https://cv24.oneapp.dev/' },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/profilePic.png"
              alt="Ali Shan - AI Engineer"
              fill
              className="object-cover object-top hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              About Me
            </h2>
            <p className="text-slate-300 mb-6">
              AI Engineer with 2+ years of experience in ML/DL, computer vision, NLP, and full-stack development. 
              Skilled in deploying AI systems on cloud & edge, with contributions to healthcare, security, and open-source.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-md shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
