import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isTopupModalOpen: boolean;
  topupAmount: number | null;
  isSuccessTopupOpen: boolean; // ✅ NEW
}

const initialState: ModalState = {
  isTopupModalOpen: false,
  topupAmount: null,
  isSuccessTopupOpen: false, // ✅ NEW
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openTopupModal(state, action: PayloadAction<number>) {
      state.isTopupModalOpen = true;
      state.topupAmount = action.payload;
    },
    closeTopupModal(state) {
      state.isTopupModalOpen = false;
      state.topupAmount = null;
    },
    openSuccessTopupModal(state) {
      state.isSuccessTopupOpen = true;
    },
    closeSuccessTopupModal(state) {
      state.isSuccessTopupOpen = false;
    },
    setSuccessTopupAmount(state, action: PayloadAction<number>) {
      state.topupAmount = action.payload;
    }
  },
});

export const { openTopupModal, closeTopupModal, openSuccessTopupModal,
  closeSuccessTopupModal, setSuccessTopupAmount } = modalSlice.actions;
export default modalSlice.reducer;
