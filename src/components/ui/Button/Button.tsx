import { ReactNode } from "react";

interface Proptypes {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  isBorder?: boolean;
}

const Button = (props: Proptypes) => {
  const {
    type = "button",
    children,
    disabled = false,
    onClick,
    isBorder = false,
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
  w-full py-3 text-sm font-semibold rounded-md transition-all
  ${
    disabled
      ? "bg-gray-400 text-white cursor-not-allowed"
      : isBorder
      ? "border-2 mb-4 border-red-500 bg-white text-red-500"
      : "bg-red-500 mb-0 text-white hover:bg-red-700"
  }
`}>
      {children}
    </button>
  );
};

export default Button;
