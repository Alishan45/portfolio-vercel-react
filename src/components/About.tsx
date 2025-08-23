'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Alishan45' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ali-shan-542246235/' },
    { name: 'Kaggle', url: 'https://www.kaggle.com/alishan456' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
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
              className="object-cover hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              About Me
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
