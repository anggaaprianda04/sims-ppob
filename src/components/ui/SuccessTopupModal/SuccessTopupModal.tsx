import React from "react";

interface Proptypes {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: () => void;
}

const SuccessTopupModal = (props: Proptypes) => {
  const { isOpen, onClose, onNavigate } = props;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-sm w-full">
        <p className="text-3xl font-semibold text-green-500">Top Up Berhasil</p>
        <div className="mt-5 flex flex-col gap-2">
          <button
            className="text-red-600 font-semibold hover:underline"
            onClick={() => {
              onNavigate();
              onClose();
            }}>
            Kembali ke Beranda
          </button>
          <button className="text-gray-400 hover:underline" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessTopupModal;
