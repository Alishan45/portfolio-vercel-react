import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ProjectsGrid from '@/components/ProjectsGrid';
import GitHubProjects from '@/components/GitHubProjects';
import Reviews from '@/components/Reviews';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
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
