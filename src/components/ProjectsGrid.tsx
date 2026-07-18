'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type ProjectCategory = 'ALL' | 'AI/ML' | 'COMPUTER_VISION' | 'WEB_DEVELOPMENT' | 'OTHER';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  techStack: string[];
  githubLink: string;
  demoLink?: string;
}

import { projects } from '@/data/projects';

type ProjectType = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  techStack: readonly string[];
  githubLink: string;
  demoLink?: string;
};

const ProjectsGrid = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('ALL');

  const categories: ProjectCategory[] = [
    'ALL',
    'AI/ML',
    'COMPUTER_VISION',
    'WEB_DEVELOPMENT',
    'OTHER',
  ];

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'ALL' || project.category === activeCategory
  ) as ProjectType[];

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          My Projects
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {category.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-[32px] overflow-hidden shadow-deep hover:-translate-y-1 transition-all duration-300 border border-cyan-400/10"
            >
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-300 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-sm bg-slate-900 text-cyan-200 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded hover:from-cyan-400 hover:to-blue-400 transition-colors"
                  >
                    View on GitHub
                  </Link>
                  {project.demoLink && (
                    <Link
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded hover:from-emerald-400 hover:to-cyan-400 transition-colors"
                    >
                      Live Demo
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
