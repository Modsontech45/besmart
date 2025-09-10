import React from "react";

interface GaugeProps {
  value: number;
  unit?: string;
  max?: number;
  label?: string;
}

const Gauge: React.FC<GaugeProps> = ({ value, unit = "", max = 100, label }) => {
  const percentage = Math.min(100, (value / max) * 100);

  // Dynamic color
  const getColor = () => {
    if (percentage < 40) return "bg-green-500";
    if (percentage < 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="w-full">
      {label && <div className="text-sm text-gray-300 mb-1">{label}</div>}
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>
          {value}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-3 transition-all duration-300 ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Gauge;
