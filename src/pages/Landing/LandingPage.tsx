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
      <header className="relative z-10 bg-ivory/90 backdrop-blur-sm border-b border-earth-brown/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-african-sunset">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-charcoal-black">smarthome</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-charcoal-black hover:text-sunset-orange transition-colors">Features</a>
              <a href="#about" className="text-charcoal-black hover:text-sunset-orange transition-colors">About</a>
              <a href="#contact" className="text-charcoal-black hover:text-sunset-orange transition-colors">Contact</a>
              <Link 
                to="/login" 
                className="btn-primary-african px-4 py-2 rounded-lg transition-all duration-300"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Village Scene */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-b from-deep-sky-blue/30 via-desert-sand/40 to-savanna-green/30 relative">
            {/* Sky with subtle clouds */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-deep-sky-blue/40 to-deep-sky-blue/20 opacity-60">
              <div className="absolute top-10 left-1/4 w-20 h-8 bg-ivory rounded-full opacity-70"></div>
              <div className="absolute top-16 right-1/3 w-16 h-6 bg-ivory rounded-full opacity-60"></div>
              <div className="absolute top-8 right-1/4 w-12 h-5 bg-ivory rounded-full opacity-50"></div>
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
                    <stop offset="0%" stopColor="#6B8E23" />
                    <stop offset="100%" stopColor="#3A5F0B" />
                  </linearGradient>
                  <linearGradient id="hillGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6B8E23" />
                    <stop offset="100%" stopColor="#3A5F0B" />
                  </linearGradient>
                  <linearGradient id="hillGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6B8E23" />
                    <stop offset="100%" stopColor="#3A5F0B" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Village Houses */}
            <div className="absolute bottom-20 left-1/4 transform -translate-x-1/2">
              <div className="relative">
                {/* House 1 */}
                <div className="w-16 h-12 bg-clay-terracotta rounded-t-lg relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-6 border-transparent border-b-earth-brown"></div>
                  <div className="absolute top-2 left-2 w-3 h-4 bg-deep-sky-blue rounded-sm"></div>
                  <div className="absolute top-6 right-2 w-2 h-4 bg-earth-brown rounded-sm"></div>
                  {/* Solar panel */}
                  <div className="absolute -top-2 right-1 w-4 h-2 bg-charcoal-black rounded-sm opacity-80"></div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-16 right-1/3 transform translate-x-1/2">
              <div className="relative">
                {/* House 2 */}
                <div className="w-20 h-14 bg-desert-sand rounded-t-lg relative">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-10 border-r-10 border-b-8 border-transparent border-b-clay-terracotta"></div>
                  <div className="absolute top-2 left-2 w-4 h-5 bg-deep-sky-blue rounded-sm"></div>
                  <div className="absolute top-2 right-2 w-4 h-5 bg-deep-sky-blue rounded-sm"></div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-3 h-5 bg-earth-brown rounded-sm"></div>
                  {/* Smart lighting indicator */}
                  <div className="absolute top-1 left-1 w-1 h-1 bg-baobab-green rounded-full animate-african-pulse"></div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-24 left-2/3">
              <div className="relative">
                {/* House 3 */}
                <div className="w-14 h-10 bg-sunset-orange/80 rounded-t-lg relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-7 border-r-7 border-b-5 border-transparent border-b-charcoal-black"></div>
                  <div className="absolute top-1 left-1 w-3 h-3 bg-deep-sky-blue rounded-sm"></div>
                  <div className="absolute top-5 right-1 w-2 h-3 bg-earth-brown rounded-sm"></div>
                  {/* IoT device indicator */}
                  <div className="absolute -right-1 top-2 w-2 h-2 bg-deep-sky-blue rounded-full">
                    <div className="absolute inset-0 bg-deep-sky-blue/60 rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trees and vegetation */}
            <div className="absolute bottom-12 left-1/6">
              <div className="w-8 h-12 bg-earth-brown rounded-t-full"></div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-savanna-green rounded-full opacity-80"></div>
            </div>

            <div className="absolute bottom-8 right-1/5">
              <div className="w-6 h-10 bg-earth-brown rounded-t-full"></div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-baobab-green rounded-full opacity-80"></div>
            </div>

            {/* Subtle tech elements */}
            <div className="absolute top-1/3 right-1/4">
              <Wifi className="h-4 w-4 text-deep-sky-blue opacity-60 animate-african-pulse" />
            </div>
            
            <div className="absolute top-1/2 left-1/5">
              <Zap className="h-3 w-3 text-sunset-orange opacity-70 animate-african-pulse" />
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-ivory/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-african-lg border border-earth-brown/20"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold text-charcoal-black mb-6"
            >
              Smart Living for
              <span className="block text-transparent bg-clip-text bg-gradient-african-sunset">
                African Communities
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-charcoal-black/80 mb-8 max-w-3xl mx-auto leading-relaxed"
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
                className="group btn-primary-african px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-african flex items-center space-x-2"
              >
                <span>Start Your Smart Journey</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/login"
                className="border-2 border-sunset-orange text-sunset-orange px-8 py-4 rounded-xl text-lg font-semibold hover:bg-sunset-orange hover:text-ivory transition-all duration-300"
              >
                Demo Login
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 flex items-center justify-center space-x-8 text-sm text-charcoal-black/70"
            >
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-sunset-orange" />
                <span>Solar Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <Leaf className="h-4 w-4 text-baobab-green" />
                <span>Eco-Friendly</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-deep-sky-blue" />
                <span>Community First</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-black mb-4">
              Technology That Understands Africa
            </h2>
            <p className="text-xl text-charcoal-black/70 max-w-3xl mx-auto">
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
                className="bg-gradient-to-br from-desert-sand/20 to-ivory p-8 rounded-2xl border border-earth-brown/20 hover:shadow-african transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-african-sunset rounded-xl mb-6">
                  <feature.icon className="h-6 w-6 text-ivory" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal-black mb-4">{feature.title}</h3>
                <p className="text-charcoal-black/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-african-sunset">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-ivory mb-6">
              Ready to Transform Your Home?
            </h2>
            <p className="text-xl text-ivory/90 mb-8 max-w-2xl mx-auto">
              Join thousands of African families already living smarter, saving energy, 
              and building sustainable communities.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center space-x-2 bg-ivory text-sunset-orange px-8 py-4 rounded-xl text-lg font-semibold hover:bg-desert-sand/20 transition-all duration-300 transform hover:scale-105 shadow-african"
            >
              <span>Get Started Today</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-black text-ivory py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-african-sunset">
                <Home className="h-6 w-6 text-ivory" />
              </div>
              <span className="text-2xl font-bold">smarthome</span>
            </div>
            <div className="text-ivory/70 text-center md:text-right">
              <p>&copy; 2025 SmartHome Africa. Empowering communities through technology.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;