'use client';
import { motion } from 'framer-motion';

interface Review {
  id: string;
  name: string;
  location: string;
  content: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Ethan Carter',
    location: 'United States',
    content: 'Ali delivered a polished, responsive portfolio with a strong technical presentation. The final result made it much easier to showcase AI and full-stack work to clients.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Oliver Bennett',
    location: 'United Kingdom',
    content: 'Ali communicated clearly throughout the project and delivered a professional website that presents technical work with clarity and confidence.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Sofia Muller',
    location: 'Europe',
    content: 'The portfolio is fast, visually engaging, and easy to navigate. Ali transformed complex AI and machine learning projects into a clear client-facing presentation.',
    rating: 5,
  },
];

const Reviews = () => {
  const midIndex = Math.ceil(reviews.length / 2);
  const firstRowReviews = reviews.slice(0, midIndex);
  const secondRowReviews = reviews.slice(midIndex);

  const reviewVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 10,
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <section id="reviews" className="py-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-96 h-96 bg-cyan-500/15 rounded-full mix-blend-multiply filter blur-3xl animate-blob top-0 -left-4"></div>
        <div className="absolute w-96 h-96 bg-blue-500/12 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 top-0 -right-4"></div>
        <div className="absolute w-96 h-96 bg-emerald-400/12 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 bottom-0 left-1/2 transform -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8 text-white"
        >
          Client Reviews
        </motion.h2>

        <div className="overflow-hidden py-4">
          <div className="flex animate-marquee-left whitespace-nowrap">
            {[...firstRowReviews, ...firstRowReviews].map((review, index) => (
              <motion.div
                key={`${review.id}-${index}`}
                variants={reviewVariants}
                initial="hidden"
                animate="visible"
                className="group relative bg-slate-900/40 p-8 rounded-[32px] overflow-hidden hover:-translate-y-2 transition-all duration-500 border border-slate-700/50 hover:border-cyan-500/30 hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.15)] mx-4 inline-flex flex-col w-[350px] flex-shrink-0 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-center mb-4">
                  <div className="ml-3 flex-grow">
                    <h3 className="text-lg font-semibold text-slate-100">
                      {review.name}
                    </h3>
                    <p className="text-xs text-cyan-300">{review.location}</p>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <motion.svg
                          key={`star-${review.id}-${i}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="w-5 h-5 text-yellow-400 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </motion.svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 line-clamp-5 overflow-hidden">
                  {review.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden py-4">
          <div className="flex animate-marquee-right whitespace-nowrap">
            {[...secondRowReviews, ...secondRowReviews].map((review, index) => (
              <motion.div
                key={`${review.id}-${index}`}
                variants={reviewVariants}
                initial="hidden"
                animate="visible"
                className="group relative bg-slate-900/40 p-8 rounded-[32px] overflow-hidden hover:-translate-y-2 transition-all duration-500 border border-slate-700/50 hover:border-cyan-500/30 hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.15)] mx-4 inline-flex flex-col w-[350px] flex-shrink-0 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-center mb-4">
                  <div className="ml-3 flex-grow">
                    <h3 className="text-lg font-semibold text-slate-100">
                      {review.name}
                    </h3>
                    <p className="text-xs text-cyan-300">{review.location}</p>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <motion.svg
                          key={`star-${review.id}-${i}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="w-5 h-5 text-yellow-400 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </motion.svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 line-clamp-5 overflow-hidden">
                  {review.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee-left {
          display: flex;
          animation: marquee-left 30s linear infinite;
          width: max-content;
        }

        .animate-marquee-right {
          display: flex;
          animation: marquee-right 15s linear infinite;
          width: max-content;
        }

        .line-clamp-5 {
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Reviews;
