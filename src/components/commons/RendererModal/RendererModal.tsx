import { useAppDispatch, useAppSelector } from "@/store/store";
import { closeModal } from "@/features/modal/modalSlice";
import GenericModal from "@/components/ui/GenericModal";
import { confirmRef } from "@/hooks/useModalConfirm";

const RendererModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, type, title, message, amount, redirectHome } = useAppSelector(
    (state) => state.modal
  );

  const handleConfirm = () => {
    confirmRef.current?.(); // ⬅️ jalankan callback dari Topup
    dispatch(closeModal());
  };

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal())}
      onConfirm={handleConfirm}
      type={type as "confirm" | "success" | "error"}
      title={title}
      message={message}
      amount={amount}
      redirectHome={redirectHome}
    />
  );
};

export default RendererModal;
