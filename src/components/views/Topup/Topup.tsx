import CardHeader from "@/components/commons/CardHeader";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React from "react";
import { Controller } from "react-hook-form";
import { FaMoneyBillAlt } from "react-icons/fa";
import UseTopup from "./useTopup";
import CardTopup from "@/components/commons/CardTopup";
import {
  closeSuccessTopupModal,
  closeTopupModal,
  openTopupModal,
} from "@/features/modal/modalSlice";
import ConfirmTopupModal from "@/components/ui/ConfirmTopupModal";
import SuccessTopupModal from "@/components/ui/SuccessTopupModal";
import { useRouter } from "next/router";

const Topup = () => {
  const balance = useAppSelector((state) => state.balance.value);
  const dispatch = useAppDispatch();
  const { isTopupModalOpen, topupAmount, isSuccessTopupOpen } = useAppSelector(
    (state) => state.modal
  );
  const router = useRouter();

  const {
    control,
    errors,
    handleSubmit,
    handleTopup,
    watch,
    handleNominalClick,
    // isPendingTopup,
    // isSuccessTopup,
  } = UseTopup();

  //   console.log("controle", );

  return (
    <>
      <div className="container mx-auto mt-6 max-w-screen-2xl">
        <CardHeader valueBalance={balance as unknown as number} />
        <div className="mt-4 mb-10">
          <p className="text-lg">Silakan masukan</p>
          <p className="font-semibold text-2xl">Nominal Top Up</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 flex flex-col gap-4">
            <form onSubmit={handleSubmit(handleTopup)}>
              <Controller
                name="top_up_amount"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    name="top_up_amount"
                    type="number"
                    placeholder="Masukan nominal top up"
                    icon={<FaMoneyBillAlt />}
                    isInvalid={errors.top_up_amount !== undefined}
                    errorMessage={errors.top_up_amount?.message}
                  />
                )}
              />
              <Button
                onClick={handleSubmit((data) => {
                  dispatch(openTopupModal(Number(data.top_up_amount))); // simpan ke Redux
                })}
                disabled={
                  !!errors.top_up_amount || watch("top_up_amount") === undefined
                }
                type="button">
                Top Up
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {["10000", "20000", "50000", "100000", "250000", "500000"].map(
              (amount) => (
                <CardTopup
                  onClick={() => handleNominalClick(Number(amount))}
                  key={amount}
                  amount={amount}
                />
              )
            )}
          </div>
        </div>
      </div>
      <ConfirmTopupModal
        isOpen={isTopupModalOpen}
        amount={topupAmount ?? 0}
        onClose={() => dispatch(closeTopupModal())}
        onConfirm={() => {
          handleSubmit(handleTopup)();
          dispatch(closeTopupModal());
        }}
      />
      <SuccessTopupModal
        isOpen={isSuccessTopupOpen}
        onClose={() => dispatch(closeSuccessTopupModal())}
        onNavigate={() => router.push("/")} // klik tombol "kembali ke beranda"
      ></SuccessTopupModal>
    </>
  );
};

export default Topup;
