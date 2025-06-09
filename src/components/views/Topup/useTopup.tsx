import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ITopup } from "@/types/Transaction";
import transactionServices from "@/services/transaction.service";
import { useSession } from "next-auth/react";
import { IUser } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { openModal } from "@/features/modal/modalSlice";
import { AxiosError } from "axios";

const topupSchema = yup.object().shape({
  top_up_amount: yup
    .number()
    .required("Please input topup")
    .min(10000, "Minimal top up adalah Rp10.000")
    .max(1000000, "Maksimal top up Rp1.000.000"),
});

const useTopup = () => {
  const { data } = useSession();
  const user = data?.user as IUser;
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(topupSchema),
    defaultValues: {
      top_up_amount: undefined,
    },
  });

  const topupService = async (payload: ITopup) => {
    const result = await transactionServices.topup(user.accessToken, payload);
    return result;
  };

  const {
    mutate: mutateTopup,
    isPending: isPendingTopup,
    isSuccess: isSuccessTopup,
  } = useMutation({
    mutationFn: topupService,
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
      reset();
      dispatch(
        openModal({
          type: "success",
          title: "Top Up Berhasil",
          message: data.data.message,
          amount: JSON.parse(data.config.data).top_up_amount,
          redirectHome: true,
        })
      );
    },
  });

  const handleTopup = (data: ITopup) => {
    mutateTopup(data);
  };

  const handleNominalClick = (amount: number) => {
    setValue("top_up_amount", amount, { shouldValidate: true });
  };

  return {
    mutateTopup,
    isPendingTopup,
    isSuccessTopup,
    control,
    handleSubmit,
    errors,
    handleTopup,
    watch,
    handleNominalClick,
  };
};

export default useTopup;
