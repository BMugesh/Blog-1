import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

type NavLink = {
  name: string;
  path: string;
};

const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Startups', path: '/startups' },
  { name: 'Contact', path: '/contact' },
];

type NavbarProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-gray-900/60 border-b border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient-slow bg-gradient-size">
                Bala
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative ${
                    location.pathname === link.path
                      ? 'text-cyan-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute left-2 right-2 -bottom-0.5 h-px rounded-full transition-opacity duration-300 ${
                    location.pathname === link.path ? 'opacity-100 bg-gradient-to-r from-cyan-500 to-purple-500' : 'opacity-0 group-hover:opacity-100'
                  }`} />
                </Link>
              ))}
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 border border-white/10 backdrop-blur-sm transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/5 border border-white/10 backdrop-blur-sm focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-gray-900/80 backdrop-blur-xl border-t border-white/10 shadow-lg overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-cyan-400 bg-white/5'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <button
                  onClick={() => {
                    toggleTheme();
                    closeMenu();
                  }}
                  className="flex items-center text-gray-300 hover:text-white"
                >
                  {theme === 'dark' ? (
                    <>
                      <SunIcon className="h-5 w-5 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <MoonIcon className="h-5 w-5 mr-2" />
                      Dark Mode
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
