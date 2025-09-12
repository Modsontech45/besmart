import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/apiService';
import toast from 'react-hot-toast';

interface VoiceControlHook {
  isListening: boolean;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  transcript: string;
}

export const useVoiceControl = (devices: any[], onDeviceUpdate: (devices: any[]) => void): VoiceControlHook => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase();
        setTranscript(command);
        processVoiceCommand(command);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast.error('Voice recognition error');
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const processVoiceCommand = useCallback(async (command: string) => {
    try {
      if (command.includes('turn on all') || command.includes('all on')) {
        await handleTurnAllOn();
        toast.success('Turning on all devices');
      } else if (command.includes('turn off all') || command.includes('all off')) {
        await handleTurnAllOff();
        toast.success('Turning off all devices');
      } else if (command.includes('turn on')) {
        const deviceName = extractDeviceName(command, 'turn on');
        if (deviceName) {
          await handleDeviceCommand(deviceName, true);
        }
      } else if (command.includes('turn off')) {
        const deviceName = extractDeviceName(command, 'turn off');
        if (deviceName) {
          await handleDeviceCommand(deviceName, false);
        }
      } else {
        toast.error('Command not recognized');
      }
    } catch (error) {
      toast.error('Failed to execute voice command');
    }
  }, [devices]);

  const extractDeviceName = (command: string, action: string): string | null => {
    const parts = command.split(action);
    if (parts.length > 1) {
      const deviceName = parts[1].trim();
      const matchedDevice = devices.find(device => 
        device.device_name.toLowerCase().includes(deviceName) ||
        deviceName.includes(device.device_name.toLowerCase())
      );
      return matchedDevice ? matchedDevice.device_name : null;
    }
    return null;
  };

  const handleDeviceCommand = async (deviceName: string, turnOn: boolean) => {
    const device = devices.find(d => d.device_name.toLowerCase().includes(deviceName.toLowerCase()));
    if (device) {
      const updatedMetadata = { ...device.metadata, state: turnOn };
      await apiService.updateDevice(device.device_uid, { metadata: updatedMetadata });
      
      const updatedDevices = devices.map(d =>
        d.id === device.id ? { ...d, metadata: updatedMetadata } : d
      );
      onDeviceUpdate(updatedDevices);
      toast.success(`${turnOn ? 'Turned on' : 'Turned off'} ${device.device_name}`);
    } else {
      toast.error(`Device "${deviceName}" not found`);
    }
  };

  const handleTurnAllOn = async () => {
    const updatedDevices = await Promise.all(
      devices.map(async (device) => {
        if (device.device_type === 'switch' || device.device_type === 'light') {
          const updatedMetadata = { ...device.metadata, state: true };
          await apiService.updateDevice(device.device_uid, { metadata: updatedMetadata });
          return { ...device, metadata: updatedMetadata };
        }
        return device;
      })
    );
    onDeviceUpdate(updatedDevices);
  };

  const handleTurnAllOff = async () => {
    const updatedDevices = await Promise.all(
      devices.map(async (device) => {
        if (device.device_type === 'switch' || device.device_type === 'light') {
          const updatedMetadata = { ...device.metadata, state: false };
          await apiService.updateDevice(device.device_uid, { metadata: updatedMetadata });
          return { ...device, metadata: updatedMetadata };
        }
        return device;
      })
    );
    onDeviceUpdate(updatedDevices);
  };

  const startListening = () => {
    if (recognition && isSupported) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isSupported) {
      recognition.stop();
    }
  };

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
    transcript
  };
};