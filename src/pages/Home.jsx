import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FaGraduationCap as AcademicCapIcon,
  FaCalculator as CalculatorIcon,
  FaChartBar as ChartBarIcon,
  FaCheckCircle as CheckCircleIcon,
  FaClipboardCheck as ClipboardCheckIcon,
  FaCreditCard as CreditCardIcon,
  FaShieldAlt as ShieldCheckIcon,
  FaUsers as UserGroupIcon,
  FaMobileAlt as MobileIcon,
  FaCloud as CloudIcon,
  FaDatabase as DatabaseIcon
} from 'react-icons/fa';

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      className="bg-white bg-opacity-5 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-10 shadow-lg hover:shadow-xl transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      whileHover={{ 
        y: -5, 
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        transition: { duration: 0.2 } 
      }}
    >
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-lg bg-indigo-500 bg-opacity-20 text-indigo-400">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="ml-3 text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const FloatingShape = ({ shape, size, initialX, initialY, rotate, duration, delay, color, opacityRange = [0.1, 0.3] }) => {
  const ShapeComponent = () => {
    switch (shape) {
      case 'circle':
        return <div className={`rounded-full ${color} opacity-20`} style={{ width: size, height: size }} />;
      case 'square':
        return <div className={`rounded-lg ${color} opacity-20`} style={{ width: size, height: size }} />;
      case 'triangle':
        return (
          <div 
            className={`${color} opacity-20`} 
            style={{ 
              width: 0, 
              height: 0, 
              borderLeft: `${size/2}px solid transparent`,
              borderRight: `${size/2}px solid transparent`,
              borderBottom: `${size}px solid currentColor`
            }} 
          />
        );
      case 'blob':
        return (
          <svg viewBox="0 0 200 200" className={color} style={{ width: size, height: size }}>
            <path 
              fill="currentColor" 
              d="M45.1,-65.5C58.2,-58.3,68.5,-45.2,74.3,-30.3C80.1,-15.5,81.4,1.1,76.4,14.9C71.4,28.7,60.1,39.7,47.1,50.1C34.1,60.5,19.4,70.3,2.6,67.1C-14.2,63.9,-28.4,47.7,-41.9,34.6C-55.4,21.5,-68.2,11.5,-71.3,-1.6C-74.5,-14.7,-68,-29.4,-56.1,-38.4C-44.2,-47.4,-26.9,-50.7,-9.6,-44.5C7.7,-38.3,15.4,-22.6,22.8,-8.7C30.2,5.2,37.3,17.3,39.1,30.7C40.9,44.1,37.5,58.7,27.2,67.6C16.9,76.5,-0.3,79.6,-14.1,74.2C-27.9,68.8,-38.3,54.8,-48.8,41.8C-59.3,28.8,-69.9,16.7,-71.6,3.2C-73.3,-10.3,-66.1,-25.1,-55.2,-35.1C-44.3,-45.1,-29.7,-50.3,-15.1,-56.4C-0.5,-62.5,14.1,-69.5,29.4,-70.1C44.6,-70.7,60.5,-64.9,71.1,-54.7C81.7,-44.5,87,-29.9,84.5,-16.4C82,-2.9,71.6,9.6,62.5,22.5C53.4,35.4,45.6,48.7,34.6,56.3C23.6,63.9,9.3,65.8,-4.7,72.8C-18.7,79.8,-37.4,91.9,-51.2,87.1C-65,82.3,-73.9,60.6,-76.3,39.8C-78.7,19,-74.6,-0.9,-66.2,-17.2C-57.8,-33.5,-45.1,-46.2,-31.2,-52.9C-17.3,-59.6,-2.3,-60.3,12.4,-57.7C27.1,-55.1,41.8,-49.2,53.1,-39.9C64.4,-30.6,72.3,-17.9,73.6,-4.6C74.9,8.7,69.6,22.6,60.1,33.5C50.6,44.4,37,52.3,23.3,58.2C9.6,64.1,-4.2,68,-15.3,63.3C-26.4,58.6,-34.8,45.3,-45.3,33.9C-55.8,22.5,-68.4,13,-72.2,0.7C-76,-11.6,-71,-25.2,-61.1,-36.2C-51.2,-47.2,-36.4,-55.6,-22.1,-62.1C-7.8,-68.5,6,-73,19.3,-71.3C32.6,-69.6,45.4,-61.7,56.3,-51.3C67.2,-40.9,76.2,-28,79.6,-13.8C83,0.4,80.8,15.9,73.8,29.1C66.8,42.3,55,53.2,41.4,61.7C27.8,70.2,12.4,76.3,-2.4,80.3C-17.2,84.3,-34.4,86.2,-46.6,78.2C-58.8,70.2,-66,52.3,-68.8,35.3C-71.6,18.3,-70,2.2,-65.5,-13.1C-61,-28.4,-53.6,-42.8,-42.3,-52.8C-31,-62.8,-15.5,-68.4,0.8,-69.8C17.2,-71.2,34.3,-68.4,45.1,-65.5Z" 
              transform="translate(100 100)"
            />
          </svg>
        );
      default:
        return <div className={`rounded-full ${color} opacity-20`} style={{ width: size, height: size }} />;
    }
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ x: initialX, y: initialY }}
      animate={{
        y: [initialY, initialY - (30 + Math.random() * 50)],
        x: [initialX, initialX + (Math.random() * 60 - 30)],
        rotate: [rotate, rotate + (Math.random() > 0.5 ? 180 : -180)],
        opacity: [opacityRange[0], opacityRange[1], opacityRange[0]]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: delay
      }}
    >
      <ShapeComponent />
    </motion.div>
  );
};

