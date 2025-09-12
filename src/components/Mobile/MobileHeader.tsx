import React from 'react';
import { motion } from 'framer-motion';
import { Home, Mic, MicOff, Power } from 'lucide-react';

interface MobileHeaderProps {
  isListening: boolean;
  isVoiceSupported: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onTurnAllOn: () => void;
  onTurnAllOff: () => void;
  deviceCount: number;
  onlineCount: number;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  isListening,
  isVoiceSupported,
  onStartListening,
  onStopListening,
  onTurnAllOn,
  onTurnAllOff,
  deviceCount,
  onlineCount
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Home className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Smart Home</h1>
              <p className="text-blue-100 text-sm">
                {onlineCount} of {deviceCount} devices online
              </p>
            </div>
          </div>

          {/* Voice Control Button */}
          {isVoiceSupported && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={isListening ? onStopListening : onStartListening}
              className={`p-3 rounded-full transition-colors ${
                isListening 
                  ? 'bg-red-500 animate-pulse' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {isListening ? (
                <MicOff className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </motion.button>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex space-x-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onTurnAllOn}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <Power className="h-5 w-5" />
            <span>Turn All On</span>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onTurnAllOff}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <Power className="h-5 w-5" />
            <span>Turn All Off</span>
          </motion.button>
        </div>
      </div>

      {/* Voice Status */}
      {isListening && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pb-4"
        >
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Listening...</span>
            </div>
            <p className="text-xs text-blue-100">
              Say "Turn on [device]", "Turn off [device]", "Turn all on", or "Turn all off"
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MobileHeader;