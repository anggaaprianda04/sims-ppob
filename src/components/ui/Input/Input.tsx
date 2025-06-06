import React, { ReactNode } from "react";

interface Proptypes {
  type: "text" | "email" | "password" | "number";
  placeholder: string;
  name: string;
  icon?: ReactNode;
  isVisible?: boolean;
  toggleVisibility?: () => void;
  isInvalid?: boolean;
  errorMessage?: string;
  value?: string | number;
  onChange?: () => void;
}

const Input = (props: Proptypes) => {
  const {
    type = "text",
    placeholder,
    name,
    icon,
    isVisible,
    toggleVisibility,
    isInvalid = false,
    errorMessage = "",
    value = "",
    onChange,
  } = props;

  const isPassword = type === "password";
  const inputType = isPassword && isVisible ? "text" : type;

  return (
    <>
      <div
        className={`flex items-center border ${
          errorMessage ? "mb-2" : "mb-4"
        } rounded-md px-3 py-2 w-full bg-white ${
          isInvalid ? "border-red-500" : "border-gray-300"
        }`}>
        <span className="text-gray-400 mr-2">{icon}</span>
        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`flex-grow text-sm outline-none text-gray-700 placeholder-gray-400`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="ml-2 text-gray-500 focus:outline-none"
            aria-label={isVisible ? "Hide password" : "Show password"}>
            {isVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.96 9.96 0 012.507-4.344m1.75-1.75A9.959 9.959 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.068 10.068 0 01-4.756 5.769M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l18 18"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      {isInvalid && errorMessage && (
        <p className="text-red-500 mb-2 text-left text-xs mt-1">
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default Input;
