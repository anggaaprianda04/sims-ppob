import Toast from "@/components/ui/Toast";
import { hideToast } from "@/features/toaster/toastSlice";
import { setUser } from "@/features/user/userSlice";
import membershipServices from "@/services/membership.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { IUser } from "@/types/Auth";
import { useSession } from "next-auth/react";
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
  const { data } = useSession();
  const user = data?.user as IUser;

  useEffect(() => {
    const syncUser = async () => {
      if (user?.accessToken) {
        const res = await membershipServices.getProfile(user?.accessToken);
        dispatch(setUser(res.data.data));
      }
    };
    syncUser();
  }, [user?.accessToken, dispatch]);

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
