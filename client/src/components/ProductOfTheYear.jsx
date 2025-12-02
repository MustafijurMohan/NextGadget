import { Link } from "react-router";

const ProductOfTheYear = () => {
  return (
    <section className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50 py-20 px-4 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-200 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            {/* Award Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full border-2 border-amber-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold text-sm uppercase tracking-wider">Award Winner</span>
            </div>

            {/* Main Heading */}
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Product of the
                <span className="block bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                  Year 2025
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Discover our most celebrated products, handpicked by our community and experts. 
                Experience innovation, quality, and excellence that sets new standards.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Premium Quality</h4>
                  <p className="text-xs text-gray-600 mt-1">Best-in-class materials</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Innovation</h4>
                  <p className="text-xs text-gray-600 mt-1">Cutting-edge design</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Best Value</h4>
                  <p className="text-xs text-gray-600 mt-1">Unmatched pricing</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Customer Favorite</h4>
                  <p className="text-xs text-gray-600 mt-1">5-star rated</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link to="/shop">
              <button className="group relative px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <span className="relative z-10 flex items-center gap-2 uppercase tracking-wider text-sm">
                  Explore Collection
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>
            </Link>

            {/* Stats */}
            <div className="flex gap-8 pt-4 border-t border-gray-200">
              <div>
                <p className="text-3xl font-bold text-gray-900">50K+</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">4.9</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">100+</p>
                <p className="text-sm text-gray-600">Award Products</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            {/* Decorative Circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-3xl opacity-20 scale-90" />
            
            {/* Main Image Container */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:rotate-1 transition-transform duration-500">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" 
                  alt="Product of the Year" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-amber-500 text-white w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-white transform rotate-12 hover:rotate-0 transition-transform">
                <span className="text-xs font-semibold uppercase">Best of</span>
                <span className="text-2xl font-bold">2025</span>
              </div>

              {/* Floating Rating */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-gray-600 font-medium">10,284 Reviews</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductOfTheYear;