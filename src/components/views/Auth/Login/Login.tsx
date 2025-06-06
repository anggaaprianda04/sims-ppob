import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import React from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import useLogin from "./useLogin";
import { Controller } from "react-hook-form";

const Login = () => {
  const {
    control,
    errors,
    handleLogin,
    handleSubmit,
    isPendingLogin,
    isVisible,
    toggleVisibility,
  } = useLogin();

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="p-8">
          <h1 className="font-bold text-2xl mb-2 leading-snug">
            Masuk atau buat akun <br /> untuk memulai
          </h1>
        </div>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              name="email"
              type="email"
              placeholder="Masukan email anda"
              icon={<MdOutlineAlternateEmail />}
              isInvalid={errors.email !== undefined}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              name="password"
              type="password"
              placeholder="Masukan password anda"
              icon={<TbLockPassword />}
              isVisible={isVisible}
              toggleVisibility={toggleVisibility}
              isInvalid={errors.password !== undefined}
              errorMessage={errors.password?.message}
            />
          )}
        />
        <Button type="submit">{isPendingLogin ? "Loading" : "Masuk"}</Button>
      </form>

      <p className="text-xs mt-5 text-gray-600">
        Belum punya akun? registrasi{" "}
        <Link href="/auth/register">
          <span className="text-red-500 font-semibold">di sini</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
