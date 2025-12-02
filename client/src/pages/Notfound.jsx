
import { Home, Search, ShoppingBag, ArrowLeft, HelpCircle } from 'lucide-react';
import { Link } from 'react-router';
import Reveal from '../animation/Reveal';

const Notfound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <Reveal>
        <div className="mb-8">
          <div className="text-8xl sm:text-9xl font-bold text-gray-200 mb-4">404</div>
          <div className="relative">
            <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-500 text-xl font-bold">!</span>
            </div>
          </div>
        </div>
        </Reveal>

        {/* Main Content */}
        <Reveal>
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
            We couldn't find the page you're looking for. It might have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>
        </Reveal>

        {/* Action Buttons */}
        <Reveal>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to='/' className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
          
          <Link to='/shop' className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shop Now
          </Link>
        </div>
        </Reveal>

      </div>
    </div>
  );
};

export default Notfound;