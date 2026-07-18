const reviews = [
  {
    id: 'review1',
    name: 'Dr. James Wilson',
    content: "Working with Ali on our deep learning research project was exceptional. His innovative approaches and thorough understanding of neural networks significantly advanced our research goals.",
    rating: 5,
  },
  {
    id: 'review2',
    name: 'Lisa Chen, CTO',
    content: "Ali's contribution to our AI-driven analytics platform was outstanding. His expertise in both machine learning and software architecture helped us create a robust, scalable solution.",
    rating: 5,
  },
  {
    id: 'review3',
    name: 'David Smith',
    content: "An exceptional ML engineer who transformed our data pipeline. Ali's implementation of automated ML workflows increased our efficiency by 300%. Highly recommended!",
    rating: 5,
  },
];

async function addReviews() {
  try {
    reviews.forEach((review) => {
      console.log(`Review ready for display: ${review.name}`, review);
    });
    console.log('All reviews prepared successfully without database access.');
  } catch (error) {
    console.error('Error preparing reviews:', error);
  }
}

// Execute the function
addReviews();
