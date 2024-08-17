import React, { useState } from 'react';
import pillbtnStyles from "./pillbtn.module.css";

interface PillButtonProps {
  text: string;
  onClick: () => void;
}

const PillButton: React.FC<PillButtonProps> = ({ text, onClick }) => {
  const [isActive, setIsActive] = useState(false);

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

  const handleButtonClick = () => {
    setIsActive(true);
    onClick();

    // Optionally reset the active state after some time
    setTimeout(() => setIsActive(false), 200);
  };

  return (
    <button
      style={{ color: getTextColor(text) }}
      className={`${pillbtnStyles.btn} ${isActive ? pillbtnStyles.active : ''}`}
      onClick={handleButtonClick}
    >
      {text}
    </button>
  );
};

export default PillButton;
