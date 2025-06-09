import Link from "next/link";
import React from "react";
import useRegister from "./useRegister";
import { Controller } from "react-hook-form";
import Input from "@/components/ui/Input";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import Button from "@/components/ui/Button";

const Register = () => {
  const {
    control,
    errors,
    isPendingRegister,
    handleRegister,
    handleSubmit,
    visiblePassword,
    handleVisiblePassword,
  } = useRegister();

  return (
    <>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="p-8">
          <h1 className="font-bold text-2xl mb-2 leading-snug">
            Lengkapi data untuk <br /> membuat akun
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
          name="first_name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              name="first_name"
              type="text"
              placeholder="Masukan nama depan"
              icon={<CiUser />}
              isInvalid={errors.first_name !== undefined}
              errorMessage={errors.first_name?.message}
            />
          )}
        />
        <Controller
          name="last_name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              name="last_name"
              type="text"
              placeholder="Masukan nama belakang"
              icon={<CiUser />}
              isInvalid={errors.last_name !== undefined}
              errorMessage={errors.last_name?.message}
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
              isVisible={visiblePassword.password}
              toggleVisibility={() => handleVisiblePassword("password")}
              isInvalid={errors.password !== undefined}
              errorMessage={errors.password?.message}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              name="confirmPassword"
              type="password"
              placeholder="Masukan password anda"
              icon={<TbLockPassword />}
              isVisible={visiblePassword.confirmPassword}
              toggleVisibility={() => handleVisiblePassword("confirmPassword")}
              isInvalid={errors.confirmPassword !== undefined}
              errorMessage={errors.confirmPassword?.message}
            />
          )}
        />
        <Button disabled={isPendingRegister} type="submit">
          {isPendingRegister ? "Loading" : "Registrasi"}
        </Button>
      </form>
      {/* <Button title="Registrasi" /> */}
      <p className="text-xs mt-5 text-gray-600">
        Sudah punya akun? login{" "}
        <Link href="/auth/login">
          <span className="text-red-500 font-semibold">di sini</span>
        </Link>
      </p>
    </>
  );
};

export default Register;
