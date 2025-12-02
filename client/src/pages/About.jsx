
import { Smartphone, Laptop, Headphones, Gamepad2, Watch, Tablet, Users, Award, Heart, Globe, Shield, Zap, Star, Check, Cpu, Wifi, Battery } from 'lucide-react';
import { Link } from 'react-router';
import Reveal from '../animation/Reveal';


const About = () => {
  const stats = [
    { number: '1M+', label: 'Tech Enthusiasts', icon: Users },
    { number: '500+', label: 'Premium Brands', icon: Award },
    { number: '50+', label: 'Countries Served', icon: Globe },
    { number: '99.8%', label: 'Uptime Guarantee', icon: Zap }
  ];

  const values = [
    {
      icon: Cpu,
      title: 'Cutting-Edge Technology',
      description: 'We stock the latest innovations from leading tech brands, ensuring you get the most advanced features and performance.'
    },
    {
      icon: Shield,
      title: 'Authentic & Secure',
      description: 'Every product is sourced directly from manufacturers with full warranties. Your data and transactions are protected with bank-grade security.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Service',
      description: 'Same-day processing, express shipping options, and instant customer support to keep you connected without delay.'
    },
    {
      icon: Heart,
      title: 'Tech Expert Support',
      description: 'Our team of certified technicians and product specialists are here to help you choose the perfect tech solution.'
    }
  ];

  const productCategories = [
    {
      icon: Smartphone,
      title: 'Smartphones',
      description: 'Latest iPhones, Samsung Galaxy, Google Pixel, and more',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Laptop,
      title: 'Laptops & Computers',
      description: 'Gaming rigs, ultrabooks, workstations, and accessories',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Headphones,
      title: 'Audio & Headphones',
      description: 'Premium headphones, earbuds, speakers, and sound systems',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Watch,
      title: 'Wearable Tech',
      description: 'Smartwatches, fitness trackers, and health monitors',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Gamepad2,
      title: 'Gaming Gear',
      description: 'Consoles, accessories, keyboards, mice, and monitors',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Tablet,
      title: 'Tablets & iPads',
      description: 'iPads, Android tablets, e-readers, and styluses',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'CEO & Tech Visionary',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      description: 'Former Apple engineer with 12+ years in consumer electronics and retail technology.',
      expertise: 'Product Strategy'
    },
    {
      name: 'Sarah Martinez',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      description: 'Cybersecurity expert ensuring our platform and customer data remain protected.',
      expertise: 'Security & Infrastructure'
    },
    {
      name: 'David Park',
      role: 'Head of Product Curation',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      description: 'Tech reviewer and hardware specialist who handpicks every product in our catalog.',
      expertise: 'Hardware Testing'
    }
  ];

  const milestones = [
    { year: '2018', event: 'TechHub launched with focus on premium smartphones and laptops' },
    { year: '2019', event: 'Partnered with Apple, Samsung, and Google as authorized retailers' },
    { year: '2020', event: 'Expanded to gaming gear and introduced same-day delivery' },
    { year: '2021', event: 'Launched trade-in program and eco-friendly packaging initiative' },
    { year: '2022', event: 'Opened tech repair centers and extended warranty services' },
    { year: '2024', event: 'Reached 1M customers and launched AI-powered product recommendations' }
  ];

  const features = [
    { icon: Shield, title: 'Manufacturer Warranty', description: 'Full manufacturer warranty on all products' },
    { icon: Zap, title: 'Express Shipping', description: 'Same-day delivery in major cities' },
    { icon: Wifi, title: 'Tech Support', description: '24/7 expert technical assistance' },
    { icon: Battery, title: 'Trade-In Program', description: 'Get credit for your old devices' }
  ];

  return (
    
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Reveal>
        <div className="bg-gray-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Welcome to <span className="">NextGadget</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Your premier destination for cutting-edge technology. From the latest smartphones to 
                powerful gaming laptops, we bring you tomorrow's tech today.
              </p>
              <div className="flex justify-center space-x-4">
                <Link to='/shop' className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Explore Products
                </Link>
                <button className="border-2 border-blue-400 text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 hover:text-gray-900 transition-colors">
                  Our Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Product Categories */}
      <Reveal>
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our comprehensive range of premium tech products from world-renowned brands.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${category.color}`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    </Reveal>
      {/* Stats Section */}
      <Reveal>
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>
      {/* Our Story Section */}
      <Reveal>
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Tech Journey</h2>
                <div className="prose prose-lg text-gray-700 space-y-6">
                  <p>
                    Founded by tech enthusiasts in 2018, NextGadget was born from a simple frustration: 
                    finding authentic, cutting-edge technology products shouldn't be complicated or risky.
                  </p>
                  <p>
                    We started with a mission to bridge the gap between consumers and the latest 
                    innovations. Today, we're proud partners with Apple, Samsung, Google, Sony, 
                    Microsoft, and hundreds of other leading tech brands.
                  </p>
                  <p>
                    From smartphones that capture life in 4K to gaming laptops that deliver 
                    console-quality experiences, we curate every product with the same passion 
                    that drives innovation in Silicon Valley.
                  </p>
                </div>
              </div>
              <div className="mt-12 lg:mt-0">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose NextGadget?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Authorized retailer for all major tech brands</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Expert tech support and product guidance</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Extended warranties and protection plans</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Competitive pricing and exclusive deals</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Values Section */}
      <Reveal>
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Commitment</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles drive everything we do, from product selection to customer service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Features Section */}
      <Reveal>
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4">TechHub Advantages</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Experience the difference of shopping with tech specialists who understand your needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center text-gray-700">
                    <div className="bg-gray-300 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-gray-700">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>


      {/* CTA Section */}
      <Reveal>
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-6">Ready to Upgrade Your Tech?</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Discover the latest smartphones, laptops, headphones, and more. Join over 1 million 
              tech enthusiasts who trust TechHub for their technology needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to='/shop' className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Shop Latest Tech
              </Link>
              <Link to='/contact' className="border-2 border-blue-400 text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 hover:text-gray-900 transition-colors">
                Contact Tech Support
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default About;