import React from "react";

interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ value, onChange }) => {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
        value ? "bg-green-500" : "bg-gray-700"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
          value ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default Toggle;
