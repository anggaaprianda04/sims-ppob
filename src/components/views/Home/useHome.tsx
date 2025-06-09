import { setBalance } from "@/features/balance/balanceSlice";
import informationServices from "@/services/information.service";
import transactionServices from "@/services/transaction.service";
import { useAppDispatch } from "@/store/store";
import { IUser } from "@/types/Auth";
import { IBanner, IInformation } from "@/types/Information";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useHome = () => {
  const [showBalance, setShowBalance] = useState(false);
  const { data } = useSession();
  const user = data?.user as IUser;
  const dispatch = useAppDispatch();

  const toggleVisibility = () => {
    setShowBalance(!showBalance);
  };

  const balanceService = async () => {
    const result = await transactionServices.balance(user?.accessToken);
    const { data } = result;
    return data.data.balance;
  };

  const informationService = async () => {
    const result = await informationServices.service(user?.accessToken);
    const { data } = result;
    return data.data;
  };

  const bannerService = async () => {
    const result = await informationServices.banner();
    const { data } = result;
    return data.data;
  };

  const { isLoading: isLoadingBalance, data: dataBalance } = useQuery({
    queryKey: ["balance"],
    queryFn: () => balanceService(),
    enabled: !!user?.accessToken,
  });

  const {
    isLoading: isLoadingService,
    data: dataService,
    isSuccess: isSuccessBalance,
  } = useQuery<IInformation[]>({
    queryKey: ["service"],
    queryFn: () => informationService(),
  });

  const { isLoading: isLoadingBanner, data: dataBanner } = useQuery<IBanner[]>({
    queryKey: ["banner"],
    queryFn: () => bannerService(),
  });

  useEffect(() => {
    if (isSuccessBalance && dataBalance) {
      dispatch(setBalance(dataBalance));
    }
  }, [isSuccessBalance, dataBalance, dispatch]);

  return {
    toggleVisibility,
    showBalance,
    isLoadingBalance,
    isLoadingService,
    isLoadingBanner,
    dataService,
    dataBanner,
  };
};

export default useHome;
