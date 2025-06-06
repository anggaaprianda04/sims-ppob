import { ReactNode } from "react";

interface Proptypes {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = (props: Proptypes) => {
  const { type = "button", children, disabled = false, onClick } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full ${
        disabled
          ? "bg-gray-400"
          : "bg-red-500 hover:bg-red-700 hover:duration-200"
      }  py-3 font-semibold rounded-md text-sm transition-all text-white `}>
      {children}
    </button>
  );
};

export default Button;
