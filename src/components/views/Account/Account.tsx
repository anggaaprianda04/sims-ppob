import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { IUser } from "@/types/Auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { CiUser } from "react-icons/ci";
import { MdOutlineAlternateEmail } from "react-icons/md";

const Account = () => {
  const { data } = useSession();
  const user = data?.user as IUser;

  return (
    <>
      <div className="container mx-auto mt-6 max-w-screen-md">
        <div className="flex flex-col items-center justify-center">
          <Image
            alt="icon"
            width={140}
            height={140}
            src={user?.profile_image}
          />
          <p className="font-semibold text-xl mt-6">{user?.first_name}</p>
          <form className="w-full mt-6">
            <Input
              label="Email"
              name="email"
              type="email"
              value={user?.email}
              placeholder="Masukan emaik anda"
              icon={<MdOutlineAlternateEmail />}
            />
            <Input
              label="Nama Depan"
              name="first_name"
              type="text"
              value={user?.first_name}
              placeholder="Masukan nama depan anda"
              icon={<CiUser />}
            />
            <Input
              label="Nama Belakang"
              name="last_name"
              type="text"
              value={user?.last_name}
              placeholder="Masukan nama belakang anda"
              icon={<CiUser />}
            />
          </form>
          <Button onClick={() => signOut()}>Logout</Button>
          {/* <button onClick={() => signOut()}>keluar</button> */}
        </div>
      </div>
    </>
  );
};

export default Account;
