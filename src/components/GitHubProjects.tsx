'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string;
  topics: string[];
}

const GitHubProjects = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
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
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    }
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/github/repos');
        const data = await response.json();

        if (!response.ok) {
          const message = data?.error || data?.message || 'Failed to fetch repositories';
          throw new Error(message);
        }

        if (!Array.isArray(data)) {
          throw new Error('Unexpected repository data format from server.');
        }

        setRepos(data);
      } catch (err) {
        console.error('Error fetching repos:', err);
        setError(err instanceof Error ? err.message : 'Failed to load repositories. Please check your GitHub username or token.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (isLoading) {
    return (
      <section className="py-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-100">GitHub Projects</h2>
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400/80"></div>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-96 h-96 bg-cyan-500/15 rounded-full mix-blend-multiply filter blur-3xl animate-blob top-0 -left-4"></div>
        <div className="absolute w-96 h-96 bg-blue-500/12 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 bottom-0 -right-4"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8 text-slate-100"
        >
          GitHub Projects
        </motion.h2>
        
        {error && (
          <p className="text-slate-100 text-center mb-4 bg-slate-900/60 p-2 rounded border border-cyan-400/20">
            {error}
          </p>
        )}

        {!error && repos.length === 0 && (
          <p className="text-center text-slate-300 mb-4">
            No repositories found. Please check your GitHub username or token.
          </p>
        )}

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {repos.map(repo => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover="hover"
              className="glass-card rounded-[28px] p-6 shadow-deep hover:-translate-y-1 hover:shadow-cyan-500/15 transition-all duration-300 border border-cyan-400/10"
            >
              <h3 className="text-xl font-semibold mb-2 text-slate-100">
                {repo.name}
              </h3>
              <p className="text-slate-300 mb-4 line-clamp-2">
                {repo.description || 'No description available'}
              </p>
              
              {repo.language && (
                <div className="flex items-center mb-3">
                  <span className="text-sm text-slate-300">
                    {repo.language}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-slate-300">{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 3.293a1 1 0 011.414 0L10 4.586l1.293-1.293a1 1 0 111.414 1.414L11.414 6l1.293 1.293a1 1 0 01-1.414 1.414L10 7.414l-1.293 1.293a1 1 0 01-1.414-1.414L8.586 6 7.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-300">{repo.forks_count}</span>
                  </div>
                </div>
                <div className="text-slate-400">
                  Updated {formatDate(repo.updated_at)}
                </div>
              </div>

              {repo.topics && repo.topics.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {repo.topics.slice(0, 3).map(topic => (
                    <span
                      key={topic}
                      className="px-2 py-1 text-xs rounded-full bg-slate-900 text-cyan-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubProjects;
