import React from "react";

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  errorMessage?: string;
  helperText?: string;
  [x: string]: any;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  errorMessage = "",
  helperText = "",
  ...props
}) => {
  const hasError = !!errorMessage;

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        aria-describedby={`${id}-helper-text`}
        className={`bg-gray-50 border ${
          hasError ? "border-red-500" : "border-gray-300"
        } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {helperText && (
        <p id={`${id}-helper-text`} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
      {hasError && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default Input;
