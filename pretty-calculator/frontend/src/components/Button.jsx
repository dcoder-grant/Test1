import React from 'react';

const Button = ({ children, onClick, variant = 'digit' }) => {
  const getButtonClass = () => {
    switch (variant) {
      case 'operator': return 'operator-button';
      case 'equals': return 'equals-button';
      case 'clear': return 'clear-button';
      default: return 'digit-button';
    }
  };

  return (
    <button 
      onClick={onClick} 
      className={getButtonClass()}>
      {children}
    </button>
  );
};

export default Button;