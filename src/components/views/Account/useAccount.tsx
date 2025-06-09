import { showToast } from "@/features/toaster/toastSlice";
import { setUser } from "@/features/user/userSlice";
import membershipServices from "@/services/membership.service";
import { RootState } from "@/store/store";
import { UpdateProfilePayload } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

const profileSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please input a valid email")
    .required("Please input email"),
  first_name: yup.string().required("Please input first name"),
  last_name: yup.string().required("Please input last name"),
});

const useAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const updateService = async (payload: UpdateProfilePayload) => {
    const result = await membershipServices.updateProfile(
      user?.accessToken as string,
      payload
    );
    const { data } = result;
    return data;
  };

  const {
    mutate: mutateUpdateProfile,
    isPending: isPendingUpdateProfile,
    isSuccess: isSuccessUpdateProfile,
  } = useMutation({
    mutationFn: updateService,
    onError: (error: AxiosError) => {
      console.log(error);
      dispatch(showToast({ message: error.message, type: "error" }));
    },
    onSuccess: async () => {
      const updated = await membershipServices.getProfile(
        user?.accessToken as string
      );
      //   console.log(data);
      dispatch(setUser(updated.data.data));
      reset(updated.data.data);
      dispatch(showToast({ message: "Success Update", type: "success" }));
    },
  });

  const handleProfile = (data: UpdateProfilePayload) => {
    mutateUpdateProfile(data);
  };

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }
  }, [user, reset]);

  return {
    handleProfile,
    isPendingUpdateProfile,
    isSuccessUpdateProfile,
    control,
    handleSubmit,
    errors,
  };
};

export default useAccount;
