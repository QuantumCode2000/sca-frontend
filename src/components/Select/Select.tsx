import { useState, useRef, useEffect } from "react";

const Select = ({
  id,
  label,
  options,
  value,
  onChange,
  disabled = false,
  errorMessage = "",
  helperText = "",
  isMulti = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOptions, setSelectedOptions] = useState(
    isMulti ? (Array.isArray(value) ? value : []) : value || "",
  );
  const selectRef = useRef();

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, options]);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option) => {
    if (isMulti) {
      const newValue = selectedOptions.includes(option)
        ? selectedOptions.filter((opt) => opt !== option)
        : [...selectedOptions, option];
      setSelectedOptions(newValue);
      onChange({ target: { id, value: newValue } });
    } else {
      setSelectedOptions(option);
      onChange({ target: { id, value: option } });
      setIsOpen(false);
    }
  };

  const handleRemoveOption = (option) => {
    const newValue = selectedOptions.filter((opt) => opt !== option);
    setSelectedOptions(newValue);
    onChange({ target: { id, value: newValue } });
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayValue =
    isMulti && Array.isArray(selectedOptions)
      ? selectedOptions.join(", ")
      : selectedOptions;

  return (
    <div className="mb-4 relative" ref={selectRef}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <div
        className={`bg-gray-50 border ${
          errorMessage ? "border-red-500" : "border-gray-300"
        } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer`}
        onClick={toggleDropdown}
      >
        {isMulti && selectedOptions.length > 0 ? (
          <div className="flex flex-wrap">
            {selectedOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center m-1 p-1 bg-gray-200 rounded"
              >
                <span className="mr-2">{option}</span>
                <button
                  className="text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveOption(option);
                  }}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        ) : (
          displayValue || "Selecciona una opción"
        )}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border mt-1 rounded shadow-lg">
          <input
            type="text"
            className="w-full p-2 border-b"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className={`p-2 hover:bg-gray-200 cursor-pointer ${
                    isMulti && selectedOptions.includes(option)
                      ? "bg-gray-100"
                      : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No se encontraron opciones</li>
            )}
          </ul>
        </div>
      )}
      {helperText && (
        <p id={`${id}-helper-text`} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
      {errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Select;
