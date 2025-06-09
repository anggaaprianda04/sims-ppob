import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { IRegister } from "@/types/Auth";
import membershipServices from "@/services/membership.service";
import { useDispatch } from "react-redux";
import { showToast } from "@/features/toaster/toastSlice";
import { AxiosError } from "axios";

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email format not valid")
    .required("Please input email"),
  first_name: yup.string().required("Please input first name"),
  last_name: yup.string().required("Please input last name"),
  password: yup
    .string()
    .min(8, "Minimal 8 Characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("Please input your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Please not match")
    .required("Please input your password confirmation"),
});

const useRegister = () => {
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const result = await membershipServices.register(payload);
    const { data } = result;

    return data.data;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError: (error: AxiosError) => {
      dispatch(showToast({ message: error.message, type: "error" }));
    },
    onSuccess: () => {
      reset();
      router.push("/auth/login");
      dispatch(showToast({ message: "Success Register", type: "success" }));
    },
  });

  const handleRegister = (data: IRegister) => {
    mutateRegister(data);
  };

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;
