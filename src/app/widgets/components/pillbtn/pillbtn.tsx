import React from 'react';
import pillbtnStyles from "./pillbtn.module.css"

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  // Determine the color based on the text value
  const getTextColor = (text: string) => {
    switch (text) {
      case 'Good':
        return '#28A745';
      case 'Bad':
        return '#B22222';
      case 'Repair':
        return '#FFA500';
      default:
        return '#212a31';
    }
  };

  return (
    <button 
      style={{ color: getTextColor(text) }}
      className={pillbtnStyles.btn}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
