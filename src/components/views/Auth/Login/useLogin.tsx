import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { ILogin } from "@/types/Auth";
import { useDispatch } from "react-redux";
import { showToast } from "@/features/toaster/toastSlice";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please input a valid email")
    .required("Please input email"),
  password: yup.string().required("Please input your password"),
});

const useLogin = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const dispatch = useDispatch();

  const callbackUrl: string = (router.query.callbackUrl as string) || "/";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      console.error("Login failed:", result.error);
      throw new Error("Login failed");
    }

    return result;
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError: (error: Error) => {
      console.log(error);
      dispatch(showToast({ message: error.message, type: "error" }));
    },
    onSuccess() {
      reset();
      router.push(callbackUrl);
      dispatch(showToast({ message: "Success Login", type: "success" }));
    },
  });

  const handleLogin = (data: ILogin) => {
    mutateLogin(data);
  };

  return {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
