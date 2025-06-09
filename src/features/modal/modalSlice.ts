import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalType = "confirm" | "success" | "error" | null;

interface ModalState {
  isOpen: boolean;
  type: ModalType;
  title: string;
  message: string;
  amount?: number;
  redirectHome?: boolean;
}

const initialState: ModalState = {
  isOpen: false,
  type: null,
  title: "",
  message: "",
  amount: 0,
  redirectHome: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<Partial<ModalState> & { type: ModalType; title: string; message: string }>
    ) => {
      const {
        type,
        title,
        message,
        amount = 0,
        redirectHome = false,
      } = action.payload;

      state.isOpen = true;
      state.type = type;
      state.title = title;
      state.message = message;
      state.amount = amount;
      state.redirectHome = redirectHome;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.title = "";
      state.message = "";
      state.amount = 0;
      state.redirectHome = false;
    },
  },
});


export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

