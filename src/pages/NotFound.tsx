import { Link } from 'react-router-dom';
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-500">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Page not found</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Go back home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
