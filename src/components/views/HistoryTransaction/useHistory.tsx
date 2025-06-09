import transactionServices from "@/services/transaction.service";
import { IUser } from "@/types/Auth";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useHistory = (offset: number, limit: number) => {
  const { data } = useSession();
  const user = data?.user as IUser;

  const getHistories = async () => {
    const params = `offset=${offset}&limit=${limit}`;

    const res = await transactionServices.history(user.accessToken, params);
    const { data } = res;
    return data;
  };

  const {
    data: dataHistory,
    isLoading: isLoadingHistory,
    isRefetching: isRefetchingHistory,
    refetch: refecthHistory,
  } = useQuery({
    queryKey: ["Histories", offset, limit],
    queryFn: () => getHistories(),
    enabled: !!user?.accessToken,
    staleTime: 0,
  });

  return {
    dataHistory,
    isLoadingHistory,
    isRefetchingHistory,
    refecthHistory,
  };
};

export default useHistory;
