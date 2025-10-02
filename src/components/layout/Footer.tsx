import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/BMugesh',
    icon: FaGithub,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/balamugeshmk',
    icon: FaLinkedin,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/yourusername',
    icon: FaTwitter,
  },
  {
    name: 'Email',
    href: 'mailto:mkbm1307@gmail.com',
    icon: FaEnvelope,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gray-950/80 backdrop-blur-xl border-t border-white/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb-gradient w-full h-full" />
        <div className="hud-grid w-full h-full" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-4">Bala</h3>
            <p className="text-gray-400">
              Freelancer, Startup Founder, and Tech Enthusiast building innovative solutions and pushing the boundaries of technology.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors relative group"
                  aria-label={item.name}
                >
                  <span className="sr-only">{item.name}</span>
                  <span className="absolute -inset-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-lg transition" />
                  <item.icon className="h-6 w-6 relative" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/startups" className="text-gray-400 hover:text-white transition-colors">
                  Startups
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
            <address className="not-italic">
              <p className="text-gray-400">
                <a href="mkbm1307@gmail.com" className="hover:text-white transition-colors">
                  mkbm1307@gmail.com
                </a>
              </p>
              <p className="text-gray-400 mt-2">
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  +91-8778848565
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Bala. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
