import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, TagIcon, ShareIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

type BlogPost = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  slug: string;
};

// Mock data - replace with actual API call in production
const mockBlogPost: BlogPost = {
  id: '1',
  title: 'The Future of Web Development in 2024',
  excerpt: 'Exploring the latest trends and technologies that are shaping the future of web development.',
  content: `
    <h2>Introduction</h2>
    <p>As we step into 2024, the web development landscape continues to evolve at a rapid pace. New frameworks, tools, and methodologies are emerging, while existing ones are being refined. In this article, we'll explore the key trends that are shaping the future of web development.</p>
    
    <h2>1. The Rise of Edge Computing</h2>
    <p>Edge computing is transforming how we build and deliver web applications. By processing data closer to the user, we can achieve lower latency and better performance. Frameworks like Next.js and SvelteKit are leading the charge in making edge-first development more accessible.</p>
    
    <h2>2. WebAssembly (WASM) Matures</h2>
    <p>WebAssembly continues to gain traction, enabling near-native performance in the browser. We're seeing more tools and languages that compile to WASM, opening up new possibilities for web applications that were previously only possible as native apps.</p>
    
    <h2>3. AI-Powered Development</h2>
    <p>AI is becoming an integral part of the development workflow. From code generation to testing and optimization, AI tools are helping developers be more productive and write better code.</p>
    
    <h2>4. The JAMstack Evolution</h2>
    <p>The JAMstack architecture continues to evolve with new frameworks and tools that make it easier to build fast, secure, and scalable websites. The lines between traditional CMS and headless solutions are blurring.</p>
    
    <h2>5. Web3 and the Decentralized Web</h2>
    <p>While still in its early stages, Web3 is starting to show practical applications beyond cryptocurrencies. Decentralized identity, storage, and computing are areas to watch.</p>
    
    <h2>Conclusion</h2>
    <p>The future of web development is exciting and full of possibilities. By staying current with these trends and continuously learning, developers can position themselves at the forefront of the industry.</p>
  `,
  date: '2023-11-15',
  readTime: '8 min read',
  tags: ['Web Development', 'Trends', 'Technology'],
  image: '/blog/web-dev-future.jpg',
  author: {
    name: 'Bala',
    avatar: '/avatar.jpg',
    role: 'Senior Developer & Tech Enthusiast'
  },
  slug: 'future-of-web-dev-2024'
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // In a real app, you would fetch the blog post data based on the slug
  // For now, we'll use the mock data
  // The slug parameter will be used when connecting to a real API
  const post = mockBlogPost;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Blog
          </Link>
        </div>
        
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span 
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {post.title}
          </motion.h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-gray-600 dark:text-gray-400 text-sm">
            <div className="flex items-center">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="h-10 w-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{post.author.name}</p>
                <p className="text-xs">{post.author.role}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1.5" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1.5" />
                <span>{post.readTime}</span>
              </div>
              <button 
                onClick={handleShare}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Share this article"
              >
                <ShareIcon className="h-4 w-4 mr-1.5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </header>
        
        {/* Featured Image */}
        <div className="mb-12 rounded-xl overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>
        
        {/* Article Content */}
        <div className="prose dark:prose-invert prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        
        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center text-gray-600 dark:text-gray-400 mr-2">
              <TagIcon className="h-5 w-5 mr-1.5" />
              Tags:
            </span>
            {post.tags.map(tag => (
              <Link 
                key={tag}
                to={`/blog?tag=${tag.toLowerCase()}`}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Author Bio */}
        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="h-20 w-20 rounded-full"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{post.author.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{post.author.role}</p>
              <p className="text-gray-700 dark:text-gray-300">
                Passionate about creating amazing web experiences and sharing knowledge with the developer community.
              </p>
            </div>
          </div>
        </div>
        
        {/* Comments Section - Placeholder */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Discussion (0)
            </h2>
            <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors">
              <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
              Leave a Comment
            </button>
          </div>
          
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <p className="text-gray-500 dark:text-gray-400">Comments are currently disabled. Check back later!</p>
          </div>
        </div>
      </article>
      
      {/* Newsletter CTA */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Enjoyed this article?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Subscribe to my newsletter to get the latest articles, tutorials, and insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
              <button className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
