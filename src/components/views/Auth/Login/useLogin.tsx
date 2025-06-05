import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { ILogin } from "@/types/Auth";

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
      email: payload.email,
      password: payload.password,
      redirect: false,
      callbackUrl,
    });

    console.log("SignIn Result:", result);

    if (result?.error) {
      console.error("Login failed:", result.error);
      throw new Error("Login failed");
    }

    console.log("Login success:", result);

    return result;
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess() {
      reset();
      router.push(callbackUrl);
    },
  });

  const handleLogin = (data: ILogin) => {
    console.log("x", data);
    mutateLogin(data);
  };

  console.log("Validation errors:", errors);

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
