const Button = ({
  onClick,
  text,
  type = "button",
  size = "md",
  color = "blue",
  variant = "solid",
  className = "",
}) => {
  // Define base styles for button sizes
  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2.5 px-5 text-base",
    lg: "py-3 px-6 text-lg",
  };

  // Define color schemes
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
    // Add more color schemes as needed
  };

  // Get the correct class names based on size and color/variant
  const selectedSizeClasses = sizeClasses[size] || sizeClasses.md;
  const selectedColorClasses =
    (colorClasses[color] && colorClasses[color][variant]) ||
    colorClasses.blue.solid;

  return (
    <button
      type={type}
      className={`${selectedSizeClasses} ${selectedColorClasses} rounded-lg border focus:outline-none focus:z-10 focus:ring-4 transition duration-300 ease-in-out ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
