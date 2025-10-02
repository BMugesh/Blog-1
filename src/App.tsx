import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loader from './components/ui/Loader';
import ScrollToTop from './components/ui/ScrollToTop';
import FloatingContact from './components/ui/FloatingContact';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Startups = lazy(() => import('./pages/Startups'));
const Contact = lazy(() => import('./pages/Contact'));
const Achievements = lazy(() => import('./pages/Achievements'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(prefersDark ? 'dark' : 'light');
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <ScrollToTop />
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <main className="flex-grow">
          <Suspense fallback={<Loader />}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/startups" element={<Startups />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
        
        <Footer />
        <FloatingContact />
      
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
          duration: 3000,
        }}
      />
    </div>
  )
}

export default App
