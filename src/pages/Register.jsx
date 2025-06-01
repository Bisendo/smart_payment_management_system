import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiLock, FiHome, FiCheck, FiArrowRight, FiCalendar, FiUpload, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {



  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    address: ''
  });

  const [studentInfo, setStudentInfo] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    school: '',
    grade: '',
    documents: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStudentInfoChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files) {
      setStudentInfo(prev => ({
        ...prev,
        documents: files
      }));
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
          clearInterval(interval);
          setUploadProgress(100);
        } else {
          setUploadProgress(progress);
        }
      }, 200);
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStudentForm = () => {
    const newErrors = {};
    
    if (!studentInfo.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!studentInfo.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    if (!studentInfo.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!studentInfo.school.trim()) {
      newErrors.school = 'School information is required';
    }
    
    if (!studentInfo.grade) {
      newErrors.grade = 'Grade is required';
    }
    
    if (!studentInfo.documents) {
      newErrors.documents = 'Documents are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 2000);
    }
  };

  const handleStudentFormSubmit = (e) => {
    e.preventDefault();
    
    if (validateStudentForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setShowStudentForm(false);
        
        // Reset forms
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          password: '',
          address: ''
        });
        
        setStudentInfo({
          fullName: '',
          dateOfBirth: '',
          gender: '',
          school: '',
          grade: '',
          documents: null
        });
        
        setUploadProgress(0);
        setIsSuccess(false);
        navigate('/login'); // Redirect to login or another page
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-hidden relative">
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

      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700"
        >
          <div className="p-8">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-8"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 0.5 }}
                    className="text-green-400 mb-6"
                  >
                    <FiCheck className="h-16 w-16 mx-auto" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
                  <p className="text-gray-400 mb-6">Your account has been created.</p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-3"
                  >
                    <button 
                      onClick={() => setShowStudentForm(true)}
                      className="w-full px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition flex items-center justify-center mx-auto"
                    >
                      Continue Student Registration
                      <FiArrowRight className="ml-2" />
                    </button>
                    <button 
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          fullName: '',
                          email: '',
                          phoneNumber: '',
                          password: '',
                          address: ''
                        });
                      }}
                      className="px-6 py-2 text-gray-300 hover:text-white transition"
                    >
                      Back to Form
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-center mb-6"
                  >
                    <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-gray-400">Join our community today</p>
                  </motion.div>

                  {/* Full Name */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 bg-gray-700 border ${
                          errors.fullName ? 'border-red-500' : 'border-gray-600'
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-500" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 bg-gray-700 border ${
                          errors.email ? 'border-red-500' : 'border-gray-600'
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </motion.div>

                  {/* Phone Number */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="text-gray-500" />
                      </div>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 bg-gray-700 border ${
                          errors.phoneNumber ? 'border-red-500' : 'border-gray-600'
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white`}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    {errors.phoneNumber && <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>}
                  </motion.div>

                  {/* Password */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-500" />
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 bg-gray-700 border ${
                          errors.password ? 'border-red-500' : 'border-gray-600'
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white`}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                  </motion.div>

                  {/* Address (Optional) */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                      Residential Address <span className="text-gray-500">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiHome className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white"
                        placeholder="123 Main St, City, Country"
                      />
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="pt-4"
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
                        isSubmitting ? 'bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-500'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        'Register'
                      )}
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-sm text-gray-400 pt-2"
                  >
                    Already have an account?{' '}
                    <a href="/login" className="text-indigo-400 hover:text-indigo-300 hover:underline">
                      Sign in
                    </a>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Student Information Popup Form */}
      <AnimatePresence>
        {showStudentForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 relative">
                <button 
                  onClick={() => setShowStudentForm(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <FiX className="h-6 w-6" />
                </button>
                
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Student Information</h2>
                
                <form onSubmit={handleStudentFormSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="studentFullName" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="studentFullName"
                      name="fullName"
                      value={studentInfo.fullName}
                      onChange={handleStudentInfoChange}
                      className={`w-full px-4 py-2 bg-gray-700 border ${
                        errors.fullName ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white`}
                      placeholder="Student Full Name"
                    />
                    {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  
                  {/* Date of Birth */}
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300 mb-1">Date of Birth</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiCalendar className="text-gray-500" />
                      </div>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={studentInfo.dateOfBirth}
                        onChange={handleStudentInfoChange}
                        className={`w-full pl-10 pr-4 py-2 bg-gray-700 border ${
                          errors.dateOfBirth ? 'border-red-500' : 'border-gray-600'
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white`}
                      />
                    </div>
                    {errors.dateOfBirth && <p className="text-red-400 text-xs mt-1">{errors.dateOfBirth}</p>}
                  </div>
                  
                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="male"
                          checked={studentInfo.gender === 'male'}
                          onChange={handleStudentInfoChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 bg-gray-700"
                        />
                        <label htmlFor="male" className="ml-2 block text-sm text-gray-300">Male</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="female"
                          name="gender"
                          value="female"
                          checked={studentInfo.gender === 'female'}
                          onChange={handleStudentInfoChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 bg-gray-700"
                        />
                        <label htmlFor="female" className="ml-2 block text-sm text-gray-300">Female</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="other"
                          name="gender"
                          value="other"
                          checked={studentInfo.gender === 'other'}
                          onChange={handleStudentInfoChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 bg-gray-700"
                        />
                        <label htmlFor="other" className="ml-2 block text-sm text-gray-300">Other</label>
                      </div>
                    </div>
                    {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender}</p>}
                  </div>
                  
                  {/* Current/Previous School */}
                  <div>
                    <label htmlFor="school" className="block text-sm font-medium text-gray-300 mb-1">Current/Previous School</label>
                    <input
                      type="text"
                      id="school"
                      name="school"
                      value={studentInfo.school}
                      onChange={handleStudentInfoChange}
                      className={`w-full px-4 py-2 bg-gray-700 border ${
                        errors.school ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white`}
                      placeholder="School Name"
                    />
                    {errors.school && <p className="text-red-400 text-xs mt-1">{errors.school}</p>}
                  </div>
                  
                  {/* Grade applying for */}
                  <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-300 mb-1">Grade Applying For</label>
                    <select
                      id="grade"
                      name="grade"
                      value={studentInfo.grade}
                      onChange={handleStudentInfoChange}
                      className={`w-full px-4 py-2 bg-gray-700 border ${
                        errors.grade ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white`}
                    >
                      <option value="">Select Grade</option>
                      <option value="pre-k">Pre-K</option>
                      <option value="kindergarten">Kindergarten</option>
                      <option value="1">Grade 1</option>
                      <option value="2">Grade 2</option>
                      <option value="3">Grade 3</option>
                      <option value="4">Grade 4</option>
                      <option value="5">Grade 5</option>
                      <option value="6">Grade 6</option>
                      <option value="7">Grade 7</option>
                      <option value="8">Grade 8</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                    {errors.grade && <p className="text-red-400 text-xs mt-1">{errors.grade}</p>}
                  </div>
                  
                  {/* Documents upload */}
                  <div>
                    <label htmlFor="documents" className="block text-sm font-medium text-gray-300 mb-1">
                      Documents Upload (Birth certificate, previous results)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <div className="flex text-sm text-gray-400">
                          <label
                            htmlFor="documents"
                            className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none"
                          >
                            <span>Upload files</span>
                            <input
                              id="documents"
                              name="documents"
                              type="file"
                              multiple
                              onChange={handleFileUpload}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-400">
                          PDF, JPG, PNG up to 10MB
                        </p>
                      </div>
                    </div>
                    {studentInfo.documents && (
                      <div className="mt-2">
                        <div className="flex items-center text-sm text-gray-300">
                          <FiUpload className="mr-2" />
                          <span>{studentInfo.documents.length} file(s) selected</span>
                        </div>
                        {uploadProgress > 0 && uploadProgress < 100 && (
                          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                            <div 
                              className="bg-indigo-600 h-2.5 rounded-full" 
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                        )}
                        {uploadProgress === 100 && (
                          <p className="text-green-400 text-xs mt-1">Upload complete!</p>
                        )}
                      </div>
                    )}
                    {errors.documents && <p className="text-red-400 text-xs mt-1">{errors.documents}</p>}
                  </div>
                  
                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
                        isSubmitting ? 'bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-500'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        'Complete Registration'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegistrationForm;