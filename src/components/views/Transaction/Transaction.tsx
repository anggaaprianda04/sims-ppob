import CardHeader from "@/components/commons/CardHeader";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React from "react";
import Input from "@/components/ui/Input";
import { FaMoneyBillAlt } from "react-icons/fa";
import Button from "@/components/ui/Button";
import { openModal } from "@/features/modal/modalSlice";
import useTransaction from "./useTransaction";
import { confirmRef } from "@/hooks/useModalConfirm";
import Image from "next/image";

const Transaction = () => {
  const dispatch = useAppDispatch();
  const balance = useAppSelector((state) => state.balance.value);
  const { handleTransaction } = useTransaction();
  const { service_name, service_icon, service_tariff, service_code } =
    useAppSelector((state) => state.service);

  return (
    <>
      <div className="container mx-auto mt-6 max-w-screen-2xl">
        <CardHeader valueBalance={balance as unknown as number} />
        <div className="flex flex-col gap-6 mt-4">
          <div className="flex gap-5 mt-4 flex-col">
            <p className="text-xl font-medium">Pembayaran</p>
            <div className="flex items-center flex-row gap-2">
              <Image
                className="rounded-md"
                alt="icon"
                width={38}
                height={38}
                src={`${service_icon}`}
              />
              <p className="text-lg font-semibold">{service_name}</p>
            </div>
          </div>
          <form action="">
            <Input
              readonly
              name="top_up_amount"
              type="number"
              value={Number(service_tariff)}
              placeholder="Masukan nominal top up"
              icon={<FaMoneyBillAlt />}
            />
            <Button
              onClick={() => {
                confirmRef.current = () => {
                  handleTransaction({
                    service_code: service_code as string,
                  });
                };

                dispatch(
                  openModal({
                    type: "confirm",
                    title: "Konfirmasi Pembelian",
                    message: `Beli ${service_name} sebesar`,
                    amount: Number(service_tariff),
                    redirectHome: false,
                  })
                );
              }}
              type="button">
              Bayar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Transaction;
