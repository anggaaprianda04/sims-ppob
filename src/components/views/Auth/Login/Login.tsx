import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import React from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";

const Login = () => {
  return (
    <>
      <form>
        <div className="p-8">
          <h1 className="font-bold text-2xl mb-2 leading-snug">
            Masuk atau buat akun <br /> untuk memulai
          </h1>
        </div>
        <Input
          type="email"
          placeholder="Masukan email anda"
          icon={<MdOutlineAlternateEmail />}
        />
        <Input
          type="password"
          placeholder="Masukan password anda"
          icon={<TbLockPassword />}
        />
      </form>
      <Button title="Masuk" />
      <p className="text-xs mt-5 text-gray-600">
        Belum punya akun? registrasi{" "}
        <Link href="/auth/register">
          <span className="text-red-500 font-semibold">di sini</span>
        </Link>
      </p>
    </>
  );
};

export default Login;
