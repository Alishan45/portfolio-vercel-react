import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ali Shan - AI Engineer & Full Stack Developer',
  description: 'AI Engineer with experience in ML/DL, computer vision, NLP, and full-stack development.',
  keywords: 'AI Engineer, Machine Learning, Deep Learning, Computer Vision, Full Stack Developer',
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
      <body className={`${inter.className} bg-white dark:bg-gray-900 transition-colors duration-300`}>
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