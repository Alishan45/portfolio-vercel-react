import Navbar from '@/components/Navbar';
import ClientHero from '@/components/ClientHero';
import About from '@/components/About';
import ProjectsGrid from '@/components/ProjectsGrid';
import GitHubProjects from '@/components/GitHubProjects';
import Reviews from '@/components/Reviews';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ali Shan',
  alternateName: ['Ali shan', 'ali shan', 'alishan', 'alishan45'],
  url: 'https://portfolio-vercel-react.vercel.app',
  jobTitle: 'Data Scientist and AI/ML Engineer',
  description: 'Data Scientist and AI/ML Engineer specializing in machine learning, deep learning, computer vision, NLP, and full-stack development.',
  sameAs: [
    'https://github.com/Alishan45',
    'https://www.linkedin.com/in/ali-shan-542246235/',
    'https://www.kaggle.com/alishan456',
    'https://cv24.oneapp.dev/',
  ],
  knowsAbout: [
    'Data Science',
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'Natural Language Processing',
    'Full-stack development',
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Navbar />
      <main className="min-h-screen">
        <ClientHero />
        <About />
        <ProjectsGrid />
        <GitHubProjects />
        <Reviews />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
