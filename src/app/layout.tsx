import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';

const inter = Inter({ subsets: ['latin'] });
const siteUrl = 'https://portfolio-vercel-react.vercel.app';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Ali Shan | Data Scientist & AI/ML Engineer',
  description: 'Ali Shan is a Data Scientist and AI/ML Engineer specializing in machine learning, deep learning, computer vision, NLP, and full-stack development.',
  keywords: [
    'Ali Shan',
    'Ali shan',
    'ali shan',
    'alishan',
    'alishan45',
    'Data Scientist',
    'AI Engineer',
    'AI/ML Engineer',
    'ML Engineer',
    'Machine Learning Engineer',
    'Machine Learning',
    'Deep Learning',
    'Computer Vision Engineer',
    'NLP Engineer',
    'Full Stack Developer',
    'Python Developer',
    'Next.js Developer',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Ali Shan | Data Scientist & AI/ML Engineer',
    description: 'Portfolio of Ali Shan, a Data Scientist and AI/ML Engineer building practical machine learning, computer vision, NLP, and full-stack solutions.',
    siteName: 'Ali Shan Portfolio',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Ali Shan | Data Scientist & AI/ML Engineer',
    description: 'Data Scientist and AI/ML Engineer specializing in machine learning, computer vision, NLP, and full-stack development.',
  },
  authors: [{ name: 'Ali Shan', url: siteUrl }],
  creator: 'Ali Shan',
  category: 'technology',
  verification: {
    google: 'SVkayvBjFZE8c_15HB28pZGppjtK1qIY8WW_V3VH8Rs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/icons/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} bg-slate-950 dark:bg-slate-950 transition-colors duration-300`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}