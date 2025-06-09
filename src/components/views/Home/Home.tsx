import MainLayout from "@/components/layouts/MainLayout";
import UseHome from "./useHome";
import CardService from "@/components/commons/CardService";
import { IBanner, IInformation } from "@/types/Information";
import CardBanner from "@/components/commons/CardBanner";
import { useAppDispatch, useAppSelector } from "@/store/store";
import CardHeader from "@/components/commons/CardHeader/CardHeader";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { setSelectedService } from "@/features/service/serviceSlice";

const Home = () => {
  const { dataService, dataBanner } = UseHome();
  const balance = useAppSelector((state) => state.balance.value);
  const dispatch = useAppDispatch();

  const handleClick = (item: IInformation) => {
    dispatch(
      setSelectedService({
        service_code: item.service_code,
        service_name: item.service_name,
        service_icon: item.service_icon,
        service_tariff: item.service_tariff,
      })
    );
  };

  return (
    <MainLayout>
      <button onClick={() => signOut()}>keluar</button>
      <CardHeader valueBalance={balance as unknown as number} />
      <div className="container mx-auto mt-6 max-w-screen-2xl flex flex-wrap">
        {dataService?.map((item: IInformation) => (
          <Link
            key={item.service_code}
            onClick={() => handleClick(item)}
            href={`/transaction/${item.service_code}`}>
            <CardService icon={item.service_icon} title={item.service_name} />
          </Link>
        ))}
      </div>
      <div className="container mx-auto relative z-10 mt-8">
        <p className="mb-4 font-semibold">Temukan promo menarik</p>
        <div className="flex overflow-x-auto whitespace-nowrap pr-4 gap-8 scrollbar-hide">
          {dataBanner?.map((item: IBanner, index: number) => (
            <div key={index} className="min-w-[250px]">
              <CardBanner key={index} imgBanner={item.banner_image} />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
