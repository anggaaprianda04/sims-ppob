import { setBalance } from "@/features/balance/balanceSlice";
import informationServices from "@/services/information.service";
import transactionServices from "@/services/transaction.service";
import { RootState, useAppDispatch } from "@/store/store";
import { IBanner, IInformation } from "@/types/Information";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useHome = () => {
  const [showBalance, setShowBalance] = useState(false);
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useAppDispatch();

  const toggleVisibility = () => {
    setShowBalance(!showBalance);
  };

  const balanceService = async () => {
    const result = await transactionServices.balance(
      user?.accessToken as string
    );
    const { data } = result;
    return data.data.balance;
  };

  const informationService = async () => {
    const result = await informationServices.service(
      user?.accessToken as string
    );
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
