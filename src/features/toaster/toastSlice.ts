// store/slices/toastSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
    message: string | null;
    type: "success" | "error" | "warning" | null;
    show: boolean;
}

const initialState: ToastState = {
    message: null,
    type: null,
    show: false,
};

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        showToast(state, action: PayloadAction<{ message: string; type: "success" | "error" }>) {
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.show = true;
        },
        hideToast(state) {
            state.show = false;
            state.message = null;
            state.type = null;
        },
    },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
