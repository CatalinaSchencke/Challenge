import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import authReducer from "./features/auth-slice";
import servicesReducer from "./features/services-slice";
import paymentReducer from "./features/payment-slice";

export const store = configureStore({
    reducer: {
        authReducer,
        servicesReducer,
        paymentReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;