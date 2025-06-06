import informationServices from "@/services/information.service";
import transactionServices from "@/services/transaction.service";
import { IUser } from "@/types/Auth";
import { IInformation } from "@/types/Information";
import { IBalance } from "@/types/Transaction";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

const UseHome = () => {
  const [showBalance, setShowBalance] = useState(false);
  const { data } = useSession();
  const user = data?.user as IUser;

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

  const { isLoading: isLoadingBalance, data: dataBalance } = useQuery<IBalance>(
    {
      queryKey: ["balance"],
      queryFn: () => balanceService(),
    }
  );

  const { isLoading: isLoadingService, data: dataService } = useQuery<
    IInformation[]
  >({
    queryKey: ["service"],
    queryFn: () => informationService(),
  });

  return {
    toggleVisibility,
    showBalance,
    isLoadingBalance,
    isLoadingService,
    dataBalance,
    dataService,
  };
};

export default UseHome;
