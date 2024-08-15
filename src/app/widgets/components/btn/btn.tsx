import React from 'react';
import btnStyles from "./btn.module.css"

interface ButtonProps {
  icon: string;
  text: string;
  variant: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({icon, text, variant, onClick }) => {
  // Determine the color based on the text value
  const getButtonColor = (variant: string) => {
    switch (variant) {
      case 'primary':
        return '#124E66';
      case 'secondary':
        return '#ffffff';
      default:
        return '#124E66';
    }
  };
  const getTextColor = (text: string) => {
    switch (text) {
      case 'primary':
        return '#d6d9d4';
      case 'secondary':
        return '#212A31';
      default:
        return '#d6d9d4';
    }
  };

  return (
    <button 
      style={{ 
        backgroundColor: getButtonColor(variant),
      color: getTextColor(variant)}}
      className={btnStyles.btn}
      onClick={onClick}
    >
      <i className={icon}></i>
      {text}
    </button>
  );
};

export default Button;
