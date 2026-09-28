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
  // Duplicate reviews multiple times to ensure seamless infinite scrolling on ultra-wide screens
  const marqueeReviews = [...reviews, ...reviews, ...reviews, ...reviews];

  const reviewVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 100, damping: 10 } }
  };

  return (
    <section id="reviews" className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-[100px] animate-blob top-0 -left-20"></div>
        <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000 top-20 -right-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-white tracking-tight"
        >
          Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Reviews</span>
        </motion.h2>
        <p className="text-slate-400 text-center mt-4 max-w-2xl mx-auto">
          See what people are saying about my work, communication, and project delivery.
        </p>
      </div>

      <div className="overflow-hidden py-10 relative">
        {/* Gradient overlays for smooth fading edges */}
        <div className="absolute top-0 left-0 w-16 md:w-48 h-full bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 md:w-48 h-full bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none"></div>
        
        <div className="flex animate-marquee-continuous whitespace-nowrap hover:[animation-play-state:paused] pb-4">
          {marqueeReviews.map((review, index) => (
            <motion.div
              key={`${review.id}-${index}`}
              variants={reviewVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "50px" }}
              className="group relative bg-slate-900/50 p-8 md:p-10 rounded-[32px] overflow-hidden transition-all duration-500 border border-slate-700/50 hover:border-cyan-500/50 shadow-lg hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.3)] mx-4 inline-flex flex-col w-[350px] md:w-[400px] flex-shrink-0 backdrop-blur-md hover:-translate-y-2"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Quote Icon Background */}
              <div className="absolute -top-6 right-4 text-9xl text-cyan-500/10 font-serif leading-none select-none pointer-events-none">
                &quot;
              </div>

              <div className="flex items-center mb-6 relative z-10">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {review.name}
                  </h3>
                  <p className="text-sm text-cyan-400 font-medium">{review.location}</p>
                </div>
                <div className="flex items-center bg-slate-950/50 px-3 py-1.5 rounded-full border border-slate-800">
                  <span className="text-yellow-400 font-bold mr-1 text-sm">{review.rating}.0</span>
                  <svg className="w-4 h-4 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed relative z-10 whitespace-normal text-sm md:text-base">
                &quot;{review.content}&quot;
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-continuous {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Scroll exactly half the width since we duplicated the array by 4 times, 2 times is half */
            transform: translateX(-50%);
          }
        }

        .animate-marquee-continuous {
          display: flex;
          animation: marquee-continuous 40s linear infinite;
          width: max-content;
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
      `}</style>
    </section>
  );
};

export default Reviews;
