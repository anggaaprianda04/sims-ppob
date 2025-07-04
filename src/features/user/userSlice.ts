import { IUser } from "@/types/Auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    data: IUser | null;
}

const initialState: UserState = {
    data: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.data = action.payload;
        },
        clearUser(state) {
            state.data = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
