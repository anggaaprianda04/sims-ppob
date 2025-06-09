import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import balanceReducer from "../features/balance/balanceSlice";
import modalReducer from "../features/modal/modalSlice";
import toastReducer from "../features/toaster/toastSlice";
import serviceReducer from "../features/service/serviceSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
    reducer: {
        balance: balanceReducer,
        modal: modalReducer,
        toast: toastReducer,
        service: serviceReducer,
        user: userReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T => useSelector(selector);