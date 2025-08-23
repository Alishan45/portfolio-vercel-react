import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleReviews = [
  {
    name: "Sarah Johnson",
    content: "Ali's expertise in AI and machine learning is remarkable. He helped us implement a computer vision solution that significantly improved our quality control process.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    content: "Great experience working with Ali on our NLP project. His deep understanding of the latest AI technologies and attention to detail made our collaboration smooth and successful.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    content: "Ali developed a custom ML model for our healthcare application. His ability to understand complex requirements and deliver efficient solutions is impressive.",
    rating: 5,
  },
  {
    name: "David Kim",
    content: "We worked with Ali on a web development project. His full-stack skills combined with AI expertise brought unique value to our platform.",
    rating: 4,
  },
];

async function addSampleReviews() {
  try {
    for (const review of sampleReviews) {
      await addDoc(collection(db, 'reviews'), review);
      console.log('Added review:', review.name);
    }
    console.log('All sample reviews added successfully!');
  } catch (error) {
    console.error('Error adding reviews:', error);
  }
}

// Run the function
addSampleReviews();
