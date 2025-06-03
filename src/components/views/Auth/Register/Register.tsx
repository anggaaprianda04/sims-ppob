import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import React from "react";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";

const Register = () => {
  return (
    <>
      <form>
        <div className="p-8">
          <h1 className="font-bold text-2xl mb-2 leading-snug">
            Lengkapi data untuk <br /> membuat akun
          </h1>
        </div>
        <Input
          type="email"
          placeholder="Masukan email anda"
          icon={<MdOutlineAlternateEmail />}
        />
        <Input type="text" placeholder="Nama Depan" icon={<IoPersonSharp />} />
        <Input
          type="text"
          placeholder="Nama Belakang"
          icon={<IoPersonSharp />}
        />
        <Input
          type="password"
          placeholder="Masukan password anda"
          icon={<TbLockPassword />}
        />
        <Input
          type="password"
          placeholder="Konfirmasi password"
          icon={<TbLockPassword />}
        />
      </form>
      <Button title="Registrasi" />
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
