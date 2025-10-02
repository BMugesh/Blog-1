import { motion, AnimatePresence, useMotionValue, useTransform, animate, useSpring } from 'framer-motion';
import { EnvelopeIcon, MapPinIcon, PhoneIcon, PaperAirplaneIcon, CheckCircleIcon, 
         ChatBubbleLeftRightIcon, ArrowPathIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';
import useForm from '../hooks/useForm';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Form from '../components/ui/Form';
import { socialLinks } from '../data/social';
import { useInView } from 'react-intersection-observer';

// Particle background component
const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particle system
    const particles: any[] = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        color: `hsla(${Math.random() * 60 + 200}, 80%, 60%, ${Math.random() * 0.3 + 0.1})`
      });
    }
    
    // Animation loop
    let animationId: number;
    const animateParticles = () => {
      if (!ctx) return;
      
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });
      
      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${1 - distance / 100})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationId = requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

// Animated gradient text component
const GradientText = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500 ${className}`}>
      {children}
    </span>
  );
};

const Contact = () => {
  const [activeTab, setActiveTab] = useState('form');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { formData, handleChange, handleSubmit: originalHandleSubmit, isSubmitting, resetForm } = useForm(
    {
      name: { value: '', required: true },
      email: { value: '', required: true },
      subject: { value: '' },
      message: { value: '', required: true }
    },
    async (values) => {
      try {
        // Simulate API call with a bit of delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', values);
        
        // Update submission state
        setIsSubmitted(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        throw new Error('Failed to send message. Please try again later.');
      }
    }
  );
  
  // Wrap the original handleSubmit to handle submission state
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    originalHandleSubmit(e);
  };
  
  const handleNewMessage = () => {
    resetForm();
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-950 text-gray-200 relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black"></div>
        <ParticlesBackground />
      </div>
      
      {/* Grid overlay */}
      <div className="fixed inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm border-b border-gray-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC42Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0xNiAwYzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00em0yNCAwYzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00eiIvPjwvZz48L2c+PC9zdmc+')]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Let's Work <GradientText>Together</GradientText>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Have a project in mind or want to discuss potential opportunities? I'm always open to new challenges and collaborations.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-6 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button 
                variant="gradient" 
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                onClick={() => {
                  const contactSection = document.getElementById('contact-form');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                  setActiveTab('form');
                }}
              >
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                Send a Message
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="group relative overflow-hidden border-gray-700 hover:border-cyan-500/50 hover:bg-gray-800/50 transition-all duration-300"
                onClick={() => setActiveTab('info')}
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                Contact Info
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 px-4" id="contact-form">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="bg-gray-900/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-800 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Contact Form */}
              <div className="p-8 md:p-12 lg:p-16 bg-gradient-to-br from-gray-900/80 to-gray-950/80 relative overflow-hidden">
                {/* Animated border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10"></div>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse"></div>
                <div className="mb-10">
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Get in Touch
                  </motion.h2>
                  <motion.p 
                    className="text-gray-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Have a question or want to work together? Fill out the form below and I'll get back to you as soon as possible.
                  </motion.p>
                </div>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div 
                      className="text-center py-8"
                      key="success-message"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500/20 to-cyan-500/20 text-green-400 mb-6 border border-green-500/30 shadow-lg shadow-green-500/10">
                        <CheckCircleIcon className="h-10 w-10" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-3">Message Sent!</h3>
                      <p className="text-gray-400 mb-6">Thank you for reaching out. I'll get back to you within 24-48 hours.</p>
                      <Button 
                        variant="outline"
                        onClick={handleNewMessage}
                        leftIcon={<ArrowPathIcon className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />}
                        className="group border-gray-700 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="contact-form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Form.Group label="Full Name" htmlFor="name">
                            <Input
                              id="name"
                              name="name"
                              value={formData.name.value}
                              onChange={handleChange}
                              required
                              placeholder="John Doe"
                              error={formData.name.error}
                              leftIcon={<i className="fas fa-user text-gray-400"></i>}
                              className="bg-gray-800/50 border border-gray-700 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 text-white placeholder-gray-500 transition-all duration-300 hover:border-cyan-500/30"
                            />
                          </Form.Group>
                          
                          <Form.Group label="Email Address" htmlFor="email">
                            <Input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email.value}
                              onChange={handleChange}
                              required
                              placeholder="you@example.com"
                              error={formData.email.error}
                              leftIcon={<i className="fas fa-envelope text-gray-400"></i>}
                              className="bg-gray-800/50 border border-gray-700 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 text-white placeholder-gray-500 transition-all duration-300 hover:border-cyan-500/30"
                            />
                          </Form.Group>
                        </div>
                        
                        <Form.Group label="Subject" htmlFor="subject" className="mt-6">
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject.value}
                            onChange={handleChange}
                            placeholder="How can I help you?"
                            error={formData.subject.error}
                            leftIcon={<i className="fas fa-tag text-gray-400"></i>}
                            className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </Form.Group>
                        
                        <Form.Group label="Your Message" htmlFor="message" className="mt-6">
                          <Input
                            as="textarea"
                            id="message"
                            name="message"
                            rows={5}
                            value={formData.message.value}
                            onChange={handleChange}
                            required
                            placeholder="Tell me about your project..."
                            error={formData.message.error}
                            className="min-h-[150px] bg-gray-800/50 border border-gray-700 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 text-white placeholder-gray-500 transition-all duration-300 hover:border-cyan-500/30"
                          />
                        </Form.Group>
                        
                        <Form.Actions className="mt-8">
                          <Button 
                            type="submit" 
                            variant="primary" 
                            size="lg"
                            isLoading={isSubmitting}
                            className="w-full md:w-auto px-8 py-3 text-base font-medium group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                            rightIcon={<PaperAirplaneIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />}
                          >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                          </Button>
                        </Form.Actions>
                      </Form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Right Side - Contact Info */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 p-8 md:p-12 lg:p-16 text-white relative overflow-hidden border-l border-gray-800/50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col">
                  <motion.div 
                    className="mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Contact Information</h2>
                    <p className="text-gray-400 leading-relaxed">
                      Feel free to reach out to me for any questions or opportunities. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="space-y-6 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {[
                      {
                        icon: PhoneIcon,
                        title: "Phone",
                        href: "tel:+918778848565",
                        value: "+91 87788 48565",
                        gradient: "cyan blue"
                      },
                      {
                        icon: EnvelopeIcon,
                        title: "Email",
                        href: "mailto:mkbm1307@gmail.com",
                        value: "mkbm1307@gmail.com",
                        gradient: "purple pink"
                      },
                      {
                        icon: MapPinIcon,
                        title: "Location",
                        value: "10, Manakaavalam Pillai Hospital Rd,\nPalayamkottai, Tirunelveli,\nTamil Nadu 627002",
                        gradient: "emerald teal"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        className="group flex items-start p-4 rounded-xl hover:bg-gray-800/30 transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <div className={`flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-${item.gradient.split(" ")[0]}-500/20 to-${item.gradient.split(" ")[1]}-500/20 
                                     border border-${item.gradient.split(" ")[0]}-500/30 flex items-center justify-center text-${item.gradient.split(" ")[0]}-400 
                                     transition-all duration-300 group-hover:shadow-lg group-hover:shadow-${item.gradient.split(" ")[0]}-500/20 
                                     group-hover:bg-gradient-to-br group-hover:from-${item.gradient.split(" ")[0]}-500 group-hover:to-${item.gradient.split(" ")[1]}-500`}>
                          <item.icon className="h-5 w-5 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="ml-4">
                          <h3 className={`text-xs font-semibold text-${item.gradient.split(" ")[0]}-400 uppercase tracking-wider mb-1`}>
                            {item.title}
                          </h3>
                          {item.href ? (
                            <a 
                              href={item.href} 
                              className={`text-gray-300 hover:text-${item.gradient.split(" ")[0]}-400 transition-colors duration-300 ${item.title === "Email" ? "break-all" : ""}`}
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-gray-300 whitespace-pre-line">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    className="mt-12 pt-8 border-t border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4">Find Me on Map</h3>
                    <div className="rounded-xl overflow-hidden shadow-2xl mb-8 h-64 bg-gray-800 border border-gray-700/50 relative group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.858306930021!2d77.72277487593257!3d8.74223648216259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0415d3c6b9e8d5%3A0x7c5291b5bfeaef23!2sManakaavalam%20Pillai%20Hospital%20Rd%2C%20Palayamkottai%2C%20Tirunelveli%2C%20Tamil%20Nadu%20627002!5e0!3m2!1sen!2sin!4v1697536740876!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-xl"
                        title="Location Map"
                      />
                    </div>
                    
                    <h3 className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-wider mb-4 mt-8">Connect With Me</h3>
                    <motion.div 
                      className="flex space-x-6 justify-center mt-8 relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative group"
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          title={social.name}
                        >
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10"></div>
                          <div className="relative bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl border border-gray-700/50 
                                        group-hover:border-cyan-500/50 group-hover:bg-gray-800/50 transition-all duration-300
                                        group-hover:shadow-lg group-hover:shadow-cyan-500/20">
                            {social.icon === 'github' && (
                              <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                              </svg>
                            )}
                            {social.icon === 'linkedin' && (
                              <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                              </svg>
                            )}
                            <motion.div
                              className="absolute inset-0 rounded-xl border-2 border-cyan-500/50 opacity-0 group-hover:opacity-100"
                              initial={false}
                              transition={{ duration: 0.3 }}
                              layoutId={`social-border-${index}`}
                            />
                          </div>
                        </motion.a>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 text-center relative overflow-hidden border-t border-gray-800/50">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 bg-gradient-size animate-gradient-slow"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent opacity-30"></div>
        </div>
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p 
            className="text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 font-medium">
              &copy; {new Date().getFullYear()} Bala Mugesh. All rights reserved.
            </span>
          </motion.p>
          <motion.div 
            className="mt-3 text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Crafted with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
              className="inline-block text-red-400"
            >
              ♥
            </motion.span>
            {" "}using React & Framer Motion
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
};

export default Contact;
