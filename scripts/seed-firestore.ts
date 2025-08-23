const { db } = require('../src/lib/firebase-config');
const { collection, addDoc } = require('firebase/firestore');

const sampleReviews = [
  {
    name: 'Sarah Johnson',
    content: 'Ali\'s expertise in AI and machine learning is remarkable. He helped us implement a computer vision solution that significantly improved our quality control process.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    content: 'Great experience working with Ali on our NLP project. His deep understanding of the latest AI technologies and attention to detail made our collaboration smooth and successful.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    content: 'Ali developed a custom ML model for our healthcare application. His ability to understand complex requirements and deliver efficient solutions is impressive.',
    rating: 5,
  },
  {
    name: 'David Kim',
    content: 'We worked with Ali on a web development project. His full-stack skills combined with AI expertise brought unique value to our platform.',
    rating: 4,
  },
];

async function seedDatabase() {
  try {
    console.log('Starting to seed the database...');
    const reviewsRef = collection(db, 'reviews');
    
    for (const review of sampleReviews) {
      await addDoc(reviewsRef, review);
      console.log('Added review for:', review.name);
    }
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run the seeding function
seedDatabase();
