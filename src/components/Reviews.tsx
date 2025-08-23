'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase-config';
import '../styles/animations.css';

interface Review {
  id: string;
  name: string;
  content: string;
  rating: number;
}

const fallbackReviews: Review[] = [
  // ... (same as your original fallbackReviews)
];

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const reviewVariants = {
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
      scale: 1.03,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const reviewsCollection = collection(db, 'reviews');
        const querySnapshot = await getDocs(reviewsCollection);
        
        if (querySnapshot.empty) {
          console.log('No reviews found, using fallback data');
          return;
        }

        const reviewsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Review));

        setReviews(reviewsData);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Using sample data for demonstration.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Client Reviews</h2>
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  // Split reviews into two rows
  const midIndex = Math.ceil(reviews.length / 2);
  const firstRowReviews = reviews.slice(0, midIndex);
  const secondRowReviews = reviews.slice(midIndex);

  return (
    <section id="reviews" className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob top-0 -left-4"></div>
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 top-0 -right-4"></div>
        <div className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 bottom-0 left-1/2 transform -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
        >
          Client Reviews
        </motion.h2>
        {error && (
          <p className="text-amber-600 dark:text-amber-400 text-center mb-4 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
            {error}
          </p>
        )}
        
        {/* First Row - Marquee Left */}
        <div className="overflow-hidden py-4">
          <div className="flex animate-marquee-left whitespace-nowrap">
            {[...firstRowReviews, ...firstRowReviews].map((review, index) => (
              <motion.div
                key={`${review.id}-${index}`}
                variants={reviewVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 border border-gray-200 dark:border-gray-700 mx-4 inline-block w-80 flex-shrink-0"
              >
                <div className="flex items-center mb-4">
                  <div className="ml-3 flex-grow">
                    <h3 className="text-lg font-semibold dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{review.name}</h3>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <motion.svg
                          key={i}
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
                <p className="text-gray-600 dark:text-gray-300 line-clamp-5 overflow-ellipsis overflow-hidden">
                  {review.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Second Row - Marquee Right */}
        <div className="overflow-hidden py-4">
          <div className="flex animate-marquee-right whitespace-nowrap">
            {[...secondRowReviews, ...secondRowReviews].map((review, index) => (
              <motion.div
                key={`${review.id}-${index}`}
                variants={reviewVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 border border-gray-200 dark:border-gray-700 mx-4 inline-block w-80 flex-shrink-0"
              >
                <div className="flex items-center mb-4">
                  <div className="ml-3 flex-grow">
                    <h3 className="text-lg font-semibold dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{review.name}</h3>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <motion.svg
                          key={i}
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
                <p className="text-gray-600 dark:text-gray-300 line-clamp-5 overflow-ellipsis overflow-hidden">
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
          animation: marquee-right 30s linear infinite;
          width: max-content;
        }
        
        .line-clamp-5 {
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Reviews;