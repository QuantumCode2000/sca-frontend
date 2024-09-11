import React from "react";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  color?: "blue" | "red";
  variant?: "solid" | "outline" | "text";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  type = "button",
  size = "md",
  color = "blue",
  variant = "solid",
  className = "",
  disabled = false,
}) => {
  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2.5 px-5 text-base",
    lg: "py-3 px-6 text-lg",
  };

  const colorClasses = {
    blue: {
      solid:
        "text-white bg-blue-600 border-blue-600 hover:bg-blue-700 focus:ring-blue-300",
      outline:
        "text-blue-600 border-blue-600 bg-transparent hover:bg-blue-600 hover:text-white focus:ring-blue-300",
      text: "text-blue-600 bg-transparent hover:text-blue-700 focus:ring-blue-300",
    },
    red: {
      solid:
        "text-white bg-red-600 border-red-600 hover:bg-red-700 focus:ring-red-300",
      outline:
        "text-red-600 border-red-600 bg-transparent hover:bg-red-600 hover:text-white focus:ring-red-300",
      text: "text-red-600 bg-transparent hover:text-red-700 focus:ring-red-300",
    },
  };

  const disabledClasses = "opacity-50 cursor-not-allowed";

  const selectedSizeClasses = sizeClasses[size] || sizeClasses.md;
  const selectedColorClasses =
    (colorClasses[color] && colorClasses[color][variant]) ||
    colorClasses.blue.solid;

  return (
    <button
      type={type}
      className={`${selectedSizeClasses} ${selectedColorClasses} ${
        disabled ? disabledClasses : ""
      } rounded-lg border focus:outline-none focus:z-10 focus:ring-4 transition duration-300 ease-in-out ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
