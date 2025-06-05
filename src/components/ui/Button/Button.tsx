import { ReactNode } from "react";

interface Proptypes {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
}

const Button = (props: Proptypes) => {
  const { type = "button", children } = props;
  return (
    <button
      type={type}
      className="w-full bg-red-500 py-3 rounded-md text-sm transition-all text-white hover:bg-red-700 hover:duration-200">
      {children}
    </button>
  );
};

export default Button;
