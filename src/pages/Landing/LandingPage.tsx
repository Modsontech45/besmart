import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Smartphone, 
  Zap, 
  Leaf, 
  Users, 
  Sun, 
  Wifi,
  Home,
  Shield,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Smart Device Control",
      description: "Control all your home devices from anywhere with our intuitive mobile app"
    },
    {
      icon: Sun,
      title: "Solar Integration",
      description: "Seamlessly integrate with solar panels and renewable energy systems"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Reduce energy consumption and live sustainably with smart automation"
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Built for African communities with local needs and infrastructure in mind"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Bank-level security with offline capabilities for rural connectivity"
    },
    {
      icon: BarChart3,
      title: "Energy Analytics",
      description: "Track and optimize your energy usage with detailed insights"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-desert-sand/20 via-ivory to-savanna-green/10">
      {/* Header */}
      <header className="relative z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">smarthome</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <Link 
                to="/login" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Background Village Scene */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-b from-blue-200/30 via-yellow-100/40 to-green-200/30 relative">
            {/* Sky with subtle clouds */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-300/40 to-blue-200/20 opacity-60">
              <div className="absolute top-10 left-1/4 w-20 h-8 bg-white rounded-full opacity-70"></div>
              <div className="absolute top-16 right-1/3 w-16 h-6 bg-white rounded-full opacity-60"></div>
              <div className="absolute top-8 right-1/4 w-12 h-5 bg-white rounded-full opacity-50"></div>
            </div>

            {/* Rolling Hills */}
            <div className="absolute bottom-0 left-0 w-full h-2/3">
              <svg viewBox="0 0 1200 400" className="w-full h-full">
                <path d="M0,400 L0,200 Q200,150 400,180 T800,160 Q1000,140 1200,170 L1200,400 Z" 
                      fill="url(#hillGradient1)" opacity="0.9"/>
                <path d="M0,400 L0,250 Q300,200 600,220 T1200,200 L1200,400 Z" 
                      fill="url(#hillGradient2)" opacity="0.9"/>
                <path d="M0,400 L0,300 Q400,280 800,290 T1200,280 L1200,400 Z" 
                      fill="url(#hillGradient3)"/>
                
                <defs>
                  <linearGradient id="hillGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                  <linearGradient id="hillGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                  <linearGradient id="hillGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Village Houses */}
            <div className="absolute bottom-20 left-1/4 transform -translate-x-1/2">
              <div className="relative">
                {/* House 1 */}
                <div className="w-16 h-12 bg-orange-400 rounded-t-lg relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-6 border-transparent border-b-red-600"></div>
                  <div className="absolute top-2 left-2 w-3 h-4 bg-blue-400 rounded-sm"></div>
                  <div className="absolute top-6 right-2 w-2 h-4 bg-yellow-600 rounded-sm"></div>
                  {/* Solar panel */}
                  <div className="absolute -top-2 right-1 w-4 h-2 bg-gray-800 rounded-sm opacity-80"></div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-16 right-1/3 transform translate-x-1/2">
              <div className="relative">
                {/* House 2 */}
                <div className="w-20 h-14 bg-yellow-200 rounded-t-lg relative">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-10 border-r-10 border-b-8 border-transparent border-b-orange-500"></div>
                  <div className="absolute top-2 left-2 w-4 h-5 bg-blue-400 rounded-sm"></div>
                  <div className="absolute top-2 right-2 w-4 h-5 bg-blue-400 rounded-sm"></div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-3 h-5 bg-yellow-600 rounded-sm"></div>
                  {/* Smart lighting indicator */}
                  <div className="absolute top-1 left-1 w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-24 left-2/3">
              <div className="relative">
                {/* House 3 */}
                <div className="w-14 h-10 bg-orange-400/80 rounded-t-lg relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-7 border-r-7 border-b-5 border-transparent border-b-gray-800"></div>
                  <div className="absolute top-1 left-1 w-3 h-3 bg-blue-400 rounded-sm"></div>
                  <div className="absolute top-5 right-1 w-2 h-3 bg-yellow-600 rounded-sm"></div>
                  {/* IoT device indicator */}
                  <div className="absolute -right-1 top-2 w-2 h-2 bg-blue-500 rounded-full">
                    <div className="absolute inset-0 bg-blue-500/60 rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trees and vegetation */}
            <div className="absolute bottom-12 left-1/6">
              <div className="w-8 h-12 bg-yellow-600 rounded-t-full"></div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-green-500 rounded-full opacity-80"></div>
            </div>

            <div className="absolute bottom-8 right-1/5">
              <div className="w-6 h-10 bg-yellow-600 rounded-t-full"></div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-green-600 rounded-full opacity-80"></div>
            </div>

            {/* Subtle tech elements */}
            <div className="absolute top-1/3 right-1/4">
              <Wifi className="h-4 w-4 text-blue-500 opacity-60 animate-pulse" />
            </div>
            
            <div className="absolute top-1/2 left-1/5">
              <Zap className="h-3 w-3 text-orange-500 opacity-70 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-200"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              Smart Living for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                African Communities
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Bringing intelligent home automation to rural and urban African communities. 
              Harness solar power, reduce energy costs, and live sustainably with technology 
              that understands your environment.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link
                to="/signup"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <span>Start Your Smart Journey</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/login"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Demo Login
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-600"
            >
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-orange-500" />
                <span>Solar Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <Leaf className="h-4 w-4 text-green-600" />
                <span>Eco-Friendly</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span>Community First</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Technology That Understands Africa
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for African communities, our smart home solutions work with 
              local infrastructure, climate, and energy sources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-6">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Home?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of African families already living smarter, saving energy, 
              and building sustainable communities.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span>Get Started Today</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">smarthome</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 SmartHome Africa. Empowering communities through technology.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;