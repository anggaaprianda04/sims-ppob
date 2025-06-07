import Image from "next/image";
import React from "react";

interface Proptypes {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: number;
}

const ConfirmTopupModal = (props: Proptypes) => {
  const { amount, isOpen, onClose, onConfirm } = props;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-red-100 p-3 rounded-full">
            <Image src="/images/logo.png" alt="logo" width={40} height={40} />
          </div>
          <p className="text-gray-700">Anda yakin untuk Top Up sebesar</p>
          <h2 className="text-2xl font-bold text-black">
            Rp{amount.toLocaleString("id-ID")}
          </h2>
          <div className="flex flex-col gap-2 mt-4 w-full">
            <button
              className="text-red-600 font-semibold hover:underline"
              onClick={onConfirm}>
              Ya, lanjutkan Top Up
            </button>
            <button
              className="text-gray-400 font-medium hover:underline"
              onClick={onClose}>
              Batalkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTopupModal;
