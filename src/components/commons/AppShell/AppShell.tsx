import Toast from "@/components/ui/Toast";
import { hideToast } from "@/features/toaster/toastSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Poppins } from "next/font/google";
import React, { ReactNode, useEffect } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"], // bisa disesuaikan
  variable: "--font-poppins", // opsional untuk CSS variable
});

interface PropTypes {
  children: ReactNode;
}

const AppShell = (props: PropTypes) => {
  const dispatch = useAppDispatch();
  const { show, message, type } = useAppSelector((state) => state.toast);
  const { children } = props;

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => dispatch(hideToast()), 3000);
      return () => clearTimeout(timer);
    }
  }, [show, dispatch]);

  return (
    <>
      <main className={poppins.className}>{children}</main>
      <Toast show={show} type={type} message={message} />
    </>
  );
};

export default AppShell;
