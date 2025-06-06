import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BalanceState {
    value: number | null;
}

const initialState: BalanceState = {
    value: null,
}

const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {
        setBalance(state, action: PayloadAction<number>) {
            state.value = action.payload;
        },
    },
})

export const { setBalance } = balanceSlice.actions;
export default balanceSlice.reducer;