import { openModal } from "@/features/modal/modalSlice";
import transactionServices from "@/services/transaction.service";
import { IUser } from "@/types/Auth";
import { ITransaction } from "@/types/Transaction";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";

const useTransaction = () => {
  const { data } = useSession();
  const user = data?.user as IUser;
  const dispatch = useDispatch();

  const transactionService = async (payload: ITransaction) => {
    const result = await transactionServices.transaction(
      user.accessToken,
      payload
    );
    return result;
  };

  const {
    mutate: mutateTransaction,
    isPending: isPendingTransaction,
    isSuccess: isSuccessTransaction,
  } = useMutation({
    mutationFn: transactionService,
    onError: (error: AxiosError) => {
      dispatch(
        openModal({
          type: "error",
          title: "Top Up Gagal",
          message: (error.response?.data as { message: string })?.message,
          amount: JSON.parse(error.response?.config.data).top_up_amount,
          redirectHome: true,
        })
      );
    },
    onSuccess: (data) => {
      dispatch(
        openModal({
          type: "success",
          title: `Pembayaran ${data.data.data.service_name} sebesar`,
          message: "Berhasil",
          amount: data.data.data.total_amount,
          redirectHome: true,
        })
      );
    },
  });

  const handleTransaction = (data: ITransaction) => {
    mutateTransaction(data);
  };

  return {
    handleTransaction,
    isPendingTransaction,
    isSuccessTransaction,
  };
};

export default useTransaction;
