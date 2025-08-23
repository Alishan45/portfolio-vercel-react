const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBArUVwjeCLCBDzxNguoELE7gsJTcrcvi8",
  authDomain: "portfolio-website-6c16b.firebaseapp.com",
  projectId: "portfolio-website-6c16b",
  storageBucket: "portfolio-website-6c16b.appspot.com",
  messagingSenderId: "410840616003",
  appId: "1:410840616003:web:915238dab7be1a69b518f6"
};

async function addReviews() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const reviewsCollection = collection(db, 'reviews');
  
  const reviews = [
    {
      name: "Dr. James Wilson",
      content: "Working with Ali on our deep learning research project was exceptional. His innovative approaches and thorough understanding of neural networks significantly advanced our research goals.",
      rating: 5
    },
    {
      name: "Lisa Chen, CTO",
      content: "Ali's contribution to our AI-driven analytics platform was outstanding. His expertise in both machine learning and software architecture helped us create a robust, scalable solution.",
      rating: 5
    },
    {
      name: "David Smith",
      content: "An exceptional ML engineer who transformed our data pipeline. Ali's implementation of automated ML workflows increased our efficiency by 300%. Highly recommended!",
      rating: 5
    }
  ];

  try {
    for (const review of reviews) {
      await setDoc(doc(reviewsCollection), review);
      console.log(`Added review from ${review.name}`);
    }
    console.log('All reviews added successfully!');
  } catch (error) {
    console.error('Error adding reviews:', error);
  }
}

// Execute the function
addReviews();
