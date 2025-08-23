import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBArUVwjeCLCBDzxNguoELE7gsJTcrcvi8",
  authDomain: "portfolio-website-6c16b.firebaseapp.com",
  projectId: "portfolio-website-6c16b",
  storageBucket: "portfolio-website-6c16b.appspot.com",
  messagingSenderId: "410840616003",
  appId: "1:410840616003:web:915238dab7be1a69b518f6"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Firebase initialization error:", error);
  throw error;
}

const db = getFirestore(app);

// Enable Firestore logging in development
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase initialized with config:', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain
  });
}

export { db };
