import React from 'react';
import pillbtnStyles from "./pillbtn.module.css";

interface PillButtonProps {
  text: string;
  onClick: () => void;
}

const PillButton: React.FC<PillButtonProps> = ({ text, onClick }) => {
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

export default PillButton;
