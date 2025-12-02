
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, CreditCard } from 'lucide-react';
import logo from '../assets/nextgadget.png'
import { Link } from 'react-router';
import Reveal from '../animation/Reveal';
const Footer = () => {
  return (
    
    <footer>
      {/* Main Footer Content */}
      <Reveal>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {/* Company Info */}
          <div className="space-y-1">
            <div>
              <Link to='/' > <img src={logo} className='w-36 h-auto' alt="logo" /></Link>
              <p className="text-gray-700 mt-1">
                Your one-stop destination for quality products at unbeatable prices. 
                We're committed to providing exceptional shopping experiences.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-700">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span>123 Commerce St, City, State 12345</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>contact@nextgadget.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-gray-700 hover:text-black transition-colors">Shop All</Link></li>
              <li><Link href="/categories" className="text-gray-700 hover:text-black transition-colors">Categories</Link></li>
              <li><Link href="/deals" className="text-gray-700 hover:text-black transition-colors">Deals</Link></li>
              <li><Link href="/new-arrivals" className="text-gray-700 hover:text-black transition-colors">New Arrivals</Link></li>
              <li><Link href="/bestsellers" className="text-gray-700 hover:text-black transition-colors">Best Sellers</Link></li>
              <li><Link href="/gift-cards" className="text-gray-700 hover:text-black transition-colors">Gift Cards</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-gray-700 hover:text-black transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="text-gray-700 hover:text-black transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-700 hover:text-black transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/size-guide" className="text-gray-700 hover:text-black transition-colors">Size Guide</Link></li>
              <li><Link href="/faq" className="text-gray-700 hover:text-black transition-colors">FAQ</Link></li>
              <li><Link href="/track-order" className="text-gray-700 hover:text-black transition-colors">Track Your Order</Link></li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Connected</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates on new products and exclusive offers.
            </p>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-2 py-2 bg-black text-white hover:bg-blue-700 transition-colors rounded-lg font-semibold">
                  Subscribe
                </button>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-700 hover:text-black transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-700 hover:text-black transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-700 hover:text-black transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-700 hover:text-black transition-colors">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Reveal>

      {/* Bottom Footer */}
      <Reveal>
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
              <span>&copy; 2025 NextGadget. All rights reserved.</span>
              <div className="flex space-x-4">
                <a href="/privacy" className="hover:text-black transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-black transition-colors">Terms of Service</a>
                <a href="/cookies" className="hover:text-black transition-colors">Cookie Policy</a>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">We accept:</span>
              <div className="flex space-x-2">
                <div className="bg-white p-1 rounded">
                  <CreditCard className="h-6 w-8 text-gray-800" />
                </div>
                <div className="bg-gray-600 p-1 rounded text-white text-xs font-bold flex items-center justify-center w-8 h-6">
                  VISA
                </div>
                <div className="bg-gray-600 p-1 rounded text-white text-xs font-bold flex items-center justify-center w-8 h-6">
                  MC
                </div>
                <div className="bg-gray-500 p-1 rounded text-white text-xs font-bold flex items-center justify-center w-8 h-6">
                  AMEX
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Reveal>
    </footer>
    
  );
};

export default Footer;