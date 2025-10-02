import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CodeBracketIcon, LightBulbIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="hud-grid w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
      </div>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              className="lg:w-1/2 mb-12 lg:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                <span className="gradient-text">Bala</span>
              </h1>
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-300 mb-6">
                Freelancer & Startup Founder
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                I build innovative digital solutions and transform ideas into reality through code, AI, and cutting-edge technology.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/projects" 
                  className="btn group flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20"
                >
                  View My Work
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href="#contact" 
                  className="btn btn-outline"
                >
                  Get In Touch
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl transform rotate-6 blur"></div>
                <div className="relative glass-panel p-6">
                  <div className="h-64 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center animate-glow">
                    <CodeBracketIcon className="h-20 w-20 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-white/5 text-cyan-300 border border-white/10 backdrop-blur-sm mb-4">
              What I Do
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Expertise</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <CodeBracketIcon className="h-10 w-10 text-cyan-400" />,
                title: 'Web Development',
                description: 'Building responsive and performant web applications using modern technologies like React, Next.js, and Tailwind CSS.'
              },
              {
                icon: <LightBulbIcon className="h-10 w-10 text-cyan-400" />,
                title: 'AI & ML Solutions',
                description: 'Developing intelligent systems and applications powered by machine learning and artificial intelligence.'
              },
              {
                icon: <RocketLaunchIcon className="h-10 w-10 text-cyan-400" />,
                title: 'Startup Consulting',
                description: 'Helping startups turn their ideas into successful digital products with strategic planning and technical expertise.'
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                className="glass-panel p-6 hover:shadow-cyan-500/20 transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center mb-4 border border-white/10">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Have a project in mind?</h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Let's work together to bring your ideas to life with cutting-edge technology and innovative solutions.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-100 transition-colors"
          >
            Get In Touch
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
