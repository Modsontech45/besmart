import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full mx-auto mb-4"
        />
        <p className="text-gray-300">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;