import CurrencyFormatter from "@/components/ui/CurrencyFormatter";
import UseHome from "@/components/views/Home/useHome";
import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Proptypes {
  valueBalance: number;
}

const CardHeader = (props: Proptypes) => {
  const user = useSelector((state: RootState) => state.user.data);
  const { valueBalance } = props;
  const { showBalance, toggleVisibility, isLoadingBalance } = UseHome();

  console.log(user?.profile_image);

  return (
    <div className="container mx-auto py-3 flex justify-between items-center">
      <div className="flex w-full gap-6 mt-4 justify-between">
        <div className="flex flex-col gap-3 w-1/4">
          <Image
            alt="profile"
            width={70}
            height={70}
            src={
              user?.profile_image && !user.profile_image.includes("null")
                ? user.profile_image
                : "/images/profile_photo.png"
            }
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
