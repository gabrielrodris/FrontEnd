

import React, { useState } from "react";

interface AccessibleButtonProps {
  label: string;
  onClick: () => void;
}

// Implementação simples usando apenas aria-pressed para indicar estado de toggle.
const AccessibleButton: React.FC<AccessibleButtonProps> = ({ label, onClick }) => {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    setPressed((prev) => !prev);
    onClick();
  };

  return (
    <button
      className="accessible-button"
      aria-pressed={pressed}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default AccessibleButton;
