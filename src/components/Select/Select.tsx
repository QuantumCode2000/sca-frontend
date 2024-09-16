import React, { useState, useRef, useEffect } from "react";

// Definimos los tipos de las props para mayor claridad y seguridad de tipos
interface SelectProps {
  id: string;
  label?: string;
  options: string[];
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  disabled?: boolean;
  error?: boolean | string;
  helperText?: string;
  [key: string]: any;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  disabled = false,
  error = false,
  helperText = "",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const selectRef = useRef<HTMLDivElement>(null);

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

  const handleSelect = (option: string) => {
    onChange({
      target: { id, value: option },
    } as React.ChangeEvent<HTMLInputElement>);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hasError = !!error; // Convierte cualquier valor truthy en un booleano

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
          hasError ? "border-red-500" : "border-gray-300"
        } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer`}
        onClick={toggleDropdown}
      >
        {value || "Selecciona una opción"}
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
                  className="p-2 hover:bg-gray-200 cursor-pointer"
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
      {hasError && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
