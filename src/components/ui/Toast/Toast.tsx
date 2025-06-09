import { useEffect, useState } from "react";

interface PropTypes {
  type: "success" | "error" | "warning" | null;
  message: string | null;
  show: boolean;
}

const Toast = ({ type, message, show }: PropTypes) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show && type && message) {
      setVisible(true);
      const fadeOut = setTimeout(() => setVisible(false), 2500);
      return () => clearTimeout(fadeOut);
    }
  }, [show, type, message]);

  if (!type || !message) return null;

  const bgColor =
    type === "success"
      ? "border-green-500 text-green-500"
      : type === "error"
      ? "border-red-500 text-red-500"
      : "border-yellow-500 text-yellow-500";

  return (
    <div
      className={`fixed top-5 w-auto font-semibold bg-white rounded-md right-5 px-6 py-2 border-2 shadow-md z-50 transition-all duration-500 ease-in-out transform ${
        visible
          ? "opacity-100  translate-y-0"
          : "opacity-0 -translate-y-2 pointer-events-none"
      } ${bgColor}`}>
      {message}
    </div>
  );
};

export default Toast;
