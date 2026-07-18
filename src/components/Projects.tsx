'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { fetchGitHubRepos, GitHubRepo } from '@/utils/github';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const projectVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  },
  hover: {
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const Projects = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  useEffect(() => {
    const loadRepos = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGitHubRepos('Alishan45');
        setRepos(data);
      } catch (err) {
        console.error('Failed to load GitHub repos:', err);
        setError('Failed to load repositories. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadRepos();
  }, []);

  // Get unique topics from all repos
  const allTopics = ['all', ...new Set(repos.flatMap(repo => repo.topics))];

  const filteredRepos = selectedTopic === 'all' 
    ? repos 
    : repos.filter(repo => repo.topics.includes(selectedTopic));

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-white">Projects</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400/70"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-full h-full">
          <div className="absolute w-96 h-96 bg-cyan-500/15 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-20 top-0 -left-4"></div>
          <div className="absolute w-96 h-96 bg-blue-500/12 rounded-full mix-blend-multiply filter blur-3xl animate-float-delayed opacity-20 top-0 -right-4"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-slate-200"

        {/* Topics Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {allTopics.map((topic) => (
            <motion.button
              key={topic}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTopic(topic)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedTopic === topic
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {topic.charAt(0).toUpperCase() + topic.slice(1)}
            </motion.button>
          ))}
        </div>

        {error && (
          <p className="text-slate-300 text-center mb-8">{error}</p>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredRepos.map((repo) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={projectVariants}
              whileHover="hover"
              className="block"
            >
              <div className="h-full p-6 rounded-[32px] glass-card hover:-translate-y-1 border border-cyan-500/10 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-2 text-slate-100">
                  {repo.name}
                </h3>
                <p className="text-slate-300 mb-4 h-12 line-clamp-2">
                  {repo.description}
                </p>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{
                        backgroundColor: getLanguageColor(repo.language)
                      }}
                    ></div>
                    {repo.language}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {repo.stars}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="text-xs px-2 py-1 rounded-full bg-slate-900 text-cyan-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Helper function to get language colors
const getLanguageColor = (language: string): string => {
  const colors: { [key: string]: string } = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    Ruby: '#701516',
    Go: '#00ADD8',
    Unknown: '#6e7681',
  };

  return colors[language] || colors.Unknown;
};

export default Projects;
