import { Link } from "react-router-dom";
import { useState } from "react";

const OptionSidebar = ({
  text,
  icon,
  to,
  isSelected,
  options,
  selectedTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {icon ? (
        <li className="my-px py-1">
          <Link
            to={to}
            className={
              isSelected
                ? "flex flex-row items-center h-10 px-3 py-3 rounded-lg bg-gray-100 text-gray-700"
                : "flex flex-row items-center h-10 px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:bg-opacity-10"
            }
          >
            <span className="flex items-center justify-center text-lg text-gray-400">
              <figure className="flex items-center justify-center text-lg text-gray-400">
                {icon}
              </figure>
            </span>
            <span className="ml-3">{text}</span>
          </Link>
        </li>
      ) : (
        <>
          <li className="my-px border-b border-gray-300">
            <span
              className="flex font-medium text-sm text-gray-300 px-4 my-4 uppercase cursor-pointer"
              onClick={toggleOptions}
            >
              {text}
            </span>
          </li>
          {isOpen && options && (
            <ul className="pl-4">
              {options.map((option, index) => (
                <OptionSidebar
                  key={index}
                  text={option.text}
                  icon={option.icon}
                  to={option.to}
                  isSelected={selectedTitle === option.text}
                  selectedTitle={selectedTitle} // Pass selectedTitle
                />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default OptionSidebar;
