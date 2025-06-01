import { useState, useEffect } from 'react';
import { 
  FiHome, FiCreditCard, FiFileText, FiSettings, 
  FiBell, FiCalendar, FiPieChart, FiLogOut 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [recentPayments, setRecentPayments] = useState([]);
  const [upcomingPayments, setUpcomingPayments] = useState([]);

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setBalance(1250.50);
      setRecentPayments([
        { id: 1, course: 'Mathematics 101', amount: 250.00, date: '2023-05-15', status: 'completed' },
        { id: 2, course: 'Physics 201', amount: 300.00, date: '2023-04-28', status: 'completed' },
        { id: 3, course: 'Chemistry Lab', amount: 150.50, date: '2023-04-10', status: 'completed' },
      ]);
      setUpcomingPayments([
        { id: 4, course: 'Biology 301', amount: 275.00, dueDate: '2023-06-10' },
        { id: 5, course: 'Computer Science', amount: 320.00, dueDate: '2023-06-25' },
      ]);
      setNotifications([
        { id: 1, message: 'Payment for Mathematics 101 was successful', time: '2 hours ago', read: false },
        { id: 2, message: 'Upcoming payment for Biology 301 due in 15 days', time: '1 day ago', read: true },
        { id: 3, message: 'New invoice generated for Computer Science', time: '3 days ago', read: true },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab 
          balance={balance} 
          recentPayments={recentPayments} 
          upcomingPayments={upcomingPayments} 
          loading={loading} 
        />;
      case 'payments':
        return <PaymentsTab payments={[...recentPayments, ...upcomingPayments]} loading={loading} />;
      case 'invoices':
        return <InvoicesTab loading={loading} />;
      case 'settings':
        return <SettingsTab loading={loading} />;
      default:
        return <OverviewTab 
          balance={balance} 
          recentPayments={recentPayments} 
          upcomingPayments={upcomingPayments} 
          loading={loading} 
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-900 opacity-10"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white shadow-lg relative z-10">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <FiCreditCard className="text-2xl text-indigo-300" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
              EduPay
            </h1>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <button className="p-2 rounded-full hover:bg-indigo-800 transition">
                <FiBell className="text-xl text-indigo-200" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
                )}
              </button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                JS
              </div>
              <span className="font-medium">John Student</span>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6 relative z-10">
        {/* Sidebar */}
        <motion.aside 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full md:w-64 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl shadow-lg p-4 h-fit sticky top-8 border border-gray-700"
        >
          <nav>
            <ul className="space-y-2">
              {[
                { icon: <FiHome className="text-indigo-300" />, label: 'Overview', tab: 'overview' },
                { icon: <FiCreditCard className="text-indigo-300" />, label: 'Payments', tab: 'payments' },
                { icon: <FiFileText className="text-indigo-300" />, label: 'Invoices', tab: 'invoices' },
                { icon: <FiCalendar className="text-indigo-300" />, label: 'Schedule', tab: 'schedule' },
                { icon: <FiPieChart className="text-indigo-300" />, label: 'Reports', tab: 'reports' },
                { icon: <FiSettings className="text-indigo-300" />, label: 'Settings', tab: 'settings' },
              ].map((item) => (
                <motion.li 
                  key={item.tab}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => setActiveTab(item.tab)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                      activeTab === item.tab 
                        ? 'bg-indigo-900 bg-opacity-50 text-indigo-100 font-medium' 
                        : 'hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="mt-8 border-t border-gray-700 pt-4"
          >
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 text-gray-300 transition">
              <FiLogOut className="text-lg text-indigo-300" />
              <span>Logout</span>
            </button>
          </motion.div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const OverviewTab = ({ balance, recentPayments, upcomingPayments, loading }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-xl shadow-lg overflow-hidden border border-indigo-800"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
          <p className="opacity-90 mb-4">Here's your payment summary and recent activities</p>
          
          {loading ? (
            <div className="h-12 bg-indigo-800 rounded-lg animate-pulse"></div>
          ) : (
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex items-end justify-between"
            >
              <div>
                <p className="text-sm opacity-80">Current Balance</p>
                <p className="text-4xl font-bold">{formatCurrency(balance)}</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition shadow-md"
              >
                Add Funds
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Completed Payments" 
          value={recentPayments.length} 
          change="+2 this month" 
          icon={<FiCreditCard className="text-blue-400" />}
          loading={loading}
        />
        <StatCard 
          title="Upcoming Payments" 
          value={upcomingPayments.length} 
          change="Due soon" 
          icon={<FiCalendar className="text-orange-400" />}
          loading={loading}
        />
        <StatCard 
          title="Total Spent" 
          value={recentPayments.reduce((sum, payment) => sum + payment.amount, 0)} 
          change="This semester" 
          icon={<FiPieChart className="text-green-400" />}
          loading={loading}
          isCurrency
        />
      </div>

      {/* Recent Payments */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-700"
      >
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-gray-100">Recent Payments</h3>
        </div>
        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {recentPayments.map((payment, index) => (
              <motion.div 
                key={payment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 hover:bg-gray-700 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-100">{payment.course}</p>
                    <p className="text-sm text-gray-400">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{formatCurrency(payment.amount)}</p>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-900 text-green-300">
                      Completed
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Upcoming Payments */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-700"
      >
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-100">Upcoming Payments</h3>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition">
            View All
          </button>
        </div>
        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-12 bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {upcomingPayments.map((payment, index) => (
              <motion.div 
                key={payment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="p-4 hover:bg-gray-700 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-100">{payment.course}</p>
                    <p className="text-sm text-gray-400">Due {payment.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{formatCurrency(payment.amount)}</p>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm transition shadow-md"
                    >
                      Pay Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon, loading, isCurrency = false }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700"
    >
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          {loading ? (
            <div className="h-8 w-3/4 bg-gray-700 rounded mt-2 animate-pulse"></div>
          ) : (
            <p className="text-2xl font-bold mt-1 text-white">
              {isCurrency ? formatCurrency(value) : value}
            </p>
          )}
        </div>
        <div className="h-12 w-12 rounded-full bg-indigo-900 bg-opacity-30 flex items-center justify-center">
          {icon}
        </div>
      </div>
      {!loading && (
        <p className="text-sm mt-3 text-gray-400">{change}</p>
      )}
    </motion.div>
  );
};

const PaymentsTab = ({ payments, loading }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-700"
    >
      <div className="p-6 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-100">Payment History</h3>
        <div className="flex space-x-2">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition shadow-md"
          >
            Export
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 border border-indigo-600 text-indigo-400 rounded-lg hover:bg-indigo-900 hover:bg-opacity-30 transition"
          >
            Filter
          </motion.button>
        </div>
      </div>
      
      {loading ? (
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-gray-700">
          {payments.map((payment, index) => (
            <motion.div 
              key={payment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 hover:bg-gray-700 transition"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-indigo-900 bg-opacity-30 flex items-center justify-center text-indigo-400">
                    <FiCreditCard />
                  </div>
                  <div>
                    <p className="font-medium text-gray-100">{payment.course}</p>
                    <p className="text-sm text-gray-400">
                      {payment.date ? `Paid on ${payment.date}` : `Due on ${payment.dueDate}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">{formatCurrency(payment.amount)}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    payment.status === 'completed' 
                      ? 'bg-green-900 text-green-300' 
                      : 'bg-yellow-900 text-yellow-300'
                  }`}>
                    {payment.status === 'completed' ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const InvoicesTab = ({ loading }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-700"
    >
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-gray-100">My Invoices</h3>
      </div>
      {loading ? (
        <div className="p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block p-8 bg-gray-700 bg-opacity-30 rounded-lg border border-gray-700"
          >
            <FiFileText className="mx-auto text-4xl text-gray-500 mb-4" />
            <h4 className="text-lg font-medium text-gray-200 mb-2">No invoices yet</h4>
            <p className="text-gray-400 mb-4">Your invoices will appear here once generated</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition shadow-md"
            >
              Request Invoice
            </motion.button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

const SettingsTab = ({ loading }) => {
  const [activeSetting, setActiveSetting] = useState('profile');
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-700"
    >
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-gray-100">Settings</h3>
      </div>
      
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-700 p-4">
          <ul className="space-y-2">
            {['profile', 'payment', 'security', 'notifications'].map((item) => (
              <motion.li key={item} whileTap={{ scale: 0.98 }}>
                <button
                  onClick={() => setActiveSetting(item)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeSetting === item 
                      ? 'bg-indigo-900 bg-opacity-50 text-indigo-100 font-medium' 
                      : 'hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div className="flex-1 p-6">
          {loading ? (
            <div className="space-y-4">
              <div className="h-8 bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
              <div className="h-12 bg-gray-700 rounded mt-6 animate-pulse"></div>
              <div className="h-12 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-700 rounded animate-pulse"></div>
            </div>
          ) : (
            <motion.div
              key={activeSetting}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-lg font-medium mb-4 text-gray-100">
                {activeSetting.charAt(0).toUpperCase() + activeSetting.slice(1)} Settings
              </h4>
              <p className="text-gray-400 mb-6">
                Configure your {activeSetting} preferences and details
              </p>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {activeSetting === 'profile' ? 'Full Name' : 
                     activeSetting === 'payment' ? 'Card Number' :
                     activeSetting === 'security' ? 'Password' : 'Notification Preferences'}
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white"
                    placeholder={`Enter your ${activeSetting === 'profile' ? 'name' : activeSetting === 'payment' ? 'card details' : 'settings'}`}
                  />
                </div>
                
                {activeSetting === 'profile' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white"
                        placeholder="your.email@university.edu"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Student ID</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white"
                        placeholder="STU-123456"
                      />
                    </div>
                  </>
                )}
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit" 
                  className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition shadow-md"
                >
                  Save Changes
                </motion.button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;