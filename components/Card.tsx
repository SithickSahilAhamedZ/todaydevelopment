import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl shadow-md p-4 transition-all duration-300 ${className} ${onClick ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02]' : ''}`}
    >
      {children}
    </div>
  );
};

export default Card;