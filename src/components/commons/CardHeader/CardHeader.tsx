import CurrencyFormatter from "@/components/ui/CurrencyFormatter";
import UseHome from "@/components/views/Home/useHome";
import { IUser } from "@/types/Auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface Proptypes {
  valueBalance: number;
}

const CardHeader = (props: Proptypes) => {
  const { data } = useSession();
  const user = data?.user as IUser;
  const { valueBalance } = props;
  const { showBalance, toggleVisibility, isLoadingBalance } = UseHome();

  return (
    <div className="container mx-auto py-3 flex justify-between items-center">
      <div className="flex w-full gap-6 mt-4 justify-between">
        <div className="flex flex-col gap-3 w-1/4">
          <Image
            alt="profile"
            width={70}
            height={70}
            src={user?.profile_image}
          />
          <p className="text-xl font-medium">Selamat datang,</p>
          <p className="text-2xl font-bold">{user?.first_name}</p>
        </div>
        <div className="bg-red-500 text-white p-7 rounded-lg flex justify-start flex-col shadow-md w-2/3">
          <div className="text-lg font-semibold">Saldo anda</div>
          <div className="flex text-4xl items-center mt-2">
            <span className="mr-2">Rp</span>
            <span className="flex-1">
              {showBalance ? (
                <CurrencyFormatter
                  amount={
                    isLoadingBalance ? 0 : (valueBalance as unknown as number)
                  }
                />
              ) : (
                "********"
              )}
            </span>
          </div>
          <div className="flex mt-4 gap-3">
            <p>{showBalance ? "Tutup Saldo" : "Lihat Saldo"}</p>
            <button onClick={toggleVisibility}>
              {showBalance ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
