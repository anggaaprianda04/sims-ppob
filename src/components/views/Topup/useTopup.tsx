import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ITopup } from "@/types/Transaction";
import transactionServices from "@/services/transaction.service";
import { useSession } from "next-auth/react";
import { IUser } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import {
  closeTopupModal,
  openSuccessTopupModal,
  setSuccessTopupAmount,
} from "@/features/modal/modalSlice";
import { useAppDispatch } from "@/store/store";

const loginSchema = yup.object().shape({
  top_up_amount: yup
    .number()
    .required("Please input topup")
    .min(10000, "Minimal top up adalah Rp10.000")
    .max(1000000, "Maksimal top up Rp1.000.000"),
});

const UseTopup = () => {
  const { data } = useSession();
  const user = data?.user as IUser;
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const topupService = async (payload: ITopup) => {
    const result = await transactionServices.topup(user.accessToken, payload);
    const { data } = result;
    console.log("dad top", data);
    return data.data.balance;
  };

  const {
    mutate: mutateTopup,
    isPending: isPendingTopup,
    isSuccess: isSuccessTopup,
  } = useMutation({
    mutationFn: topupService,
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess(_, variables) {
      dispatch(setSuccessTopupAmount(Number(variables.top_up_amount))); // ✅ simpan sebelum reset
      reset(); // form dikosongkan
      dispatch(closeTopupModal());
      dispatch(openSuccessTopupModal());
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

export default UseTopup;
