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
      const fadeOut = setTimeout(() => setVisible(false), 2500); // fade-out before removal
      return () => clearTimeout(fadeOut);
    }
  }, [show, type, message]);

  if (!type || !message) return null;

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-yellow-500";

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 text-white rounded shadow-md z-50 transition-all duration-500 ease-in-out transform ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2 pointer-events-none"
      } ${bgColor}`}>
      {message}
    </div>
  );
};

export default Toast;
