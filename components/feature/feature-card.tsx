import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="group p-6 rounded-2xl  border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.02] cursor-default">
      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-muted  mb-4">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
