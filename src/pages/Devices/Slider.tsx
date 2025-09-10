import React from "react";

interface SliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  step?: number;
  label?: string;
}

const Slider: React.FC<SliderProps> = ({ value, min, max, onChange, step = 1, label }) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-sm text-gray-300">
          {label}: <span className="font-mono">{value}</span>
        </label>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
    </div>
  );
};

export default Slider;
