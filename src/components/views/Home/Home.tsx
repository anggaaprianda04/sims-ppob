import MainLayout from "@/components/layouts/MainLayout";
import { useSession } from "next-auth/react";
import Image from "next/image";
import UseHome from "./useHome";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IUser } from "@/types/Auth";
import CurrencyFormatter from "@/components/ui/CurrencyFormatter";
import CardService from "@/components/commons/CardService";
import { IInformation } from "@/types/Information";

const Home = () => {
  const { data } = useSession();
  const { showBalance, toggleVisibility, dataBalance, dataService } = UseHome();
  const user = data?.user as IUser;

  return (
    <MainLayout title="SIMS PPOB | Home">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex justify-between items-center">
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
                    amount={dataBalance as unknown as number}
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
      <div className="max-w-screen-2xl mx-auto mt-6 flex flex-wrap">
        {dataService?.map((item: IInformation) => (
          <CardService
            key={item.service_code}
            icon={item.service_icon}
            title={item.service_name}
          />
        ))}
      </div>
    </MainLayout>
  );
};

export default Home;
