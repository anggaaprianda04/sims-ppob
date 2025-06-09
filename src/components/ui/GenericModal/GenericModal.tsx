import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface ModalType {
  type: "confirm" | "success" | "error";
  title: string;
  message: string;
  icon?: string; // optional override icon (use default based on type)
  confirmText?: string;
  cancelText?: string;
  showConfirm?: boolean;
  showCancel?: boolean;
  redirectHome?: boolean;
}

interface Proptypes extends ModalType {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  amount?: number;
}

const GenericModal = (props: Proptypes) => {
  const {
    isOpen,
    onClose,
    onConfirm,
    type,
    title,
    message,
    icon,
    confirmText = "Ya, lanjutkan",
    cancelText = "Batalkan",
    showConfirm = true,
    showCancel = true,
    redirectHome = false,
    amount,
  } = props;

  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(timeout);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const defaultIcons = {
    success: "/images/success.png",
    error: "/images/failed.png",
    confirm: "/images/logo.png",
  };

  const iconSrc = icon ?? defaultIcons[type];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}>
      <div
        className={`bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full transform transition-all duration-300 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}>
        <div className="flex flex-col items-center">
          <Image src={iconSrc} alt={type} width={60} height={60} />
          <p className="text-gray-700 mt-4">{title}</p>
          <p className="text-gray-500 text-lg mt-2 mb-2">{message}</p>
          {amount !== undefined && (
            <h2 className="text-2xl font-bold text-black">
              Rp{amount.toLocaleString("id-ID")}
            </h2>
          )}
          <div className="flex flex-col gap-2 mt-4 w-full">
            {redirectHome && (
              <button
                className="text-red-600 font-semibold hover:underline"
                onClick={() => {
                  router.push("/");
                  onClose();
                }}>
                Kembali ke Beranda
              </button>
            )}
            {!redirectHome && (
              <>
                {showConfirm && (
                  <button
                    className="text-red-600 font-semibold hover:underline"
                    onClick={onConfirm}>
                    {confirmText}
                  </button>
                )}
                {showCancel && (
                  <button
                    className="text-gray-400 font-medium hover:underline"
                    onClick={onClose}>
                    {cancelText}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
