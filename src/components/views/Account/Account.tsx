import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { CiUser } from "react-icons/ci";
import { MdOutlineAlternateEmail } from "react-icons/md";
import useAccount from "./useAccount";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { clearUser } from "@/features/user/userSlice";

const Account = () => {
  const [isEditProfile, setEditProfile] = useState(false);
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch();

  const {
    control,
    errors,
    handleSubmit,
    handleProfile,
    isPendingUpdateProfile,
    isSuccessUpdateProfile,
  } = useAccount();

  useEffect(() => {
    if (isSuccessUpdateProfile) {
      setEditProfile(false);
    }
  }, [isSuccessUpdateProfile]);

  return (
    <div className="container mx-auto mt-6 max-w-screen-md">
      <div className="flex flex-col items-center justify-center">
        <Image
          alt="icon"
          width={140}
          height={140}
          src={
            user?.profile_image && !user.profile_image.includes("null")
              ? user.profile_image
              : "/images/profile_photo.png"
          }
        />
        <p className="font-semibold text-xl mt-6">{user?.first_name}</p>
        <form className="w-full mt-6" onSubmit={handleSubmit(handleProfile)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Email"
                readonly
                name="email"
                type="email"
                placeholder="Masukan emaik anda"
                icon={<MdOutlineAlternateEmail />}
                isInvalid={errors.first_name !== undefined}
                errorMessage={errors.first_name?.message}
              />
            )}
          />

          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                readonly={!isEditProfile}
                label="Nama Depan"
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
                readonly={!isEditProfile}
                label="Nama Belakang"
                name="last_name"
                type="text"
                placeholder="Masukan nama belakang anda"
                icon={<CiUser />}
                isInvalid={errors.last_name !== undefined}
                errorMessage={errors.last_name?.message}
              />
            )}
          />
          {!isEditProfile && (
            <Button
              isBorder
              type="button"
              onClick={() => setEditProfile(!isEditProfile)}>
              Edit Profile
            </Button>
          )}

          {isEditProfile ? (
            <Button type="submit" disabled={isPendingUpdateProfile}>
              {isPendingUpdateProfile ? "Loading" : "Simpan"}
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch(clearUser());
                signOut();
              }}>
              Logout
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Account;
