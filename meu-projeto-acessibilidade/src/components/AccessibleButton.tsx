import React from "react";

interface AccessibleButtonProps {
  label: string;
  onClick: () => void;
}

const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  label,
  onClick,
}) => {
  return (
    <button className="acessible-button" onClick={onClick} aria-label={label}>
      {label}
    </button>
  );
};

export default AccessibleButton;