const BackgroundShapesLayer = ({ count = 10, sizeRange = [50, 200], speedRange = [10, 25] }) => {
  const shapes = useMemo(() => {
    const shapeTypes = ['circle', 'square', 'triangle', 'blob'];
    const colors = ['text-blue-400', 'text-indigo-400', 'text-purple-400', 'text-teal-400', 'text-pink-400'];
    
    return Array.from({ length: count }).map((_, i) => ({
      shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
      initialX: Math.random() * 100 - 10,
      initialY: Math.random() * 100 - 10,
      rotate: Math.random() * 360,
      duration: Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0],
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacityRange: [0.05 + Math.random() * 0.1, 0.15 + Math.random() * 0.1]
    }));
  }, [count, sizeRange, speedRange]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
    </div>
  );
};

const BackgroundAnimation = () => {
  return (
    <>
      <BackgroundShapesLayer count={15} sizeRange={[30, 150]} speedRange={[15, 30]} />
      <BackgroundShapesLayer count={8} sizeRange={[100, 300]} speedRange={[20, 40]} />
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute inset-0 opacity-20"
          initial={{ background: 'linear-gradient(45deg, #4f46e5, #7c3aed)' }}
          animate={{
            background: [
              'linear-gradient(45deg, #4f46e5, #7c3aed)',
              'linear-gradient(135deg, #7c3aed, #ec4899)',
              'linear-gradient(225deg, #ec4899, #14b8a6)',
              'linear-gradient(315deg, #14b8a6, #4f46e5)'
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
    </>
  );
};

const AnimatedText = ({ text, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.5 }}
      className={`inline-block ${className}`}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.03, duration: 0.3 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const SmartSchoolPaymentSystem = () => {
  const [currentColor, setCurrentColor] = useState('from-indigo-600 to-purple-600');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const colors = useMemo(() => [
    'from-indigo-600 to-purple-600',
    'from-blue-600 to-teal-500',
    'from-purple-600 to-pink-500',
    'from-emerald-500 to-cyan-500',
    'from-amber-500 to-orange-500'
  ], []);

  const features = [
    {
      icon: CreditCardIcon,
      title: "Secure Payments",
      description: "Multiple payment options with bank-level security for all transactions."
    },
    {
      icon: CalculatorIcon,
      title: "Automated Calculations",
      description: "Automatic fee calculations with discounts, installments and late fees."
    },
    {
      icon: ChartBarIcon,
      title: "Real-time Reporting",
      description: "Generate financial reports and analytics with a single click."
    },
    {
      icon: ClipboardCheckIcon,
      title: "Attendance Tracking",
      description: "Integrated attendance system that affects payment calculations."
    },
    {
      icon: UserGroupIcon,
      title: "Parent Portal",
      description: "Dedicated portal for parents to view and make payments."
    },
    {
      icon: ShieldCheckIcon,
      title: "Admin Dashboard",
      description: "Complete control over all financial aspects of your school."
    },
    {
      icon: MobileIcon,
      title: "Mobile Friendly",
      description: "Fully responsive design works on all devices."
    },
    {
      icon: CloudIcon,
      title: "Cloud Based",
      description: "Access your data securely from anywhere."
    },
    {
      icon: DatabaseIcon,
      title: "Data Backup",
      description: "Automatic daily backups to protect your information."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "School Administrator",
      content: "EduPay has transformed our financial operations. What used to take days now takes minutes, and parents love the convenience.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Michael Chen",
      role: "Finance Director",
      content: "The reporting features alone have saved us countless hours each month. Highly recommended for any educational institution.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "David Wilson",
      role: "Principal",
      content: "Implementation was smooth and the support team was fantastic. Our payment collection rates have improved significantly.",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ];



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor(prev => {
        const currentIndex = colors.indexOf(prev);
        return currentIndex < colors.length - 1 ? colors[currentIndex + 1] : colors[0];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [colors]);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden relative">
      {/* Background animation */}
      <BackgroundAnimation />
      
      {/* Navigation */}
      <nav className="relative z-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <AcademicCapIcon className="h-8 w-8 text-indigo-400" />
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              EduPay
            </span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex space-x-8"
          >
            <a href="/features" className="text-gray-300 hover:text-white transition">Features</a>
            <a href="/login" className="text-gray-300 hover:text-white transition">Login</a>
            <a href="/testimonials" className="text-gray-300 hover:text-white transition">Testimonials</a>
            <a href="/contact" className="text-gray-300 hover:text-white transition">Contact</a>
            <a href="/demo" className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition">Demo</a>
          </motion.div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 space-y-2"
          >
            <a href="#features" className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800">Features</a>
            <a href="/login" className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800">Login</a>
            <a href="#testimonials" className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800">Testimonials</a>
            <a href="#contact" className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800">Contact</a>
            <a href="#demo" className="block px-3 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Demo</a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-12 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedText text="Smart School Payment" delay={0.2} />
            <br />
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${currentColor} transition-colors duration-1000`}>
              <AnimatedText text="Management System" delay={0.5} />
            </span>
          </motion.h1>
          
          <motion.p 
            className="max-w-3xl mx-auto text-xl text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Streamline your school's financial operations with our secure, efficient, and user-friendly payment management solution.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <a
              href="/demo"
              className={`px-8 py-4 rounded-lg font-medium text-white bg-gradient-to-r ${currentColor} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
            >
              Request Demo
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-lg font-medium text-white bg-gray-800 bg-opacity-60 border border-gray-700 hover:bg-gray-700 transition"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </section>

      {/* Logo Cloud Section */}
      <section className="relative z-10 py-12 bg-gray-800 bg-opacity-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-400">Trusted by leading educational institutions</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="h-12 w-32 bg-gray-700 bg-opacity-50 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 font-medium">School {i}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-16 px-4 sm:px-6 lg:py-24 lg:px-8 bg-gray-800 bg-opacity-30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Powerful Features for Schools
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              Everything you need to manage school finances efficiently
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              How EduPay Works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              Simple steps to transform your school's financial management
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "1. Setup Your Account",
                description: "Our team helps you configure the system to match your school's fee structure and policies.",
                icon: CheckCircleIcon
              },
              {
                title: "2. Import Your Data",
                description: "Easily import student records and existing financial data with our simple tools.",
                icon: DatabaseIcon
              },
              {
                title: "3. Go Live",
                description: "Launch the system to staff and parents with our comprehensive training materials.",
                icon: CloudIcon
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-5 backdrop-blur-sm p-8 rounded-xl border border-white border-opacity-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-indigo-500 bg-opacity-20 text-indigo-400">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="ml-3 text-xl font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:py-24 lg:px-8 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: "99.9%", label: "System Uptime" },
              { value: "500+", label: "Schools Trust Us" },
              { value: "24/7", label: "Customer Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              Don't just take our word for it - hear from our customers
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-5 backdrop-blur-sm p-8 rounded-xl border border-white border-opacity-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-indigo-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              Everything you need to know about EduPay
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How long does implementation take?",
                answer: "Most schools are up and running within 2-4 weeks, depending on the complexity of your fee structure and the amount of historical data to import."
              },
              {
                question: "Is training included?",
                answer: "Yes, we provide comprehensive training for administrators and staff, plus parent orientation materials to ensure smooth adoption."
              },
              {
                question: "What payment methods are supported?",
                answer: "We support credit/debit cards, bank transfers, mobile money, and cash payments with full reconciliation."
              },
              {
                question: "How secure is our data?",
                answer: "We use bank-level encryption and comply with all data protection regulations. Your data is backed up daily and stored securely."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-5 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative z-10 py-16 px-4 sm:px-6 lg:py-24 lg:px-8 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            className="text-3xl font-extrabold text-white sm:text-4xl mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Transform Your School's Finances?
          </motion.h2>
          
          <motion.p 
            className="max-w-2xl mx-auto text-xl text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Get started with EduPay today and experience the difference a modern payment system can make.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <a
              href="#demo"
              className={`px-8 py-4 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
            >
              Request Demo
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 bg-opacity-80 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center">
                <AcademicCapIcon className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  EduPay
                </span>
              </div>
              <p className="mt-4 text-gray-400">
                The smart payment solution for modern educational institutions.
              </p>
            </motion.div>
            
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Demo", "Updates"]
              },
              {
                title: "Company",
                links: ["About", "Careers", "Blog", "Contact"]
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Security", "Compliance"]
              }
            ].map((column, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a href="google.com" className="text-gray-400 hover:text-white transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} EduPay. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Facebook", "Twitter", "LinkedIn", "Instagram"].map((social, i) => (
                <a 
                  key={i} 
                  href="google.com" 
                  className="text-gray-400 hover:text-white transition"
                >
                  <span className="sr-only">{social}</span>
                  <div className="h-6 w-6 bg-gray-700 rounded-full flex items-center justify-center">
                    {social.charAt(0)}
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default SmartSchoolPaymentSystem;